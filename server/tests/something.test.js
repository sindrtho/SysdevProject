// @flow

/**
 * Because of the developers shitty pc and bad internet connection while developing, the timeout on all tests has been
 * increased from 5 secods to 30 so the tests have time to finish before an async timeout error causes all the tests
 * to fail.
 */

var mysql = require("mysql");

//Metoder for å starte og avslutte pool
const runsqlfile = require("./runsqlfile.js");
const NyhetsDao = require('../src/dao/NyhetsDao.js');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql.stud.iie.ntnu.no",
    user: "sindrtho",
    password: "G1uccMZn",
    database: "sindrtho",
    debug: false,
    multipleStatements: true
});

let newsdao: NyhetsDao = new NyhetsDao(pool);

beforeAll(done => {
    console.log("Starter tester");
    runsqlfile("tests/setup.sql", pool, done);
});

afterAll(() => {
    console.log("All done!");
    pool.end();
});

test("Getting all the important news.", done => {
    jest.setTimeout(30000);
    function callback(status, data) {
        expect(data.length).toBe(3);
        expect(data[0].innhold).toBe('Innhold6');
        expect(data[2].id).toBe(2);
        done();
    }

    newsdao.getNews(callback);
});

test("Getting just some of the news", done => {
    newsdao.getCategory('Sport', (status, data) => {
        expect(data.length).toBe(3);
        expect(data[0].id).toBe(6);
        expect(data[1].innhold).toBe('Innhold4');
        done();
    });
});

test("Getting only one news", done => {
   newsdao.getANews(3, (status, data) => {
       expect(data.length).toBe(1);
       expect(data[0].id).toBe(3);
       expect(data[0].innhold).toBe('Innhold3');
       done();
   });
});

test("Getting those comments", done => {
    newsdao.getComments(6, (status, data) => {
        expect(data.length).toBe(3);
        data.map(e => {
           expect(e.artikkelId).toBe(6);
        });
        expect(data[0].innhold).toBe('good bye');
        expect(data[1].bruker).toBe('bbb');
        done();
    });
});

test("Add that news", done => {
    let newnews = {'tittel':'Ny tittel', 'bilde':'http://cdn2.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/images/dir_230/it_photo_115348.jpg?itok=-3lfW5OY', 'innhold':'Nytt innhold', 'kategori':'Mat', 'viktighet':'1'};
    newsdao.newNews(newnews, () => {
        console.log("Table updated");
    });

    newsdao.getCategory('Mat', (status, data) => {
        expect(data.length).toBe(2);
        expect(data[0].id).toBe(7);
        expect(data[0].innhold).toBe('Nytt innhold');
        done();
    });
});

test("Edit that news", done => {
    let params = {'tittel':'nytittel', 'bilde':'http://cdn2.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/images/dir_230/it_photo_115348.jpg?itok=-3lfW5OY', 'innhold':'nyinnhold', 'kategori':'Drap', 'viktighet':'2', 'id':2};
    newsdao.editNews(params, () => {
        console.log("Editing done");
        newsdao.getANews(2, (status, data) => {
            expect(data[0].innhold).toBe('nyinnhold');
            expect(data[0].tittel).toBe('nytittel');
            expect(data[0].kategori).toBe('Drap');
            done();
        });
    });
});

test("Delete those news", done => {
    newsdao.deleteNews('2', (status, data) => {
       expect(data.affectedRows).toBe(1);
       done();
   });
});
