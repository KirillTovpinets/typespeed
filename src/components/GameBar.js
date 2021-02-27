import { Button, ButtonGroup } from "reactstrap";
import Timer from "./Timer";
import './styles/GameBar.scss'

export default function GameBar({ stopGame, setTimer, setCheeterMode, startGame }) {
	return (
		<div className="game-bar-container">
			<Timer setTimer={ setTimer } start={ startGame } />
			<ButtonGroup>
				<Button color="success" onClick={ stopGame }> Закончить </Button>
				<Button color="danger" onClick={ setCheeterMode }>Читер</Button>
			</ButtonGroup>
		</div>
	)
}