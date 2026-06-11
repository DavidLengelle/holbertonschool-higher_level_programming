// Types de dés standards du jeu de rôle.
// Le nombre est le nombre de faces du dé.
const DES = [4, 6, 8, 10, 12, 20, 100];

// On garde au maximum 5 lancers dans l'historique.
const TAILLE_HISTORIQUE = 5;

// Liste des lancers précédents (le plus récent en premier).
let historique = [];

// --- Construction de l'interface des dés ---

// Conteneur où l'on ajoute une ligne par type de dé.
const listeDes = document.getElementById("dice-list");

// Pour chaque type de dé, on crée une ligne avec son nom,
// un bouton "-", un champ quantité et un bouton "+".
DES.forEach(function (faces) {
  const ligne = document.createElement("div");
  ligne.className = "dice-row";

  // Nom du dé, par exemple "d6"
  const nom = document.createElement("span");
  nom.className = "dice-name";
  nom.textContent = "d" + faces;

  // Groupe des contrôles de quantité
  const groupe = document.createElement("div");
  groupe.className = "qty-group";

  // Bouton pour diminuer la quantité
  const moins = document.createElement("button");
  moins.className = "qty-btn";
  moins.textContent = "-";

  // Champ qui affiche la quantité choisie pour ce dé
  const champ = document.createElement("input");
  champ.className = "qty-input";
  champ.type = "number";
  champ.min = "0";
  champ.value = "0";
  // On retient le nombre de faces dans un attribut pour le retrouver au lancer
  champ.dataset.faces = faces;

  // Bouton pour augmenter la quantité
  const plus = document.createElement("button");
  plus.className = "qty-btn";
  plus.textContent = "+";

  // Le bouton "-" enlève 1 sans descendre sous 0
  moins.addEventListener("click", function () {
    const valeur = parseInt(champ.value, 10) || 0;
    if (valeur > 0) {
      champ.value = valeur - 1;
    }
  });

  // Le bouton "+" ajoute 1
  plus.addEventListener("click", function () {
    const valeur = parseInt(champ.value, 10) || 0;
    champ.value = valeur + 1;
  });

  // On assemble la ligne
  groupe.appendChild(moins);
  groupe.appendChild(champ);
  groupe.appendChild(plus);
  ligne.appendChild(nom);
  ligne.appendChild(groupe);
  listeDes.appendChild(ligne);
});

// --- Récupération des autres éléments de la page ---

const champBonus = document.getElementById("bonus");
const boutonLancer = document.getElementById("roll-btn");
const boutonReset = document.getElementById("reset-btn");
const blocResultat = document.getElementById("result");
const detailResultat = document.getElementById("result-details");
const totalResultat = document.getElementById("result-total");
const listeHistorique = document.getElementById("history-list");

// --- Fonctions utilitaires ---

// Renvoie un entier aléatoire entre 1 et le nombre de faces (inclus).
function lancerUnDe(faces) {
  return Math.floor(Math.random() * faces) + 1;
}

// --- Action du bouton "Lancer" ---

function lancer() {
  // Lignes de détail à afficher (une par type de dé lancé)
  const lignesDetail = [];
  let total = 0;

  // On parcourt chaque champ quantité présent dans la liste des dés.
  const champs = listeDes.querySelectorAll(".qty-input");
  champs.forEach(function (champ) {
    const faces = parseInt(champ.dataset.faces, 10);
    const quantite = parseInt(champ.value, 10) || 0;

    // On ignore les dés dont la quantité est 0.
    if (quantite > 0) {
      const tirages = [];
      for (let i = 0; i < quantite; i++) {
        const valeur = lancerUnDe(faces);
        tirages.push(valeur);
        total += valeur;
      }
      // Exemple de ligne produite : "3d6: 4, 1, 6"
      lignesDetail.push(quantite + "d" + faces + ": " + tirages.join(", "));
    }
  });

  // Lecture du bonus / malus (0 par défaut)
  const bonus = parseInt(champBonus.value, 10) || 0;

  // Si aucun dé n'a été choisi, on ne lance pas.
  if (lignesDetail.length === 0) {
    detailResultat.textContent = "Choisis au moins un dé avant de lancer.";
    totalResultat.textContent = "0";
    blocResultat.hidden = false;
    return;
  }

  // On ajoute le bonus au total et on l'affiche s'il n'est pas nul.
  total += bonus;
  if (bonus !== 0) {
    // Affiche "+ 2" ou "- 1" selon le signe
    const signe = bonus > 0 ? "+ " : "- ";
    lignesDetail.push("Bonus : " + signe + Math.abs(bonus));
  }

  // Affichage du résultat courant
  detailResultat.textContent = lignesDetail.join("\n");
  totalResultat.textContent = total;
  blocResultat.hidden = false;

  // Mise à jour de l'historique
  ajouterHistorique(lignesDetail.join(" | "), total);
}

// --- Gestion de l'historique ---

// Ajoute le lancer en tête de l'historique et garde les 5 plus récents.
function ajouterHistorique(detail, total) {
  historique.unshift({ detail: detail, total: total });
  if (historique.length > TAILLE_HISTORIQUE) {
    historique.pop();
  }
  afficherHistorique();
}

// Réaffiche la liste de l'historique du plus récent au plus ancien.
function afficherHistorique() {
  listeHistorique.innerHTML = "";
  historique.forEach(function (lancer) {
    const li = document.createElement("li");
    li.textContent = "Total " + lancer.total + " — " + lancer.detail;
    listeHistorique.appendChild(li);
  });
}

// --- Action du bouton "Réinitialiser" ---

// Remet toutes les quantités et le bonus à zéro, et cache le résultat.
function reinitialiser() {
  const champs = listeDes.querySelectorAll(".qty-input");
  champs.forEach(function (champ) {
    champ.value = "0";
  });
  champBonus.value = "0";
  blocResultat.hidden = true;
}

// --- Branchement des boutons ---

boutonLancer.addEventListener("click", lancer);
boutonReset.addEventListener("click", reinitialiser);
