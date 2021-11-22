import { FC } from 'react';
import { Grid, Button, SemanticCOLORS } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import schemas from 'schemas';
import { getSchemaWorksheetType } from 'utils';
import 'styles/styles.scss';

const COLORS: SemanticCOLORS[] = [
    'orange',
    'purple',
    'grey',
    'teal',
    'yellow',
    'blue',
    'violet',
    'brown',
    'pink',
    'black',
];

export const WorksheetButtonGrid: FC = () => {
    const worksheetTypes = schemas
        .map((sch) => getSchemaWorksheetType(sch))
        .concat([
            'this',
            'that',
            'the other',
            'again',
            'and',
            'again',
            'what',
            'even',
            'is',
            'going',
            'on',
            'my',
            'dear',
            'goodness',
        ]);
    worksheetTypes.sort();
    const typesPerRow: string[][] = [];
    for (let i = 0; i < worksheetTypes.length; i += 2) {
        typesPerRow.push(worksheetTypes.slice(i, i + 2));
    }
    return (
        <Grid columns={2}>
            {typesPerRow.map((rowTypes, i) => (
                <Grid.Row key={i}>
                    {rowTypes.map((worksheetType, j) => (
                        <Grid.Column key={worksheetType}>
                            <Link to={'/' + worksheetType}>
                                <Button
                                    className="worksheet-button"
                                    content={worksheetType}
                                    color={COLORS[(i + j) % COLORS.length]}
                                />
                            </Link>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            ))}
        </Grid>
    );
};
