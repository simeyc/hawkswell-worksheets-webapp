import React, { FC, useState, useMemo } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import {
    WorksheetSchema,
    WorksheetData,
    WorksheetValue,
    FieldSchema,
} from 'types';
import { FieldControl } from 'components/FieldControl';
import Ajv, { ValidateFunction } from 'ajv';
import get from 'lodash.get';

const ajv = new Ajv({ strict: false, allErrors: true });

const parseErrors = (validate: ValidateFunction) => {
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

const formatValue = (value: WorksheetValue, schema: FieldSchema) => {
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

export const WorksheetPage: FC<{ schema: WorksheetSchema }> = ({ schema }) => {
    const initialData = useMemo(() => {
        const initData: WorksheetData = {};
        Object.entries(schema.properties).forEach(([key, sch]) => {
            const initialVal =
                sch.default !== undefined ? sch.default : sch.const;
            if (initialVal !== undefined) {
                initData[key] = initialVal;
            }
            const username = localStorage.getItem('username');
            if (username) {
                initData['Driver'] = username;
            }
            // TODO: set Timestamp, here and/or on Share
            initData['Timestamp'] = Date.now();
        });
        return initData;
    }, [schema.properties]);
    const [data, setData] = useState(initialData);
    const [formattedData, setFormattedData] = useState(initialData);
    const validate = useMemo(() => ajv.compile(schema), [schema]);
    const [valid, errors] = useMemo(() => {
        return [validate(formattedData), parseErrors(validate)];
    }, [formattedData, validate]);
    const jobType = schema.properties['Job Type'].const;
    return (
        <Form>
            <Header>{`New ${jobType} Worksheet`}</Header>
            {Object.entries(schema.properties).map(([key, sch]) =>
                sch.hidden ? null : (
                    <Form.Field key={key}>
                        <label>{key + ':'}</label>
                        <FieldControl
                            schema={sch}
                            value={data[key]}
                            setValue={(value) => {
                                setData({ ...data, [key]: value });
                                setFormattedData({
                                    ...formattedData,
                                    [key]: formatValue(value, sch),
                                });
                            }}
                            error={errors[key]}
                        />
                    </Form.Field>
                )
            )}
            {/* TODO: show cancel button with Are You Sure? confirm */}
            <Button
                content={valid ? 'Share' : 'Worksheet incomplete'}
                color={valid ? 'green' : undefined}
                onClick={async () => {
                    const username = formattedData['Driver'] as string;
                    localStorage.setItem('username', username);
                    // TODO: if !navigator.canShare(), change to download and prompt share instructions
                    const file = new File(
                        [JSON.stringify(formattedData)], // TODO: cast to CSV
                        'my-worksheet.csv', // TODO: worksheet filename
                        { type: 'text/plain' }
                    );
                    await navigator
                        .share({
                            files: [file],
                            title: 'TODO: worksheet title',
                        })
                        .then(() => {
                            console.log('SHARED SUCCESSFULLY!');
                        })
                        .catch((err) => {
                            console.warn('FAILED TO SHARE:', err);
                        });
                }}
                disabled={!valid}
            />
        </Form>
    );
};
