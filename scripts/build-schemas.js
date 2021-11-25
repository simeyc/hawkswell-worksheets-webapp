const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const $RefParser = require('json-schema-ref-parser');
const mergeAllOf = require('json-schema-merge-allof');

const INPUT_DIR = path.resolve(__dirname, '../src/schemas');
const OUTPUT_DIR = path.resolve(__dirname, '../src/schemas/build');
const SCHEMA_NAMES = ['spraying'];

const buildSchema = (name) =>
    $RefParser
        .dereference(path.resolve(INPUT_DIR, `./${name}.yaml`))
        .then((schema) =>
            mergeAllOf(schema, { ignoreAdditionalProperties: true })
        );

const buildSchemas = async () => {
    rimraf.sync(OUTPUT_DIR);
    fs.mkdirSync(OUTPUT_DIR);
    await Promise.all(
        SCHEMA_NAMES.map((name) =>
            buildSchema(name).then((schema) =>
                writeFile(
                    path.resolve(OUTPUT_DIR, `./${name}.json`),
                    JSON.stringify(schema)
                )
            )
        )
    )
        .then(() => console.log('Generated schemas.'))
        .catch((err) => {
            console.error('ERROR:', err);
        });
};

buildSchemas();
