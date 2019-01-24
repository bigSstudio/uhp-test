(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
    (factory((global.bootstrap = {}),global.jQuery));
  }(this, (function (exports,$) { 'use strict';
  
    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
  
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
  
      return obj;
    }
  
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
  
        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
  
        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }
  
      return target;
    }
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME = 'button';
    var VERSION = '4.2.1';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input:not([type="hidden"])',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters
  
  
      var _proto = Button.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];
  
        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);
  
          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);
  
                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }
  
            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }
  
              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $(input).trigger('change');
            }
  
            input.focus();
            addAriaPressed = false;
          }
        }
  
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }
  
        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static
  
  
      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
  
          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }
  
          if (config === 'toggle') {
            data[config]();
          }
        });
      };
  
      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
  
      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;
  
      if (!$(button).hasClass(ClassName.BUTTON)) {
        button = $(button).closest(Selector.BUTTON);
      }
  
      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector.BUTTON)[0];
      $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
  
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.2.1): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
  
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  
    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }
  
    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
  
          return undefined; // eslint-disable-line no-undefined
        }
      };
    }
  
    function transitionEndEmulator(duration) {
      var _this = this;
  
      var called = false;
      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }
  
    function setTransitionEndSupport() {
      $.fn.emulateTransitionEnd = transitionEndEmulator;
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */
  
  
    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
  
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');
  
        if (!selector || selector === '#') {
          var hrefAttr = element.getAttribute('href');
          selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }
  
        return selector && document.querySelector(selector) ? selector : null;
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element
  
  
        var transitionDuration = $(element).css('transition-duration');
        var transitionDelay = $(element).css('transition-delay');
        var floatTransitionDuration = parseFloat(transitionDuration);
        var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found
  
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        } // If multiple durations are defined, take the first
  
  
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);
  
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      },
      findShadowRoot: function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) {
          return null;
        } // Can find the shadow root otherwise it'll return the document
  
  
        if (typeof element.getRootNode === 'function') {
          var root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
  
        if (element instanceof ShadowRoot) {
          return element;
        } // when we don't find a shadow root
  
  
        if (!element.parentNode) {
          return null;
        }
  
        return Util.findShadowRoot(element.parentNode);
      }
    };
    setTransitionEndSupport();
  
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
  
    var NAME$1 = 'collapse';
    var VERSION$1 = '4.2.1';
    var DATA_KEY$1 = 'bs.collapse';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event$1 = {
      SHOW: "show" + EVENT_KEY$1,
      SHOWN: "shown" + EVENT_KEY$1,
      HIDE: "hide" + EVENT_KEY$1,
      HIDDEN: "hidden" + EVENT_KEY$1,
      CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1
    };
    var ClassName$1 = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector$1 = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));
  
        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });
  
          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;
  
            this._triggerArray.push(elem);
          }
        }
  
        this._parent = this._config.parent ? this._getParent() : null;
  
        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }
  
        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters
  
  
      var _proto = Collapse.prototype;
  
      // Public
      _proto.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName$1.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };
  
      _proto.show = function show() {
        var _this = this;
  
        if (this._isTransitioning || $(this._element).hasClass(ClassName$1.SHOW)) {
          return;
        }
  
        var actives;
        var activesData;
  
        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector$1.ACTIVES)).filter(function (elem) {
            if (typeof _this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === _this._config.parent;
            }
  
            return elem.classList.contains(ClassName$1.COLLAPSE);
          });
  
          if (actives.length === 0) {
            actives = null;
          }
        }
  
        if (actives) {
          activesData = $(actives).not(this._selector).data(DATA_KEY$1);
  
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }
  
        var startEvent = $.Event(Event$1.SHOW);
        $(this._element).trigger(startEvent);
  
        if (startEvent.isDefaultPrevented()) {
          return;
        }
  
        if (actives) {
          Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');
  
          if (!activesData) {
            $(actives).data(DATA_KEY$1, null);
          }
        }
  
        var dimension = this._getDimension();
  
        $(this._element).removeClass(ClassName$1.COLLAPSE).addClass(ClassName$1.COLLAPSING);
        this._element.style[dimension] = 0;
  
        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName$1.COLLAPSED).attr('aria-expanded', true);
        }
  
        this.setTransitioning(true);
  
        var complete = function complete() {
          $(_this._element).removeClass(ClassName$1.COLLAPSING).addClass(ClassName$1.COLLAPSE).addClass(ClassName$1.SHOW);
          _this._element.style[dimension] = '';
  
          _this.setTransitioning(false);
  
          $(_this._element).trigger(Event$1.SHOWN);
        };
  
        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };
  
      _proto.hide = function hide() {
        var _this2 = this;
  
        if (this._isTransitioning || !$(this._element).hasClass(ClassName$1.SHOW)) {
          return;
        }
  
        var startEvent = $.Event(Event$1.HIDE);
        $(this._element).trigger(startEvent);
  
        if (startEvent.isDefaultPrevented()) {
          return;
        }
  
        var dimension = this._getDimension();
  
        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $(this._element).addClass(ClassName$1.COLLAPSING).removeClass(ClassName$1.COLLAPSE).removeClass(ClassName$1.SHOW);
        var triggerArrayLength = this._triggerArray.length;
  
        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);
  
            if (selector !== null) {
              var $elem = $([].slice.call(document.querySelectorAll(selector)));
  
              if (!$elem.hasClass(ClassName$1.SHOW)) {
                $(trigger).addClass(ClassName$1.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }
  
        this.setTransitioning(true);
  
        var complete = function complete() {
          _this2.setTransitioning(false);
  
          $(_this2._element).removeClass(ClassName$1.COLLAPSING).addClass(ClassName$1.COLLAPSE).trigger(Event$1.HIDDEN);
        };
  
        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };
  
      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };
  
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$1);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private
  
  
      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values
  
        Util.typeCheckConfig(NAME$1, config, DefaultType);
        return config;
      };
  
      _proto._getDimension = function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };
  
      _proto._getParent = function _getParent() {
        var _this3 = this;
  
        var parent;
  
        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object
  
          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }
  
        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };
  
      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        var isOpen = $(element).hasClass(ClassName$1.SHOW);
  
        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName$1.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }; // Static
  
  
      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };
  
      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY$1);
  
          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});
  
          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }
  
          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY$1, data);
          }
  
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
  
            data[config]();
          }
        });
      };
  
      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION$1;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);
  
      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }
  
      var $trigger = $(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $(selectors).each(function () {
        var $target = $(this);
        var data = $target.data(DATA_KEY$1);
        var config = data ? 'toggle' : $trigger.data();
  
        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $.fn[NAME$1] = Collapse._jQueryInterface;
    $.fn[NAME$1].Constructor = Collapse;
  
    $.fn[NAME$1].noConflict = function () {
      $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Collapse._jQueryInterface;
    };
  
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.2.1): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
  
    (function () {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }
  
      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;
  
      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    })();
  
    exports.Util = Util;
    exports.Button = Button;
    exports.Collapse = Collapse;
  
    Object.defineProperty(exports, '__esModule', { value: true });
  
  })));
  //# sourceMappingURL=bootstrap.js.map
  

  $(document).ready(function(){
    $(".us-c-reference-slider").slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });

  $(window).scroll(function(){ 
      if ($(this).scrollTop() > 100) { 
          $('.us-c-back-to-top').fadeIn(); 
      } else { 
          $('.us-c-back-to-top').fadeOut(); 
      } 
  }); 
  $('.us-c-back-to-top').click(function(){ 
      $("html, body").animate({ scrollTop: 0 }, 600); 
      return false; 
  }); 
});