import get from 'lodash.get';
import { ValidateFunction } from 'ajv';
import { WorksheetValue, FieldSchema, WorksheetData } from 'types';
import { WorksheetSchema } from 'types';
import moment, { Moment } from 'moment';

export const getSchemaWorksheetType = (schema: WorksheetSchema) =>
    schema.properties['Worksheet Type'].const;

export const parseErrors = (validate: ValidateFunction) => {
    const errors: Record<string, string> = {};
    if (validate.errors) {
        validate.errors.forEach(({ keyword, params, schemaPath }) => {
            if (keyword === 'required') {
                errors[params.missingProperty] = 'Field is required';
            } else {
                const pathParts = schemaPath.split('/').slice(1, -1);
                const key = pathParts[pathParts.length - 1];
                if (!errors[key]) {
                    const error = get(
                        validate.schema,
                        pathParts.join('.') + '.error'
                    );
                    errors[key] = error || 'Invalid entry';
                }
            }
        });
    }
    return errors;
};

const INTEGER_REGEX = new RegExp('^\\d+$');
const NUMBER_REGEX = new RegExp('^\\d+(\\.\\d+)?$');
export const formatValue = (value: WorksheetValue, schema: FieldSchema) => {
    let val = value;
    if (typeof val === 'string') {
        val = val.trim();
        if (
            (schema.type === 'integer' && INTEGER_REGEX.test(val)) ||
            (schema.type === 'number' && NUMBER_REGEX.test(val))
        ) {
            val = Number(val);
        }
    }
    return val;
};

export const convertToCsv = (data: WorksheetData) =>
    Object.keys(data)
        .reduce((acc, x) => acc + ',' + x, '')
        .slice(1) +
    '\n' +
    Object.values(data)
        .reduce((acc: string, x) => acc + ',' + x, '')
        .slice(1) +
    '\n';

export const constructFilename = (parts: string[], ext: string) => {
    const sanitizedParts = parts.map((part) =>
        part.replace(/[^a-zA-Z0-9/]/g, '').replace(/\//g, '-')
    );
    return sanitizedParts.join('_') + ext;
};

export const formatDate = (date?: Moment) =>
    (date || moment()).format('DD/MM/YYYY');
