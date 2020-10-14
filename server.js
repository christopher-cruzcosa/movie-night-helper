const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "passwordA1",
    database: "movie_night_helperdb",
});

connection.connect((err) => {

    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }

    console.log(`connected as id ${connection.threadId}`);
});


app.get("/", (req, res) => {

    connection.query("SELECT * FROM movies;", (err, data) => {
        if (err) {
            throw err;
        }
        res.render("index", { movies: data });
    });

});

app.post("/", function(req, res) {
    connection.query("INSERT INTO movies (movie_title) VALUES (?);", [req.body.movie_title], function(err, result) {

      if (err) {
        return res.status(500).end();
      };

      const SEE_OTHER_STATUS_CODE = 303;
      res.redirect(SEE_OTHER_STATUS_CODE, "/");

    });
  });

  app.put("/:id", (req, res) => {
      const queryStr = "UPDATE movies SET ? WHERE id = ?"
      connection.query(queryStr,[{title: req.body.movie_title,id: req.params.id}],(error,data) => {
        if (error) {
            return res.sendStatus(400);
        };
        res.end();
      })
  })


// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
});
