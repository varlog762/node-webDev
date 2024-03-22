const Contact = require('../models/contacts');
const createPath = require('../helpers/create-path');

const getContacts = (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then(contacts => res.render(createPath('contacts'), { contacts, title }))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
};

module.exports = {
  getContacts,
};
