(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('muicss/lib/react/container');

var _container2 = _interopRequireDefault(_container);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Overview = require('./pages/Overview');

var _Overview2 = _interopRequireDefault(_Overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'content' },
        _react2.default.createElement(_Menu2.default, null),
        _react2.default.createElement(
          _container2.default,
          { fluid: true },
          this.props.children
        ),
        _react2.default.createElement(
          _container2.default,
          { fluid: true },
          _react2.default.createElement(_Footer2.default, null)
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/Footer.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'footer',
        null,
        'Deploy v1.'
      );
    }
  }]);

  return Footer;
}(_react2.default.Component);

exports.default = Footer;
});

;require.register("components/Menu.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _appbar = require('muicss/lib/react/appbar');

var _appbar2 = _interopRequireDefault(_appbar);

var _WebsocketIndicator = require('./WebsocketIndicator');

var _WebsocketIndicator2 = _interopRequireDefault(_WebsocketIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _appbar2.default,
        null,
        _react2.default.createElement(
          'nav',
          { className: 'mui--text-title' },
          _react2.default.createElement(
            'span',
            { className: 'mui--appbar-line-height' },
            '='
          ),
          _react2.default.createElement(
            'ul',
            { className: 'mui--appbar-line-height mui-list--inline' },
            _react2.default.createElement(
              'li',
              null,
              'Deploy'
            ),
            _react2.default.createElement(
              'li',
              null,
              'Home'
            )
          ),
          _react2.default.createElement(_WebsocketIndicator2.default, null)
        )
      );
    }
  }]);

  return Menu;
}(_react2.default.Component);

exports.default = Menu;
});

;require.register("components/Routes.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

var _Overview = require('components/pages/Overview');

var _Overview2 = _interopRequireDefault(_Overview);

var _EditPipeline = require('components/pages/EditPipeline');

var _EditPipeline2 = _interopRequireDefault(_EditPipeline);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Routes = function (_React$Component) {
  _inherits(Routes, _React$Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Routes).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(
          _reactRouter.Route,
          { path: '/', component: _App2.default },
          _react2.default.createElement(_reactRouter.IndexRoute, { component: _Overview2.default }),
          _react2.default.createElement(_reactRouter.Route, { path: 'pipeline/edit/:name', component: _EditPipeline2.default })
        )
      );
    }
  }]);

  return Routes;
}(_react2.default.Component);

exports.default = Routes;
});

;require.register("components/WebsocketIndicator.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DeployDispatcher = require('../dispatcher/DeployDispatcher');

var _DeployDispatcher2 = _interopRequireDefault(_DeployDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebsocketIndicator = function (_React$Component) {
  _inherits(WebsocketIndicator, _React$Component);

  function WebsocketIndicator(props) {
    _classCallCheck(this, WebsocketIndicator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WebsocketIndicator).call(this, props));

    _this.state = { connected: false };
    return _this;
  }

  _createClass(WebsocketIndicator, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this,
          _arguments = arguments;

      var websocket = new WebSocket("ws://localhost:8025/client");
      websocket.onopen = function (event) {
        _this2.setState({ connected: true });
      };
      websocket.onmessage = function (event) {
        _DeployDispatcher2.default.handleViewAction(JSON.parse(event.data));
      };
      websocket.onerror = function () {
        console.log(_arguments);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'mui--appbar-line-height' },
        this.state.connected ? "Connected" : "Disconnected"
      );
    }
  }]);

  return WebsocketIndicator;
}(_react2.default.Component);

exports.default = WebsocketIndicator;
});

;require.register("components/pages/EditPipeline.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('muicss/lib/react/button');

var _button2 = _interopRequireDefault(_button);

var _form = require('muicss/lib/react/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('muicss/lib/react/input');

var _input2 = _interopRequireDefault(_input);

var _panel = require('muicss/lib/react/panel');

var _panel2 = _interopRequireDefault(_panel);

var _utils = require('flux/utils');

var _PipelineStore = require('../../stores/PipelineStore');

var _PipelineStore2 = _interopRequireDefault(_PipelineStore);

var _Pipelines = require('./Pipelines');

var _Pipelines2 = _interopRequireDefault(_Pipelines);

var _StageForm = require('./StageForm');

var _StageForm2 = _interopRequireDefault(_StageForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditPipeline = function (_React$Component) {
  _inherits(EditPipeline, _React$Component);

  function EditPipeline() {
    _classCallCheck(this, EditPipeline);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EditPipeline).apply(this, arguments));
  }

  _createClass(EditPipeline, [{
    key: 'addStage',
    value: function addStage(e) {
      e.preventDefault();
      this.setState({ stages: this.state.pipeline.stages.concat([{}]) });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _panel2.default,
        null,
        _react2.default.createElement(
          _form2.default,
          null,
          _react2.default.createElement(_input2.default, { required: 'required',
            label: 'Pipeline Name',
            defaultValue: this.state.pipeline.name || this.props.params.name }),
          _react2.default.createElement(
            'div',
            { id: 'stages' },
            this.state.pipeline.stages.map(function (stage, idx) {
              return _react2.default.createElement(_StageForm2.default, { stage: stage, key: idx });
            }.bind(this))
          ),
          _react2.default.createElement(
            _button2.default,
            { color: 'primary', onClick: this.addStage.bind(this) },
            'Add Stage'
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            _button2.default,
            { color: 'primary' },
            'Save Pipeline'
          )
        )
      );
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [_PipelineStore2.default];
    }
  }, {
    key: 'calculateState',
    value: function calculateState(prevState, props) {
      return {
        pipeline: _PipelineStore2.default.getPipeline(props.params.name)
      };
    }
  }]);

  return EditPipeline;
}(_react2.default.Component);

