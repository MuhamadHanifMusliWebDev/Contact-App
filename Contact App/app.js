const {question, saveContact} = require('./contact')

const allQuestions = async () => {
  const name = await question('Enter Your Name: ')
  const email = await question('Enter Your Email: ')
  const noPhone = await question('Enter Your Mobile Phone Number: ')
  
  saveContact(name, email, noPhone)
}
allQuestions()

// rl.question('Input Your Name: ', name => {
//   rl.question('Input Your Mobile Phone Number: ', noMobile => {
//     const contact = {name, noMobile}
//     const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
//     const contacts = JSON.parse(fileBuffer)

//     contacts.push(contact)
//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
//     console.log(`Thank You For Filling In The Data ${name}!`)
//     rl.close()
//   })
// })