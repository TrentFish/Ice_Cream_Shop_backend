const express = require('express');
const app = express();
const pg = require('pg');
const client = new pg.Client("postgres://localhost/icecreamflavors_db")

app.get("/", (req, res, next) => {
    res.send("we're not connected to the server because Trent thought he had postgres working, but didn't. Until he proved himself worng because he's awesome");
});

app.get('/api/flavors', async(req, res, next) => {
    try {
        const SQL = `SELECT * FROM flavors;`;

        const response = await client.query(SQL);
        console.log(response.rows);

        res.send(response.rows);
    }catch (error) {
        next(error);
    }
});

const start = async() => {
    client.connect();

    const SQL = `
        DROP TABLE IF EXISTS flavors;
        CREATE TABLE flavors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20)
        );
        INSERT INTO flavors(name) VALUES ('chocolate');
        INSERT INTO flavors(name) VALUES ('vanilla');
        INSERT INTO flavors(name) VALUES ('nails');
        INSERT INTO flavors(name) VALUES ('cheese');
        INSERT INTO flavors(name) VALUES ('sprite cranberry');
        INSERT INTO flavors(name) VALUES ('mint chocolate chip');
        INSERT INTO flavors(name) VALUES ('rocks with roads');
    `;

    await client.query(SQL);

    const port = process.env.POST || 5500;

    app.listen(port, () => {
        console.log(`the server is listening on port ${port}`);
    });
};

start();