import { Button, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import * as NotesApi from "../network/notes_api"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccess: () => void
}

const NavBarLoggedInView = ({ user, onLogoutSuccess }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout()
            onLogoutSuccess()
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: <a href="#login">{user.username}</a>
            </Navbar.Text>
            <Button variant="outline-light" onClick={logout}>Logout</Button>
        </>
    )
}

export default NavBarLoggedInView