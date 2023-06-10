import { useGetUserId } from "../hooks/useGetUserId";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../styles/Admin.css';


function Admin() {
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("de-DE");
  const [editNewsId, setEditNewsId] = useState(null);
  const [editNews, setEditNews] = useState({
    titel: "",
    autor: "",
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setNews({
      ...news,
      [name]: value,
    });
  };
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/news/add",
      {
        ...news
      });

      console.log(userId)
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
        title: 'Der News-Eintrag wurde hinzugefügt!'
      }).then(() => {
      
  })
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };
  

  const [news, setNews] = useState({
    titel: "",
    autor: "",
    datum: currentDate,
    userOwner: userId,
  });
  

  const handleDelete = async (newsId) => {
    Swal.fire({
      title: 'Bist du dir sicher?',
      text: "Das kannst du nicht rückgängig machen!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Abbrechen',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, löschen!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Gelöscht!',
          'Der News-Eintrag wurde gelöscht!',
          'success'
        );
        try {
          const response = await axios.delete(`http://localhost:3001/news/${newsId}`);
  
          if (response.status === 200) {
            // Erfolgreich gelöscht, kannst hier z.B. eine Aktualisierung der News-Liste durchführen
            console.log('News-Eintrag erfolgreich gelöscht');
          } else {
            console.log('Fehler beim Löschen des News-Eintrags');
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  
  

  const handleEdit = (newsId) => {
    // Setze den zu bearbeitenden News-Eintrag
    const news = newsList.find((item) => item._id === newsId);
    if (news) {
      setEditNewsId(newsId);
      setEditNews({
        titel: news.titel,
        autor: news.autor,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/news/${editNewsId}`, editNews);

      if (response.status === 200) {
        // Erfolgreich aktualisiert, kannst hier z.B. eine Aktualisierung der News-Liste durchführen
        console.log('News-Eintrag erfolgreich aktualisiert');
        // Zurücksetzen des Bearbeitungsmodus
        setEditNewsId(null);
        setEditNews({
          titel: "",
          autor: "",
        });
      } else {
        console.log('Fehler beim Aktualisieren des News-Eintrags');
      }
    } catch (error) {
      console.error(error);
    }
  };


  




  //News ranholen
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news/show')
        setNewsList(response.data);
      }catch(err){
        console.error(err);
      }
    }

    fetchNews();
  }, []);

  


  return (
    <div className='main-admin'>
      <div className='main-admin-banner'>
        <h1>
          Admin-Panel
        </h1>
      </div>
      <div className='main-admin-body'>
        <div className="main-admin-body-news">
        <div className='main-admin-body-news-add'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='newstitel'>Newstitel</label>
            <input
              type='text'
              id='titel'
              name='titel'
              value={news.titel}
              onChange={handleChange}
              required
              />
              <input
              type='text'
              id='autor'
              name='autor'
              value={news.autor}
              onChange={handleChange}
              required
              />
            <button type='submit'>News hinzufügen</button>
          </form>
        </div>
        <div className='main-admin-body-news-show'>
        <table className="admin-news-table">
          <thead>
            <tr>
              <th>
                Newstitel
              </th>
              <th>
                Author
              </th>
              <th>
                Veröffentlicht am
              </th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news._id}>
                <td>
                  {editNewsId === news._id ? (
                    <input
                      type='text'
                      name='titel'
                      value={editNews.titel}
                      onChange={(event) => setEditNews({ ...editNews, titel: event.target.value })}
                    />
                  ) : (
                    news.titel
                  )}
                </td>
                <td>
                  {editNewsId === news._id ? (
                    <input
                      type='text'
                      name='autor'
                      value={editNews.autor}
                      onChange={(event) => setEditNews({ ...editNews, autor: event.target.value })}
                    />
                  ) : (
                    news.autor
                  )}
                </td>
                <td>{formatDate(news.erstelltAm)}</td>
                <td>
                  <button onClick={() => handleDelete(news._id)}>
                    News löschen
                  </button>

                  </td>
                <td>
                  {editNewsId === news._id ? (
                    <button onClick={handleUpdate}>Speichern</button>
                  ) : (
                    <button onClick={() => handleEdit(news._id)}>News bearbeiten</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
      </div>
  )
}

export default Admin


