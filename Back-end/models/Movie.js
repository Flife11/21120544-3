const db = require('../ulliti/db') 
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
        const data = await db.getRatingMovie(15);
        return data;
    }

}