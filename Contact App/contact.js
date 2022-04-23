const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer)
  return contacts
}

const saveContact = (name, email, phoneNumber) => {
  const contact = {
    name,
    email,
    phoneNumber
  }

  const contacts = loadContact()
  // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  // const contacts = JSON.parse(fileBuffer)

  const duplicates = contacts.find((contacts) => contacts.name === name)
  if (duplicates) {
    console.log(chalk.red.inverse.bold('Contact is registered! Use another name'))
    return false
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('Email is not valid! Enter your correct email!'))
      return false
    }
  }

  if (!validator.isMobilePhone(phoneNumber, 'id-ID')) {
    console.log(chalk.red.inverse.bold('Phone number is not valid! Enter your correct phone number!'))
    return false
  }

  contacts.push(contact)
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
  console.log(chalk.green.inverse.bold(`Thank You For Filling In The Data!`))
  // rl.close()
}

const listContact = () => {
  const contact = loadContact()
  console.log(chalk.cyan.inverse.bold(`Contact List`))
  contact.forEach((contacts, i) => {
    console.log(`${i + 1}. ${contacts.name} - ${contacts.phoneNumber}`)
  })
}

const detailContact = (name) => {
  const contact = loadContact()
  const contacts = contact.find((contacts) => contacts.name.toLowerCase() === name.toLowerCase())

  if (!contacts) {
    console.log(chalk.red.inverse.bold(`${name} is not defined!`))
    return false
  }

  console.log(chalk.cyan.inverse.bold(`${contacts.name} is defined!`))
  console.log(contacts.phoneNumber)

  if (contacts.email) {
    console.log(contacts.email)
  }

}

const deleteContact = (name) => {
  const contact = loadContact()
  const newContact = contact.filter((contacts) => contacts.name.toLowerCase() !== name.toLowerCase())

  if (contact.length === newContact) {
    console.log(chalk.red.inverse.bold(`${name} is not defined!`))
    return false
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact))
  console.log(chalk.green.inverse.bold(`Data contact ${name} successfully deleted!`))
}

module.exports = {
  // question,
  saveContact,
  listContact,
  detailContact,
  deleteContact
}