import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps {
    onSignUp: () => void,
    onLogin: () => void,
}

const NavBarLoggedOutView = ({ onSignUp, onLogin }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button variant="outline-light" onClick={onSignUp}>Sign Up</Button>
            <Button variant="outline-light" onClick={onLogin}>Login</Button>
        </>
    )
}

export default NavBarLoggedOutView