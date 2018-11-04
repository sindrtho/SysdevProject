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

//Get all articles from a specific category.
app.get("/kategori/:kat", (req: Request, res: Response) => {
    return true;
});

//Get a specific article.
app.get("/artikkel/:id", (req: Request, res: Response) => {
    nyhetsdao.getANews(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Edit a existing article.
app.post("/artikkel/:tittel", (req: Request, res: Response) => {
    return true;
});

//Add a new comment to an article.
app.put("/artikkel/:id/comment", (req: Request, res: Response) => {
    console.log("Posting comment on article.");
    return true;
});

//Get the comments for the given article to print them to the screen when the article loads.
app.get("/artikkel/:id/comment", (req: Request, res: Response) => {
    return true;
});

//Add a brand new article for the site.
app.put("/artikkel/:id", (req: Request, res: Response) => {
    return true;
});

//Delete an article from the site.
app.delete("/artikkel/:id", (req: Request, res: Response) => {
    return true;
});

let server = app.listen(3000);