// @flow
/* eslint eqeqeq: "off" */

const Dao = require('./dao.js');

module.exports = class NyhetsDao extends Dao{
    getNews(callback) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE viktighet=1 ORDER BY id DESC;", [], callback);
    }

    getANews(id, callback) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE id=?",
            [id],
            callback);
    }

    getComments(artikkelId, callback) {
        super.query("SELECT artikkelId, bruker, innhold, tidspunkt FROM kommentar WHERE artikkelid=?",
            [artikkelId],
            callback);
    }

    getCategory(kategori, callback) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE kategori=? ORDER BY id DESC;",
            [kategori],
            callback);
    }

    newNews(json, callback) {
        let params = [json.tittel, json.bilde, json.innhold, json.kategori, json.viktighet];
        super.query("INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES (?, ?, ?, ?, ?);",
            params,
            callback);
    }

    editNews(json, callback) {
        let params = [json.tittel, json.bilde, json.innhold, json.kategori, json.viktighet, json.id];
        super.query("UPDATE artikkel SET tittel=?, bilde=?, innhold=?, kategori=?, viktighet=? WHERE id=?;",
            params,
            callback);
    }

    deleteNews(id, callback) {
        super.query("DELETE FROM kommentar WHERE artikkelid=?", [id], () => {console.log("Deleted comments.");
            super.query("DELETE FROM artikkel WHERE id=?", [id], callback);
        });
    }
}
