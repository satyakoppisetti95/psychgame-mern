import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {  useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {Navbar, Nav, Container} from 'react-bootstrap'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Psych</Navbar.Brand>
          <Nav className="me-auto">
          {user ? (
            <>
            <Nav.Link >{user.name}</Nav.Link>
            <Nav.Link onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </Nav.Link>
            </>
          )
            :
            (
              <>
                <Nav.Link href="/login"><FaSignInAlt />Login</Nav.Link>
                <Nav.Link href="/register"><FaUser /> Register</Nav.Link>
              </>
            )
          }
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header