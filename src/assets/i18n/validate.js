const fs = require('fs')

let en = JSON.parse(fs.readFileSync('en.json'))
let fr = JSON.parse(fs.readFileSync('fr.json'))

for (const i of en) {
  if (!fr.some((j) => j.key === i.key)) console.log('missing key', i.key)
}
