import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Filter } from './filter/filter';
import { ContactList } from './contact-list/contactList';
import { ContactForm } from './contact-form/contactForm';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [showContactList, setShowContactList] = useState(false);
  const [filter, setFilter] = useState('');
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const deleteContact = contact => {
    setContacts(prev => {
      console.log(prev);
      const contactsAfterDelete = [
        ...prev.filter(oldContact => oldContact !== contact),
      ];
      localStorage.setItem('Contacts', JSON.stringify(contactsAfterDelete));
      if (contactsAfterDelete.length === 0) {
        setShowContactList(false);
      }
      return contactsAfterDelete;
    });
  };

  const findContact = event => {
    event.preventDefault();
    setFilter(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    let phoneNumber = form.elements.number.value;

    const newContact = {
      name: name,
      phoneNumber: phoneNumber,
    };

    for (const element of contacts) {
      if (element.name === name) {
        alert(`${name} is already in contacts`);
        return;
      }
    }
    setContacts(prev => {
      const allContacts = [...prev, newContact];
      localStorage.setItem('Contacts', JSON.stringify(allContacts));
      setShowContactList(true);
      return allContacts;
    });
    form.reset();
  };

  useEffect(() => {
    try {
      const contactsFromLocalStorage = localStorage.getItem('Contacts');
      if (contactsFromLocalStorage.length === 2) {
        setShowContactList(false);
      } else {
        setContacts(JSON.parse(contactsFromLocalStorage));
        setShowContactList(true);
      }
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }, []);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm handleSubmitFn={handleSubmit} />
      {showContactList && (
        <>
          <Filter filterFn={findContact} />
        </>
      )}
      {showContactList && (
        <>
          <h2>Contacts</h2>
          <ContactList
            allContacts={filteredContacts}
            onDelete={deleteContact}
          />
        </>
      )}
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  showContactList: PropTypes.bool,
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
  findContact: PropTypes.func,
  handleSubmit: PropTypes.func,
  allContacts: PropTypes.array,
  filteredContacts: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
};
