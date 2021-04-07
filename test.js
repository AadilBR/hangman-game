const fs = require('fs')

let jsonStr = fs.readFileSync('scores.json', 'utf8')

const scores = JSON.parse(jsonStr)


scores.players.push({ name: 'Charlie', score: 7 })

console.log(scores.players)

jsonStr = JSON.stringify(scores, null, 1)

console.log(jsonStr)

fs.writeFileSync('scores.json', jsonStr)