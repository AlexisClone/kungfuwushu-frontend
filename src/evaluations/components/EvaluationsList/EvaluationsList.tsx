import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';

import moment from 'moment';

import { IEvaluationsListProps } from '../../../actions/evaluations/EvaluationsList.Actions';
import * as EvaluationsListActionCreators from '../../../actions/evaluations/EvaluationsList.Actions';

import './EvaluationsList.css';
import { Select, Button } from 'antd';
const Option = Select.Option;

import { SearchInput } from '../../../custom';

class EvaluationsList extends React.Component<IEvaluationsListProps> {
	public componentWillMount(){
		this.props.onLoad();
	}

	private changeRoute(e: any, route: string) {
		this.props.history.push(route)
		e.stopPropagation();
	}

	private renderEvaluation(evaluation: any){
		const { groups, address, city, postalCode, date } = evaluation;
        return(
			<div className="evaluation" key={evaluation.id} onClick={() => this.props.history.push(`/evaluations/${evaluation.id}/details`)}>
				<div className="evaluation-header">
					<div className="title-type">
						<span className="title">{evaluation.name}</span>
						<span className="type">{evaluation.type}</span>
					</div>
					<span className="date">{moment(date).format('MMMM Do YYYY')}</span>
				</div>
				<div className="body">
					<div className="descriptions">
						<span>{`${address}, ${city} ${postalCode}`}</span>
						{groups.map((group: any) =>
							<span key={group.id}>{group.name}</span>
						)}
					</div>
					<div className="actions">
						<Button onClick={(e: any) => this.changeRoute(e, `/evaluations/${evaluation.id}/results`)} type="primary">Résultats</Button>
						<Button onClick={(e: any) => this.changeRoute(e, `/evaluations/${evaluation.id}/evaluate-group`)} type="primary">Evaluer</Button>
					</div>
				</div>
			</div>
		)
	}

	private filterEvaluations() {
		const { evaluations } = this.props;
		return evaluations
	}

	public render() {
		const filteredEvaluations = this.filterEvaluations();
		const evaluationsTypes = ['Passage de grade', 'Autre']
		return (
			<div className="EvaluationsList">
				<div className="header">
					<div className="top">
						<h2>Evaluations et statistiques</h2>
						<Button onClick={() => this.props.history.push('/new-evaluation')} type="primary">Planifier une nouvelle evaluation</Button>
					</div>
					<div className="filters">
						<Select defaultValue="Type" className="select" onChange={val => this.props.setTypeFilter(val)}>
							{evaluationsTypes.map((type: any) =>
								<Option value={type} key={type}>{type}</Option>
							)}
						</Select>
						<SearchInput
							onSearch={val => this.props.setContainingFilter(val)}
							placeholder="Rechercher par nom, groupe, date ou ville"
						/>
					</div>
				</div>
				<div className="evaluations">
					{filteredEvaluations.map((evaluation: any) =>
						this.renderEvaluation(evaluation)
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
    evaluations: state.evaluationsList.evaluations,
    containingFilter: state.evaluationsList.containingFilter,
    typeFilter: state.evaluationsList.typeFilter,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, EvaluationsListActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(EvaluationsList);