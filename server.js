const fs = require("fs");
const path = require("path");

console.log("continuez.....");

fs.writeFile(
  path.join(__dirname, "fichier", "nouvelle_fichier.txt"),
  `enchanté à vous rencontrer à ${new Date()}`,
  { encoding: "utf-8" },
  (err) => {
    // we do not need data, if we have an error, we throw it here
    if (err) throw err;
    console.log("operation write complete");
  }
);

// // Utilisation correcte de path.join et de fs.readFile
fs.readFile(
  path.join(__dirname, "fichier", "nouvelle_fichier.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

fs.appendFile(
  path.join(__dirname, "fichier", "nouvelle_fichier.txt"),
  `rajouter le message à ${new Date()}`,
  { encoding: "utf-8" },
  (err) => {
    if (err) throw err;
    console.log("append complete");
  }
);

console.log("continuez.....");

// due to the asyncrhonous fashion of nodejs
// the read complete last this time
// due to the aynscronous nature of nodejs
// if we want to modify a file we created it
// it would be better to put the append file to the writeFile operation
// that will it will definitely create a file and then be ready to append it
// we do not need to worry that it will overwrite it

// Gestion des erreurs non capturées
process.on("uncaughtException", (err) => {
  console.error(`Il y a eu une erreur non capturée: ${err}`);
  process.exit(1);
});
