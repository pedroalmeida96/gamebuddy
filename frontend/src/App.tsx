import { useState } from "react";
import Home from "./HomePage.tsx";
import GamesPage from "./GamesPage.tsx";
import Login from "./Login.tsx"; // Create a Login component
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Route path="/games" element={<GamesPage />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
