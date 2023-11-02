import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Filter } from './filter/filter';
import { ContactList } from './contact-list/contactList';
import { ContactForm } from './contact-form/contactForm';

export class Phonebook extends Component {
  state = {
    contacts: [],
    showContactList: false,
    filter: '',
  };

  deleteContact = contact => {
    this.setState(prevState => {
      const contactsAfterDelete = [
        ...prevState.contacts.filter(oldContact => oldContact !== contact),
      ];
      localStorage.setItem('Contacts', JSON.stringify(contactsAfterDelete));
      if (contactsAfterDelete.length === 0) {
        return {
          contacts: contactsAfterDelete,
          showContactList: false,
        };
      }
      return {
        contacts: contactsAfterDelete,
      };
    });
  };

  findContact = event => {
    event.preventDefault();
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  componentDidMount() {
    try {
      const contactsFromLocalStorage = localStorage.getItem('Contacts');
      if (contactsFromLocalStorage.length === 2) {
        this.setState({ showContactList: false });
      } else {
        this.setState(() => {
          return {
            contacts: JSON.parse(contactsFromLocalStorage),
            showContactList: true,
          };
        });
      }
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    let phoneNumber = form.elements.number.value;

    const newContact = {
      name: name,
      phoneNumber: phoneNumber,
    };

    this.setState(prevState => {
      for (const element of prevState.contacts) {
        if (element.name === name) {
          alert(`${name} is already in contacts`);
          return;
        }
      }

      const allContacts = [...prevState.contacts, newContact];
      localStorage.setItem('Contacts', JSON.stringify(allContacts));
      return {
        contacts: allContacts,
        showContactList: true,
      };
    });
    form.reset();
  };
  render() {
    const { contacts, filter, showContactList } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm handleSubmitFn={this.handleSubmit} />
        {showContactList && (
          <>
            <Filter filterFn={this.findContact} />
          </>
        )}
        {showContactList && (
          <>
            <h2>Contacts</h2>
            <ContactList
              allContacts={filteredContacts}
              onDelete={this.deleteContact}
            />
          </>
        )}
      </>
    );
  }
}

Phonebook.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.array,
    showContactList: PropTypes.bool,
    filter: PropTypes.string,
  }),
  deleteContact: PropTypes.func,
  findContact: PropTypes.func,
  handleSubmit: PropTypes.func,
  allContacts: PropTypes.array,
  filteredContacts: PropTypes.array,
  h1: PropTypes.string,
  h2: PropTypes.string,
};
