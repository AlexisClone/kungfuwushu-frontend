import { get, post, put, del } from './requests.config';
import { Rank, Test, ExerciseResult, Program } from '../types';

export const Auth = {
	login: (usernameOrEmail: string, password: string) => post(`/auth/signin`, { usernameOrEmail, password }),
};

export const Members = {
	byId: (id: number) => get(`/members/${id}`),
	byAccountId: (id: number) => get(`/accounts/${id}/members`),
	byGroupId: (id: number) => get(`/groups/${id}/members`),
	byTestId: (id: number) => get(`/tests/${id}/members`),
};

export const Groups = {
	all: () => get(`/groups`),
	byId: (id: number) => get(`/groups/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/groups`),
	delete: (id: number) => del(`/groups/${id}`)
};

export const Exercises = {
	all: () => get(`/exercises`),
	delete: (id: number) => del(`/exercises/${id}`)

};

export const Programs = {
	all: () => get(`/programs`),
	byId: (id: number) => get(`/programs/${id}`),
	create: (program: Program) => post(`/programs`, program),
	update: (program: Program) => put(`/programs`, program),
	delete: (id: number) => del(`/programs/${id}`),
};

export const Ranks = {
	all: () => get(`/ranks`),
	byId: (id: number) => get(`/ranks/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/ranks`),
	create: (rank: Rank) => post(`/ranks`, rank),
	update: (rank: Rank) => put(`/ranks`, rank),
	delete: (id: number) => del(`/ranks/${id}`),
	reorder: (id: number, start: number, end: number) => put(`/ranks/${id}/reorder?startIndex=${start}&endIndex=${end}`),
};

export const Tests = {
	all: () => get(`/tests`),
	byId: (id: number) => get(`/tests/${id}`),
	create: (test: Test) => post(`/tests`, test),
	update: (test: Test) => put(`/tests`, test),
};

export const TestResults = {
	byId: (id: number) => get(`/tests-results/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/tests-results`),
	byMemberId: (id: number) => get(`/members/${id}/tests-results`),
};

export const ExerciseResults = {
	byId: (id: number) => get(`/exercises-results/${id}`),
	byTestResultIdAndExerciseScaleId: (testResultId: number, exerciseScaleId: number) => get(`/tests-results/${testResultId}/exercises-results?exerciseScaleId=${exerciseScaleId}`),
	byMemberIdAndRankId: (memberId: number, rankId: number) => get(`/members/${memberId}/ranks/${rankId}`),
	create: (testResultId: number, exerciseResult: ExerciseResult) => post(`/tests-results/${testResultId}/exercises-results`, exerciseResult),
	update: (exerciseResult: ExerciseResult) => put(`/exercises-results`, exerciseResult),
};

export const Files = {
	upload: (file: any) => {
		var formData = new FormData();
    	formData.append("file", file);
		return post(`/files`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
};
