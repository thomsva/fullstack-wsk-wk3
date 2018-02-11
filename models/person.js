const mongoose = require('mongoose')

const url = 'mongodb://Koejuuseri:SALASANAPOISTETTU@ds231588.mlab.com:31588/heroku_0t4049rf'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person