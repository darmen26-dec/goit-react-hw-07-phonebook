import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  return (
    <>
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <p>Find contact by name</p>
        <Filter />
        <ContactList />
      </div>
    </>
  );
};

export default App;
