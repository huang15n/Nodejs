# Introduction à Node.js

Node.js est un moteur JavaScript basé sur le moteur V8 de Google Chrome. Contrairement à JavaScript, qui s'exécute principalement dans le navigateur (côté client), Node.js permet à JavaScript de s'exécuter côté serveur, ouvrant ainsi de nouvelles possibilités pour le développement d'applications web complètes.

## Pourquoi Node.js ?

Traditionnellement, JavaScript était utilisé uniquement dans les navigateurs pour manipuler le DOM (Document Object Model) et interagir avec l'utilisateur via le HTML et le CSS. Cependant, Node.js permet à JavaScript de fonctionner également sur le serveur, ce qui permet de créer des applications web et des services backend en utilisant le même langage de programmation, tant pour le client que pour le serveur.

### Avantages de Node.js :

- **Performance :** Node.js utilise un modèle asynchrone et non-bloquant, ce qui permet de gérer un grand nombre de connexions simultanées efficacement.
- **Utilisation du même langage côté client et serveur :** Grâce à Node.js, vous pouvez utiliser JavaScript pour le frontend et le backend, ce qui facilite l'intégration et le développement.
- **Écosystème riche :** Node.js dispose d'un large écosystème de modules et de bibliothèques grâce à son gestionnaire de paquets, npm (Node Package Manager), ce qui permet d'ajouter facilement des fonctionnalités à votre projet.

### Node.js vs autres technologies

Bien que Node.js ne soit ni un framework ni une bibliothèque, il permet de créer des applications côté serveur. Il est souvent comparé à d'autres technologies côté serveur comme PHP, Ruby on Rails ou Python/Django, mais Node.js se distingue par sa capacité à gérer des applications scalables et performantes grâce à son moteur asynchrone.

---

## Installation et Setup

### Prérequis

Avant de commencer avec Node.js, assurez-vous d'avoir les éléments suivants installés sur votre machine :

