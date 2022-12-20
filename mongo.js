require('dotenv').config()
const mongoose = require('mongoose')

const url = `mongodb+srv://kdonawa:${process.env.MONGO_PW}@cluster0.tla7j67.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

function addEntry({ name, number }) {
  const person = new Person({
    name,
    number,
  })
  return person.save().then(() => console.log(`added ${name} number ${number} to phonebook`))
}
function showAll() {
  return Person.find({}).then((result) => {
    result.forEach((person) => console.log(person))
  })
}

mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length < 3) {
      return showAll()
    }
    if (process.argv.length === 4) {
      return addEntry({ name: process.argv[2], number: process.argv[3] })
    }
    return
  })
  .then(() => mongoose.connection.close())
  .catch((error) => console.log(error))
