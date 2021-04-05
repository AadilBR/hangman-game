const { randomInt } = require('crypto')
const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const { intro } = require('./intro')
const { hangmanPics } = require('./hangmanPics')



let dico = fs.readFileSync('./dictionary.txt', 'utf-8').split('\n')
//console.log(dico)
let word = dico[randomInt(0, dico.length)]//retourner un mot au hasard du tableau
//console.log(reponse)
let secretWord = Array(word.length).fill('_')
let nbtry = 9
let inputHistory = []
console.log(word)
//console.log(secretWord)
console.log(intro)

while (nbtry > 0) {

  let letterInput = readlineSync.question('\nDevinez le mot caché : ' + secretWord.join(' ') + ' ?  ').toUpperCase()
  if (letterInput.length !== 1) {
    console.log(`\n   Vous ne pouvez proposer qu'une lettre à la fois\n`)
  }
  if (inputHistory.includes(letterInput)) {
    console.log(`\n   Vous avez déjà tapé cette lettre !\n`)
    continue
  }
  inputHistory.push(letterInput)
  console.log(`\nLettres déjà tapés :\n${inputHistory.join(' ')}`)

  if (word.includes(letterInput)) {
    console.log(chalk.cyan(`\n   yeah !!!\n`))
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letterInput) {
        secretWord[i] = letterInput
      }
    }

  } else {
    nbtry--
    if (nbtry > 1) {
      console.log(chalk.red(`\n   Il te reste ${nbtry} tentatives.${hangmanPics[8 - nbtry]}\n`))
    } else if (nbtry === 1) {
      console.log(chalk.red(`\n   Attention ! C'est ta dernière chance.${hangmanPics[8 - nbtry]}\n`))

    }
  }

  if (!nbtry) {
    console.log(hangmanPics[8])
    console.log(chalk.magentaBright(`\n   Vous avez perdu !\n`))

    process.exit(0)
  }

  if (!secretWord.includes('_')) {
    console.log(chalk.green(`\n   Bravo ! >>> ||  ${word}  ||\n`))
    process.exit(0)

  }

}

