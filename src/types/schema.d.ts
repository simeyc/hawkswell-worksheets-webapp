export type FieldSchema = {
    [key: string]: unknown;
    name: string;
    type: 'string' | 'number' | 'boolean';
    enum?: string[] | number[];
};

export type WorksheetSchema = {
    [key: string]: unknown;
    name: string;
    properties: FieldSchema[];
};
