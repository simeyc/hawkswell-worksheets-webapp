import spraying from 'schemas/spraying.json';
import { WorksheetSchema } from 'types';

// TODO: build schema (merge allOf); export single object for Ajv
export default [spraying] as WorksheetSchema[];
