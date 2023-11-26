const db = require('../ulliti/db') 
const tbName = 'Actor';

module.exports = class Actor{
    constructor() {  
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
        return data;
    }

    static async get(id) {
        // console.log(id, "actor");
        const data = await db.get(id, 'Actor');
        // console.log(data);
        return data;
    }
}