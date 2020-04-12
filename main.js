var Parse = require("./parseclass");
var $ = require('jquery')

class Chat {}

var run = async () => {
  console.log("run");
  var TestObject = Parse.Object.extend("TestObject");
  var to = new TestObject();
  var res = await to.save({
    name: "Guruh",
    dob: new Date()
  });
  console.log(JSON.stringify(res));
};

var list = async()=>{
    var q = new Parse.Query('TestObject')
    var r = await q.find()
    console.log('List::::==>>')
    console.log(JSON.stringify(r))
}

//run();
//list()
