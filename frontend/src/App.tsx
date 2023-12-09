import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header.component.tsx";
import Navbar from "./components/navbar.component.tsx";

function App() {


  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
      </div>
    </Router>
  );
}

export default App;