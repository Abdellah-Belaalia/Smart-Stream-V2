Cette application web monopage (SPA) permet de gérer, filtrer et visionner des chaînes TV en direct via une interface moderne et réactive. Elle repose sur une architecture JavaScript modulaire (ES6 Modules) communicant avec une API REST distante (MockAPI) pour la persistance des données, ainsi que sur le LocalStorage pour conserver les préférences de navigation de l'utilisateur.

Objectifs principaux
Offrir un lecteur vidéo intégré avec affichage du guide électronique des programmes (EPG) en temps réel.

Implémenter un système CRUD complet (Création, Lecture, Modification, Suppression) synchronisé entre l'interface (DOM) et le serveur (API).

Permettre un filtrage dynamique multi-critères (catégories générées dynamiquement, favoris, liste noire et barre de recherche instantanée).

Garantir l'intégrité des données grâce à une validation stricte côté client par expressions régulières (RegExp).

2. Stack Technique
Structure & Sémantique : HTML5 (<video>, attributs data-*)

Styles & Responsive Design : Tailwind CSS

Logique Applicative : JavaScript Vanilla (ES6+ Modules, async/await, Fetch API, Délégation d'événements)

Backend & Persistance Distante : MockAPI (API REST JSON)

Persistance Locale : Web Storage API (localStorage)

3. Architecture du Projet
Le code est découpé en modules indépendants ayant chacun une responsabilité unique (Separation of Concerns) :

Plaintext
projet-tv-streaming/
│
├── index.html          # Structure principale (Lecteur, Sidebar, Recherche, Grille des cartes)
├── app.js              # Point d'entrée : initialisation et orchestration des modules
├── api.js              # Couche réseau : requêtes HTTP (GET, POST, PUT, DELETE) vers MockAPI
├── ui.js               # Manipulation du DOM, rendu des cartes, lecteur vidéo, modales et sidebar
├── edit.js             # Logique d'édition d'une chaîne existante
├── validation.js       # Contrôle de saisie (RegExp) et création de nouvelles chaînes
├── search.js           # Moteur de filtrage combiné (Catégories, Favoris, Blacklist, Recherche)
├── storage.js          # Gestion de la persistance locale (localStorage)
└── error.js            # Gestion centralisée des erreurs HTTP
4. Modèle de Données (Ressource Channel)
Chaque chaîne enregistrée sur MockAPI suit la structure JSON suivante :

JSON
{
  "id": "1",
  "channelNumber": "101",
  "name": "National Geographic",
  "category": "DOCUMENTAIRE",
  "country": "France",
  "countryCode": "FR",
  "logo": "https://via.placeholder.com/60x60?text=NatGeo",
  "previewImage": "https://via.placeholder.com/800x450?text=NatGeo+Doc",
  "streamUrl": "https://exemple.com/flux/stream.m3u8",
  "isLive": true,
  "epg": {
    "currentProgram": "Wild Wonders (Ep. 95)",
    "startTime": "13:15",
    "endTime": "14:15",
    "progressPercentage": 79
  },
  "isFavorite": false,
  "isBlacklisted": false
}
5. Description Détaillée des Modules
app.js — Orchestration
Masque l'écran de chargement initial (hideSpinner()).

Récupère la liste complète des chaînes depuis l'API (const channels = await getChannels()).

Distribue l'état local channels aux différents modules fonctionnels (popupAjouter, editChannel, categoryShower, rechercheChannel, selectCategory, displayChanges, playChannel).

api.js — Communication avec l'API REST
Centralise tous les appels fetch vers l'endpoint MockAPI :

getChannels() : GET /channels — Récupère l'ensemble des chaînes.

addChannel(channel) : POST /channels — Ajoute une nouvelle chaîne et retourne l'objet créé avec son id serveur.

updateChannel(channelId, updateData) : PUT /channels/:id — Met à jour les informations d'une chaîne existante.

deleteChannel(channelId) : DELETE /channels/:id — Supprime définitivement une chaîne.

setChannelFavorite(channelId, status) : PUT /channels/:id — Met à jour l'état isFavorite.

setChannelBlackListed(channelId, status) : PUT /channels/:id — Met à jour l'état isBlacklisted (et désactive automatiquement le statut favori).

ui.js — Rendu DOM & Lecteur Vidéo
Rendu des cartes (rendre, createCard, blacklistedChannels) : Génère dynamiquement les cartes HTML selon l'état de la chaîne (carte standard avec boutons Favori, Blacklist, Éditer ; ou carte spécifique en mode Liste Noire avec boutons Supprimer et Restaurer).

Lecteur & EPG (playChannel) : Charge automatiquement la première chaîne active au démarrage. Utilise la délégation d'événements sur le conteneur #channels-card pour lancer la lecture d'une chaîne au clic et mettre à jour les métadonnées EPG (programme en cours, horaires, barre de progression).

Navigation latérale (showCategorie, categoryShower, getCategories) : Extrait les catégories uniques des chaînes actives pour construire le menu latéral dynamiquement.

Modale dynamique (creationPopup, popupAjouter) : Génère le formulaire réutilisable pour l'ajout et la modification.

validation.js — Validation & Création
Contrôle par RegExp (valideForm) : Vérifie chaque champ avant tout envoi réseau et affiche un message d'erreur ciblé sous le champ invalide :

Nom : 2 à 30 caractères alphanumériques, accents, espaces ou tirets.

Numéro de chaîne : 1 à 6 chiffres.

Catégorie : 4 à 15 lettres, espaces ou tirets (normalisée en majuscules).

Pays : 3 à 25 lettres et espaces.

Code Pays : 2 à 5 lettres majuscules (ex: MA, FR).

URL de flux : Format HTTP/HTTPS valide.

Création (createChannel) : Construit l'objet chaîne, l'envoie via addChannel(), l'insère dans le tableau local channels et rafraîchit la grille ainsi que la liste des catégories.

edit.js — Édition de Chaîne
Intercepte le clic sur l'icône d'édition (data-action="edit").

Ouvre la modale en adaptant son titre (« Modifier la chaîne ») et son bouton de validation (« Modifier »), puis pré-remplit les champs avec les valeurs actuelles de la chaîne sélectionnée.

À la soumission, valide les données, met à jour l'objet en mémoire locale, exécute updateChannel() (PUT), puis actualise l'affichage et les catégories.

search.js — Filtrage Combiné & Recherche
La fonction displayChanges(channels) applique un filtrage en cascade sur le tableau channels :

Filtre de vue / catégorie :

BLACK LIST : affiche uniquement les chaînes où isBlacklisted === true.

FAVORITE : affiche les chaînes où isFavorite === true et non blacklistées.

TOUTES CATÉGORIES : affiche toutes les chaînes non blacklistées.

Catégorie spécifique : filtre par correspondance exacte sur channel.category.

Filtre textuel (rechercheChannel) : Filtre les résultats précédents en temps réel selon le nom, la catégorie, le pays ou le numéro de chaîne.

storage.js — Persistance Locale
saveData(key, data) & getData(key) : Sauvegarde la catégorie sélectionnée (selectedCategory) dans le localStorage. Lors d'un rechargement de page (F5), l'utilisateur retrouve immédiatement le filtre actif avant l'actualisation.

error.js — Gestion des Erreurs
handleError(res) : Intercepte les réponses HTTP en échec (!res.ok) et lève des exceptions explicites selon le code statut (404 Ressource introuvable, 403/429 Limite de requêtes atteinte, 500 Erreur serveur).

6. Flux de Synchronisation des Données
Pour garantir une expérience fluide sans rechargement de page, chaque opération d'écriture suit un cycle en trois étapes :

Persistance Distante : Appel asynchrone (await) vers MockAPI (POST, PUT ou DELETE).

Mise à jour de l'État Local : Modification directe du tableau channels en mémoire vive (push, mutation de propriétés ou splice).

Rafraîchissement Réactif : Appel à displayChanges(channels) et categoryShower(channels) pour recalculer les filtres et réinjecter le DOM.
