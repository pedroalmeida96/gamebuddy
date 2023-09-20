import { useState } from "react";
import Home from "./HomePage.tsx";
import MyGames from "./GamesPage.tsx";
import Login from "./Login.tsx"; // Create a Login component
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>("");

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Welcome to GameBuddy</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/games">Games </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/registration">Registration</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/games"
              element={<MyGames token={token} />} // Pass the token as a prop
            />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
