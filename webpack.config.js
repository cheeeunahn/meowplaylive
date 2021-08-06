const path = require('path');

// Project's path.
const rootPath = path.resolve(__dirname);

// React source code files' path.
const srcPath = path.join(rootPath, 'src', 'viewer');

// Output files' path.
const outPath = path.join(rootPath, 'public', 'viewer');

module.exports = (env, argv) => {
    const isDebugMode = !argv || argv.mode === 'development';

    return {
        mode: 'development',
        entry: path.join(srcPath, 'Main.tsx'),
        devtool: isDebugMode ? 'inline-source-map' : false,
        target: ['web', 'es3'],
        output: {
            path: outPath,
            filename: 'viewer.min.js'
        },
        resolve: {
            modules: ['node_modules', srcPath],
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: 'ts-loader' }
            ]
        }
    };
};
