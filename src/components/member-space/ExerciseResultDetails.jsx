import React, { useState, useEffect } from 'react';
import ExerciseDetails from './ExerciseDetails';
import { withRouter } from 'react-router';


import * as api from './fake-api';

import { Loading } from '../custom';

const ExerciseResultDetails = ({ match, history }) => {
    const [ exerciseResult, setExerciseResult ] = useState(undefined);

    useEffect(() => {
		api.ExerciseResults.byId(match.params.id)
			.then(exerciseResult =>
				setExerciseResult(exerciseResult)
			);
    }, []);

    const handleSave = () => {
        api.ExerciseResults.update(exerciseResult)
            .then(_ =>
               history.goBack()
            );
    }

    if (!exerciseResult)
        return <Loading />;
    return (
        <ExerciseDetails
			exerciseScale={exerciseResult.exerciseScale}
            exerciseResult={exerciseResult}
            onChange={setExerciseResult}
			onSave={handleSave}
		/>
    );
}

export default withRouter(ExerciseResultDetails);
