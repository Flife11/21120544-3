const { Column } = require('pg-promise');
const data = require('../data/data.json');

require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true
});


const Postgrecn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};
const cn = {
    ...Postgrecn
}
cn.database = process.env.DB_NAME

const Postgredb = pgp(Postgrecn);
const db = pgp(cn);

const waitForExist = async(checkExist, callback, checkParam, callbackParam) => {
    let exists = await checkExist(...checkParam);
    if (exists) {
        callback(...callbackParam);
    } else {
        setTimeout(function() {
            waitForExist(checkExist, callback, checkParam, callbackParam);
        }, 1000); // Wait for 1 second before checking again
    }
}

const insertData = async(d, table, column) => {
    const arrayColumn = ['genreList']
    const data = d.map((m, index) => {
        let newM = {}
        for (let key of column) {
            if (arrayColumn.includes(key)) {
                newM[key] = pgp.as.array(m[key]);
            }
            newM[key] = m[key]
        }
        return newM;
    })    
    const uniqueData = data.filter((value, index) => {
        return index === data.findIndex(obj => {
            return obj.id === value.id;
        });
    });
    const cs = new pgp.helpers.ColumnSet(column, { table: table });
    const query = pgp.helpers.insert(uniqueData, cs);

    let dbcn = null
    try {
        dbcn = await db.connect();
        db.none(query)            
    } catch (error) {
        console.log(error);
        throw(error)
    } finally {
        dbcn.done();
    }
}

const createTable = async() => {
    let dbcn = null
    try {
        dbcn = await db.connect();
        // -------Create
        // ---Movie
        const queryM = `CREATE TABLE IF NOT EXISTS public."Movie"
        (
            id character varying(50) NOT NULL ,
            title character varying(500) ,
            "fullTitle" character varying(500),
            year integer,
            image character varying(500) ,
            "releaseDate" character varying(20) ,
            "imDbRating" character varying(20) ,
            "boxOffice" character varying(20) ,
            "plot" character varying(5000) ,
            "genreList" character varying(500)[],
            "actorList" character varying(500)[],
            companies character varying(500),
            CONSTRAINT "Movie_pkey" PRIMARY KEY (id)
        )`
        db.query(queryM);    
        const columnM = ['id', 'title', 'fullTitle', 'year', 'image', 
        'releaseDate', 'imDbRating', 'boxOffice', 'plot', 'genreList', 'actorList', 'companies']            
        
        // ---Actor        
        const queryA = `CREATE TABLE IF NOT EXISTS public."Actor"
        (
            id character varying(20) COLLATE pg_catalog."default" NOT NULL,
            name character varying(500) COLLATE pg_catalog."default",
            role character varying(500) COLLATE pg_catalog."default",
            image character varying(500) COLLATE pg_catalog."default",
            summary character varying(5000) COLLATE pg_catalog."default",
            "birthDate" character varying(20) COLLATE pg_catalog."default",
            CONSTRAINT "Actor_pkey" PRIMARY KEY (id)
        )`
        db.query(queryA);
        const columnA = ['id', 'name', 'role', 'image', 'summary', 'birthDate'];

        // ---Movie_Actor
        
        const doesTableExist = async (tableName) => {
            let dbcn = null;
            const sql = `SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = $1)`;
            try {
                dbcn = await db.connect();
                const result = await db.query(sql, [tableName]);
                return result[0].exists;
            } catch (error) {
                return false;
            } finally {
                dbcn.done();
            }
        };

        // -------Insert
        waitForExist(doesTableExist, insertData, ['Movie'], [data.Movies, 'Movie', columnM]);
        waitForExist(doesTableExist, insertData, ['Actor'], [data.Names, 'Actor', columnA]);


    } catch (error) {
        throw(error)
    } finally {
        dbcn.done()
    }
    
}

const checkExistDatabase = async() => {

    const doesDatabaseExist = async (databaseName) => {
        let dbcn = null;
        const sql = `SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1)`;
        try {
            dbcn = await Postgredb.connect();
            const result = await Postgredb.query(sql, [databaseName]);
            return result[0].exists;
        } catch (error) {
            return false;
        } finally {
            dbcn.done();
        }
    };


    const databaseName = process.env.DB_NAME;
    const exists = await doesDatabaseExist(databaseName);
    console.log(exists);
    if (exists===false) {
        Postgredb.none('CREATE DATABASE $1:name', [databaseName]);
        waitForExist(doesDatabaseExist, createTable, [databaseName], [])
    }
}

checkExistDatabase();

module.exports = {
    getRatingMovie: async (limit) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const query = `SELECT *
            FROM "Movie"
            WHERE "imDbRating" IS NOT NULL
            ORDER BY "imDbRating" DESC
            LIMIT ${limit};`
            const data = await db.any(query)
            // data = JSON.parse(data);
            // console.log(data);
            return data;
        } catch (error) {
            throw error
        } finally {
            dbcn.done();
        }
    },
    get3BoxOffice: async (index) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const query = `SELECT title, "boxOffice"
            FROM
                (SELECT title, "boxOffice"
                FROM "Movie"
                WHERE "boxOffice" IS NOT NULL
                ORDER BY "boxOffice" DESC
                LIMIT 15)
            LIMIT 3
            OFFSET ${index};`
            const data = await db.any(query)
            // data = JSON.parse(data);
            // console.log(data);
            return data;
        } catch (error) {
            throw error
        } finally {
            dbcn.done();
        }
    },
    get: async (id, tbName) => {
        let dbcn = null;
        try {
            // if (tbName=='Actor') console.log(id);
            dbcn = await db.connect();
            const query = `SELECT * FROM "${tbName}" WHERE id='${id}'`;
            const data = await db.one(query);
            return data;
        } catch (error) {
            throw error
        } finally {
            dbcn.done();
        }
    },
    search: async (name, offset, tbName, colName) => {
        let dbcn = null;
        try {
            // console.log(name, offset, tbName, colName)
            dbcn = await db.connect();
            const query = `
            SELECT * 
            FROM
                (SELECT *
                FROM "${tbName}"
                WHERE "${colName}" LIKE '%${name}%')
            LIMIT 9
            OFFSET ${offset*9};`
            const data = await db.any(query);
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