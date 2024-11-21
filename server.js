import { createServer } from "http"; // Importation du module "http" pour créer un serveur

// Création d'un serveur HTTP
const serveur = createServer((requette, reponse) => {
  // Analyse de l'URL de la requête
  const url = new URL(requette.url, "http://localhost");

  // Extraction du paramètre "id" de la chaîne de requête (query string)
  let contentu = ``;
  const partie = requette.url.split("/");

  // Vérification de la méthode HTTP (POST) pour la gestion des formulaires
  if (requette.method === "POST") {
    let corps = "";

    requette.on("readable", () => {
      const data = requette.read();
      if (data !== null) {
        corps += data;
      }
    });
    requette.on("end", () => {
      console.log(corps); // Affichage du corps de la requête
      // Traitement des données du formulaire (ajouter l'appareil)
      // Vous devez ici traiter `corps` pour ajouter l'appareil à `appareils`

      // Corps de la requête entièrement reçu
      // Utilisation de JSON.parse ou un autre moyen pour analyser le corps de la requête
      const article = new URLSearchParams(corps); // Analyser les données envoyées par le formulaire (URL encoded)

      const nouvelAppareil = {
        id: appareils.length + 1, // Assigner un ID unique (simple incrémentation)
        nom: article.get("nom"), // Récupérer le nom de l'appareil
        marque: article.get("marque"), // Récupérer la marque
        modele: article.get("modele"), // Récupérer le modèle
        prix: parseFloat(article.get("prix")), // Récupérer le prix (et le convertir en nombre)
        categorie: article.get("categorie"), // Récupérer la catégorie
      };
      console.log(nouvelAppareil);

      // Ajouter le nouvel appareil à la liste
      ajouterAppareils(nouvelAppareil);
      console.log(appareils);

      redirect(reponse, "/");
    });
  }

  // Vérification de l'URL pour les opérations "delete"
  if (partie.includes("delete")) {
    supprimer(partie[2]);
    redirect(reponse, "/");
  } else {
    console.log(url.searchParams.get("id"));
    const id = url.searchParams.get("id");

    if (partie.includes("ajouter")) {
      contentu = obtenirForme();
    } else {
      // Contenu HTML qui sera renvoyé comme réponse
      contentu = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemple de Paragraphe Stylisé</title>
  <!-- Lien vers le CSS de Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="p-4 bg-light border rounded">
          <h1 class="text-center mb-4">Bienvenue</h1>
          <p class="lead text-justify">
            Bonjour et bienvenue sur notre site web. Ce paragraphe est un exemple de contenu en français stylisé avec 
            <strong>Bootstrap</strong>. Bootstrap facilite la mise en page et le style des éléments HTML, 
            rendant les interfaces modernes et attrayantes. Profitez de la flexibilité et des outils qu'il offre !
          </p>

          <!-- Affichage dynamique du contenu en fonction de l'ID dans la query string -->
          ${id ? obtenirContentu(id) : creerMonAappreils}
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <button class="btn btn-secondary"> 
      <a href="/ajouter">Ajouter</a>
    </button>
  </div>
  <!-- Lien vers le JS de Bootstrap (facultatif) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;
    }

    // Réponse HTTP avec un code de statut 200 et un type de contenu HTML
    reponse.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  }
  reponse.end(contentu);
  console.log(requette.url);
});

// Génération de la liste des articles sous forme de liens
const genererListeArticle = ({ id, marque, nom, modele, prix }) =>
  `<li><a href="?id=${id}">${marque} | ${nom} | ${modele}: ${prix} €</a></li>`;

// Tableau des appareils disponibles
const appareils = [
  {
    id: 1,
    nom: "Guitare acoustique",
    marque: "Yamaha",
    modele: "FG800",
    prix: 200,
    categorie: "Cordes",
  },
  {
    id: 2,
    nom: "Piano numérique",
    marque: "Casio",
    modele: "PX-770",
    prix: 600,
    categorie: "Clavier",
  },
  {
    id: 3,
    nom: "Synthétiseur",
    marque: "Roland",
    modele: "Juno-DS76",
    prix: 1000,
    categorie: "Clavier",
  },
  {
    id: 4,
    nom: "Batterie électronique",
    marque: "Alesis",
    modele: "Nitro Mesh Kit",
    prix: 350,
    categorie: "Percussion",
  },
  {
    id: 5,
    nom: "Saxophone",
    marque: "Yamaha",
    modele: "YAS-280",
    prix: 1200,
    categorie: "Vent",
  },
  {
    id: 6,
    nom: "Violon",
    marque: "Stentor",
    modele: "Student II",
    prix: 150,
    categorie: "Cordes",
  },
  {
    id: 7,
    nom: "Flûte traversière",
    marque: "Gemeinhardt",
    modele: "2SP",
    prix: 300,
    categorie: "Vent",
  },
  {
    id: 8,
    nom: "Enceinte Bluetooth",
    marque: "JBL",
    modele: "Flip 5",
    prix: 100,
    categorie: "Accessoire",
  },
];

