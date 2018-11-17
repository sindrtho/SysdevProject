// @flow
/* eslint eqeqeq: "off" */

const Dao = require('./dao.js');

module.exports = class NyhetsDao extends Dao{
    getNews(callback: Function) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE viktighet=1 ORDER BY id DESC LIMIT 20;", [], callback);
    }

    getANews(id: string | number, callback: Function) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE id=?",
            [id],
            callback);
    }

    getComments(artikkelId: string | number, callback: Function) {
        super.query("SELECT artikkelId, bruker, innhold, tidspunkt FROM kommentar WHERE artikkelid=?",
            [artikkelId],
            callback);
    }

    getCategory(kategori: string, callback: Function) {
        super.query("SELECT id, tittel, bilde, innhold, kategori, tidspunkt FROM artikkel WHERE kategori=? ORDER BY id DESC;",
            [kategori],
            callback);
    }

    allCategories(callback: Function) {
        super.query("SELECT navn FROM kategori;",
            [],
            callback);
    }

    newNews(json: Object, callback: Function) {
        let params = [json.tittel, json.bilde, json.innhold, json.kategori, json.viktighet];
        super.query("INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES (?, ?, ?, ?, ?);",
            params,
            callback);
    }

    editNews(json: Object, callback: Function) {
        let params = [json.tittel, json.bilde, json.innhold, json.kategori, json.viktighet, json.id];
        super.query("UPDATE artikkel SET tittel=?, bilde=?, innhold=?, kategori=?, viktighet=? WHERE id=?;",
            params,
            callback);
    }

    deleteNews(id: string | number, callback: Function) {
        super.query("DELETE FROM kommentar WHERE artikkelid=?", [id], () => {console.log("Deleted comments.");
            super.query("DELETE FROM artikkel WHERE id=?", [id], callback);
        });
    }

    getLatestNews(callback: Function) {
        super.query("select id, tittel, bilde, innhold, kategori, tidspunkt from artikkel WHERE datediff(current_date(), tidspunkt) <= 1 AND viktighet = 1 ORDER BY tidspunkt DESC;",
            [],
            callback);
    }
}
