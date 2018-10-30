// @flow
/* eslint eqeqeq: "off" */

let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let url = require("url");
let app = express();
let fs = require("fs");
let apiRoutes = express.Router();
let mysql = require("mysql");
let NyhetsDao = require('./dao/NyhetsDao.js');

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "sindrtho",
    password: "G1uccMZn",
    database: "sindrtho",
    debug: false
});

type Request = express$Request;
type Response = express$Response;

const nyhetsdao = new NyhetsDao(pool);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
//         return res.status(200).json({});
//     }
//     next();
// });
const public_path = path.join(__dirname, '/../Project-Frontend/public');
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

let server = app.listen(8080);
