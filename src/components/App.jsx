import React, { Component } from 'react';
import { nanoid } from 'nanoid'
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';


export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {

    const isContactExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isContactExists) {
      alert(`"${name}" is already in contacts.`);
      return;
    }
    
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({contacts}) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts } = this.state;

    const normalizeFilter = this.state.filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: [] });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { filter} = this.state;
    
    const visibleContact = this.getVisibleContacts();

    return (
      <div className={css.counteiner}>
        <h1 className={css.counteiner__title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={css.counteiner__title}>Contacts</h2>
        <Filter
          value={filter}
          onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact} />
      </div>
    );
  };
};