
import { Button, Container,Row,Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {reset} from '../features/game/gameSlice'
import { getMe } from '../features/auth/authSlice'
function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        dispatch(getMe())
        return () => {
            
            dispatch(reset())
        }
    }, [user, navigate, dispatch])

    return (
        <Container style={{ marginTop: '32px',textAlign:'center'}}>
            <Row>
                <Col xs={12} md={4} lg={4}></Col>
                <Col xs={12} md={4} lg={4}>
                    <h3>Welcome to pysch</h3>
                    <div className="d-grid gap-2">
                        <Button variant="primary" href="/login"  style={{marginTop:'32px'}}>JOIN GAME</Button>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="info" href="/create" style={{marginTop:'32px'}}>CREATE GAME</Button>
                    </div>
                </Col>
                <Col xs={12} md={4} lg={4}></Col>
            </Row>
            
        </Container>
    );
}

export default Dashboard;