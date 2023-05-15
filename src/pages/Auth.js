import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  return (
    <div className='auth'>
      {"  "}
      
       {isLoginFormVisible ? (
          <Login label= 'Login'/>
       )  : (
        <Register label ='Registrieren'/>
       )}
       <button onClick={() => setIsLoginFormVisible(!isLoginFormVisible)}>
        {isLoginFormVisible ? "Du musst dich noch registrieren?" : "Login"}
      </button>
      </div>
  )
}


//LOGIN
const Login = ({label}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');

  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username, 
        password,
        label,
      });
      alert("Login war erfolgreich!");
      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userItem', response.data.userID);
      navigate('/'); 
    }catch (err) {
      console.error(err);
        if (err.response && err.response.data.message === "User doesn't exist!") {
          alert("This username does not exist. Please try again or register first.");
        } else
          if (err.response && err.response.data.message === "Username or password is incorrect!") {
            alert("Your password is incorrect. Please try again or reset your password.");
          } 
        else {
          alert("An error occurred. Please try again later.");
          }
            }
        }
      

  return (
    <div className='auth-container'>  
    <form onSubmit={onSubmit}>
      <h1> {label} </h1>

      <div className='form-group'>
        <label htmlFor='username'> Username: </label>
        <input 
        type='text' 
        id='username'
        value={username} 
        onChange={(event) => setUsername(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='password'> Password: </label>
        <input 
        type='password' 
        id='password'
        value={password} 
        onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <button type="submit"> Jetzt anmelden  </button>
    </form>
  </div>
  );
};


//REGISTER
const Register = ({label}) => {

  const [username, setUsername] = useState('')
  const [vorname, setVorname] = useState('')
  const [nachname, setNachname] = useState('')
  const [geschlecht, setGeschlecht] = useState('')
  const [studiengang, setStudiengang] = useState('')
  const [geburtstag, setGeburtstag] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/auth/register', {
        username, 
        vorname,
        nachname,
        geschlecht,
        studiengang,
        geburtstag,
        password,
        email,
      });
      alert("Registration completed! Now you can login.");
      navigate('/auth'); 
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message === "User already exists!") {
        alert("This username is already taken. Please choose a different one.");
      } else
        if (err.response && err.response.data.message === "Email already exists!") {
        alert("An account with that email already exists. Reset your password, try again or contact us!");
      } 
        else {
        alert("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className='auth-container'>  
    <form onSubmit={onSubmit}>
      <h1> {label} </h1>

      <div className='form-group'>
        <label htmlFor='username'> Username: </label>
        <input 
        type='text' 
        id='username'
        required
        value={username} 
        onChange={(event) => setUsername(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='vorname'> Vorname: </label>
        <input 
        type='text' 
        id='vorname'
        required
        value={vorname} 
        onChange={(event) => setVorname(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='nachname'> Nachname: </label>
        <input 
        type='text' 
        id='nachname'
        required
        value={nachname} 
        onChange={(event) => setNachname(event.target.value)}/>
      </div>


      <div className='form-group'>
        <label htmlFor='geschlecht'> Wähle dein Geschlecht: </label>
        <select id='geschlecht' 
        value={geschlecht} 
        required
        onChange={(event) => setGeschlecht(event.target.value)}>
          <option value='Leer'>Bitte angeben:</option>
          <option value='Männlich'>Männlich</option>
          <option value='Weiblich'>Weiblich</option>
          <option value='Divers'>Divers</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='studiengang'> Wähle dein Geschlecht: </label>
        <select id='studiengang' 
        value={studiengang} 
        required
        onChange={(event) => setStudiengang(event.target.value)}>
          <option value='Leer'>Bitte angeben:</option>
          <option value='Wirtschaftsinformatik'>Wirtschaftsinformatik</option>
          <option value='Angewandte Informatik'>Angewandte Informatik</option>
          <option value='Informatik Technischer Systeme'>Informatik Technischer Systeme</option>
        </select>
      </div>
    

      <div className='form-group'>
        <label htmlFor='geburtstag'> Geburtstag: </label>
        <input 
        type='date' 
        required
        id='geburtstag'
        value={geburtstag} 
        onChange={(event) => setGeburtstag(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='email'> E-Mail: </label>
        <input 
        type='text' 
        id='email'
        required
        value={email} 
        onChange={(event) => setEmail(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='password'> Password: </label>
        <input 
        type='password' 
        id='password'
        required
        value={password} 
        onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <button type="submit"> Jetzt registrieren  </button>
    </form>
  </div>
  );
};



//FORM
/* const Form = ({
  username, 
  setUsername, 
  password, 
  setPassword, 
  email,
  setEmail,
  label, 
  onSubmit,
}) => {
return( 
  <div className='auth-container'>  
    <form onSubmit={onSubmit}>
      <h1> {label} </h1>

      <div className='form-group'>
        <label htmlFor='username'> Username: </label>
        <input 
        type='text' 
        id='username'
        value={username} 
        onChange={(event) => setUsername(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='email'> E-Mail: </label>
        <input 
        type='text' 
        id='email'
        value={email} 
        onChange={(event) => setEmail(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label htmlFor='password'> Password: </label>
        <input 
        type='password' 
        id='password'
        value={password} 
        onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <button type="submit"> {label}  </button>
    </form>
  </div>
)} */

export default Auth