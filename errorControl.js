const fs = require('fs')


if (!fs.existsSync('./dictionary.txt')) {
  console.log('Error: file does not exist')
  process.exit(1)
}
if (!fs.statSync('./dictionary.txt').isFile()) {
  console.log('Error: it is not a file')
  process.exit(1)
}




