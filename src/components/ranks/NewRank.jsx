import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import { ProgramForm } from '../programs';

import { Loading } from '../custom';

const NewRank = ({ history }) => {
    const [ rank, setRank ] = useState({
        name: undefined,
        description: undefined,
        exercisesScales: [],
		image: undefined,
		type: 'RANK',
    });

	const handleSave = () => {
		const newRank = {
			...rank,
			exercisesScales: rank.exercisesScales.map(exerciseScale => ({
				...exerciseScale
			}))
		};
		api.Ranks.create(newRank)
			.then(_ => 
				history.goBack()
			);
    }
    
    if (!rank)
        return <Loading />;
	return (
		<ProgramForm
			title="Nouveau grade"
			program={rank}
			onChange={setRank}
			onSave={handleSave}
		/>
	);
}

export default withRouter(NewRank);
