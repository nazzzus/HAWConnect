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
  const [modalOpen, setModalOpen] = useState(false);

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

      alert("Buch gelöscht!");
      const updatedBookList = bookList.filter((book) => book._id !== bookId);
      setBookList(updatedBookList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (bookId) => {
    navigate(`http://localhost:3001/book/${bookId}/bearbeiten`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  return (
    <div className='bibService'>
      <div className='bibServiceTable'>
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
                <td>{book.buchtitel}</td>
                <td>{book.buchautor}</td>
                <td>{formatDate(book.ausleihdatum)}</td>
                <td>{formatDate(book.rueckgabedatum)}</td>
                <td>
                  <button onClick={() => handleDelete(book._id)}>
                    Löschen
                  </button>
                </td>
                <td>
                  <button onClick={() => setModalOpen(true)}>
                    Bearbeiten
                  </button>
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
