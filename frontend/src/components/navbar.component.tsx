import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import GamesPage from '../gamepage';
import Login from '../login.component';
import { useState } from 'react';
import "../styles.css";
import NavLink from './navlink.component';
import Registration from '../registration.component';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Container fluid>
            <nav className='navbar-container'>
                <ul>
                    {isLoggedIn && (
                        <NavLink to="/games">Games</NavLink>
                    )}
                    {!isLoggedIn && (
                        <div className="auth-links">
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/registration">Registration</NavLink>
                        </div>
                    )}
                </ul>
            </nav>
            <Routes>
                {isLoggedIn && (
                    <Route path="/games" element={<GamesPage />} />
                )}
                {!isLoggedIn && (
                    <>
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/registration" element={<Registration />} />
                    </>
                )}
            </Routes>
        </Container>
    );
}

export default Navbar;