const divResult = document.querySelector("#result");

var tabJeu = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

var tabResult = genereTableauAleatoire();

var oldSelection = [];
var nbAffiche = 0;
var ready = true;

afficherTableau();

function afficherTableau() {
  var txt = "";

  for (var i = 0; i < tabJeu.length; i++) {
    txt += "<div>";
    for (var j = 0; j < tabJeu[i].length; j++) {
      if (tabJeu[i][j] === 0) {
        txt +=
          "<button class='btn btn-primary m-2 small game-card' onClick='verif(\"" +
          i +
          "-" +
          j +
          "\")'></button>";
      } else {
        txt +=
          "<img src='" +
          getImage(tabJeu[i][j]) +
          "'  class='m-2 img-size'>";
      }
    }
    txt += "</div>";
  }

  divResult.innerHTML = txt;
}

function getImage(valeur) {
  var imgTxt = "asset/image/";
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

var moves = 0;

function verif(bouton) {
  if (ready) {
    nbAffiche++;

    var ligne = bouton.substr(0, 1);
    var colonne = bouton.substr(2, 1);

    tabJeu[ligne][colonne] = tabResult[ligne][colonne];
    afficherTableau();

    if (nbAffiche > 1) {
      ready = false;
      setTimeout(() => {
        //verification
        if (
          tabJeu[ligne][colonne] !== tabJeu[oldSelection[0]][oldSelection[1]]
        ) {
          tabJeu[ligne][colonne] = 0;
          tabJeu[oldSelection[0]][oldSelection[1]] = 0;
        }
        afficherTableau();
        ready = true;
        const counter = document.querySelector(".counter");
        moves++;
        counter.innerHTML = moves;
        nbAffiche = 0;
        oldSelection = [ligne, colonne];
      }, 500);
    } else {
      oldSelection = [ligne, colonne];
    }
  }
}

function genereTableauAleatoire() {
  const counter = document.querySelector(".counter");
  var tab = [];
  moves = 0;
  counter.innerHTML = "0";
  var nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < 4; i++) {
    var ligne = [];
    for (var j = 0; j < 4; j++) {
      var fin = false;
      while (!fin) {
        var randomImage = Math.floor(Math.random() * 8);
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
