import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const savedContacts = JSON.parse(localStorage.getItem('contacts')) ?? [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: savedContacts,
  reducers: {
    addContact(state, action) {
      const newState = Array.isArray(state) ? state : [];
      return newState.concat(action.payload);
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
