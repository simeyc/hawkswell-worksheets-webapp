import { FC, useState, useMemo } from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import { WorksheetSchema, WorksheetData } from 'types';
import Ajv from 'ajv';
import { getSchemaWorksheetType, parseErrors, formatValue } from 'utils';
import { useNavBlock } from 'hooks/useNavBlock';
import { ShareButton } from 'components/ShareButton';
import { WorksheetField } from 'components/WorksheetField';
import { useHistory } from 'react-router-dom';
import 'styles/styles.scss';

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
    const history = useHistory();
    const [blockNav, setBlockNav] = useState(false);
    const [forceErrors, setForceErrors] = useState(false);
    useNavBlock(blockNav);
    return (
        <Form>
            <div className="header-div">
                <div className="header-text">{`New ${worksheetType} Worksheet`}</div>
                <Button
                    className="close-button"
                    type="button" // prevent click on form submit
                    color="red"
                    icon="close"
                    size="mini"
                    onClick={() => history.goBack()}
                />
            </div>
            <Divider />
            {Object.entries(schema.properties).map(([key, sch]) => (
                <WorksheetField
                    key={key}
                    title={key}
                    value={data[key]}
                    setValue={(value) => {
                        !blockNav && setBlockNav(true);
                        setData({ ...data, [key]: value });
                        if (value === '') {
                            const newFormattedData = { ...formattedData };
                            delete newFormattedData[key];
                            setFormattedData(newFormattedData);
                        } else {
                            setFormattedData({
                                ...formattedData,
                                [key]: formatValue(value, sch),
                            });
                        }
                    }}
                    schema={sch}
                    error={errors[key]}
                    forceShowError={forceErrors}
                />
            ))}
            <ShareButton
                data={formattedData}
                valid={valid}
                onShared={() => setBlockNav(false)}
                onClickInvalid={() => setForceErrors(true)}
            />
        </Form>
    );
};
