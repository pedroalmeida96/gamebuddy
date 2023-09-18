import Home from "./HomePage.tsx";
import MyGames from "./GamesPage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Welcome to GameBuddy</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/games">Games</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<MyGames />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
