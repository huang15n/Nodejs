const http = require("http");
const chemin = require("path");
const systemeFichier = require("fs");
const promessesFichiers = require("fs").promises; // Utilisation des promesses pour les opérations sur les fichiers

const PORT = process.env.PORT || 3500;

// Définition des types MIME
const typesMIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

// Fonction pour servir un fichier
async function serveFile(filePath, contentType, response) {
  try {
    // Lecture du fichier
    const data = await promessesFichiers.readFile(filePath, "utf8");

    // Utilisation de writeHead pour envoyer le statut et les en-têtes
    response.writeHead(200, { "Content-Type": contentType });

    // Envoi du fichier
    response.end(data);
  } catch (erreur) {
    // En cas d'erreur, envoie une réponse 500 (erreur interne du serveur)
    console.error("Erreur lors de la lecture du fichier:", erreur);

    // Utilisation de writeHead pour envoyer le statut d'erreur et l'en-tête
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erreur interne du serveur.");
  }
}

// Serveur HTTP
const serveur = http.createServer((requete, reponse) => {
  console.log(`${requete.url} ${requete.method}`);

  const extension = chemin.extname(requete.url);
  const contenuType = typesMIME[extension] || "text/html"; // Type MIME par défaut

  // Construire le chemin du fichier
  const cheminFichier = chemin.join(
    __dirname,
    requete.url === "/" ? "index.html" : requete.url
  );

  // Appel de la fonction serveFile pour gérer la demande de fichier
  serveFile(cheminFichier, contenuType, reponse);
});

serveur.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
