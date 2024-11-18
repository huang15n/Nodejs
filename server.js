const fs = require("fs");

if (!fs.existsSync("./nouvelle_doissier")) {
  fs.mkdir("nouvelle_doissier", (err) => {
    if (err) throw err;
    console.log("Dossier 'nouvelle_doissier' créé");
  });
} else {
  // Utilisation correcte de fs.rmdir avec un callback
  fs.rmdir("./nouvelle_doissier", (err) => {
    if (err) {
      console.error("Erreur lors de la suppression du dossier :", err);
    } else {
      console.log("Dossier 'nouvelle_doissier' supprimé");
    }
  });
}
