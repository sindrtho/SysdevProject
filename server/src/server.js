// @flow
/* eslint eqeqeq: "off" */

import path from 'path';
var express = require("express");
var bodyParser = require("body-parser");
var url = require("url");
var app = express();
var fs = require("fs");
var apiRoutes = express.Router();
var mysql = require("mysql");
var NyhetsDao = require('./dao/NyhetsDao.js');

type Request = express$Request;
type Response = express$Response;

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "sindrtho",
    password: "G1uccMZn",
    database: "sindrtho",
    debug: false
});

const nyhetsdao = new NyhetsDao(pool);

const public_path = path.join(__dirname, '/../../client/public');

app.use(express.static(public_path));
app.use(express.json());

//Get all the important articles wich should be on the front page.
app.get("/artikkel", (req: Request, res: Response) => {
    nyhetsdao.getNews((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Get all categories
app.get("/kategorier", (req: Request, res: Response) => {
    nyhetsdao.allCategories((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Get all articles from a specific category.
app.get("/kategori/:kat", (req: Request, res: Response) => {
    nyhetsdao.getCategory(req.params.kat, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Get a specific article.
app.get("/artikkel/:id", (req: Request, res: Response) => {
    nyhetsdao.getANews(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Add a brand new article for the site.
app.post("/artikkel", (req: Request, res: Response) => {
    nyhetsdao.newNews(req.body, (status, data) => {
        res.status(status);
        res.json(data);
        console.log("Added news");
    });
});

//Edit a existing article.
app.put("/artikkel/:id", (req: Request, res: Response) => {
    nyhetsdao.editNews(req.body, (status, data) => {
        res.status(status);
        res.json(data);
        console.log("News is edited.");
    })
});

//Delete an article from the site.
app.delete("/artikkel/:id", (req: Request, res: Response) => {
    nyhetsdao.deleteNews(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
        console.log("Deleted");
    })
});

//Get the latest news. Within the last 24 hours.
app.get("/latest", (req: Request, res: Response) => {
    nyhetsdao.getLatestNews((status, data) => {
        res.status(status);
        res.json(data);
    });
});

let server = app.listen(3000);