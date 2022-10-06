
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, createGame,getGame } from '../features/game/gameSlice'
import { useWhatChanged } from '@simbathesailor/use-what-changed';
import PlayerCard from '../components/playerCard'
function CreateGame() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { game, players, isLoading, isError, message } = useSelector(
        (state) => state.game
    )

    useEffect(() => {
        console.log('useEffect called')
        if (!user) {
            navigate('/login')
        }
        if(!game){
            dispatch(createGame())
        }
       
    }, [])
    // useWhatChanged([user, game], 'a, b, c, d');

    const resumeGame = () => { //todo handle to exact pages. for now get game 
        dispatch(getGame(user.game))
    }

    
    if (isLoading) {
        return (
            <Container style={{ marginTop: '32px', textAlign: 'center' }}>
                <Spinner animation="border" role="status">
                </Spinner>
            </Container>
        )
    }

    return (
        <Container style={{ marginTop: '32px', textAlign: 'center' }}>
            <Row>
                <Col xs={12} md={4} lg={4}></Col>
                <Col xs={12} md={4} lg={4}>
                    {game?
                    (
                        <>
                            <h1>{game.code}</h1>
                            <h6>Enter above code to join game</h6>
                            <br />
                            <br />
                            <h3>Waiting for players...</h3>
                            {players.map((player) => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </>
                    ):
                    (
                        <></>
                    )
                    }
                    {
                        isError ?
                            (
                                <>
                                    <h3>{message}</h3>
                                    {user.game ? 
                                    (<div className="d-grid gap-2">
                                        <Button variant="primary" onClick={resumeGame} style={{ marginTop: '32px' }}> Resume Game</Button>
                                    </div>) : <> </>}
                                    <div className="d-grid gap-2">
                                        <Button variant="info" href="/" style={{ marginTop: '32px' }}> Go Back</Button>
                                    </div>
                                </>
                            )
                            :
                            (
                                <></>
                            )
                    }
                </Col>
                <Col xs={12} md={4} lg={4}></Col>
            </Row>

        </Container>
    );
}

export default CreateGame;