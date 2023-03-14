FROM golang:1.17.1-alpine AS builder

ADD . /app
WORKDIR /app

COPY go.mod ./
RUN go mod download

RUN go build -o fullcycle .

FROM scratch
COPY --from=builder ./app .
CMD ["./fullcycle"]