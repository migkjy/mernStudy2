import { useState } from 'react';
import axios from 'axios';
import WelcomePage from './Welcome';
import './App.css';
import { useNavigate, Route, Routes } from 'react-router-dom';

function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


  const handleSumit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/', {
      username: username,
      password: password,
    })
      .then(res => {
        console.log(res)
        navigate('/welcome')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  return (
    <div className="App">
      {/* route를 만들어줘 */}
      <Routes>
        <Route path="/" element={<App {...props} />} />
        <Route path="/welcome" element={<WelcomePage {...props} username={username} />} />
      </Routes>
      <form onSubmit={handleSumit} >
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <br />
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default App;
