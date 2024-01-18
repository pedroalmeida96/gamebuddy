import { Container } from "react-bootstrap";
import "../styles.css"; // Import the CSS file

function Header() {
    return (
        <Container fluid className="header-container">
            <h1 className="header-title">Welcome to GameBuddy</h1>
        </Container>
    );
}

export default Header;
