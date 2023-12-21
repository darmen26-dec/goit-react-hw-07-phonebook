import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://65849978022766bcb8c76597.mockapi.io/darmen26-dec/contacts'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncContact = createAsyncThunk(
  'contacts/addAsyncContact',
  async contact => {
    const response = await fetch(
      'https://65849978022766bcb8c76597.mockapi.io/darmen26-dec/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteAsyncContact = createAsyncThunk(
  'contacts/deleteAsyncContact',
  async contactId => {
    await fetch(
      `https://65849978022766bcb8c76597.mockapi.io/darmen26-dec/contacts/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    return contactId;
  }
);

const initialContacts = [];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addAsyncContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteAsyncContact.fulfilled, (state, action) => {
        return state.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { reducer: contactReducer } = contactSlice;
