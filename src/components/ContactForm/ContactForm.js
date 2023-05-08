import React, { Component } from "react";
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

  class ContactForm extends Component {

    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    state = {
      name: '',
      number: ''
    };

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleInputChange = e => {
      const { name, value } = e.currentTarget;

      this.setState({
        [name]: value,
      })
    };

    

    handleSubmit = e => {
      e.preventDefault();

      this.props.onSubmit(this.state)
      this.setState({name: '', number: ''})
    };

    reset = () => {
      this.setState({
        name: '',
        number: ''
      });
    }

    render() { 


      return (
        <form className={css.contactForm} onSubmit={this.handleSubmit}>
          <div className={css.contactForm__group}>
            <label htmlFor={this.nameInputId} className={css.contactForm_text}>Name<br/></label>
            <input className={css.contactForm_input}
              type="text"
              id={this.nameInputId}
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              placeholder="Oleh Andriy"
              onChange={this.handleInputChange}
            />
          </div>
          <div className={css.contactForm__number}>
            <label htmlFor={this.numberInputId} className={css.contactForm_text}>Number<br/></label>
            <input className={css.contactForm_input}
              type="tel"
              id={this.numberInputId}
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="+380-00-00-000"
              onChange={this.handleInputChange}
            />
          </div>
          <button className={css.contactForm__button} type="submit">Add contact</button>
        </form>
      );
    }
  }

export default ContactForm;
