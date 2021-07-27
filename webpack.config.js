const path = require('path');

// Project's path.
const rootPath = path.resolve(__dirname);

// React source code files' path.
const srcPath = path.join(rootPath, 'src', 'human');

// Output files' path.
const outPath = path.join(rootPath, 'public', 'human', 'app');

module.exports = (env, argv) => {
    const isDebugMode = !argv || argv.mode === 'development';

    return {
        mode: 'development',
        entry: path.join(srcPath, 'Main.jsx'),
        devtool: isDebugMode ? 'inline-source-map' : false,
        target: ['web', 'es3'],
        output: {
            path: outPath,
            filename: 'main.min.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } }
                }
            ]
        }
    };
};
