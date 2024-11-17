console.log("Bonjour le monde!");
console.log(global);

const os = require("os");
console.log(os.type());
console.log(os.homedir());
console.log(os.version());

console.log(__dirname);
console.log(__filename);

const path = require("path");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
