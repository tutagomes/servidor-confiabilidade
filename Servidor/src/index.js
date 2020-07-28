const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const os = require('os');
var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./coordenadas.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the coordenadas database.');
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Server alive! Container ID: " + os.hostname()));

app.post("/calcular", (req, res) => {
    let coord = req.body
    let calculado = {
        lat: (coord.c1.lat + coord.c2.lat + coord.c3.lat)/3,
        long: (coord.c1.long + coord.c2.long + coord.c3.long)/3
    }
    db.run('INSERT INTO `Coordenadas`(coord1, coord2, coord3, calculada, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?)', [JSON.stringify(coord.c1), JSON.stringify(coord.c2), JSON.stringify(coord.c3), JSON.stringify(calculado), coord.userId, Date.now()], (err) => {
        if(err) {
            return console.log(err.message); 
        }
    })

    res.send(calculado)    
})

app.get("/calcular", (req, res) => {
    let resultado
    db.all('SELECT * FROM `Coordenadas`', [], (err, row) => {
        if(err) {
            res.send(err)
            return console.log(err.message);
        }
        res.send(row)
    })
})
app.listen(8080, () =>
    console.log(
        "Mini server (with Express) ready at http://localhost:8080/!"
    )
);
