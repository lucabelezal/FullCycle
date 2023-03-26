const express = require('express')
const app = express()
const port = 3000

function createUniqueName() {
    const { uniqueNamesGenerator, names, starWars } = require('unique-names-generator');
    const generatorConfig = {
        dictionaries: [names, starWars]
    }

    return uniqueNamesGenerator(generatorConfig);
}

function createMySQLConnection() {
    const databaseConfig = {
        host: 'database',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    };

    const mysql = require('mysql');
    const connection = mysql.createPool(databaseConfig);

    connection.on('error', function (err) {
        throw `Falha na conexão: ${err}`
    })

    console.log('Conexão MySQL obtida com sucesso')

    return connection
}

function dropPeopleIfExists() {
    const connection = createMySQLConnection();
    const sql = 'DROP TABLE IF EXISTS people;'
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(`Erro. Retorno do resolve deletePeopleIfExists(): ${error}`)
                return reject(error)
            }
            console.log(`Sucesso. Retorno do resolve deletePeopleIfExists(): ${result}`)
            return resolve(result)
        })
    })
}

function insertPeople() {
    const connection = createMySQLConnection();
    const name = createUniqueName()
    const sql = `INSERT INTO people(name) values('${name}')`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(`Erro. Retorno do resolve insertPeople(): ${error}`)
                return reject(error)
            }
            console.log(`Sucesso. Retorno do resolve insertPeople(): ${result}`)
            return resolve(result)
        })
    })
}

function getPeople() {
    const connection = createMySQLConnection();

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM people`, (error, result) => {
            if (error) {
                console.log(`Erro. Retorno do resolve getPeople(): ${error}`)
                return reject(error)
            }
            console.log(`Sucesso. Retorno dentro do resolve getPeople(): ${result}`)
            return resolve(result)
        })
    })
}

app.get('/', (req, res) => {

    insertPeople().then(() => {
        getPeople().then((people) => {
            let content = '<h1>Full Cycle Rocks!!</h1>'
            content += '<table>'
            content += '<h4>Lista de nomes cadastrada no banco de dados:</h4>'
            for (const person of people) {
                content += `<tr><td>${person.id}. ${person.name}</td></tr>`
            }
            content += '</table>'
            res.send(content);
            console.log(`Dados do banco: ${people}`)
        });
    });
})

app.listen(port, () => {
    console.log(`Rodando aplicação na porta ${port}`)
})