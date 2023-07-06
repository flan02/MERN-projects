import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"
import { Link } from "react-router-dom";

interface NavBarProps {
    loggedIn: User | null,
    onSignUp: () => void,
    onLogin: () => void,
    onLogoutSuccess: () => void,
}

const NavBar = ({ loggedIn, onSignUp, onLogin, onLogoutSuccess }: NavBarProps) => {

    return (
        <Navbar bg="primary" expand="sm" variant="dark" sticky="top" >
            <Container>
                <Navbar.Brand href="#home">Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">Privacy</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedIn
                            ? <NavBarLoggedInView user={loggedIn} onLogoutSuccess={onLogoutSuccess} />
                            : <NavBarLoggedOutView onSignUp={onSignUp} onLogin={onLogin} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar