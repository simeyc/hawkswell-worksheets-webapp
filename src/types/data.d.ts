export type WorksheetValue = string | number | boolean;

export type FieldValue = WorksheetValue | undefined;

export type WorksheetData = Record<string, WorksheetValue>;
