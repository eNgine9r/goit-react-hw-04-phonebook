import { useState } from 'react';
import { nanoid } from 'nanoid'
import useLocalStorage from '../hooks/useLocalStorage';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';


export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const duplicationCheck = newName => {
  return contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase());
};

  const addContact = ({ name, number }) => {
    if (!duplicationCheck(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(prevContacts => [contact, ...prevContacts]);
      return;
    }

    alert(`"${name}" is already in contacts.`);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    )};

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

    return (
      <div className={css.counteiner}>
        <h1 className={css.counteiner__title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2 className={css.counteiner__title}>Contacts</h2>
        <Filter
          value={filter}
          onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact} />
      </div>
    );
  };