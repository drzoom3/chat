var glob = require('glob'),
path = require('path')

function GenerateLocalesPlugin(dist, sources) {
Object.assign(this, { dist, sources });
}

GenerateLocalesPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    let res = {}
    this.sources.forEach((source)=>{
      const files = glob.sync(source)

      files.forEach(function(element) {
        res = Object.assign(res, require(path.resolve(element)));
      })

      /* glob(source, (er, files) => {
        files.forEach(function(element) {
            res = Object.assign(res, require(path.resolve(element)));
        })
      }) */
    })

    const json = JSON.stringify(res);

    compilation.assets[this.dist] = { // eslint-disable-line no-param-reassign
        source: () => json,
        size: () => json.length,
    };
    callback();
  });
};

module.exports = GenerateLocalesPlugin;
/*
descriptors.forEach(({ id, defaultMessage }) => {
  if (collection.hasOwnProperty(id)) {
    throw new Error(`Duplicate message id: ${id}`);
  }
  collection[id] = defaultMessage;
});*/