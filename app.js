import React, { useState } from "react";
import Main from "./Main";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);

  const handleSignup = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert("User signed up!");
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main users={users} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
