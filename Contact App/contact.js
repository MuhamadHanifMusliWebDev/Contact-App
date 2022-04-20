const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')
// const readline = require('readline')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// const question1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Enter Your Name: `, name => {
//       resolve(name)
//     })
//   })
// }

// const question2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Enter Your Email: `, email => {
//       resolve(email)
//     })
//   })
// }

// const question3 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Enter Your Mobile Phone Number: `, noPhone => {
//       resolve(noPhone)
//     })
//   })
// }

// const question = (question) => {
//   return new Promise((resolve, reject) => {
//     rl.question(question, answer => {
//       resolve(answer)
//     })
//   })
// }

const saveContact = (name, email, phoneNumber) => {
  const contact = {
    name,
    email,
    phoneNumber
  }
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer)

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

module.exports = {
  // question,
  saveContact
}