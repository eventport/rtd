/*jshint -W020, -W079 */
var Npm, Deps, Package, Random, Session, Template, Handlebars, Accounts, Assets, Meteor, process, __meteor_bootstrap__, share, check;

(function () {
  "use strict";

  var emptyFunction = function () {
  };

  var colFun = function (collectionName) {
    Meteor.instantiationCounts[collectionName] = Meteor.instantiationCounts[collectionName] ? Meteor.instantiationCounts[collectionName] + 1 : 1;
  };

  Meteor = {
    instantiationCounts: {},
    startupFunctions: [],
    publishFunctions: {},
    subscribeFunctions: {},
    methodMap: {},
    startup: function (newStartupFunction) {
      this.startupFunctions.push(newStartupFunction);
    },
    Collection: colFun,
    SmartCollection: colFun,
    publish: function (modelName, publishFunction) {
      this.publishFunctions[modelName] = publishFunction;
    },
    subscribe: function (modelName, subscribeFunction) {
      this.subscribeFunctions[modelName] = subscribeFunction;
      return {
        ready: function () {
          return true;
        }
      };
    },
    settings: {
      public: {}
    },
    methods: function (map) {
      for (var name in map) {
        //noinspection JSUnfilteredForInLoop
        this.methodMap[name] = map[name];
      }
    },
    runStartupMethods: function () {
      for (var i = 0; i < this.startupFunctions.length; i += 1) {
        this.startupFunctions[i]();
      }
    },
    status: function () {
      return {
        connected: true,
        status: 'connected',
        retryCount: 0
      };
    },
    setTimeout: emptyFunction
  };

  Meteor.Error = function (httpCode, message) {
  };

  Meteor.Collection.prototype = {
    insert: emptyFunction,
    find: function () {
      return {
        forEach: emptyFunction,
        map: function () {
          return [];
        },
        fetch: function () {
          return [];
        },
        count: function () {
          return 0;
        },
        rewind: emptyFunction,
        observe: emptyFunction,
        observeChanges: emptyFunction
      };
    },
    findOne: emptyFunction,
    update: emptyFunction,
    remove: emptyFunction,
    allow: emptyFunction,
    deny: emptyFunction,
    _ensureIndex: emptyFunction,

    // collection hooks
    before: {
      insert: emptyFunction,
      update: emptyFunction,
      remove: emptyFunction
    },
    after: {
      insert: emptyFunction,
      update: emptyFunction,
      remove: emptyFunction
    }
  };

  Meteor.Collection.ObjectID = function () {
    return {
      _str: ''
    };
  };

  // instantiate the users collection, which is just a collection but always created in the Meteor object
  Meteor.users = new Meteor.Collection('users');

  Meteor.autorun = function (func) {
    func();
  };

  Meteor.autosubscribe = function (func) {
    func();
  };

  Meteor.call = emptyFunction;

  Meteor.loggingIn = emptyFunction;

  Meteor.setInterval = emptyFunction;

  Meteor.user = function () {
    return {
      emails: []
    };
  };

  Meteor.userId = function () {
    return null;
  };

  Meteor.loginWithGoogle = emptyFunction;
  Meteor.logout = emptyFunction;

  Meteor.require = emptyFunction;

  var TemplateClass = function () {
  };
  TemplateClass.prototype = {
    stub: function (templateName) {
      TemplateClass.prototype[templateName] = {
        eventMap: {},
        events: function (eventMap) {
          for (var event in eventMap) {
            //noinspection JSUnfilteredForInLoop
            TemplateClass.prototype[templateName].eventMap[event] = eventMap[event];
          }
        },
        helpers: function (helperMap) {
          for (var helper in helperMap) {
            //noinspection JSUnfilteredForInLoop
            TemplateClass.prototype[templateName][helper] = helperMap[helper];
          }
        },
        fireEvent: function (key) {
          if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            TemplateClass.prototype[templateName].eventMap[key].apply(null, args);
          } else {
            TemplateClass.prototype[templateName].eventMap[key]();
          }
        },
        // Allows you to set an attribute in the event 'this' context
        addContextAttribute: function (key, value) {
          TemplateClass.prototype[templateName].eventMap[key] = value;
        }
      };
    }
  };

  Template = new TemplateClass();

  Session = {
    store: {},
    get: function (key) {
      return this.store[key];
    },
    set: function (key, value) {
      this.store[key] = value;
    },
    equals: function (key, value) {
      return this.store[key] === value;
    },
    setDefault: function (key, value) {
      if (typeof this.get(key) === 'undefined') {
        this.set(key, value);
      }
    }
  };

  Random = {
    fraction: emptyFunction
  };

  Package = {
    describe: function (description) {
    }
  };

  Npm = {
    depends: function (on) {
    },
    require: function () {
    }
  };

  Deps = {
    /**
     * This will all functions that were registered with autorun.
     * This is only for testing and not part of the Meteor API.
     */
    $autorunFunctions: [],
    $rerun: function () {
      this.$autorunFunctions.forEach(function (autorunFunction) {
        autorunFunction();
      });
    },
    autorun: function (func) {
      var computation = {
        stop: emptyFunction,
        invalidate: emptyFunction,
        onInvalidate: emptyFunction,
        stopped: false,
        invalidated: false,
        firstRun: true
      };
      var autorunFunction = function () {
        func(computation);
      };
      this.$autorunFunctions.push(autorunFunction);
      autorunFunction();
      computation.firstRun = false;
      return computation;
    },
    afterFlush: emptyFunction
  };

  var HandlebarsClass = function () {
  };

  Accounts = {
    emailTemplates: {
      enrollAccount: emptyFunction
    },
    config: emptyFunction,
    urls: {},
    registerLoginHandler: emptyFunction,
    onCreateUser: emptyFunction,
    loginServiceConfiguration: new Meteor.Collection('loginserviceconfiguration'),
    validateNewUser: emptyFunction,
    createUser: emptyFunction,
    changePassword: emptyFunction,
    forgotPassword: emptyFunction,
    resetPassword: emptyFunction,
    setPassword: emptyFunction,
    verifyEmail: emptyFunction,
    sendResetPasswordEmail: emptyFunction,
    sendEnrollmentEmail: emptyFunction,
    sendVerificationEmail: emptyFunction,
  };

  Assets = {
    getText: emptyFunction,
    getBinary: emptyFunction
  };

  HandlebarsClass.prototype = {
    helpers: {},
    registerHelper: function (name, method) {
      this.helpers[name] = method;
    }
  };
  Handlebars = new HandlebarsClass();

  __meteor_bootstrap__ = {
    deployConfig: {
      packages: {
        'mongo-livedata': {
          url: ''
        }
      }
    }
  };

  process = {
    env: {}
  };

  share = {};

  // Not optimal
  check = emptyFunction;

})();
