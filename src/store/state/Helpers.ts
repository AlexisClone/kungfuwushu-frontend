import { Record } from 'immutable';

export const Model = <T>(data: T): Record.Factory<T> => {
    return Record(data);
};