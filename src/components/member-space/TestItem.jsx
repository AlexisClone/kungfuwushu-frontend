import React from 'react';
import { Link } from 'react-router-dom';
import './TestItem.css';
import moment from 'moment';

const TestItem = ({ test, testResult }) => {
    const isResult = !!testResult;

    return (
        <Link to={`/mytests/${test.id}`}>
            <div className={`TestItem ${isResult ? 'is-result' : ''}`}>
                <h3 className="name">{test.name}</h3>
                <div className="details">
                  <span className="type">{test.type}</span>
                  <span className="jour">{moment(test.date).format('MMMM Do YYYY') } </span>
                   <span className="address">{test.address}</span>
                </div>
           </div>
        </Link>
    );
}

export default TestItem;