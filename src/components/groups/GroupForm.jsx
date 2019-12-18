import React from 'react';
import { withRouter } from 'react-router';

import './GroupForm.css';
import { Input, Button } from 'antd';

import { ImagePicker, Card } from '../custom';

import MemberPicker from './MemberPicker';
import GroupScales from './GroupScales';

const { TextArea } = Input;

const GroupForm = ({ title, group, onChange, onSave, history }) => {
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedGroup = {...group};
        modifiedGroup[inputName] = value;
        onChange(modifiedGroup);
    };

    const handleImageChange = (image) => onChange({
        ...group,
        image
    });

    const { name, description, image, membersScales } = group;
    return (
        <div className="GroupForm">
            <Card className="card">
                <h1>{title}</h1>
                <h2 className="infos-title">Informations</h2>
                <Input
                    className="name"
                    placeholder="Nom de groupe"
                    onChange={handleInputChange('name')}
                    value={name}
                />
                {group.type === 'RANK' &&
                    <React.Fragment>
                        <h2>Télécharger une image</h2>
                        <ImagePicker
                            imageUrl={image}
                            onChange={handleImageChange}
                        />
                    </React.Fragment>
                }
                <div className="exercises-title">
                    <h2>Member</h2>
                    <MembersPicker onPicked={handleMembersPicked} />
                </div>
                {membersScales.length === 0?
                    "Aucun membre sélectionné." :
                    <MembersScales
                        membersScales={membersScales}
                        onChange={handleMembersScalesChange}
                    />
                }
                <div className="actions">
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
                </div>
            </Card>
        </div>
    );
}

export default withRouter(GroupForm);
