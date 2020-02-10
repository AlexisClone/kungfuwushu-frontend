import React, { useState, useEffect } from 'react';

import './TestDetails.css';

import ExerciseItem from './ExerciseItem';
import { withRouter } from 'react-router';
import * as api from './fake-api';

import { Loading } from '../custom';

const TestDetails = ({ match }) => {
    const [ test, setTest ] = useState(undefined);
    const [ exercisesResults, setExercisesResults ] = useState([]);

    useEffect(() => {
		const testId = match.params.id;
        Promise.all([
            api.Tests.byId(testId),
            api.ExerciseResults.byTestIdAndPerformerId(testId, 1),
        ]).then(([ test, exercisesResults ]) => {
            setTest(test);
            setExercisesResults(exercisesResults);
        });
    }, []);

    if (!test)
        return <Loading />;
    return (
        <div className="TestDetails">
            <h1>{test.name}</h1>
			<div className="exercises">
                {exercisesResults.map((exerciseResult, index) => 
					<ExerciseItem
						exerciseScale={exerciseResult.exerciseScale}
                        exerciseResult={exerciseResult}
                        testId = {match.params.id}
						key={index}
					/>
				)}
			</div>
        </div>
    );
}

export default withRouter(TestDetails);