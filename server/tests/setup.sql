DROP TABLE IF EXISTS kommentar;
DROP TABLE IF EXISTS artikkel;
DROP TABLE IF EXISTS kategori;

CREATE TABLE kategori (
    navn VARCHAR(30) PRIMARY KEY
);

CREATE TABLE artikkel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tittel VARCHAR(30) NOT NULL,
    bilde VARCHAR(1024) NOT NULL,
    innhold VARCHAR(1024) NOT NULL,
    kategori VARCHAR(30) NOT NULL,
    viktighet INT DEFAULT 2,
    tidspunkt VARCHAR(20),
    CONSTRAINT FOREIGN KEY artikkel(kategori) REFERENCES kategori(navn)
);

CREATE TABLE kommentar (
    artikkelid INT,
    bruker VARCHAR(30) NOT NULL,
    innhold VARCHAR(150) NOT NULL,
    tidspunkt VARCHAR(20),
    CONSTRAINT FOREIGN KEY kommentar(artikkelid) REFERENCES artikkel(id)
);

CREATE TRIGGER artikkeltid BEFORE INSERT ON artikkel
    FOR EACH ROW SET NEW.tidspunkt=concat(current_date(),' ',hour(current_time()),':',minute(current_time()));

CREATE TRIGGER kommentartid BEFORE INSERT ON kommentar
    FOR EACH ROW SET NEW.tidspunkt=concat(current_date(),' ',hour(current_time()),':',minute(current_time()));

INSERT INTO kategori VALUES ('Sport');
INSERT INTO kategori VALUES ('Mat');
INSERT INTO kategori VALUES ('Underholdning');
INSERT INTO kategori VALUES ('Drap');
INSERT INTO kategori VALUES ('Utenriks');


INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("Tittel1", "https://www.tasteofhome.com/wp-content/uploads/2017/10/Mint-Patty-Cake_exps140673_CMT2426390C08_17_2b_RMS-1-696x696.jpg", "Innhold1", "Sport");
INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Tittel2", "https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg", "Innhold2", "Underholdning", 1);
INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("Tittel3", "https://res.cloudinary.com/norgesgruppen/image/upload/c_fill,f_auto,h_574,q_80,w_945/tbagzeanc4qhrnlanzgi.jpg", "Innhold3", "Utenriks");
INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Tittel4", "https://www.pepsi.com/en-us/uploads/images/social-share.jpg", "Innhold4", "Sport", 1);
INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("Tittel5", "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg", "Innhold5", "Mat");
INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Tittel6", "http://cdn2.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/images/dir_230/it_photo_115348.jpg?itok=-3lfW5OY", "Innhold6", "Sport", 1);

INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (1, "aaa", "hello");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (1, "bbb", "good bye");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (2, "aaa", "this is a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (2, "bbb", "this is also a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (2, "aaa", "is this also a comment?");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (2, "ccc", "yes, that is a comment too");

INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (4, "aaa", "hello");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (4, "bbb", "good bye");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (3, "aaa", "this is a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (3, "bbb", "this is also a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (3, "aaa", "is this also a comment?");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (3, "ccc", "yes, that is a comment too");

INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (5, "aaa", "hello");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (6, "bbb", "good bye");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (5, "aaa", "this is a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (6, "bbb", "this is also a comment");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (5, "aaa", "is this also a comment?");
INSERT INTO kommentar (artikkelid, bruker, innhold) VALUES (6, "ccc", "yes, that is a comment too");