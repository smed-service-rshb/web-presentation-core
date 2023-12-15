import {resolve} from 'path';
import fs from 'fs-extra';
import {compile, getDependencies} from "./build-utils";

export default config => {
    fs.emptyDir(config.output.path)
        .then(() => compile(config))
        .then(getDependencies)
        .then(data => fs.writeJson(resolve(config.output.path, 'versions-info.txt'), data, {spaces: 3}))
        .catch(error => console.error(error) || process.exit(1));
};
