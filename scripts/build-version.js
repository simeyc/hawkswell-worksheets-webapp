const process = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(process.exec);
const writeFile = util.promisify(fs.writeFile);

const OUTPUT_PATH = path.resolve(__dirname, '../src/version.js');

var readTag = () =>
    exec('git tag').then(({ stdout, stderr }) => {
        if (stderr) {
            throw new Error(stderr);
        }
        return stdout.trim();
    });

// TODO append hash where current commit mismatches tag
const buildVersion = () => {
    readTag()
        .then((tag) =>
            writeFile(OUTPUT_PATH, `export default "${tag}";`).then(() =>
                console.log(`Generated version.js. Version: ${tag}.`)
            )
        )
        .catch((err) => {
            console.error('ERROR:', err);
        });
};

buildVersion();
