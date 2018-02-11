const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const mongoose = require('mongoose')

const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }

app.use(express.static('build'))
app.use(cors())

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

app.use(bodyParser.json())

// let persons = [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Martti Tienari",
//       "number": "040-123456",
//       "id": 2
//     },
//     {
//       "name": "Arto Järvinen",
//       "number": "040-123456",
//       "id": 3
//     },
//     {
//       "name": "Lea Kutvonen",
//       "number": "040-123456",
//       "id": 4
//     }
//   ]

app.get('/info', (req, res) => {
    const now = new Date();
    var response = '<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot.</p>'
    var response = response+ now.toString()
    res.send(response)
  
})

app.get('/api/persons', (request, response) => {
    Person
      .find({})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })
  })

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(formatPerson(person))
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id!' })
        })
})


app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    //person.id=Math.floor(1000000*Math.random())
    if (body.name && body.number) {
        // if (persons.filter(p => p.name === person.name).length === 0) {
        //     persons=persons.concat(person)
        //     response.json(person)
        // }else{
        //     response.status(400).json({error: 'name already exists'})
        // }
        const person = new Person({
            name: body.name,
            number: body.number
          })
        
        person
            .save()
            .then(savedPerson => {
              response.json(formatPerson(savedPerson))
            .catch(error => {
                console.log(error)
            })
        })

    }else{
        response.status(400).json({error: 'name or number missing'})
    }
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})