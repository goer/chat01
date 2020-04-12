var Parse = require("./parseclass");

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

run();
