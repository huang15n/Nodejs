const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
// ci-dessus sont les seuls éléments pour lesquels nous avons besoin de npm

const fs = require("fs");
const fsPromesses = require("fs").promises;
const chemin = require("path");

const enregistrerEvenements = async (message) => {
  const horodatage = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const elementJournal = `${horodatage}\t${uuid()}\t${message}`;
  console.log(elementJournal);

  try {
    // Vérifier si le dossier 'journaux' existe, sinon le créer
    await fsPromesses.mkdir(chemin.join(__dirname, "journaux"), {
      recursive: true,
    });
    // if (!fs.existSync(path.join(xxx,xxx)))

    await fsPromesses.appendFile(
      chemin.join(__dirname, "journaux", `journal.txt`),
      elementJournal
    ); // La fonction appendFile de Node.js est utilisée pour ajouter du contenu à un fichier. Si le fichier spécifié n'existe pas, appendFile va automatiquement créer ce fichier avant d'y ajouter les données.
  } catch (erreur) {
    console.error(erreur);
  }
};

// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
// console.log(uuid());

module.exports = enregistrerEvenements;
