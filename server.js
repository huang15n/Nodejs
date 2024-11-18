const { format } = require("date-fns"); // Importation de la fonction 'format' de 'date-fns'
const { v4: uuidv4 } = require("uuid"); // Importation de la fonction 'v4' sous le nom 'uuidv4' depuis 'uuid'
//// const { uuid } = require("uuid");
// Affichage de la date actuelle dans le format spécifié
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// Affichage d'un UUID généré
console.log(uuidv4()); // Utilisation correcte de la fonction uuidv4

console.log("Bonjour");

// Pour démarrer le projet en mode développement, utilisez la commande suivante dans le terminal :
console.log("npm run dev pour démarrer nodemon");

// npm run dev to start nodenom

// npm install date-fns

console.log("c'est bon");
