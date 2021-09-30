import { DataValue } from 'types';

export type FieldSchema = {
    [key: string]: unknown;
    type: 'string' | 'number' | 'boolean';
    enum?: string[] | number[];
    default?: DataValue;
};

export type WorksheetSchema = {
    [key: string]: unknown;
    name: string;
    properties: Record<string, FieldSchema>;
};
