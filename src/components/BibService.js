import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../styles/Createbook.css';
import { useGetUserId } from "../hooks/useGetUserId";

function BibService() {

  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  const [book, setBook] = useState({
    buchtitel: "",
    buchautor: "",
    ausleihdatum: "",
    rueckgabedatum: "",
    status: "",
    userOwner: userId,
  });

  const [bookList, setBookList] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/book/add",
        { ...book },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Buch hinzugefügt!");
      navigate("/bibliothek");
      window.location.reload();      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/book/user/${book.userOwner}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );
        setBookList(response.data.books);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, [book.userOwner, cookies.access_token]);


  return (
    <div className='bibService'>
      <div className='bibServiceTable'>
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

        <table className="book-table">
          <thead>
            <tr>
              <th>Buchtitel</th>
              <th>Autor</th>
              <th>Ausgeliehen am</th>
              <th>Rückgabe am</th>
              <th>Status</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book._id}>
                <td>{book.buchtitel}</td>
                <td>{book.buchautor}</td>
                <td>{book.ausleihdatum}</td>
                <td>{book.rueckgabedatum}</td>
                <td>{book.status}</td>
                <td><button>Löschen</button>
                <button>Bearbeiten</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BibService;
