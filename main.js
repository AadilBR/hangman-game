const { randomInt } = require('crypto')
const fs = require('fs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')




let dico = fs.readFileSync('./dict.txt', 'utf-8').split('\n')
//console.log(dico)
let reponse = dico[randomInt(0, dico.length)]//retourner un mot au hasard du tableau
//console.log(reponse)
let secretWord = Array(reponse.length).fill('_')
let nbtry = 10
let inputHistory = []
console.log(reponse)
//console.log(secretWord)

while (nbtry > 0) {

  let letterInput = readlineSync.question('\nDevinez le mot caché : ' + secretWord.join(' ') + ' ?  ').toUpperCase()
  if (letterInput.length !== 1) {
    console.log(`\n   Vous ne pouvez proposer qu'une lettre à la fois\n`)
  }
  if (inputHistory.includes(letterInput)) {
    console.log(`\n   Vous avez déjà tapé cette lettre !\n`)
  }
  inputHistory.push(letterInput)
  console.log(`\nLettres déjà tapés :\n${inputHistory.join(' ')}`)

  if (reponse.includes(letterInput)) {
    console.log(chalk.cyan(`\n   yeah !!!\n`))
    for (let i = 0; i < reponse.length; i++) {
      if (reponse[i] === letterInput) {
        secretWord[i] = letterInput
      }
    }

  } else if (nbtry === 1) {
    console.log(chalk.red(`\n   Attention ! C'est ta dernière chance.\n`))
    nbtry--

  } else {
    console.log(chalk.red(`\n   Il te reste ${nbtry} tentatives.\n`))
    nbtry--
  }

  if (!nbtry) {
    console.log(chalk.magentaBright(`\n   Vous avez perdu !\n`))
    process.exit(0)
  }

  if (!secretWord.includes('_')) {
    console.log(chalk.green(`\n   Bravo ! >>> ||  ${reponse}  ||\n`))
    process.exit(0)

  }

}

