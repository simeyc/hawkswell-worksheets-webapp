import get from 'lodash.get';
import { ValidateFunction } from 'ajv';
import { WorksheetValue, FieldSchema } from 'types';

export const parseErrors = (validate: ValidateFunction) => {
    const errors: Record<string, string> = {};
    if (validate.errors) {
        validate.errors.forEach(({ keyword, params, schemaPath }) => {
            if (keyword === 'required') {
                errors[params.missingProperty] = 'Please enter/choose a value';
            } else {
                const pathParts = schemaPath.split('/').slice(1, -1);
                const key = pathParts[pathParts.length - 1];
                const error = get(
                    validate.schema,
                    pathParts.join('.') + '.error'
                );
                errors[key] = error || 'Invalid entry';
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
