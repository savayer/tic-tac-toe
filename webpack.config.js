const path = require('path');
const config = {
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true,
        contentBase: path.join(__dirname, 'src')
    },
    resolve: {
        alias: {
            __js: path.resolve(__dirname, './src/js/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: require.resolve("babel-loader"),
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}

module.exports = config;