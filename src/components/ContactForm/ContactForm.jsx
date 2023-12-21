import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAsyncContact } from '../../redux/contactSlice';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { getContacts } from '../../redux/selectors';
import css from '../../components/ContactForm/ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [formData, setFormData] = useState({ name: '', number: '' });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = formData;

    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      Notiflix.Notify.warning(`${name} already exists in contacts.`);
      return;
    }

    const id = nanoid();
    dispatch(addAsyncContact({ id, name, number }));
    setFormData({ name: '', number: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.title} htmlFor="name">
        Name
        <input
          className={css.input}
          id="name"
          type="text"
          name="name"
          autoComplete="off"
          pattern="[A-Za-zÀ-ÖØ-öø-ÿ]+[\s]?[A-Za-zÀ-ÖØ-öø-ÿ]+"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Adrian Smith"
        />
      </label>
      <label className={css.title} htmlFor="number">
        Number
        <input
          className={css.input}
          id="number"
          type="tel"
          name="number"
          autoComplete="off"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleChange}
          placeholder="+48 123-456-789"
        />
      </label>
      <div className={css.separator}>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
