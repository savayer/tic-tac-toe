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
            _scripts: path.resolve(__dirname, './src/js/')
        }
    }
}

module.exports = config;