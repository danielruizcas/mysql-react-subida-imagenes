const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cors());
app.use(express.static("../client/public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "prueba_base_datos",
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/register", upload.single("image"), (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.file.filename;

  db.query(
    "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)",
    [name, email, password, image],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Inserting data error in server" });
      } else {
        res.json({
          success: true,
          status: "Success",
          message: "Usuario registrado con éxito",
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
