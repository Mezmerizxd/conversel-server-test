const fs = require('fs');
const exec = require('child_process');
const path = require('path');

module.exports = {
    async initialize() {
        // Clone the repository
        await exec.execSync(`rm -rf conversel-web`);
        await exec.execSync(
            `git clone https://username:key@github.com/conversel/conversel-web`
        );
        await exec.execSync(`cd conversel-web && git checkout build`);
    },
};
