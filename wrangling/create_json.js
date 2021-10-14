const fs = require('fs');

let data = String(fs.readFileSync('../data/who.csv')).split('\n');

data = data.map(row => {
  return row.trim().split(',')
})

data.splice(0, 1)

// Remove quotes
data = data.map(row => {
  return row.map(element => {
    return element.slice(1, element.length - 1)
  })
})

const years = new Set();
const countries = new Set();

data.forEach(row => {
  countries.add(row[0]);
  years.add(row[1])
})

const json = {}

for (c of countries) {
  json[c] = {};
  for (y of years) {
    json[c][y] = {};
  }
}

let max = 0
let max_row = null

let boths = []

data.forEach((row, i) => {
  json[row[0]][row[1]].both_natural = cleanNumber(row[2])
  json[row[0]][row[1]].male_natural = cleanNumber(row[3])
  json[row[0]][row[1]].female_natural = cleanNumber(row[4])

  json[row[0]][row[1]].both_suicide = cleanNumber(row[5])
  json[row[0]][row[1]].male_suicide = cleanNumber(row[6])
  json[row[0]][row[1]].female_suicide = cleanNumber(row[7])

  boths.push(cleanNumber(row[6]))
})

function cleanNumber(number) {
  return +number.split(' ')[0]
}

let write = [['country', 'year', 'type', 'value']]
for (c of countries) {
  for (y of years) {
    write.push([c, y, 'both_suicide', json[c][y].both_suicide, ])
    write.push([c, y, 'male_suicide',  json[c][y].male_suicide])
    write.push([c, y,  'female_suicide', json[c][y].female_suicide])
}}

write = write.map(row => {
  return row.join(',')
})

write = write.join('\n')

fs.writeFileSync('../data/clean.csv', write)