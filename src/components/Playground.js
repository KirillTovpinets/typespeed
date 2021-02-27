import DisplayText from "./DisplayText"
import TypeSpeedResult from "./TypeSpeedResult";

export default function Playground({ stop, result, mistakes, language, isCheeter, startTimer }) {
	return (
		<div>
			<DisplayText stop={stop} 
			isCheeter={isCheeter}
			startTimer={startTimer}
			language={language}/>
			{ result !== 0 && 
				<TypeSpeedResult result={result} mistakes={mistakes}/>
			}
		</div>
	)
}