import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
  return (
    <div className='auth'>
      {"  "}
      <Login/>
      <Register/>
      </div>
  )
}


//LOGIN
const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username, 
        password,
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
    <Form 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        email={email} 
        setEmail={setEmail}
        label="Login"
        onSubmit = {onSubmit}
        />
  );
};


//REGISTER
const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/auth/register', {
        username, 
        email,
        password,
      });
      alert("Registration completed! Now you can login.");
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
    <Form 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        email={email} 
        setEmail={setEmail}
        label="Register"
        onSubmit ={onSubmit}
        />
  );
};



//FORM
const Form = ({
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
)}

export default Auth