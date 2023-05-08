import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, onDeleteContact }) => (
  <li className={css.contactListItem}>
    <p className={css.contactListItem__name}>{name}:</p>    
      <p className={css.contactListItem__number}>{number}</p>
      <button className={css.contactListItem__button}
        type="button"
        onClick={() => onDeleteContact(id)}
        aria-label="delete">
      Delete
      </button>
  </li>
);

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};