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
    properties: {
        [key: string]: FieldSchema;
        'Worksheet Type': FieldSchema & { const: string };
    };
};
