import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"

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
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
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