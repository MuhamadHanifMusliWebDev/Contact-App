const yargs = require('yargs');
const contact = require('./contact')

yargs.command({
  command: 'add',
  describe: 'Adding new contact',
  builder: {
    name: {
      describe: 'Your full name',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Enter your email address',
      demandOption: false,
      type: 'string'
    },
    phoneNumber: {
      describe: 'Enter your phone number',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    contact.saveContact(argv.name, argv.email, argv.phoneNumber)
  }
})
yargs.parse()