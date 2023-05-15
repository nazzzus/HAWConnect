import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const CreateBook = () => {

  const userId = useGetUserId();
  
  const [cookies, _] = useCookies(["access_token"]);
  const [book, setBook] = useState({
    buchtitel: '',
    buchautor: '',
    ausleihdatum: '',
    rueckgabedatum: '',
    status: '',
    userOwner: userId,
  });
   
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setBook({
      ...book, [name]:value});
    };

    console.log(book);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {               
        await axios.post('http://localhost:3001/book/add',
        {
          ...book
        },
        {
          headers: {  authorization: cookies.access_token},
        });
        alert('Buch hinzugefügt!');
        navigate("/bibliothek");
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className='create-book'>
      <h2>
        Buch einfügen
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='buchtitel'>
            Buchtitel
          </label>
          <input 
          type='text' 
          id='buchtitel' 
          name='buchtitel' 
          value={book.buchtitel}
          onChange={handleChange}
          />
          <label htmlFor='buchautor'>
            Buchautor
          </label>
          <input 
          type='text' 
          id='buchautor' 
          name='buchautor' 
          value={book.buchautor}
          onChange={handleChange}/>

          <label htmlFor='ausleihdatum'>
            Ausleihdatum
          </label>
          <input 
          type='date' 
          id='ausleihdatum' 
          name='ausleihdatum' 
          value={book.ausleihdatum}
          onChange={handleChange}/>
          <label htmlFor='rueckgabedatum'>
            Rückgabedatum
          </label>
          <input 
          type='date' 
          id='rueckgabedatum' 
          name='rueckgabedatum' 
          value={book.rueckgabedatum}
          onChange={handleChange}/>
          <label htmlFor='status'>
            Status
          </label>
          <input 
          type='text' 
          id='status' 
          name='status' 
          value={book.status}
          onChange={handleChange}/>

          <button type='submit'>
            Buch hinzufügen
          </button>
        </form>
      </div>
  )
}

export default CreateBook