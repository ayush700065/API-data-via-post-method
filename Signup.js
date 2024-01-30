import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    const newUser = { email, password };

    axios.post("http://localhost:5000/api/products", newUser)
      .then((response) => {
        onSignup(response.data);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Signup;
