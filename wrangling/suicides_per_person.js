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

const continentdata = String(fs.readFileSync('../data/continents.txt')).split('\n');
const continents = {}
const set = new Set()

continentdata.forEach(row => {
  [country, continent] = row.trim().split(',')
  continents[country] = continent
  set.add(continent)
})

let newdata = [['year', 'type', 'value', 'continent']]

// let totalcountries = {}

// for (c of countries) {
//   for (y of years) {
//     if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
//     totalcountries[y].both.push(json[c][y].both_suicide)
//     totalcountries[y].male.push(json[c][y].male_suicide)
//     totalcountries[y].female.push(json[c][y].female_suicide)
// }}

// for (y of years) {
//   const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
//   const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
//   const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
//   newdata.push([y, 'both', both, 'all'])
//   newdata.push([y, 'male', male, 'all'])
//   newdata.push([y, 'female', female, 'all'])
// }

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'Africa') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'Africa'])
  newdata.push([y, 'male', male, 'Africa'])
  newdata.push([y, 'female', female, 'Africa'])
}

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'Europe') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'Europe'])
  newdata.push([y, 'male', male, 'Europe'])
  newdata.push([y, 'female', female, 'Europe'])
}

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'Oceania') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'Oceania'])
  newdata.push([y, 'male', male, 'Oceania'])
  newdata.push([y, 'female', female, 'Oceania'])
}

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'Asia') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'Asia'])
  newdata.push([y, 'male', male, 'Asia'])
  newdata.push([y, 'female', female, 'Asia'])
}

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'North America') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'North America'])
  newdata.push([y, 'male', male, 'North America'])
  newdata.push([y, 'female', female, 'North America'])
}

totalcountries = {}

for (c of countries) {
  for (y of years) {
    if (continents[c] != 'South America') continue;
    if (!totalcountries[y]) totalcountries[y] = {both: [], male: [], female: []}
    totalcountries[y].both.push(json[c][y].both_suicide)
    totalcountries[y].male.push(json[c][y].male_suicide)
    totalcountries[y].female.push(json[c][y].female_suicide)
}}

for (y of years) {
  const both = totalcountries[y].both.reduce((c, a) => c + a, 0) / totalcountries[y].both.length;
  const male = totalcountries[y].male.reduce((c, a) => c + a, 0) / totalcountries[y].male.length;
  const female = totalcountries[y].female.reduce((c, a) => c + a, 0) / totalcountries[y].female.length;
  newdata.push([y, 'both', both, 'South America'])
  newdata.push([y, 'male', male, 'South America'])
  newdata.push([y, 'female', female, 'South America'])
}


newdata = newdata.map(row => row.join(',')).join('\n')

fs.writeFileSync('../data/suicides_per_continent.csv', newdata)