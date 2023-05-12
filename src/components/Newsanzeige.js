import React, { useState, useEffect } from "react";
import axios from "axios";

function Newsanzeige() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:3001/news")
    .then((response) => {
      setNews(response.data);
    })
    .catch((error) => console.error(error));
  }, []);

  return (
    <div className="newsboard-main">
      <h1>newsboard</h1>
      <div className="newsboard-main-items">
      <table className="newsboard-table">
        <thead>
        <tr>
          <th>Titel</th>
          <th>Autor</th>
          <th>Datum</th>
          <th>Veröffentlicht am</th>
        </tr>
        </thead>
        <tbody>
        {news.map((n) => (
          <tr key={n._id}>
            <td>{n.titel}</td>
            <td>{n.autor}</td>
            <td>{n.datum}</td>
            <td>{n.erstelltAm}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Newsanzeige;