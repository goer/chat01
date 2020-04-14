const Parse = require("parse");
const Log = require("./util/log")

Parse.serverURL = "https://api.e-kasbon.co.id/parse";
Parse.initialize("123", null, "master123");

class Util extends Log {
    constructor(){
        super()
    }

    async save(table,data){

        var Table = Parse.Object.extend(table);
        var to = new Table();
        var res = await to.save(data)
        return res;

    }

    async query(table){
        var q = new Parse.Query(table)
        return q;
    }

    async findBy(table,props,limit=null){
        var q = await this.query(table)
        for(var p in props){
            await q.equalTo(p,props[p])
        }
        if(limit){
            q.limit(limit)
        }
        var rs = await q.find()
        if(rs && rs.length>0){
            return rs            
        }
        return false;
    }

    async findOne(table,props){
        var rs = await this.findBy(table,props,1)
        if(rs){
            return rs[0]
        }
        return false;
    }



}


module.exports = [Parse,new Util()];
