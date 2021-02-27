import './styles/TypeSpeedResult.scss';

export default function TypeSpeedResult({ result, mistakes }){
	return (
		<div className="type-speed-result-container">
			<span className="type-speed-result-container__meta-item">{result} сим/мин</span>
			<span className="type-speed-result-container__meta-item">Вы допустили { mistakes } ошибок</span>
		</div>
	)
}