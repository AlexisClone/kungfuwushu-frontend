import React, { useState, useEffect } from 'react';

import { Modal, Checkbox, Button, Select } from 'antd';
import { SearchInput } from '../custom';

import * as api from '../../api';

import './MemberPicker.css';

const Option = Select.Option;

const MemberPickerContainer = ({onPicked}) => {
    const [ isVisible, setVisibility] = useState(false);
    const toggle = () => setVisibility(!isVisible);
    const handlePicked = (MembersScales) => {
        toggle();
        onPicked(MembersScales);
    }
    return (
        <React.Fragment>
            <Button type="primary" onClick={toggle}>Ajouter des exercices</Button>
            <MemberPicker
                visible={isVisible}
                onClose={toggle}
                onPicked={handlePicked}
            />
        </React.Fragment>
    );
}

const MemberPicker = ({ visible, onClose, onPicked }) => {
    const [ count, setCount ] = useState(0);
    const [ checkedMembers, setCheckedMembers ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ filteredMembers, setFilteredMembers ] = useState([]);
    const [ filter, setFilter ] = useState({
        search: undefined,
        type: undefined,
    });
    
    useEffect(() => {
        api.Members.all()
            .then(members => {
                setMembers(members);
                setFilteredMembers(members);
            });
    }, []);

    useEffect(() => {
        setFilteredMembers(Members.filter(Member => {
            if (filter.search && !Member.name.toLowerCase().includes(filter.search.toLowerCase()))
                return false;
            if (filter.type && filter.type !== Member.type)
                return false;
            return true;
        }));
    }, [filter]);

    const handlePicked = () => {
        const MembersScales = checkedMembers.map((Member, index) => {
            var MemberScale = {
                Member,
                type: Member.type,
                id: count - index - 1
            }

            return MemberScale;
        });
        onPicked(MembersScales);
        setCheckedMembers([]);
        setCount(count + MembersScales.length);
    }

    const handleChecked = (Member) => (checked) => {
        setCheckedMembers(checked ?
            checkedMembers.concat([Member]) :
            checkedMembers.filter(exo => exo !== Member)
        );
    }

    const renderSelectedMembersInfo = () => {
        const count = checkedMembers.length;
        if (count === 0)
            return "Aucune sélection"
        return `${count} exercice${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    }

    const handleFilterChange = (filterName) => (value) => {
        const data = {...filter};
        data[filterName] = value;
        setFilter(data);
    }


    return (
        <Modal
            visible={visible}
            onOk={handlePicked}
            onCancel={onClose}
            title="Sélection d'exercices"
            footer={[
                <Button key="back" onClick={onClose} className="back">Retour</Button>,
                <span className="selected-info" key="info">
                    {renderSelectedMembersInfo()}
                </span>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handlePicked}
                    disabled={checkedMembers.length < 1}
                >
                    Ajouter
                </Button>,
            ]}
            className="MemberPicker"
        >
            <div className="filters">
                <Select
                    defaultValue="Type d'exercice"
                    className="select"
                    onChange={handleFilterChange('type')}
                >
                    {MemberTypes.map((type, index) =>
                        <Option value={type.value} key={index}>{type.name}</Option>
                    )}
                </Select>
                <SearchInput
                    onSearch={handleFilterChange('search')}
                    placeholder="Rechercher par nom"
                />
            </div>
            <div className="Members">
                {filteredMembers.map((Member, index) =>
                    <Member
                        Member={Member}
                        checked={checkedMembers.includes(Member)}
                        onChecked={handleChecked(Member)}
                        key={index}
                    /> 
                )}
            </div>
        </Modal>
    )
}

const Member = ({ Member, checked, onChecked }) => {
    const handleChecked = () => onChecked(!checked);

    return(
        <div className="Member" onClick={handleChecked}>
            <Checkbox
                checked={checked}
                onChange={handleChecked}
                className="checkbox"
            />
            <span className="title">{Member.name}</span>
        </div>
    )
}

export default MemberPickerContainer;
