/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class NodeCollection {\n  constructor(arrayHtml = []) {\n    this.arrayOfEls = arrayHtml;\n  }\n\n  elements() {\n    return this.arrayOfEls;\n  }\n\n  html(string) {\n    if (string !== undefined) {\n      this.arrayOfEls.map( el => {\n        el.innerHTML = string;\n      });\n      return this.arrayOfEls;\n    } else {\n      return this.arrayOfEls[0].innerHTML;\n    }\n  }\n\n  empty() {\n    let newArr = this.arrayOfEls.map( el => el.innerHTML = \"\");\n    return newArr;\n  }\n\n  append(str) {\n    if (str !== undefined) {\n      let newArr = this.arrayOfEls.map( el => {\n        el.innerHTML += str;\n        return el;\n      })\n      return newArr;\n    }\n  }\n\n  attr(str) {\n    if (str instanceof Object) {\n      this.arrayOfEls.forEach(el => {\n        for (let k in str) {\n            el.setAttribute(k, str[k]);\n        }\n      })\n      return this.arrayOfEls;\n    } else if (arguments.length === 1) {\n      return this.arrayOfEls[0].getAttribute(`${str}`);\n    } else if (arguments.length === 2) {\n      this.arrayOfEls.forEach( el => el.setAttribute(str, arguments[1]));\n      return this.arrayOfEls;\n    }\n  }\n\n  addClass(newClass) {\n    this.arrayOfEls.forEach( el => el.classList.add(newClass));\n    return this.arrayOfEls\n  }\n\n  removeClass(newClass) {\n    this.arrayOfEls.forEach( el => el.classList.remove(newClass));\n    return this.arrayOfEls\n  }\n\n  children() {\n    let cb = function(listOfEls) {\n        this.arrayOfEls.forEach( el => {\n          let converted = Array.prototype.slice.call(el.children);\n          converted.forEach(el1 => listOfEls.push(el1));\n        })\n        return listOfEls\n      };\n    return this.finder(cb)\n  }\n\n  parent() {\n    let cb = function(listOfEls) {\n        this.arrayOfEls.forEach(el => {\n          if (!listOfEls.includes(el.parentNode)) {\n            listOfEls.push(el.parentNode);\n          }\n        })\n        return listOfEls\n      };\n    return this.finder(cb);\n  }\n\n  finder(cb) {\n    let listOfEls = [];\n    let ye = cb.call(this, listOfEls);\n    let newCollection = new NodeCollection(ye);\n    return newCollection;\n  }\n\n  find(el) {\n    let childEls = [];\n    this.arrayOfEls.forEach( el1 => {\n      let pickedEls = el1.querySelectorAll(el);\n      if (pickedEls.length !== 0) {\n        pickedEls.forEach( oneEl =>{\n          childEls.push(oneEl);\n        })\n      }\n    })\n    let newCollection = new NodeCollection(childEls);\n    return newCollection;\n  }\n\n  remove() {\n    let newEls = this.empty();\n    this.arrayOfEls.forEach(el => el.remove());\n    return this.arrayOfEls;\n  }\n\n  on(event, cb) {\n    this.arrayOfEls.map( el => {\n      el.addEventListener(event, cb);\n      el.cb = cb;\n    });\n    return this.arrayOfEls;\n  }\n\n  off(event) {\n    this.arrayOfEls.map( el => {\n      el.removeEventListener(event, el.cb);\n    });\n    return this.arrayOfEls;\n  }\n};\n\n\nmodule.exports = NodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollections = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nwindow.$l = function (hello) {\n  if (hello instanceof Function) {\n    let queue = [];\n    queue.push(hello);\n    while (queue.length !== 0) {\n      let shifted = queue.shift();\n      document.addEventListener(\"DOMContentLoaded\", shifted());\n    }\n    return null;\n  } else if (hello instanceof HTMLElement) {\n    let elements = document.querySelectorAll(`${hello}`);\n    let newEls = new DOMNodeCollections(elements);\n    return newEls;\n  } else {\n    let elements = document.querySelectorAll(`${hello}`);\n    let converted = Array.from(elements);\n    let newEls = new DOMNodeCollections(converted);\n    return newEls;\n  }\n};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });