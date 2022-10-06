import { Card } from 'react-bootstrap'
function PlayerCard(props) {
    const getInitialsFromName = (name) => {
        const names = name.split(' ')
        let initials = names[0].substring(0, 1).toUpperCase()
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase()
        }
        return initials
    }
    //get random hex color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const player = props.player

    return (
        <Card>
            <Card.Body>
                <div
                    key={player.id}
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            height: '32px',
                            width: '32px',
                            borderRadius: '50%',
                            backgroundColor: getRandomColor(),
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '8px',
                        }}
                    >
                        {getInitialsFromName(player.name)}
                    </div>
                    <div>{player.name}</div>
                </div>
            </Card.Body>
        </Card>

    )
}

export default PlayerCard