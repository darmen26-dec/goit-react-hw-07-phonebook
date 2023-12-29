import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteAsyncContact } from '../../redux/operations';
import { getContacts, getFilter } from '../../redux/selectors';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterStatus = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterStatus.status.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContactById = contactId => {
    try {
      dispatch(deleteAsyncContact(contactId));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  return (
    <div className={css.contacts}>
      <ul className={css.contactsList}>
        {filteredContacts.map(contact => (
          <li className={css.contactsItem} key={contact.id}>
            <p className={css.contactsName}>{contact.name}</p>
            <p className={css.contactsNumber}>{contact.phone}</p>
            <button
              className={css.contactsBtn}
              onClick={() => deleteContactById(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
