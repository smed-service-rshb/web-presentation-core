import {resolve} from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import readPackageTree from 'read-package-tree';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

export const compile = config => new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            throw new Error(err);
        }
        const {errors, warnings} = formatWebpackMessages(stats.toJson({}, true));

        if (!errors.length && !warnings.length) {
            console.log(chalk.green('Compiled successfully.\n'));
            resolve();
            return;
        }
        console.log(chalk.red('Compilation failed.\n'));
        console.log(errors.join('\n\n'), '\n');
        console.log(warnings.join('\n\n'), '\n');

        reject();
    });
});

export const getDependencies = () => new Promise((resolve, reject) => {
    readPackageTree(process.cwd(), (err, data) => {
        // er means that something didn't work.
        // data is a structure like:
        // {
        //   package: <package.json data, or an empty object>
        //   package.name: defaults to `basename(path)`
        //   children: [ <more things like this> ]
        //   parent: <thing that has this in its children property, or null>
        //   path: <path loaded>
        //   realpath: <the real path on disk>
        //   isLink: <set if this is a Link>
        //   target: <if a Link, then this is the actual Node>
        //   error: <if set, the error we got loading/parsing the package.json>
        // }
        if (err) {
            return reject(err);
        }
        return resolve(
            data.children
                .filter(link => link.package.name.includes('@efr/'))
                .map(link => ({[link.package.name]: link.package.version}))
        )
    });
});
export const getWebpackConfig = ({webpackconfig, publicpath = "/efr/"}) => {
    const config = webpackconfig
        ? require(resolve(process.cwd(), webpackconfig))
        : require("../configs/webpack.config.dev.js");

    config.output.publicPath = publicpath;
    config.plugins.push(new webpack.DefinePlugin({
            'process.env.__EFR__PUBLIC_PATH__': JSON.stringify(publicpath.substring(0, publicpath.length - 1))
        }),
    );
    return config
};

export const paths = {
    static: resolve(__dirname, '..', 'static'),
    build: resolve(process.cwd(), 'build', 'static'),
    src: resolve(process.cwd(), 'src'),
};
