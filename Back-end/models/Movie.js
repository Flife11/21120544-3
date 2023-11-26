const db = require('../ulliti/db') 
const Actor = require('./Actor');
const tbName = 'Movie';

module.exports = class Movie{
    constructor() {  
        this.title = ""
        this.fullTitle = "";
        this.image = "";
        this.year = 0;
        this.releaseDate = "";
        this.imDbRating = "";
        this.boxOffice = "";
        this.plotFull = "";
    }
    copy(p) {
        for (var attr in p) {
            if (this.hasOwnProperty(attr)) this[attr] = p[attr];
        }
    }
    insert() {
        db.insert(this, tbName);
    }

    static async getRatingMovie(){        
        try {
            const data = await db.getRatingMovie(15);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async get3BoxOffice(index) {        
        try {            
            const data = await db.get3BoxOffice(index);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async get(id) {        
        try {            
            const data = await db.get(id, 'Movie');
            // console.log(data);
            const newActorList = []
            // console.log(data.actorList)
            for (let actor of data.actorList) {
                // console.log(JSON.parse(actor).id);
                // actor = JSON.parse(actor)
                let nActor = await Actor.get(JSON.parse(actor).id);
                // console.log(nActor);
                nActor.asCharacter = JSON.parse(actor).asCharacter;
                newActorList.push(nActor);
            }
            data.actorList = [...newActorList];
            return data;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    static async search(name, offset) {
        try {            
            // console.log(name, offset);
            const data = await db.search(name, offset, 'Movie', 'title');
            // console.log(data);
            return data;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}