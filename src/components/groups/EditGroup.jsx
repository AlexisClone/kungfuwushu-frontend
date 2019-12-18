import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import GroupForm from './GroupForm';

import { Loading } from '../custom';

const EditGroup = ({ match, history }) => {
	const [ group, setGroup ] = useState(undefined);

    useEffect(() => {
        api.Groups.byId(match.params.id)
            .then(group =>
                setGroup(group)
            );
    }, []);

	const handleSave = () => {
        api.Groups.update(group)
            .then(_ => 
                history.goBack()
            );
    }
    
    if (!group)
        return <Loading />;
	return (
		<GroupForm
			title="Edition du groupe"
			group={group}
			onChange={setGroup}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditGroup);
