var path = require('path');

module.exports = Resource;

function Resource(map, options) {
  this.options = options || {};
  this.options.pkg = this.options.pkg || false;
  this.map = map;
  this.stack = {
    js: [],
    css: [],
    script: [],
    style: []
  };
}

Resource.prototype.require = function(file) {
  file = this.resolve(file);

  var o = this.map.res[file];
  if (!o) {
    var err = new Error(file + 'not exist in map.json');
    console.error(err);
    throw err;
  }

  var ext = path.extname(file).substring(1);
  var stack = this.stack[ext];
  if (stack) {
    if (this.options.pkg && o.pkg && this.map.pkg[o.pkg]) {
      file = this.map.pkg[o.pkg].uri;
    } else {
      file = o.uri;
    }
    stack.indexOf(file) === -1 && stack.push(file);
  }

  if (o.deps) {
    o.deps.forEach(function(file) {
      this.require(file);
    }.bind(this));
  }
};

Resource.prototype.inline = function(code, type) {
  var stack = this.stack[type];
  if (stack) {
    stack.indexOf(code) === -1 && stack.push(code);
  }
};

Resource.prototype.getJs = function(file) {
  return [
    this.stack.js.map(function(file) {
      return '<script charset="utf-8" src="' + file + '"></script>'
    }).join('\n'),
    this.stack.script.map(function(code) {
      return '<script>' + code + '</script>'
    }).join('\n'),
  ].join('\n');
};

Resource.prototype.getCss = function(file) {
  return [
    this.stack.css.map(function(file) {
      return '<link charset="utf-8" href="' + file + '" rel="stylesheet" type="text/css" />';
    }).join('\n'),
    this.stack.style.map(function(code) {
      return '<style>' + code + '</style>'
    }).join('\n'),
  ].join('\n');
};


/*
console.log(resolve())
console.log(resolve('lib/css/bootstrap.css'))
console.log(resolve('/lib/js/mod.js'))
console.log(resolve('./nav.js'))
console.log(resolve('./nav.js', 'widget/nav/index.tpl'))
console.log(resolve('../nav.js', 'widget/nav/a/b.tpl'))
*/
Resource.prototype.resolve = function(p, parent) {
  if(!p) return '';

  var p2;
  switch (p.charAt(0)) {
    case '/':
      p2 = p;
      break;
    case '.':
      if (!parent) return '';
      parent = path.dirname(this.resolve(parent));
      p2 = path.resolve('/' + parent, p);
      break;
    default:
      return p;
  }
  return p2.substring(1);
}

//r = new Resource(require(__dirname + '/local/config/map.json'), {pkg: true})
//r.require('lib/css/bootstrap.css');
//r.require('widget/nav/nav.js');
//
//
//console.log(r.getJs())
//console.log(r.getCss())

