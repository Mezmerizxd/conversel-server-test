const fs = require('fs');
const exec = require('child_process');
const path = require('path');

module.exports = {
    async initialize() {
        // Clone the repository
        await exec.execSync(`rm -rf conversel-web`);
        await exec.execSync(
            `git clone https://mezmerizxd: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@github.com/conversel/conversel-web`
        );
        await exec.execSync(`cd conversel-web && git checkout build`);
    },
};
