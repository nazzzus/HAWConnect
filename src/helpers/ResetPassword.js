import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Die Passwörter stimmen nicht überein');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/reset-password', { email, password });
      setMessage(response.data.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('Fehler beim Zurücksetzen des Passworts');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Passwort zurücksetzen</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="email">E-Mail:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Neues Passwort:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Passwort bestätigen:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Passwort zurücksetzen</button>
      </form>
    </div>
  );
};

export default ResetPassword;
