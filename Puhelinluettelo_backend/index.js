const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Puhelinluettelon data
let persons = [
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: "1"
    },
    { 
        name: "Sari Saari", 
        number: "324454425",
        id: "2"
    },
    { 
        name: "Mikko Kuustonen", 
        number: "12-43-234232333",
        id: "3"
    },
    { 
        name: "Juho Asuintupa", 
        number: "39-3345434",
        id: "4"
    }
]
// Sovelluksen reitit
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})
// Generoi id:n uudelle henkilölle
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}
// Lisää uusi henkilö puhelinluetteloon
app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)
  console.log(body.name)

if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})