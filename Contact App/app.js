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
}).demandCommand()

yargs.command({
  command: 'list',
  describe: 'Show name and phone number',
  handler() {
    contact.listContact()
  }
})

yargs.command({
  command: 'detail',
  describe: 'Show details of contact name',
  builder: {
    name: {
      describe: 'Your full name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contact.detailContact(argv.name)
  }
})

yargs.command({
  command: 'delete',
  describe: 'Delete contact by name',
  builder: {
    name: {
      describe: 'Your full name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contact.deleteContact(argv.name)
  }
})

yargs.parse()