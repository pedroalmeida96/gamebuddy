import { useState } from "react";
import axios from "axios";

type SetIsLoggedInType = (value: boolean) => void;

interface LoginProps {
  setIsLoggedIn: SetIsLoggedInType;
}

function Login({ setIsLoggedIn }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const requestData = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/login", requestData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data);
          setIsLoggedIn(true);
        } else {
          console.error("Login failed.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
