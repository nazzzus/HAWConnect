import { useState, useEffect } from 'react';
import axios from 'axios';

function Zitat() {
    const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await axios.get('http://localhost:3001/quotes/random');
      setQuote(res.data.quote);
      setAuthor(res.data.author);
    };
    fetchQuote();
  }, []);

  return (
    <div className='zitatBody'> 
    <h1>Dein Zitat des Tages</h1>
    <div className='zitatText'>
      <p>{quote}</p>
      </div>
      <div className='zitatAutor'>
      <p>{author}</p>
    </div>
    </div>
  );
}

export default Zitat;
