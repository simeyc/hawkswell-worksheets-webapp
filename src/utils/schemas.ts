import { WorksheetSchema } from 'types';

export const getSchemaWorksheetType = (schema: WorksheetSchema) =>
    schema.properties['Job Type'].const;
