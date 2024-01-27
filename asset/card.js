const divResult = document.querySelector("#result");
const counterElement = document.querySelector(".counter");

let tabJeu = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
function genereTableauAleatoire() {
  moves = 0;
  updateCounter();





  const tab = [];
  const nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    const ligne = [];
    for (let j = 0; j < 4; j++) {
      let fin = false;
      while (!fin) {
        const randomImage = Math.floor(Math.random() * 8);
        if (nbImagePosition[randomImage] < 2) {
          ligne.push(randomImage + 1);
          nbImagePosition[randomImage]++;
          fin = true;
        }
      }
    }
    tab.push(ligne);
  }
  return tab;
}


function afficherTableau() {
  let txt = "";

  for (let i = 0; i < tabJeu.length; i++) {
    txt += "<div>";
    for (let j = 0; j < tabJeu[i].length; j++) {
      if (tabJeu[i][j] === 0) {
        txt +=
          `<button class='btn btn-primary m-2 small game-card' onClick='verif("${i}-${j}")'></button>`;
      } else {
        txt +=
          `<img src='${getImage(tabJeu[i][j])}' class='m-2 img-size'>`;
      }
    }
    txt += "</div>";
  }

  divResult.innerHTML = txt;
}

function getImage(valeur) {
  let imgTxt = "asset/image/";
  switch (valeur) {
    case 1:
      imgTxt += "elephant.png";
      break;
    case 2:
      imgTxt += "girafe.png";
      break;
    case 3:
      imgTxt += "hippo.png";
      break;
    case 4:
      imgTxt += "monkey.png";
      break;
    case 5:
      imgTxt += "panda.png";
      break;
    case 6:
      imgTxt += "parrot.png";
      break;
    case 7:
      imgTxt += "penguin.png";
      break;
    case 8:
      imgTxt += "pig.png";
      break;
    default:
      console.log("cas non pris en compte");
  }
  return imgTxt;
}

function verif(bouton) {
  if (ready) {
    nbAffiche++;

    const ligne = bouton.substr(0, 1);
    const colonne = bouton.substr(2, 1);

    tabJeu[ligne][colonne] = tabResult[ligne][colonne];
    afficherTableau();

    if (nbAffiche > 1) {
      ready = false;
      setTimeout(() => {
        // Vérification
        if (
          tabJeu[ligne][colonne] !== tabJeu[oldSelection[0]][oldSelection[1]]
        ) {
          tabJeu[ligne][colonne] = 0;
          tabJeu[oldSelection[0]][oldSelection[1]] = 0;
        }
        afficherTableau();
        ready = true;
        moves++;
        updateCounter();

        if (moves >= maxMoves) {
          endGame();
        }

        nbAffiche = 0;
        oldSelection = [ligne, colonne];
      }, 500);
    } else {
      oldSelection = [ligne, colonne];
    }
  }
}

function updateCounter() {
  counterElement.innerHTML = moves;
}

function endGame() {
  // Bloquer le jeu, afficher une popup, etc.
  alert("Jeu terminé ! Vous avez atteint le nombre maximal de tours.");
  // Vous pouvez ajouter d'autres actions en fonction de vos besoins.
}
let tabResult = genereTableauAleatoire();
let oldSelection = [];
let nbAffiche = 0;
let ready = true;
var moves = 0; // Initialisation avec une valeur par défaut
const maxMoves = 20; // Nombre maximal de tours avant de bloquer le jeu

afficherTableau();
