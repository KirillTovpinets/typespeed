import { keys, map } from 'lodash';
import { Button, Input } from 'reactstrap';
import './styles/GameSettings.scss';
import data from '../textsToType.json';

export default function GameSettings({ startGame, onSelectLang }){
	return (
		<div className="game-setting">
			<Input type="select" name="select"
			onChange={(event) => onSelectLang(event)}
			className="game-setting__lang-select">
				{map(keys(data), (lang, index) => (
					<option value={lang} key={index}>{lang}</option>
				))}
					</Input>
			<Button color="success" onClick={() => startGame() }> Начать </Button>
		</div>
	)
}