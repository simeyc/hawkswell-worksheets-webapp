import React, { FC, useState, useMemo } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { WorksheetSchema, WorksheetData } from 'types';
import { FieldControl } from 'components/FieldControl';
import Ajv from 'ajv';
import { getSchemaWorksheetType } from 'utils/schemas';
import { parseErrors, formatValue } from 'utils/worksheets';
import { useNavBlock } from 'hooks/useNavBlock';

const ajv = new Ajv({ strict: false, allErrors: true });

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
    const worksheetType = getSchemaWorksheetType(schema);
    const [blockNav, setBlockNav] = useState(false);
    useNavBlock(blockNav);
    return (
        <Form>
            <Header>{`New ${worksheetType} Worksheet`}</Header>
            {Object.entries(schema.properties).map(([key, sch]) =>
                sch.hidden ? null : (
                    <Form.Field key={key}>
                        <label>{key + ':'}</label>
                        <FieldControl
                            schema={sch}
                            value={data[key]}
                            setValue={(value) => {
                                !blockNav && setBlockNav(true);
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
                            setBlockNav(false);
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
