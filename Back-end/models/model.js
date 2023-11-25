const db = require('../ulliti/db') 
const tbName = 'test';

module.exports = class Information{
    constructor() {
        this.name = "";
        this.email = "";
        this.phone = "";
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