const ajouterAppareils = (obj) => {
  appareils.push(obj); // Ajout d'un appareil dans le tableau
};

// Génération du contenu pour afficher tous les appareils sous forme de liste
const creerMonAappreils = `
<h2>Mes Appareils</h2>
<ul>${appareils.map(genererListeArticle).join("\n")}</ul>
`;

// Fonction pour générer le contenu d'une carte pour un appareil spécifique
function obtenirContentu(id) {
  let article = appareils.find((a) => a.id == id); // Recherche de l'article par ID
  if (article) {
    // Retourne une carte Bootstrap avec les informations de l'article
    return `
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="text-center mb-0">${article.nom}</h3>
        </div>
        <div class="card-body">
          <h4 class="card-title text-center">${article.nom}</h4>
          <p class="card-text">
            <strong>ID :</strong> ${article.id}<br>
            <strong>Nom :</strong> ${article.nom}<br>
            <strong>Marque :</strong> ${article.marque}<br>
            <strong>Modèle :</strong> ${article.modele}<br>
            <strong>Prix :</strong> ${article.prix} €<br>
            <strong>Catégorie :</strong> ${article.categorie}
          </p>
          <div class="text-center mt-4">
            <a href="/delete/${id}" class="btn btn-danger">Supprimer</a>
          </div>
        </div>
        <div class="card-footer text-center">
          <small class="text-muted">Informations mises à jour récemment</small>
        </div>
      </div>
    `;
  } else {
    // Si l'article n'est pas trouvé
    return `<p class="text-danger">Article non trouvé !</p>`;
  }
}

// Fonction pour supprimer un appareil du tableau
const supprimer = (id) => {
  let position = appareils.findIndex((a) => a.id == id);
  if (position !== -1) {
    appareils.splice(position, 1); // Suppression de l'article par index
  }
};

// Fonction pour rediriger l'utilisateur vers une autre page
function redirect(reponse, location) {
  reponse.writeHead(302, { location: location, "Content-Type": "text/plain" });
  reponse.end(`Redirection vers ${location}`);
}

// Fonction pour obtenir le formulaire d'ajout d'appareil
function obtenirForme() {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ajouter un appareil</title>
      <!-- Lien vers le CSS de Bootstrap -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="p-4 bg-light border rounded">
              <h1 class="text-center mb-4">Ajouter un appareil</h1>
              <form action="/add" method="POST">
                <div class="mb-3">
                  <label for="nom" class="form-label">Nom de l'appareil</label>
                  <input type="text" class="form-control" id="nom" name="nom" required>
                </div>
                <div class="mb-3">
                  <label for="marque" class="form-label">Marque</label>
                  <input type="text" class="form-control" id="marque" name="marque" required>
                </div>
                <div class="mb-3">
                  <label for="modele" class="form-label">Modèle</label>
                  <input type="text" class="form-control" id="modele" name="modele" required>
                </div>
                <div class="mb-3">
                  <label for="prix" class="form-label">Prix</label>
                  <input type="number" class="form-control" id="prix" name="prix" required>
                </div>
                <div class="mb-3">
                  <label for="categorie" class="form-label">Catégorie</label>
                  <select class="form-control" id="categorie" name="categorie" required>
                    <option value="Cordes">Cordes</option>
                    <option value="Clavier">Clavier</option>
                    <option value="Percussion">Percussion</option>
                    <option value="Vent">Vent</option>
                    <option value="Accessoire">Accessoire</option>
                  </select>
                </div>
                <button type="submit"  class="btn btn-primary">Ajouter l'appareil</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Lien vers le JS de Bootstrap -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;
}

// Lancement du serveur sur le port 8000
serveur.listen(8000, () => {
  console.log(`Serveur est courant ${serveur.address().port}`);
});
