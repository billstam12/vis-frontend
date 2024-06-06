export interface IDataExplorationRequest {
    datasetId: string;
    columns: string[];
    aggFunction: string;
    filters: IFilter[];
    limit: number;
    scaler: string;
}

export interface IFilter {
    column: string;
    type: string;
    value: {
        min: number;
        max: number;
    };
}

export const defaultDataExplorationRequest: IDataExplorationRequest = {
    datasetId: '',
    columns: [],
    aggFunction: '',
    filters: [],
    limit: 1000,
    scaler: ''
};