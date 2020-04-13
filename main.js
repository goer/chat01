const [Parse, ParseUtil] = require("./parseclass")
const Log = require("./util/log")
window.jQuery = $ = require("jquery");


class UserManager extends Log {
    constructor() {
        super()
        this.table = 'XUser'
    }

    async getBy(key,value) {
        return await ParseUtil.findOne(this.table,{key:value})
    }

    async list(props={},limit=10,sort=''){
        var rs = await ParseUtil.findBy(this.table,props,limit)
        return rs
    }

    async create(data,index='') {

        if(!index)
            return await ParseUtil.save(this.table,data)

        var r = await this.getBy(index,data[index])
        if (!r) {
            this.log('vendor not exist, create new')
            return await ParseUtil.save(this.table,data)
        } else {
            this.log('Vendor: ' + JSON.stringify(r))
            return r;
        }
    }

    async update(data,index='name'){
        var r = await this.create(data,index)
        this.log('saving vendor: '+JSON.stringify(r))
        r = await r.save(data)
        return r
    }



}

class VendorManager extends Log {
    constructor() {
        super()
        this.table = 'XVendor'
    }


}


class RoomUserManager extends UserManager{
    constructor(room){
        super()
        this.table = 'XRoomUser'
        this.room = room
    }
}

class RoomMessageManager extends UserManager{
    constructor(room){
        super()
        this.table = 'XRoomMessage'
        this.room = room
    }
}


class RoomSession extends Log {

    constructor(room) {
        super()
        this.room = room
        this.roomUserManager = new RoomUserManager(room)
        this.roomMessageManager = new RoomMessageManager(room)
    }

    async joinUser(user){
        return await this.roomUserManager.update(
            {
                room: this.room,
                user:user
            },
        'room')
    }
    async getUsers(){
        return await this.roomUserManager.list({
            room : this.room
        })
    }

    async getMessages() { 
        return await this.roomMessageManager.list({
            room : this.room
        })
    }
    async sendMessage(msg) { 
        return await this.roomMessageManager.create(
            {
                room: this.room,
                msg:msg
            })
    }

    async onNewUser(user){}
    async onNewMessage(message){}

}

class RoomManager extends UserManager {

    constructor() {
        super()
        this.table = 'XRoom'
        this.vendorManager = new VendorManager()
    }

    async getRoomSessionByVendor(vendor){
        var vendor = await this.vendorManager.getByName(vendor.name)
        var room = await this.update({
            vendor : vendor
        },'vendor') 
        return new RoomSession(room);   
    }

}


var init = async () => {

    console.log('init')
    var vm = new VendorManager()
    var r = await vm.update({
        name: 'guruh'
    })

    var um = new UserManager()
    var r = await um.update({
        name : 'hedia'
    })

}

var run = async () => {
    // console.log("run");
    // var TestObject = Parse.Object.extend("TestObject");
    // var to = new TestObject();
    // var res = await to.save({
    //     name: "Guruh",
    //     dob: new Date()
    // });
    // console.log(JSON.stringify(res));
};

var list = async () => {
    // var q = new Parse.Query('TestObject')
    // var r = await q.find()
    // console.log('List::::==>>')
    // console.log(JSON.stringify(r))
    // return r
}

var start = async () => {
    console.log('start')
    $('#test').html("<h3>after done</h3>")
}

var run_list = async () => {
    // var s = ""
    // var rs = await list()
    // s += '<ul>'
    // for (var r of rs) {
    //     s += '<li>' + r.get('name')
    // }
    // s += '</ul>'
    // $('#list').html(s)
}

$(document).ready(async function () {
    console.log('ready')
    // $('#test').html('<h2>test3</h2>');
    $('#button1').click(function () {
        list()
        console.log('this click')
    })
    await start()
    //await run_list()
    await init()
})

console.log('start main')
//start()

//run();
//list()
