const process = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(process.exec);
const writeFile = util.promisify(fs.writeFile);

const OUTPUT_PATH = path.resolve(__dirname, '../src/version.js');

const runCommand = (command) =>
    exec(command).then(({ stdout, stderr }) => {
        if (stderr) {
            throw new Error(stderr);
        }
        return stdout.trim();
    });

const generateFileContent = (version) =>
    '/* GENERATED FILE */\n' +
    `const version = '${version}';\n` +
    'export default version;\n';

const buildVersion = async () => {
    const tag = await runCommand('git tag');
    const tagHash = await runCommand('git rev-parse ' + tag);
    const commitHash = await runCommand('git rev-parse HEAD');
    let version = tag;
    if (tagHash !== commitHash) {
        version += '_' + commitHash.slice(0, 6);
    }
    await writeFile(OUTPUT_PATH, generateFileContent(version))
        .then(() => console.log(`Generated version.js. Version: ${version}.`))
        .catch((err) => console.error('ERROR:', err));
};

buildVersion();