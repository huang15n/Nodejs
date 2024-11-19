const http = require("http");
const chemin = require("path");
const systemeFichier = require("fs");
const promessesFichiers = require("fs").promises; // Utilisation des promesses pour les opérations sur les fichiers

// Modules spécifiques
const journalEvenement = require("./log"); // Module pour gérer les journaux d'événements
const evenements = require("events"); // Module pour gérer les événements
const monEmetteur = new evenements.EventEmitter(); // Création d'un émetteur d'événements personnalisé

const PORT = process.env.PORT || 3500; // Définit le port du serveur (3500 par défaut)

// Création du serveur HTTP
const serveur = http.createServer((requete, reponse) => {
  // Affichage dans la console de l'URL demandée et de la méthode HTTP utilisée (GET, POST, etc.)
  console.log(`URL demandée : ${requete.url}, Méthode : ${requete.method}`);

  // Switch pour vérifier quelle URL est demandée
  switch (requete.url) {
    // Si la requête est pour la page d'accueil ou "index.html"
    case "/":
    case "/index.html":
      // Réponse avec un code HTTP 200 (OK) et un en-tête de type de contenu HTML
      reponse.statusCode = 200;
      reponse.setHeader("Content-Type", "text/html");

      // Lecture du fichier "index.html" et renvoi du contenu dans la réponse
      systemeFichier.readFile(
        chemin.join(__dirname, "index.html"), // Emplacement du fichier index.html
        "utf8", // Encodage du fichier
        (erreur, data) => {
          // Fonction de rappel pour traiter le fichier
          // Si une erreur survient lors de la lecture du fichier
          if (erreur) {
            // Si une erreur survient, renvoyer une erreur HTTP 500 (Erreur interne du serveur)
            reponse.statusCode = 500;
            reponse.end("Erreur interne du serveur.");
          } else {
            // Si le fichier est lu avec succès, renvoyer son contenu dans la réponse
            reponse.end(data);
          }
        }
      );
      break;

    // Si l'URL demandée n'est pas trouvée, renvoyer une erreur 404 (Page non trouvée)
    default:
      reponse.statusCode = 404;
      reponse.setHeader("Content-Type", "text/plain");
      reponse.end("Page non trouvée.");
      break;
  }
});

// Démarrer le serveur et écouter sur le port défini
serveur.listen(PORT, () =>
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`)
);
