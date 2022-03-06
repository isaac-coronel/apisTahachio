"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

//app.use(express.urlencoded({ extended: true }));
//api para conexion con bd
const mysql = require("mysql");
//conexion a la base de datos
const con = mysql.createConnection({
  host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "rzy5ekytboe3yni4",
  password: "ifbx5j5mg3aik5j1",
  database: "hgvvunmenozev8gc",
});
app.listen(port, () => {
  console.log(`api rest en http://localhost:${port}`);
});
app.use(express.json());
app.get("/hola/:name", (req, res) => {
  res.send({ message: `hola ${req.params.name}` });
});

//metodo get de la tabla persona
app.get("/api/allPersonas", (req, res) => {
  const con = mysql.createConnection({
    host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "rzy5ekytboe3yni4",
    password: "ifbx5j5mg3aik5j1",
    database: "hgvvunmenozev8gc",
  });
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM persona",
      function (err, result, fields) {
        if (err) throw err;
        if (err)
          return res
            .status(500)
            .send({ message: `error en la peticion: ${err} ` });
        if (!result)
          return res.status(404).send({ message: "tabla vacia" });

        res.status(200).send({ result });
        console.log(result);
      }
    );
  });
});
//get datos comisaria
app.post("/api/getComisaria", (req, res) => {
  const con = mysql.createConnection({
    host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "rzy5ekytboe3yni4",
    password: "ifbx5j5mg3aik5j1",
    database: "hgvvunmenozev8gc",
  });
  //call getDatosComisaria("Asuncion","Santa Maria");
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `call getDatosComisaria('${req.body.ciudad}','${req.body.barrio}')`,
      function (err, result, fields) {
        if (err) throw err;
        if (err)
          return res
            .status(500)
            .send({ message: `error en la peticion: ${err} ` });
        if (!result)
          return res.status(404).send({ message: "tabla vacia" });

        res.status(200).send({ result });
        console.log(result);
      }
    );
  });
});

//get info de las multas
app.get("/api/getMultas/:param", (req, res) => {
  const con = mysql.createConnection({
    host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "rzy5ekytboe3yni4",
    password: "ifbx5j5mg3aik5j1",
    database: "hgvvunmenozev8gc",
  });
  //call para traer los datos de las multas
  con.connect(function (err) {
    if (err) throw err;
    con.query(`call getInfoMultas()`, function (err, result, fields) {
      if (err) throw err;
      if (err)
        return res
          .status(500)
          .send({ message: `error en la peticion: ${err} ` });
      if (!result)
        return res.status(404).send({ message: "tabla vacia" });

      res.status(200).send({ result });

      //console.log(result);
    });
  });
});

//get leyes generales
app.get("/api/getLeyes/:param", (req, res) => {
  const con = mysql.createConnection({
    host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "rzy5ekytboe3yni4",
    password: "ifbx5j5mg3aik5j1",
    database: "hgvvunmenozev8gc",
  });
  //call para traer los datos de las multas
  con.connect(function (err) {
    if (err) throw err;
    con.query(`call getLeyes()`, function (err, result, fields) {
      if (err) throw err;
      if (err)
        return res
          .status(500)
          .send({ message: `error en la peticion: ${err} ` });
      if (!result)
        return res.status(404).send({ message: "tabla vacia" });

      res.status(200).send({ result });

      //console.log(result);
    });
  });
});
//cambios
//insert into persona por parametros post
//getAntecedentes
app.get("/api/getAntecedentes/:param", (req, res) => {
  const con = mysql.createConnection({
    host: "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "rzy5ekytboe3yni4",
    password: "ifbx5j5mg3aik5j1",
    database: "hgvvunmenozev8gc",
  });
  //call para traer los datos de las multas
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `call getAntecedentes('${req.params.param}')`,
      function (err, result, fields) {
        if (err) throw err;
        if (err)
          return res
            .status(500)
            .send({ message: `error en la peticion: ${err} ` });
        if (!result)
          return res.status(404).send({ message: "tabla vacia" });

        res.status(200).send({ result });

        //console.log(result);
      }
    );
  });
});
app.post("/api/newPersona", (req, res) => {
  console.log(req.body);
  //res.status(200).send({messaje: 'el producto se recibio'})

  //cargamos el modelo desde el body del pedido

  con.connect(function (err) {
    var sql =
      "INSERT INTO `hgvvunmenozev8gc`.`persona` (`nombre`, `apellido`, `ci`) VALUES (" +
      `'${req.body.nombre}', '${req.body.apellido}', '${req.body.ci}')`;

    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (err)
        return res
          .status(500)
          .send({ message: `error en la peticion: ${err} ` });
      if (!result)
        return res.status(404).send({ message: "tabla vacia" });

      res.status(200).send({ result });
      console.log(result);
    });
    //////////
  });
});
app.get("/api/tahachio/detallesComisario/:param", (req, res) => {
  var js = {
    Comisaria: "Primera Metropolitana",
    Comisario: "Isaac Coronel",
    SubComisario: "Carlos Coronel",
    Direccion: "Ita Yvate esq/ Centenario",
  };
  if (req.params.param == "1") {
    res.send({ results: [js] });
  } else {
    res.send({ message: `hola ${req.params.param}` });
  }
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/

// realizar una consulta sql
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });*/

// creacion de una base de datos
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE dbPruebaNode", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });*/
//crear tabla
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/

//insert en tabla
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });*/

//select de tabla

/*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM persona", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  })*/
