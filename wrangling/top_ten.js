const fs = require('fs');

let data = String(fs.readFileSync('../data/clean.csv')).split('\n');

data = data.map(row => {
  return row.trim().split(',')
})

data.splice(0, 1)


const years = new Set();
const countries = new Set();

data.forEach(row => {
  countries.add(row[0]);
  years.add(row[1])
})

const continentdata = String(fs.readFileSync('../data/continents.txt')).split('\n');
const continents = {}
const set = new Set()

continentdata.forEach(row => {
  [country, continent] = row.trim().split(',')
  continents[country] = continent
  set.add(continent)
})

data.forEach(row => {
  row.push(continents[row[0]])
})

data.unshift(['country', 'year', 'type', 'value', 'continent'])

let ranks = [['country', 'actual', 'continent', 'year', 'type', 'value', 'rank', 'direction', 'sex']]

for (c of ['Africa', 'Asia', 'Europe', 'South America', 'North America', 'Oceania', 'All']) {
  for (y of years) {
    for (t of ['both_suicide', 'male_suicide', 'female_suicide']) {
      let filtered = data.filter(row => {
        return row[1] == y && (row[4] == c || c == 'All') && row[2] == t
      })

      filtered.sort((a, b) => b[3] - a[3])
      for (let i = 0; i < 10; i++) {
        let sex = filtered[i][2];
        if (sex == 'both_suicide') sex = 'All';
        if (sex == 'male_suicide') sex = 'Male';
        if (sex == 'female_suicide') sex = 'Female';
        ranks.push([filtered[i][0], filtered[i][4], c, y, t, filtered[i][3], i + 1, 'highest', sex])
      }

      filtered.sort((a, b) => a[3] - b[3])
      for (let i = 0; i < 10; i++) {
        let sex = filtered[i][2];
        if (sex == 'both_suicide') sex = 'All';
        if (sex == 'male_suicide') sex = 'Male';
        if (sex == 'female_suicide') sex = 'Female';
        ranks.push([filtered[i][0], filtered[i][4], c, y, t, filtered[i][3], i + 1, 'lowest', sex])
      }
    }
  }
}


console.log(ranks.slice(0, 10));
ranks = ranks.map(row => row.join(',')).join('\n')

fs.writeFileSync('../data/top_ten.csv', ranks)