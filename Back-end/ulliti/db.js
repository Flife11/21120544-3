require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true
});


const cn = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    max: 30
};

const db = pgp(cn);

module.exports = {
    getAll: async (tName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await db.any(`SELECT * FROM ${tName}`)
            console.log(JSON.stringify(data))
            return data;
        } catch (error) {
            throw error
        } finally {
            dbcn.done();
        }
    },
    insert: async (entity, tName) => {
        try {
            const query = pgp.helpers.insert(entity, null, tName);
            const data = await db.one(query + 'RETURNING id');
            return data;
        } catch (error) {
            throw error
        }
    }
}