import React from 'react';

import './EvaluateExercise.css';

import EvaluatePhysical from './EvaluatePhysical';
import EvaluateFight from './EvaluateFight';
import EvaluateTaolu from './EvaluateTaolu';
import EvaluateTheoretical from './EvaluateTheoretical';

const EvaluateExercise = ({ exerciseResult, onChange }) => {
	if (!exerciseResult)
		return (<div>Exercise not available.</div>);

	const { exercise } = exerciseResult.exerciseScale;

	const renderContent = () => {
		const { type } = exercise;
		switch(type) {
			case 'TAOLU':
				return <EvaluateTaolu exerciseResult={exerciseResult} onChange={onChange} />
			case 'PHYSICAL':
				return <EvaluatePhysical exerciseResult={exerciseResult} onChange={onChange} />
			case 'FIGHT':
				return <EvaluateFight exerciseResult={exerciseResult} onChange={onChange} />
			case 'THEORETICAL':
				return <EvaluateTheoretical exerciseResult={exerciseResult} onChange={onChange} />
			default:
				return type + 'is not a supported type of exercise.';
		}
	}

	return (
		<div className="EvaluateExercise">
			<div className="header">
				<span className="name">{exercise.name}</span>
				<span className="type">{exercise.type}</span>
			</div>
			<div className="body">
				{exercise.description &&
					<p className="description">{exercise.description}</p>
				}
				{exercise.image &&
					<img className="image" src={exercise.image} alt={exercise.name}/>
				}
				{renderContent()}
			</div>
		</div>
	);
}

export default EvaluateExercise;
