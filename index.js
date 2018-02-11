const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]
  

app.get('/info', (req, res) => {
    const now = new Date();
    var response = '<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot.</p>'
    var response = response+ now.toString()
    res.send(response)
  
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id )
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons=persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id=Math.floor(1000000*Math.random())
    console.log(person)
    if (person.name && person.number) {
        console.log('length: ',persons.filter(p => p.name === person.name).length)
        if (persons.filter(p => p.name === person.name).length === 0) {
            persons=persons.concat(person)
            response.json(person)
        }else{
            response.status(400).json({error: 'name already exists'})
        }
    }else{
        response.status(400).json({error: 'name or number missing'})
    }
  })

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})