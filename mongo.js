const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://Koejuuseri:SALASANA_POISTETTU@ds231588.mlab.com:31588/heroku_0t4049rf'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv[2]){
    const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
    })

    person
    .save()
    .then(response => {
        console.log('lisätty ' + person.name + ' numerolla ' + person.number + ' luetteloon')
        mongoose.connection.close()
    })
}else{
    console.log('Puhelinluettelo')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
            console.log(person.name, person.number)
            })
            mongoose.connection.close()
  })
}

