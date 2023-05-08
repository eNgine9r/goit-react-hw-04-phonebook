import React from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => (
    <label className={css.contactForm_text}>
        Filter<br/>
        <input className={css.contactForm_input} type="text" value={value} onChange={onChange}></input>
    </label>
);

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};