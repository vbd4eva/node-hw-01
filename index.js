const { argv } = require("yargs");
const invokeAction = require("./invokeActionYargs");

// listContacts().then(console.log);

//
// getContactById(8).then(console.log);

//
// const Obj = { id: 44, name: "YYY", shit: "shit!" };
// updateById(4, Obj).then(console.log);

// removeContact(1).then(console.log);

// const contact = ["Den", "tr@mail.com", "073-432-56-76"];
// addContact(...contact).then(console.log);

//

// const argv = yargs(hideBin(process.argv)).argv
// console.log("argv", argv)

// index.js

invokeAction(argv);
// console.log(argv);
