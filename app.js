const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db/pool")

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

// Read
app.get("/", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  const sql = "select * from users";
  pool.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({
        error: error
      });
    }
    res.status(200).json({
      data: JSON.parse(JSON.stringify(results))
    });
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from users where id = ?";
  pool.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({
        error: error
      });
    }
    res.status(200).json({
      data: results
    });
  });
});

// Create
app.post("/", (req, res) => {
  const {name, email, birthday, gender, address} = req.body;
  const sql = "insert into users (name, email, birthday, gender, address) values (?, ?, ?, ?, ?)";
  pool.query(sql, [name, email, birthday, gender, address], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    const id = result.insertId;
    return res.status(201).json({
      id: id,
      name: name,
      email: email,
      birthday: birthday,
      gender: gender,
      address: address
    });
  });
});

// Update
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "update users set ? where id = " + id;
  pool.query(sql, req.body.data, (error) => {
    if (error) {
      res.status(500).json({
        error: error
      });
    }
    res.status(200).json({
      id: id,
      name: req.body.data.name,
      email: req.body.data.email,
      birthday: req.body.data.birthday,
      gender: req.body.data.gender,
      address: req.body.data.address
    });
  });
});

// Delete
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from users where id = ?";
  pool.query(sql, [id], function(error) {
    if (error) {
      res.status(500).json({
        error: error
      });
    }
    res.status(200).json({
      id: id
    });
  });
});

app.listen(5001, () => {
  console.log("Example app listening on port 5001");
});
