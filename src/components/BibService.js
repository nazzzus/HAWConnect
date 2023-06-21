import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../styles/Createbook.css';
import { useGetUserId } from "../hooks/useGetUserId";
import Swal from 'sweetalert2';

function BibService() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [editBookId, setEditBookId] = useState("");
  const [editBook, setEditBook] = useState({
    buchtitel: "",
    buchautor: "",
    ausleihdatum: "",
    rueckgabedatum: "",
    status: "",
    userOwner: userId,
  });

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
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Das Buch wurde hinzugefügt!'
      }).then(() => {
      navigate("/bibliothek");
      window.location.reload();
})
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

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3001/book/${bookId}`, {
        headers: { authorization: cookies.access_token },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Das Buch wurde gelöscht!',
        showConfirmButton: false,
        timer: 1500
      })        
      const updatedBookList = bookList.filter((book) => book._id !== bookId);
      setBookList(updatedBookList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (bookId) => {
    
    const bookToEdit = bookList.find((book) => book._id === bookId);
    if (bookToEdit) {
      setEditBookId(bookId);
      setEditBook({
        buchtitel: bookToEdit.buchtitel,
        buchautor: bookToEdit.buchautor,
        ausleihdatum: bookToEdit.ausleihdatum,
        rueckgabedatum: bookToEdit.rueckgabedatum,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/book/${editBookId}`, editBook);

      if (response.status === 200) {
        console.log('Buch-Eintrag erfolgreich aktualisiert');
        setEditBookId(null);
        setEditBook({
          buchtitel: "",
          buchautor: "",
          ausleihdatum: "",
          rueckgabedatum: "",
        });
        navigate("/bibliothek");
        window.location.reload();
      } else {
        console.log('Fehler beim Aktualisieren des Buch-Eintrags');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  return (
    <div className='bibService'>
      <div className="bibService-top">
        <h1>Bücher-Service</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='buchtitel'>Buchtitel</label>
          <input
            type='text'
            id='buchtitel'
            name='buchtitel'
            value={book.buchtitel}
            onChange={handleChange}
            required
          />
          <label htmlFor='buchautor'>Buchautor</label>
          <input
            type='text'
            id='buchautor'
            name='buchautor'
            value={book.buchautor}
            onChange={handleChange}
          />

          <label htmlFor='ausleihdatum'>Ausleihdatum</label>
          <input
            type='date'
            id='ausleihdatum'
            name='ausleihdatum'
            value={book.ausleihdatum}
            onChange={handleChange}
            required
          />
          <label htmlFor='rueckgabedatum'>Rückgabedatum</label>
          <input
            type='date'
            id='rueckgabedatum'
            name='rueckgabedatum'
            value={book.rueckgabedatum}
            onChange={handleChange}
            required
          />

          <button type='submit'>Buch hinzufügen</button>
        </form>
      </div>
      <div className='bibServiceTable'>
        <table className='book-table'>
          <thead>
            <tr>
              <th>Buchtitel</th>
              <th>Autor</th>
              <th>Ausgeliehen am</th>
              <th>Rückgabe am</th>
              <th>Zum Löschen</th>
              <th>Zum Bearbeiten</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book._id}>
                <td>
                  {editBookId===book._id ? (
                    <input 
                    type = 'text' 
                    name = 'buchtitel'
                    value = {editBook.buchtitel}
                    onChange={(event) => setEditBook({...editBook, buchtitel: event.target.value })}
                    />
                  ) : (
                    book.buchtitel
                  )}
                  </td>
                  <td>
                  {editBookId===book._id ? (
                    <input 
                    type = 'text' 
                    name = 'buchautor'
                    value = {editBook.buchautor}
                    onChange={(event) => setEditBook({...editBook, buchautor: event.target.value })}
                    />
                  ) : (
                    book.buchautor
                  )}
                  </td>
                  <td>
                  {editBookId===book._id ? (
                    <input 
                    type = 'date' 
                    name = 'ausleihdatum'
                    value = {editBook.ausleihdatum}
                    onChange={(event) => setEditBook({...editBook, ausleihdatum: event.target.value })}
                    />
                  ) : (
                    formatDate(book.ausleihdatum)
                  )}
                  </td>
                  <td>
                  {editBookId===book._id ? (
                    <input 
                    type = 'date' 
                    name = 'rueckgabedatum'
                    value = {editBook.rueckgabedatum}
                    onChange={(event) => setEditBook({...editBook, rueckgabedatum: event.target.value })}
                    />
                  ) : (
                    formatDate(book.rueckgabedatum)
                  )}
                  </td>
                <td>
                  <button onClick={() => handleDelete(book._id)}>
                    Löschen
                  </button>
                </td>
                <td>
                  {editBookId === book._id ? (
                    <button onClick={handleUpdate}>Speichern</button>
                  ) : (
                    <button onClick={() => handleEdit(book._id)}>
                      Bearbeiten
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BibService;
