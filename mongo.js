const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://backend:${password}@cluster0.pijxg.mongodb.net/phonebookApp?
  retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const inputName = process.argv[3]
const inputNumber = process.argv[4]

const person = new Person({
  name: inputName,
  number: inputNumber,
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(result => {
    console.log(`added ${result.name} to phonebook` )
    mongoose.connection.close()
  })
}