1. **Node.js :** Téléchargez et installez Node.js depuis le site officiel : [https://nodejs.org/](https://nodejs.org/)

   - Cela inclura également `npm` (Node Package Manager), qui est utilisé pour installer des packages.

2. **Un éditeur de texte :** Utilisez un éditeur comme Visual Studio Code, Sublime Text ou Atom pour écrire votre code.

### Prérequis de connaissances

Avant de commencer, vous devriez déjà avoir une bonne connaissance des technologies suivantes :

- **HTML**
- **CSS**
- **JavaScript**

Une expérience avec d'autres bibliothèques et frameworks peut également être utile, mais nous allons nous concentrer sur les différences clés entre **Node.js** et le JavaScript traditionnel (ou "vanilla JS").

## Étapes pour commencer

### 1. Installer Node.js :

- Allez sur [https://nodejs.org/](https://nodejs.org/), choisissez la version stable de Node.js, et téléchargez-la.
- Après l'installation, vous pouvez vérifier que Node.js est correctement installé en exécutant la commande suivante dans votre terminal :

```bash
  node -v
```

Cela affichera la version de Node.js installée.

- Vous pouvez aussi vérifier la version de npm avec :

  ```bash
  npm -v
  ```

### 2. Créer un fichier `server.js`

Créez un fichier appelé `server.js` dans votre répertoire de travail.

Dans ce fichier, ajoutez le code suivant :

```js
// server.js
console.log("Node.js est en cours d'exécution!");
```

Exécutez ce fichier en utilisant la commande suivante dans votre terminal :

```bash
node server.js
```

Cela devrait afficher `Node.js est en cours d'exécution!` dans le terminal.

---

Voici une réorganisation de votre contenu pour mieux structurer les informations tout en conservant les exemples et détails importants.

---

## Différences clés entre Node.js et JavaScript traditionnel

### 1. **Environnement d'exécution**

- **Node.js** s'exécute sur un **serveur**, principalement utilisé pour le **backend**.
- **JavaScript traditionnel** (navigateur) s'exécute dans le **navigateur web**, principalement utilisé pour le **frontend**.

### 2. **Console**

- Dans **Node.js**, la **console** est la **fenêtre du terminal** (ligne de commande).
- Dans un **navigateur**, vous utilisez la **console du développeur** (accessible via les outils de développement du navigateur).

#### Exemple de code Node.js :

```js
console.log("Bonjour, le monde");
```

Dans **Node.js**, ce message s'affichera directement dans le terminal. En revanche, dans un navigateur, ce message s'afficherait dans la console des outils de développement.

### 3. **Objet global**

- Dans **Node.js**, l'objet global est **`global`**.
- Dans un **navigateur**, l'objet global est **`window`**.

#### Exemple d'utilisation de `global` en Node.js :

```js
console.log("Bonjour, le monde!");
console.log(global); // Affiche l'objet global
```

### 4. **Définir des variables globales**

- En **Node.js**, vous pouvez définir des variables globales en les attachant à **`global`**, ce qui les rend accessibles dans tout votre projet sans nécessiter d'importation.

#### Exemple de déclaration d'une variable globale :

```js
// Définir une variable globale
global.monMessage = "Bonjour, Node.js !";

// Accéder à la variable depuis n'importe où dans l'application
console.log(monMessage); // Affichera "Bonjour, Node.js !"
```

En revanche, dans un **navigateur**, vous utilisez `window` pour définir des variables globales.

### 5. **Modules et importation**

#### 5.1. **Modules de base (Core Modules)**

- En **Node.js**, vous devez importer des modules spécifiques pour accéder à des fonctionnalités liées au système d'exploitation, aux fichiers, etc. Ces modules sont appelés **core modules**.
- Dans un **navigateur**, vous n'avez pas besoin d'importer des modules pour interagir avec le DOM ou les événements.

##### Exemple avec le module `os` en Node.js :

```js
const os = require("os");

console.log(os.platform()); // Affiche la plateforme du système (ex. "linux", "win32")
console.log(os.cpus()); // Affiche les informations sur les processeurs du système
```

#### 5.2. **Importation de modules : CommonJS vs ES6**

- **Node.js** utilise **CommonJS** pour la gestion des modules, ce qui implique l'utilisation de la fonction `require()` pour importer des modules.
- **ES6 Modules**, qui utilisent `import` et `export`, sont principalement utilisés dans les navigateurs modernes et dans les projets JavaScript modernes.

##### Exemple d'importation avec **CommonJS** en Node.js :

```js
const fs = require("fs");

const data = fs.readFileSync("example.txt", "utf8");
console.log(data);
```

##### Exemple d'importation avec **ES6 Modules** :

```js
import fs from "fs";

const data = fs.readFileSync("example.txt", "utf8");
console.log(data);
```

---

### Différences clés entre `global` (Node.js) et `window` (navigateur)

| Caractéristique     | **`global` (Node.js)**                                                    | **`window` (navigateur)**                                                                    |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Objet global**    | Contient des fonctions essentielles comme `setTimeout()`, `console`, etc. | Contient des éléments spécifiques au navigateur comme `document`, `localStorage`, `alert()`. |
| **Environnement**   | Utilisé côté serveur, dans l'environnement Node.js.                       | Utilisé côté client, dans le navigateur web.                                                 |
| **Fonctionnalités** | Pas d'accès au DOM ou à l'interface utilisateur.                          | Contient des méthodes pour manipuler le DOM et gérer les événements du navigateur.           |

### Utilisation de `global` en Node.js vs `window` dans le navigateur

- Dans **Node.js**, vous définissez des variables globales comme suit :

  ```js
  global.monMessage = "Message global dans Node.js";
  console.log(monMessage); // Accessible partout dans le projet
  ```

- Dans un **navigateur**, vous définissez des variables globales sur `window` :

  ```js
  window.monMessage = "Message global dans le navigateur";
  console.log(monMessage); // Accessible dans la fenêtre du navigateur
  ```

### Afficher l'objet global

#### En Node.js :

```js
console.log(global); // Affiche l'objet global, avec des propriétés comme `setTimeout`, `clearTimeout`, `console`
```

L'objet `global` en Node.js est beaucoup plus léger que `window` en raison de l'absence de DOM et d'interaction avec l'interface utilisateur.

---

## Résumé des principales différences :

1. **Environnement d'exécution :**

   - **Node.js** : Serveur, backend.
   - **JavaScript (navigateur)** : Frontend, navigateur.

2. **Objet global :**

   - **Node.js** : `global`.
   - **Navigateur** : `window`.

3. **Modules de base :**

   - **Node.js** : Nécessite des modules comme `fs`, `os` pour interagir avec le système.
   - **Navigateur** : Modules comme DOM et événements sont intégrés sans besoin d'importer.

4. **Gestion des modules :**

   - **Node.js** : Utilise `require()` (CommonJS).
   - **Navigateur** : Utilise `import` et `export` (ES6 Modules).

5. **Accès aux variables globales :**
   - **Node.js** : Variables globales définies avec `global`.
   - **Navigateur** : Variables globales définies avec `window`.

---
