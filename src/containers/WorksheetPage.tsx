import { FC, useState, useMemo } from 'react';
import { Form, Header, Icon } from 'semantic-ui-react';
import { WorksheetSchema, WorksheetData } from 'types';
import { FieldControl } from 'components/FieldControl';
import Ajv from 'ajv';
import { getSchemaWorksheetType } from 'utils/schemas';
import { parseErrors, formatValue } from 'utils/worksheets';
import { useNavBlock } from 'hooks/useNavBlock';
import { ShareButton } from 'components/ShareButton';

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
            // set Timestamp here for validity; updated by ShareButton
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
                    // prevent error affecting dropdown menu formatting
                    <Form.Field key={key} error={!sch.enum && !!errors[key]}>
                        <label>{key + ':'}</label>
                        {!!errors[key] && (
                            <>
                                <Icon name="warning sign" color="red" />
                                <span style={{ fontStyle: 'italic' }}>
                                    {errors[key]}
                                </span>
                            </>
                        )}
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
            <ShareButton
                data={formattedData}
                valid={valid}
                onShared={() => setBlockNav(false)}
            />
        </Form>
    );
};
