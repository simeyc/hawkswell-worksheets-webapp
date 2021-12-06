import { DataValue } from 'types';

export type FieldSchema = {
    type: 'string' | 'number' | 'boolean' | 'integer';
    enum?: string[] | number[];
    default?: DataValue;
    placeholder?: string;
    error?: string;
    const?: string | number | boolean;
    hidden?: boolean;
    subType?: string;
};

export type WorksheetSchema = {
    order: string[];
    properties: {
        [key: string]: FieldSchema;
        Job: FieldSchema & { const: string };
    };
};
