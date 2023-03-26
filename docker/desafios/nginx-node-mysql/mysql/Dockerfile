FROM mysql:5.7

RUN usermod -u 1000 mysql

CMD [ "--innodb-use-native-aio=0" ]

COPY setupDB.sql /docker-entrypoint-initdb.d/