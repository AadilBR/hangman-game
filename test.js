const fs = require('fs')

// verifier la cmd line
if (process.argv.length !== 2) {
  console.log(`usage : node hangman.js`)
  process.exit(1)
}