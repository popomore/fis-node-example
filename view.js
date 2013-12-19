var path = require('path');
var con = require('consolidate');
var nunjucks = require('nunjucks');

module.exports = function(app) {
  var env = nunjucks.configure([
    path.join(__dirname, 'template/page'),
    path.join(__dirname, 'template/widget')
  ]);
  env.addExtension('WidgetExtension', new Widget());
  env.addExtension('HeadExtension', new Head());
  env.addExtension('FootExtension', new Body());
  env.addExtension('RequireExtension', new Require());
  env.addExtension('ScriptExtension', new Script());
  env.addExtension('StyleExtension', new Style());
  
  app.engine('tpl', con.nunjucks);
  app.set('view engine', 'tpl');
  app.set('views', path.join(__dirname, 'template/page'));
  
  function Head() {
    this.tags = ['head'];

    this.parse = function(parser, nodes, lexer) {
      parser.advanceAfterBlockEnd();
      var head = parser.parseUntilBlocks('endhead');
      parser.advanceAfterBlockEnd();
      return new nodes.CallExtensionAsync(this, 'run', null, [head]);
    };
  
    this.run = function(context, headFunc, callback) {
      headFunc(function(err, value) {
        console.log(err);
        env.renderString(value, context, callback);
      });
    };
  }

  function Body() {
    this.tags = ['body'];

    this.parse = function(parser, nodes, lexer) {
      parser.advanceAfterBlockEnd();
      var body = parser.parseUntilBlocks('endbody');
      parser.advanceAfterBlockEnd();
      return new nodes.CallExtensionAsync(this, 'run', null, [body]);
    };
  
    this.run = function(context, bodyFunc, callback) {
      bodyFunc(function(err, value) {
        console.log(err);
        env.renderString(value, context, callback);
      });
    };
  }

  function Script() {
    this.tags = ['script'];

    this.parse = function(parser, nodes, lexer) {
      parser.advanceAfterBlockEnd();
      var script = parser.parseUntilBlocks('endscript');
      parser.advanceAfterBlockEnd();
      return new nodes.CallExtensionAsync(this, 'run', null, [script]);
    };
  
    this.run = function(context, scriptFunc, callback) {
      scriptFunc(function(err, value) {
        console.log(err);
        callback(null, '<script>' + value + '</script>');
      });
    };
  }

  function Style() {
    this.tags = ['style'];

    this.parse = function(parser, nodes, lexer) {
      parser.advanceAfterBlockEnd();
      var style = parser.parseUntilBlocks('endstyle');
      parser.advanceAfterBlockEnd();
      return new nodes.CallExtensionAsync(this, 'run', null, [style]);
    };
  
    this.run = function(context, styleFunc, callback) {
      styleFunc(function(err, value) {
        console.log(err);
        callback(null, '<style>' + value + '</style>');
      });
    };
  }

  function Require() {
    this.tags = ['require'];

    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtensionAsync(this, 'run', args, null);
    };
  
    this.run = function(context, path, callback) {
      console.log(path);
      if (/\.js$/.test(path)) {
        path = '<script src="' + path + '"></script>';
      } else if (/\.css$/.test(path)) {
        path = '<link href="' + path + '" rel="stylesheet" type="text/css" />';
      }
      callback(null, path);
    };
  }

  function Widget() {
    this.tags = ['widget'];
  
    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtensionAsync(this, 'run', args, null);
    };
  
    this.run = function(context, path, param) {
      var callback, ctx = context.ctx;
      if (arguments.length === 4) {
        callback = arguments[3];
        merge(param, ctx);
      } else {
        callback = param;
      }
      env.render(path + '/index.' + app.get('view engine'), ctx, callback);
    };
  }
};

function merge(src, dest) {
  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      dest[k] = src[k];
    }
  }
}
