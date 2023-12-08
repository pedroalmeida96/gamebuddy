import { useState } from "react";
import GamesPage from "./gamepage.tsx";
import Login from "./login.component.tsx"; // Create a Login component
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./header.component.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <header>
          <Header />
          <nav>
            <ul>
              {isLoggedIn && (
                <li>
                  <Link to="/games">Games</Link>
                </li>
              )}
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
            {isLoggedIn && (
              <Route path="/games" element={<GamesPage />} />
            )}
            {!isLoggedIn && (
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            )}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;