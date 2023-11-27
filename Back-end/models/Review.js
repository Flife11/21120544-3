const db = require('../ulliti/db') 
const tbName = 'Review';

module.exports = class Review{
    constructor() {  
        this.movieID = "";
        this.username = "";
        this.warningSpoilers = "";
        this.date = "";
        this.rate = "";
        this.title = "";
        this.content = "";
    }
    copy(p) {
        for (var attr in p) {
            if (this.hasOwnProperty(attr)) this[attr] = p[attr];
        }
    }
    insert() {
        db.insert(this, tbName);
    }

    static async getAll(){
        const data = await db.getAll(tbName);
        return data;
    }

    static async get(id) {
        // console.log(id, "actor");
        const data = await db.getReviewByMovieID(id);
        // console.log(data);
        return data;
    }

    static async getReviewByOffset(offset, movieID) {
        console.log(offset);
        const data = await db.getReviewByOffset(offset, movieID);
        return data;
    }
}