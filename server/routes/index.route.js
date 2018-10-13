const path = require('path')
const config = require('../../config.js')
const fs = require('fs')

const FILENAME = path.join(__dirname, '../../build/index.html')

module.exports = function(req, res) {
    const html = fs.readFileSync(FILENAME).toString()
    const htmlWithConfig = html.replace('$INJECT_CONFIG', `CONFIG=${JSON.stringify(config)}`)
    
    res.end(htmlWithConfig)
};