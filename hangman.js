const { randomInt } = require('crypto')
const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { intro } = require('./intro')
const { hangmanPics } = require('./hangmanPics')
const { header } = require('./header')

//Début du jeu
do {

  console.log(chalk.yellow(header))
  console.log(chalk.yellow(intro))

  let playerName = readlineSync.question('Entrer votre nom ?  ')

  let dico = fs.readFileSync('./dictionary.txt', 'utf-8').split('\n')
  //console.log(dico)
  let word = dico[randomInt(0, dico.length)]//retourner un mot au hasard du tableau
  //console.log(reponse)
  let secretWord = Array(word.length).fill('_')
  let nbtry = 9
  let inputHistory = []
  console.log(word)
  //console.log(secretWord)

  let jsonStr = fs.readFileSync('scores.json', 'utf8')
  const scores = JSON.parse(jsonStr)

  //Début d'une partie
  while (nbtry > 0) {
    let letterInput = readlineSync.question('\nDevinez le mot caché : ' + secretWord.join(' ') + ' ?  ').toUpperCase()
    console.clear()
    //verifier si le joueur entre plus d'une lettre
    if (letterInput.length !== 1) {
      console.log(`\n   ${playerName}, vous ne pouvez proposer qu'une lettre à la fois !\n`)
    }
    //verifier si la lettre entrée a déjà été proposée
    if (inputHistory.includes(letterInput)) {
      console.log(`\n  ${playerName}, vous avez déjà tapé cette lettre !\n`)
      continue
    }
    //afficher les lettres déjà proposées et ne faisant pas partie du mot mystère
    inputHistory.push(letterInput)
    console.log(`\nLettres déjà tapés :\n${inputHistory.join(' ')}`)

    //verifier si la lettre proposée fait partie du mot mystère 
    //si oui remplacer les '_' par la lettre (toutes les occurences si plusieurs fois présente)
    if (word.includes(letterInput)) {
      console.log(chalk.cyan(`\n   yeah !!!\n`))
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letterInput) {
          secretWord[i] = letterInput
        }
      }
      //sinon
      //décrémenter le compteur d'essais pour chaque erreur
      //afficher le rendu du pendu en changeant de couleur pour la dernière tentative
    } else {
      //console.log(nbtry)
      nbtry--
      if (nbtry > 1) {
        //console.log(nbtry)
        console.log(chalk.red(`\n   Il vous reste ${nbtry} tentatives.${hangmanPics[8 - nbtry]}\n`))
      } else if (nbtry === 1) {
        console.log(chalk.magenta(`\n   Attention ! C'est votre dernière chance.${hangmanPics[8 - nbtry]}\n`))

      }
    }
    //qd compteur arrive a 0 afficher le pendu 'pendu !' avec le mot qu'il fallait deviner et on break pour sortie de la boucle while
    if (!nbtry) {
      console.log(hangmanPics[8])
      console.log(chalk.magentaBright(`\n   Game Over !\n`))
      console.log(`Le mot était : ${word}\n\n`)
      break
    }
    //si tout les '_' ont été remplacé le mot mystère est dévoilé et on break pour sortir de la boucle while
    if (!secretWord.includes('_')) {
      console.log(chalk.yellow(`\n   CONGLATURATIONS ${playerName} You Win ! >>>  ${word}  \n`))
      break
    }

  }
  //utilier readlineSync.keyInYN() en condition pour reboucler si utilisateur veux rejouer
  //boucle do{...  }while(condition)
} while (readlineSync.keyInYN(`\nVoulez-vous rejouer ? `))

