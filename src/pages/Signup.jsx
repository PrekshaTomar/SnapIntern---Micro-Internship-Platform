import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/register/", {
      name, email, password
    })
    .then(res => alert("Signup successful!"))
    .catch(err => alert("Error during signup"));
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-2" />
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2" />
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2" />
        <button type="submit" className="w-full bg-green-600 text-white p-2">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