var EditPipelineContainer = _utils.Container.create(EditPipeline, { pure: false, withProps: true });
exports.default = EditPipelineContainer;
});

;require.register("components/pages/Overview.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('muicss/lib/react/button');

var _button2 = _interopRequireDefault(_button);

var _Pipelines = require('./Pipelines');

var _Pipelines2 = _interopRequireDefault(_Pipelines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overview = function (_React$Component) {
  _inherits(Overview, _React$Component);

  function Overview() {
    _classCallCheck(this, Overview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Overview).apply(this, arguments));
  }

  _createClass(Overview, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Pipelines2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'action' },
          _react2.default.createElement(
            _button2.default,
            { variant: 'fab', color: 'primary' },
            '+'
          )
        )
      );
    }
  }]);

  return Overview;
}(_react2.default.Component);

exports.default = Overview;
});

;require.register("components/pages/Pipelines.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactRouter = require('react-router');

var _button = require('muicss/lib/react/button');

var _button2 = _interopRequireDefault(_button);

var _panel = require('muicss/lib/react/panel');

var _panel2 = _interopRequireDefault(_panel);

var _PipelineStore = require('../../stores/PipelineStore');

var _PipelineStore2 = _interopRequireDefault(_PipelineStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pipelines = function (_React$Component) {
  _inherits(Pipelines, _React$Component);

  function Pipelines() {
    _classCallCheck(this, Pipelines);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pipelines).apply(this, arguments));
  }

  _createClass(Pipelines, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.pipelines.map(function (pipeline, idx) {
          return _react2.default.createElement(
            _panel2.default,
            { key: idx },
            _react2.default.createElement(
              'h2',
              null,
              pipeline.name
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: "/pipeline/edit/" + pipeline.name },
              _react2.default.createElement(
                _button2.default,
                { color: 'primary' },
                'Edit Pipeline'
              )
            )
          );
        })
      );
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [_PipelineStore2.default];
    }
  }, {
    key: 'calculateState',
    value: function calculateState(prevState) {
      return {
        pipelines: _PipelineStore2.default.getState()
      };
    }
  }]);

  return Pipelines;
}(_react2.default.Component);

var PipelinesContainer = _utils.Container.create(Pipelines);
exports.default = PipelinesContainer;
});

;require.register("components/pages/StageForm.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('muicss/lib/react/input');

var _input2 = _interopRequireDefault(_input);

var _panel = require('muicss/lib/react/panel');

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StageForm = function (_React$Component) {
  _inherits(StageForm, _React$Component);

  function StageForm() {
    _classCallCheck(this, StageForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StageForm).apply(this, arguments));
  }

  _createClass(StageForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _panel2.default,
        null,
        _react2.default.createElement(_input2.default, { required: 'required',
          label: 'Stage Name',
          defaultValue: this.props.stage.name,
          onChange: this.handleNameChange })
      );
    }
  }]);

  return StageForm;
}(_react2.default.Component);

exports.default = StageForm;
});

;require.register("constants/DeployConstants.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CompleteState = exports.CompleteState = "completeState";
});

;require.register("dispatcher/DeployDispatcher.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flux = require("flux");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeployDispatcher = function (_Dispatcher) {
  _inherits(DeployDispatcher, _Dispatcher);

  function DeployDispatcher() {
    _classCallCheck(this, DeployDispatcher);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DeployDispatcher).apply(this, arguments));
  }

  _createClass(DeployDispatcher, [{
    key: "handleViewAction",
    value: function handleViewAction(action) {
      this.dispatch({
        source: "VIEW_ACTION",
        action: action
      });
    }
  }]);

  return DeployDispatcher;
}(_flux.Dispatcher);

var instance = new DeployDispatcher();
exports.default = instance;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Routes = require('components/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _reactDom.render)(_react2.default.createElement(_Routes2.default, null), document.querySelector('#app'));
});
});

require.register("stores/PipelineStore.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('flux/utils');

var _DeployConstants = require('../constants/DeployConstants');

var _DeployDispatcher = require('../dispatcher/DeployDispatcher');

var _DeployDispatcher2 = _interopRequireDefault(_DeployDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHANGE_EVENT = "change";

var PipelineStore = function (_ReduceStore) {
  _inherits(PipelineStore, _ReduceStore);

  function PipelineStore() {
    _classCallCheck(this, PipelineStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PipelineStore).apply(this, arguments));
  }

  _createClass(PipelineStore, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return [];
    }
  }, {
    key: 'getPipeline',
    value: function getPipeline(name) {
      //TODO if performance requires, make this store a map and lookup here instead
      return this._state.filter(function (pipeline) {
        return pipeline.name === name;
      })[0] || { stages: [] };
    }
  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      switch (action.action.type) {
        case _DeployConstants.CompleteState:
          return action.action.data.pipelines;
        default:
          console.log("Recieved Unhandled Action", action);
          return state;
      }
    }
  }]);

  return PipelineStore;
}(_utils.ReduceStore);

var instance = new PipelineStore(_DeployDispatcher2.default);
exports.default = instance;
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map