const db = require('../ulliti/db') 
const tbName = 'Movie';

module.exports = class Movie{
    constructor() {  
        const columnA = ['id', '', '', 'image', '', ''];
        this.name = ""
        this.role = "";
        this.image = "";
        this.summary = "";
        this.birthDate = "";
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
    }

}