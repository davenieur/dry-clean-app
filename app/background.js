(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("better-sqlite3"), require("escpos"), require("escpos-usb"));
	else if(typeof define === 'function' && define.amd)
		define(["better-sqlite3", "escpos", "escpos-usb"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("better-sqlite3"), require("escpos"), require("escpos-usb")) : factory(root["better-sqlite3"], root["escpos"], root["escpos-usb"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, (__WEBPACK_EXTERNAL_MODULE_better_sqlite3__, __WEBPACK_EXTERNAL_MODULE_escpos__, __WEBPACK_EXTERNAL_MODULE_escpos_usb__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main/helpers/Tickets.js":
/*!*********************************!*\
  !*** ./main/helpers/Tickets.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printTicket: () => (/* binding */ printTicket)
/* harmony export */ });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var escpos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! escpos */ "escpos");
/* harmony import */ var escpos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(escpos__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);




// Install escpos-usb adapter module manually
(escpos__WEBPACK_IMPORTED_MODULE_1___default().USB) = __webpack_require__(/*! escpos-usb */ "escpos-usb");
function getDevice() {
  const devicePrinter = escpos__WEBPACK_IMPORTED_MODULE_1___default().USB.findPrinter();
  if (devicePrinter.length > 0) {
    console.log("len", devicePrinter.length);
    let devicePrinterDesc = devicePrinter[0]['deviceDescriptor'];
    const vid = devicePrinterDesc['idVendor'];
    const pid = devicePrinterDesc['idProduct'];
    const device = new (escpos__WEBPACK_IMPORTED_MODULE_1___default().USB)(vid, pid);
    return device;
  } else {
    return null;
  }
}
const printTicket = (nombre_cliente, arr_notas, precio_cuenta_total) => {
  const device = getDevice();
  if (device != null) {
    const options = {
      encoding: "CP1252",
      width: 36
    };
    const printer = new (escpos__WEBPACK_IMPORTED_MODULE_1___default().Printer)(device, options);
    console.log("Printing");
    console.log(arr_notas);
    const logo = path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, 'DRYlogo_orig_400w_90ppp_BW_8b_fit.png');
    escpos__WEBPACK_IMPORTED_MODULE_1___default().Image.load(logo, "image/png", function (image) {
      device.open(function () {
        // Ticket header
        printer.setCharacterCodeTable(16).align('ct').image(image, 'D24').then(() => {
          printer.font("B").size(0.05, 0.05).text("SERVICIO DRY CLEAN SIX STARS").text("TICKET DE PAGO POR SERVICIOS DE TINTORERIA Y LAVADO DE ROPA. ").text("CLIENTE A PAGAR: " + nombre_cliente);

          // notas
          _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(arr_notas).call(arr_notas, nota => {
            var _context;
            printer.align('LT').style("BI").text("#Nota: " + nota.text_num_nota + " " + nota.fecha_registro + " Total: $" + nota.precio_total).style("NORMAL").align("LT").tableCustom([{
              text: "#",
              align: "LEFT",
              width: 0.1
            }, {
              text: "Prenda",
              align: "LEFT",
              width: 0.5
            }, {
              text: "Servicio",
              align: "CENTER",
              width: 0.3
            }, {
              text: "Total",
              align: "RIGHT",
              width: 0.2
            }]);
            _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(_context = nota.prendas).call(_context, row_prenda => {
              return printer.tableCustom([{
                text: row_prenda[0],
                align: "LEFT",
                width: 0.1
              }, {
                text: row_prenda[1],
                align: "LEFT",
                width: 0.5
              }, {
                text: row_prenda[2],
                align: "CENTER",
                width: 0.3
              }, {
                text: row_prenda[3],
                align: "RIGHT",
                width: 0.2
              }]);
            });
            printer.drawLine();
          });
          printer.text("Cuenta Total: $" + String(precio_cuenta_total)).feed().cut().close();
        });
      });
    });
  } else {
    console.log("NULL DEVICE, NO PRINTING");
  }
};


/***/ }),

/***/ "./main/helpers/database.js":
/*!**********************************!*\
  !*** ./main/helpers/database.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(/*! path */ "path");
const Database = __webpack_require__(/*! better-sqlite3 */ "better-sqlite3");
// let dbPath =
//     process.env.NODE_ENV === "development"
//         ? path.join(__dirname,'../../db/dry_clean_six_stars.db')
//         : path.join(process.resourcesPath, "./db/dry_clean_six_stars.db")

let dbPath = path.join(__dirname, './db/dry_clean_six_stars.db');
const db = new Database(dbPath, {
  verbose: console.log
});
db.pragma('journal_mode = WAL');
module.exports.db = db;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_better_sqlite3__;

/***/ }),

/***/ "escpos":
/*!*************************!*\
  !*** external "escpos" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_escpos__;

/***/ }),

/***/ "escpos-usb":
/*!*****************************!*\
  !*** external "escpos-usb" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_escpos_usb__;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/for-each */ "./node_modules/core-js-pure/stable/instance/for-each.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/pad-start.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/pad-start.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/pad-start */ "./node_modules/core-js-pure/stable/instance/pad-start.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/entries */ "./node_modules/core-js-pure/stable/object/entries.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/parse-float.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/parse-float.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/parse-float */ "./node_modules/core-js-pure/stable/parse-float.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/parse-int.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/parse-int.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! core-js-pure/stable/parse-int */ "./node_modules/core-js-pure/stable/parse-int.js");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/for-each.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.array.for-each */ "./node_modules/core-js-pure/modules/es.array.for-each.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'forEach');


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/pad-start.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/pad-start.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../string/virtual/pad-start */ "./node_modules/core-js-pure/es/string/virtual/pad-start.js");

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.padStart;
  return typeof it == 'string' || it === StringPrototype
    || (isPrototypeOf(StringPrototype, it) && own === StringPrototype.padStart) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/object/entries.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/entries.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../modules/es.object.entries */ "./node_modules/core-js-pure/modules/es.object.entries.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Object.entries;


/***/ }),

/***/ "./node_modules/core-js-pure/es/parse-float.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/es/parse-float.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../modules/es.parse-float */ "./node_modules/core-js-pure/modules/es.parse-float.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.parseFloat;


/***/ }),

/***/ "./node_modules/core-js-pure/es/parse-int.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js-pure/es/parse-int.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../modules/es.parse-int */ "./node_modules/core-js-pure/modules/es.parse-int.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.parseInt;


/***/ }),

/***/ "./node_modules/core-js-pure/es/string/virtual/pad-start.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/es/string/virtual/pad-start.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(/*! ../../../modules/es.string.pad-start */ "./node_modules/core-js-pure/modules/es.string.pad-start.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('String', 'padStart');


/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-callable.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-callable.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js-pure/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js-pure/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-includes.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-iteration.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-iteration.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js-pure/internals/length-of-array-like.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js-pure/internals/array-species-create.js");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-method-is-strict.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-method-is-strict.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-constructor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-constructor.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js-pure/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js-pure/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-create.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-create.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "./node_modules/core-js-pure/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof-raw.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof-raw.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-prototype-getter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-prototype-getter.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-global-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-global-property.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/descriptors.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/descriptors.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/document-create-element.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/document-create-element.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/enum-bug-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/enum-bug-keys.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js-pure/internals/export.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/export.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js-pure/internals/function-apply.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
// add debugging info
__webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : global[TARGET] && global[TARGET].prototype;

  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/fails.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/fails.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-apply.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-apply.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-context.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-context.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js-pure/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-native.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-native.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-call.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-call.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in-prototype-method.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = function (CONSTRUCTOR, METHOD) {
  var Namespace = path[CONSTRUCTOR + 'Prototype'];
  var pureMethod = Namespace && Namespace[METHOD];
  if (pureMethod) return pureMethod;
  var NativeConstructor = global[CONSTRUCTOR];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  return NativePrototype && NativePrototype[METHOD];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-method.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-method.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js-pure/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js-pure/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/global.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/global.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js-pure/internals/has-own-property.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/has-own-property.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/hidden-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/hidden-keys.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/indexed-object.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/indexed-object.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/inspect-source.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/inspect-source.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-array.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-array.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-callable.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-callable.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js-pure/internals/inspect-source.js");

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-forced.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-forced.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-pure.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-pure.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-symbol.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-symbol.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/length-of-array-like.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/length-of-array-like.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/math-trunc.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/math-trunc.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/number-parse-float.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/number-parse-float.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js-pure/internals/string-trim.js").trim);
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js-pure/internals/whitespaces.js");

var charAt = uncurryThis(''.charAt);
var $parseFloat = global.parseFloat;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/number-parse-int.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/number-parse-int.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js-pure/internals/string-trim.js").trim);
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js-pure/internals/whitespaces.js");

var $parseInt = global.parseInt;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-property.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js-pure/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js-pure/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys-internal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys-internal.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js-pure/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-to-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-to-array.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var objectGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var $propertyIsEnumerable = (__webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js").f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
// of `null` prototype objects
var IE_BUG = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-create -- safe
  var O = Object.create(null);
  O[2] = 2;
  return !propertyIsEnumerable(O, 2);
});

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/path.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/path.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/require-object-coercible.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js-pure/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-store.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-store.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var globalThis = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js-pure/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.36.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-pad-webkit-bug.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-pad-webkit-bug.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-pad.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-pad.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var $repeat = __webpack_require__(/*! ../internals/string-repeat */ "./node_modules/core-js-pure/internals/string-repeat.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr === '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-repeat.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-repeat.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

var $RangeError = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-trim.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-trim.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js-pure/internals/to-string.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js-pure/internals/whitespaces.js");

var replace = uncurryThis(''.replace);
var ltrim = RegExp('^[' + whitespaces + ']+');
var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '$1');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-absolute-index.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-indexed-object.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-integer-or-infinity.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(/*! ../internals/math-trunc */ "./node_modules/core-js-pure/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-length.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-length.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-primitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js-pure/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js-pure/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js-pure/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-property-key.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-property-key.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js-pure/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js-pure/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/try-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/try-to-string.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/uid.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/uid.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js-pure/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/whitespaces.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/whitespaces.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.for-each.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js-pure/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.entries.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.entries.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $entries = (__webpack_require__(/*! ../internals/object-to-array */ "./node_modules/core-js-pure/internals/object-to-array.js").entries);

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.parse-float.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.parse-float.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $parseFloat = __webpack_require__(/*! ../internals/number-parse-float */ "./node_modules/core-js-pure/internals/number-parse-float.js");

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat !== $parseFloat }, {
  parseFloat: $parseFloat
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.parse-int.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.parse-int.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $parseInt = __webpack_require__(/*! ../internals/number-parse-int */ "./node_modules/core-js-pure/internals/number-parse-int.js");

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt !== $parseInt }, {
  parseInt: $parseInt
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.pad-start.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.pad-start.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var $padStart = (__webpack_require__(/*! ../internals/string-pad */ "./node_modules/core-js-pure/internals/string-pad.js").start);
var WEBKIT_BUG = __webpack_require__(/*! ../internals/string-pad-webkit-bug */ "./node_modules/core-js-pure/internals/string-pad-webkit-bug.js");

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.for-each.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.for-each.js ***!
  \***************************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/stable/array/virtual/for-each.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/array/virtual/for-each.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../../es/array/virtual/for-each */ "./node_modules/core-js-pure/es/array/virtual/for-each.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var hasOwn = __webpack_require__(/*! ../../internals/has-own-property */ "./node_modules/core-js-pure/internals/has-own-property.js");
var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "./node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/for-each */ "./node_modules/core-js-pure/stable/array/virtual/for-each.js");
__webpack_require__(/*! ../../modules/web.dom-collections.for-each */ "./node_modules/core-js-pure/modules/web.dom-collections.for-each.js");

var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.forEach)
    || hasOwn(DOMIterables, classof(it)) ? method : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/pad-start.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/pad-start.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/instance/pad-start */ "./node_modules/core-js-pure/es/instance/pad-start.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/entries.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/entries.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../../es/object/entries */ "./node_modules/core-js-pure/es/object/entries.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/parse-float.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/parse-float.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../es/parse-float */ "./node_modules/core-js-pure/es/parse-float.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/stable/parse-int.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/stable/parse-int.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var parent = __webpack_require__(/*! ../es/parse-int */ "./node_modules/core-js-pure/es/parse-int.js");

module.exports = parent;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./main/background.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/parse-int */ "./node_modules/@babel/runtime-corejs3/core-js-stable/parse-int.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_pad_start__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/pad-start */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/pad-start.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_pad_start__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_pad_start__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/entries */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_parse_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/parse-float */ "./node_modules/@babel/runtime-corejs3/core-js-stable/parse-float.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_parse_float__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_parse_float__WEBPACK_IMPORTED_MODULE_4__);





const {
  app,
  BrowserWindow,
  ipcMain,
  Notification
} = __webpack_require__(/*! electron */ "electron");
const path = __webpack_require__(/*! path */ "path");
var crypto = __webpack_require__(/*! crypto */ "crypto");
const dbmgr = __webpack_require__(/*! ./helpers/database.js */ "./main/helpers/database.js");
const db = dbmgr.db;
const {
  printTicket
} = __webpack_require__(/*! ./helpers/Tickets.js */ "./main/helpers/Tickets.js");

//GLOBAL Windows
let win;
let winlogin;
app.whenReady().then(createWindow);
const isProd = "development" === 'production';

// ------------
//    WINDOWS
// ------------
async function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    maximize: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      //  nodeIntegration: true,
      // contextIsolation:true,
      devTools: true,
      preload: path.join(__dirname, 'preload-index.js')
    }
  });

  //win.loadFile(path.join(__dirname,'../FrontEnd/pages/notas/ver_notas.html'))
  // win.loadFile(path.join(__dirname,'../FrontEnd/index.html'))
  win.maximize(true);
  win.webContents.openDevTools();
  if (isProd) {
    await win.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await win.loadURL(`http://localhost:${port}/home`);
    win.webContents.openDevTools();
  }
}
function loginWindow() {
  winlogin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation:true,
      devTools: true,
      preload: path.join(__dirname, 'preload-login.js')
    }
  });

  //  winlogin.loadFile(path.join(__dirname,'../login.html'));
  winlogin.webContents.openDevTools();
}

// -------------------
//    APP EVENTS
//-------------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    db.close();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// --------------------------------
//            HANDLERS
//---------------------------------
ipcMain.handle('validate', (event, obj) => {
  validatelogin(obj);
});
ipcMain.handle('Sucursal:get_list', handleSucursalGetList);
ipcMain.handle('Sucursal:get_list_precios', handleSucursalGetListPrecios);
ipcMain.handle('Sucursal:update_list_precios', handleSucursalUpdateListPrecios);
ipcMain.handle('Sucursal:save_prenda', handlerSavePrendaPrecio);
ipcMain.handle('Sucursal:delete_prenda', handlerDeletePrenda);
ipcMain.handle('Sucursal:update_prenda', handlerUpdatePrenda);
ipcMain.handle('Notas:save_nota', handlerSaveNota);
ipcMain.handle('Notas:get_list_notas', handlerGetListNotas);
ipcMain.handle('Notas:imprimir_ticket', handlerPrintTicket);
ipcMain.handle('Notas:eliminar_nota', handlerDeleteNota);

// handlers Functions
function validatelogin(obj) {
  const {
    email,
    password
  } = obj;
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));

  //Query
  let sql = `SELECT password  from Usuario u WHERE username = ? ;`;
  const row = db.prepare(sql).get(email);

  // Manage data
  if (row) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (row.password == hash) {
      console.log('Success validation');
      createWindow();
      win.show();
      winlogin.close();
    } else {
      winlogin.webContents.send('error', `password isn't correct`);
    }
  } else {
    winlogin.webContents.send('error', `Username doesn't exist`);
  }
}
function handleSucursalGetList() {
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));

  //Query
  let sql = `SELECT sucursal_id as id,nombre  from Sucursal ;`;
  let data = db.prepare(sql).all();
  return data;
}
function handleSucursalGetListPrecios(event, sucursal_id, registrado = false) {
  // Connection
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  let sql;

  //Query
  sql = `SELECT ${registrado ? 'lp.listas_precios_id' : 'p.prenda_id'} as id,p.nombre,p.tipo_servicio as servicio,lp.precio  FROM Prenda p
  ${registrado ? 'inner' : 'left'} join (
    SELECT listas_precios_id,prenda_id,sucursal_id,precio from Listas_Precios lp 
    WHERE prenda_id is not null
      and is_active is TRUE  
      and sucursal_id = ?
  ) lp
  on p.prenda_id =lp.prenda_id `;
  let data = db.prepare(sql).all(sucursal_id);
  return data;
}
function handleSucursalUpdateListPrecios(event, list_precios) {
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(list_precios).call(list_precios, obj_precio => {
    const {
      id_prenda,
      id_sucursal,
      precio
    } = obj_precio;
    // checar que existe el elemento en la lista de precio

    let sql = `SELECT prenda_id,sucursal_id,precio from Listas_Precios lp 
                WHERE prenda_id = ? and sucursal_id =? and is_active is TRUE`;
    let data = db.prepare(sql).get([id_prenda, id_sucursal]);

    // si existe, revisar si es un precio lleno o vacio
    if (data != null) {
      // si cambio el precio, update and insert new precio
      if (precio.length > 0) {
        if (data.precio != precio) {
          // Actualiza y agrega solo cuando cambia el precio
          // se desactiva el precio actual
          const queryUpdate = `UPDATE Listas_Precios 
          SET is_active = FALSE
          WHERE prenda_id = ? and sucursal_id = ?  `;
          const resultUpd = db.prepare(queryUpdate).run(id_prenda, id_sucursal);

          // Se agrega el nuevo precio activo
          const queryInsertNew = `INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                              VALUES (?,?,?)`;
          const resultIn = db.prepare(queryInsertNew).run(id_prenda, id_sucursal, precio);
          console.log('UPDATE price', resultUpd, resultIn);
        }
      } else {
        // si no hay precio, desactivar solamente
        const queryUpdate = `UPDATE Listas_Precios 
                    SET is_active = FALSE
                    WHERE prenda_id = ? and sucursal_id = ?  `;
        const resultUpd = db.prepare(queryUpdate).run(id_prenda, id_sucursal);
        console.log('UPDATE to false', resultUpd);
      }
    } else {
      //sino existe, revisar si tiene precio
      // si tiene precio -> insert precio
      if (precio.length > 0) {
        const queryInsert = `INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                      VALUES (?,?,?)`;
        const result = db.prepare(queryInsert).run(id_prenda, id_sucursal, precio);
      }
    }
  });
}
function handlerSavePrendaPrecio(event, dataPrenda) {
  console.log(dataPrenda);
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const queryInsertNewPrenda = `INSERT INTO Prenda (nombre,tipo_servicio)
  VALUES (?,?);`;
  const resultInPrenda = db.prepare(queryInsertNewPrenda).run(dataPrenda['nombre'], dataPrenda['tipo_servicio']);
  console.log('Prenda agregada... ', resultInPrenda);
  const id_prenda = resultInPrenda.lastInsertRowid;
  // Se agrega el nuevo precio activo
  const queryInsertNewLP = `INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
  VALUES (last_insert_rowid(),?,?)`;
  const resultInLP = db.prepare(queryInsertNewLP).run(dataPrenda['id_sucursal'], dataPrenda['precio']);
  console.log('Prenda agregada en LP... ', resultInLP);
  return id_prenda;
}
function handlerDeletePrenda(event, dataPrenda) {
  const {
    id_prenda
  } = dataPrenda;
  try {
    // Verificar que los IDs no sean undefined
    if (id_prenda === undefined) {
      throw new Error('El id de la prenda no puede ser undefined.');
    }

    // Eliminar los precios de la prenda de la tabla Listas_Precios
    const queryDeleteLP = `DELETE FROM Listas_Precios WHERE prenda_id = ?;`;
    const resultDeleteLP = db.prepare(queryDeleteLP).run(id_prenda);
    console.log('Precios de prenda eliminados de LP...', resultDeleteLP);

    // Eliminar la prenda de la tabla Prenda
    const queryDeletePrenda = `DELETE FROM Prenda WHERE prenda_id = ?;`;
    const resultDeletePrenda = db.prepare(queryDeletePrenda).run(id_prenda);
    console.log('Prenda eliminada...', resultDeletePrenda);
  } catch (error) {
    throw new Error(error);
  }
}
function handlerUpdatePrenda(event, dataPrenda) {
  const {
    id_prenda,
    nombre,
    precio,
    tipo_servicio,
    id_sucursal
  } = dataPrenda;
  try {
    // Verificar que los IDs no sean undefined
    if (id_prenda === undefined || id_sucursal === undefined) {
      throw new Error('El id de la prenda o de la sucursal no puede ser undefined.');
    }

    // Actualizar nombre o tipo_servicio 
    const queryUpdatePrenda = `UPDATE Prenda SET nombre = ?, tipo_servicio = ? WHERE prenda_id = ?;`;
    const resultUpdatePrenda = db.prepare(queryUpdatePrenda).run(nombre, tipo_servicio, id_prenda);
    console.log('Prenda actualizada... ', resultUpdatePrenda);
    const sql = `SELECT prenda_id,sucursal_id,precio from Listas_Precios lp 
                  WHERE prenda_id = ? and sucursal_id =? and is_active is TRUE`;
    const data = db.prepare(sql).get([id_prenda, id_sucursal]);
    console.log(data);

    // si existe, revisar si es un precio lleno o vacio
    if (data != null) {
      // si cambio el precio, update and insert new precio
      if (dataPrenda.precio.length > 0) {
        if (data.precio != precio) {
          // Actualiza y agrega solo cuando cambia el precio
          // se desactiva el precio actual
          const queryUpdate = `UPDATE Listas_Precios 
            SET is_active = FALSE
            WHERE prenda_id = ? and sucursal_id = ?  `;
          const resultUpd = db.prepare(queryUpdate).run(id_prenda, id_sucursal);

          // Se agrega el nuevo precio activo
          const queryInsertNew = `INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                              VALUES (?,?,?)`;
          const resultIn = db.prepare(queryInsertNew).run(id_prenda, id_sucursal, precio);
          console.log('UPDATE price', resultUpd, resultIn);
        }
      } else {
        // si no hay precio, desactivar solamente
        const queryUpdate = `UPDATE Listas_Precios 
                    SET is_active = FALSE
                    WHERE prenda_id = ? and sucursal_id = ?  `;
        const resultUpd = db.prepare(queryUpdate).run(id_prenda, id_sucursal);
        console.log('UPDATE to false', resultUpd);
      }
    } else {
      //sino existe, revisar si tiene precio
      // si tiene precio -> insert precio
      if (precio.length > 0) {
        const queryInsert = `INSERT INTO Listas_Precios (prenda_id,sucursal_id,precio)
                     VALUES (?,?,?)`;
        const result = db.prepare(queryInsert).run(id_prenda, id_sucursal, precio);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
function handlerSaveNota(event, dataNota) {
  console.log(dataNota);

  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const {
    num_nota,
    cliente,
    id_sucursal,
    fecha_recepcion,
    fecha_entrega,
    prendas
  } = dataNota;
  const num_nota_int = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(num_nota);
  const id_sucursal_int = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(id_sucursal);
  const FE_dia = fecha_recepcion.getDate(); // Obtener el día del mes (ej. 23)
  const FE_mes = fecha_recepcion.getMonth(); // Obtener el mes (0 para enero, 1 para febrero, etc.)
  const FE_anio = fecha_recepcion.getFullYear(); // Obtener el año (ej. 2024)
  const FE_date = FE_anio + '-' + FE_mes + '-' + FE_dia;
  const FR_dia = fecha_entrega.getDate(); // Obtener el día del mes (ej. 23)
  const FR_mes = fecha_entrega.getMonth(); // Obtener el mes (0 para enero, 1 para febrero, etc.)
  const FR_anio = fecha_entrega.getFullYear(); // Obtener el año (ej. 2024)
  const FR_date = FR_anio + '-' + FR_mes + '-' + FR_dia;
  let cliente_id;
  if (Boolean(cliente)) {
    const queryInsertCliente = `
    INSERT INTO cliente (nombre,sucursal_id,is_owner_sucursal)
    VALUES 	(?,?,False);
    `;
    const cliente_info = db.prepare(queryInsertCliente).run(cliente, id_sucursal_int);
    cliente_id = cliente_info.lastInsertRowid;
  } else {
    const queryGetCliente = `
    SELECT c.cliente_id  from cliente c
    where c.sucursal_id = ? and c.is_owner_sucursal = TRUE 
    limit 1;
    `;
    const cliente_info = db.prepare(queryGetCliente).get(id_sucursal_int);
    cliente_id = cliente_info.cliente_id;
  }
  console.log("cliente agregado... ", Boolean(cliente), cliente_id);
  // Obtener ids de prendas
  let reg_prendas = [];
  let precioTotal = 0;
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(prendas).call(prendas, prenda_obj => {
    let prenda_id;
    if (prenda_obj.is_comodin) {
      //registro de prenda comodin
      const queryInsertPrendaComodin = `
      INSERT INTO Listas_Precios(prenda_id,sucursal_id,precio,nombre_comodin)
      Values		(null,?,?,?);`;
      let prenda_comodin_res = db.prepare(queryInsertPrendaComodin).run(id_sucursal_int, _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(prenda_obj.precio), prenda_obj.prenda_id);
      prenda_id = prenda_comodin_res.lastInsertRowid;
      precioTotal += _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(prenda_obj.precio) * prenda_obj.num_prendas;
    } else {
      // La prenda ya está registrada, obtener id
      const queryGetListasPreciosId = `
        select l.listas_precios_id,l.precio  from Listas_Precios l
        WHERE l.prenda_id = ?
        and l.sucursal_id = ?
        and l.is_active  is TRUE
        limit 1;`;
      let listas_precios_res = db.prepare(queryGetListasPreciosId).get(_babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(prenda_obj.prenda_id), id_sucursal_int);
      console.log("lista_precios", listas_precios_res);
      prenda_id = listas_precios_res.listas_precios_id;
      precioTotal += listas_precios_res.precio * prenda_obj.num_prendas;
    }
    for (let index = 0; index < prenda_obj.num_prendas; index++) {
      // agregamos el numero de prendas
      if (prenda_obj.colores[index]) {
        reg_prendas.push({
          'prenda_listas_precios_id': prenda_id,
          'color': prenda_obj.colores[index]
        });
      } else {
        // si no se registraron más colores, se utiliza el ultimo, las veces necesarias
        let last_id = prenda_obj.colores.length - 1;
        reg_prendas.push({
          'prenda_listas_precios_id': prenda_id,
          'color': prenda_obj.colores[last_id]
        });
      }
    }
  });
  console.log('Prendas registradas');
  console.log(reg_prendas);
  console.log('Precio total:', precioTotal);
  // Registro de Nota
  const queryInsertNewNota = `
  INSERT INTO Nota (num_nota,cliente_id,fecha_recepcion,fecha_entrega,precio_total)
    VALUES 	(?,?,?,?,?);`;
  const resPrenda = db.prepare(queryInsertNewNota).run(num_nota_int, cliente_id, FR_date, FE_date, precioTotal);
  const nota_id = resPrenda.lastInsertRowid;
  console.log("Nota_id", nota_id);
  // Registro de Nota_Ropa por prenda
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(reg_prendas).call(reg_prendas, prenda => {
    const queryInsertNotaRopa = `
      INSERT INTO Nota_Ropa (nota_id,prenda_lista_precios_id,color,detalles)
      values	(?,?,?,null);`;
    db.prepare(queryInsertNotaRopa).run(nota_id, prenda.prenda_listas_precios_id, prenda.color);
  });
  return "success";
}
function handlerGetListNotas(event, dataNota) {
  //const db = new Database(path.join(__dirname,'../../db/dry_clean_six_stars.db'));
  const {
    sucursal_id,
    num_nota,
    cliente_name,
    fecha_desde,
    fecha_hasta
  } = dataNota;
  const num_nota_int = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(num_nota);
  const id_sucursal_int = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(sucursal_id);
  console.log(sucursal_id, id_sucursal_int, Boolean(id_sucursal_int));

  //Query
  let sql = `SELECT n.nota_id,n.num_nota,
          c.nombre as nombre_cliente,
          s.nombre  as nombre_sucursal,
          n.precio_total,
          n.fecha_registro,
          n.fecha_recepcion,
          n.fecha_entrega,
          lp.listas_precios_id as prenda_id ,
          ifnull(p.nombre,lp.nombre_comodin) as nombre_prenda,
          nr.color,
          p.tipo_servicio,
          lp.precio
        FROM Nota n 
        INNER JOIN Nota_Ropa nr 
        ON n.nota_id =nr.nota_id 
        INNER JOIN Listas_Precios lp 
        ON nr.prenda_lista_precios_id =lp.listas_precios_id 
        LEFT join Prenda p 
        ON lp.prenda_id =p.prenda_id
        LEFT JOIN Cliente c
        ON n.cliente_id =c.cliente_id
        LEFT JOIN Sucursal s 
        ON c.sucursal_id  =s.sucursal_id  
        WHERE TRUE `;
  let bindParameters = [];
  if (id_sucursal_int) {
    sql += ` AND s.sucursal_id = ? `;
    bindParameters.push(id_sucursal_int);
  }
  if (num_nota_int) {
    sql += ` AND n.num_nota = ? `;
    bindParameters.push(num_nota_int);
  }
  if (cliente_name) {
    sql += ` AND lower(c.nombre) like ? `;
    bindParameters.push('%' + cliente_name.toLowerCase() + '%');
  }
  if (fecha_desde) {
    const Fecha_desde_dia = fecha_desde.split('/')[0];
    const Fecha_desde_mes = fecha_desde.split('/')[1];
    const Fecha_desde_anio = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(fecha_desde.split('/')[2]);
    const Fecha_desde_date = Fecha_desde_anio + '-' + Fecha_desde_mes + '-' + Fecha_desde_dia;
    sql += ` AND fecha_registro  >= ? `;
    bindParameters.push(Fecha_desde_date);
  }
  if (fecha_hasta) {
    var _context;
    const Fecha_hasta_dia = _babel_runtime_corejs3_core_js_stable_instance_pad_start__WEBPACK_IMPORTED_MODULE_2___default()(_context = (_babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(fecha_hasta.split('/')[0]) + 1).toString()).call(_context, 2, '0');
    const Fecha_hasta_mes = fecha_hasta.split('/')[1];
    const Fecha_hasta_anio = _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(fecha_hasta.split('/')[2]);
    const Fecha_hasta_date = Fecha_hasta_anio + '-' + Fecha_hasta_mes + '-' + Fecha_hasta_dia;
    sql += ` AND fecha_registro  <= ? `;
    bindParameters.push(Fecha_hasta_date);
  }
  console.log(sql);
  console.log(bindParameters);
  let data = db.prepare(sql).all(bindParameters);
  let d_notas = {};
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(data).call(data, row => {
    let name_prenda = row['tipo_servicio'] != null ? row['nombre_prenda'] : row['nombre_prenda'].split('-')[0];
    let name_service = row['tipo_servicio'] != null ? row['tipo_servicio'] : row['nombre_prenda'].split('-').length > 1 ? row['nombre_prenda'].split('-')[1] : null;
    if (row['nota_id'] in d_notas) {
      d_notas[row['nota_id']]['prendas'].push({
        id_prenda: row['prenda_id'],
        nombre_prenda: name_prenda,
        color: row['color'],
        tipo_servicio: name_service,
        precio: row['precio']
      });
    } else {
      d_notas[row['nota_id']] = {
        num_nota: row['num_nota'],
        nombre_cliente: row['nombre_cliente'],
        nombre_sucursal: row['nombre_sucursal'],
        precio_total: row['precio_total'],
        fecha_registro: row['fecha_registro'],
        fecha_recepcion: row['fecha_recepcion'],
        fecha_entrega: row['fecha_entrega'],
        prendas: [{
          id_prenda: row['prenda_id'],
          nombre_prenda: name_prenda,
          color: row['color'],
          tipo_servicio: name_service,
          precio: row['precio']
        }]
      };
    }
  });
  return d_notas;
}
function get_prendas_cuenta(prendas) {
  prendas_cuenta = {};
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(prendas).call(prendas, prenda => {
    if (prenda['id_prenda'] in prendas_cuenta) {
      prendas_cuenta[prenda['id_prenda']]['num_prendas']++;
      prendas_cuenta[prenda['id_prenda']]['colores'].push(prenda['color']);
    } else {
      prendas_cuenta[prenda['id_prenda']] = {
        num_prendas: 1,
        nombre_prenda: prenda['nombre_prenda'],
        tipo_servicio: prenda['tipo_servicio'],
        colores: [prenda['color']],
        precio: prenda['precio']
      };
    }
  });
  return prendas_cuenta;
}
function handlerPrintTicket(event, dataNotas, nombre_cliente) {
  var _context2;
  let notas = [];
  let precio_cuenta_total = 0;
  _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(_context2 = _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_3___default()(dataNotas)).call(_context2, ([nota_id, nota_obj]) => {
    var _context3;
    let nota_desc = {
      text_num_nota: nota_obj['num_nota'] != null ? nota_obj['num_nota'] : "Sin Número",
      fecha_registro: nota_obj['fecha_registro'].split(" ")[0],
      nombre_cliente: nota_obj['nombre_cliente'],
      num_prendas: 0,
      precio_total: 0,
      prendas: []
    };
    let prendas_cuenta = get_prendas_cuenta(nota_obj['prendas']);
    _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(_context3 = _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_3___default()(prendas_cuenta)).call(_context3, ([prenda_id, prenda_obj]) => {
      // let colores=prenda_obj['colores'].join(',')
      nota_desc.prendas.push([prenda_obj['num_prendas'], prenda_obj['nombre_prenda'], prenda_obj['tipo_servicio'],
      // colores,
      //"$"+String(prenda_obj['precio']),
      "$" + String(_babel_runtime_corejs3_core_js_stable_parse_float__WEBPACK_IMPORTED_MODULE_4___default()(prenda_obj['precio']) * _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(prenda_obj['num_prendas']))]);
      nota_desc.precio_total += _babel_runtime_corejs3_core_js_stable_parse_float__WEBPACK_IMPORTED_MODULE_4___default()(prenda_obj['precio']) * _babel_runtime_corejs3_core_js_stable_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(prenda_obj['num_prendas']);
    });
    precio_cuenta_total += nota_desc.precio_total;
    notas.push(nota_desc);
  });
  printTicket(nombre_cliente, notas, precio_cuenta_total);
}
function handlerDeleteNota(event, nota_id) {
  const deleteNotaRopa = `
  DELETE FROM Nota_Ropa WHERE nota_id = ?; `;
  db.prepare(deleteNotaRopa).run(nota_id);
  const deleteNota = `
  DELETE FROM Nota WHERE nota_id = ?;`;
  db.prepare(deleteNota).run(nota_id);
  return {
    res: "success"
  };
}

// ipcMain.handle('get', () => {
//    getProducts()
// });

// ipcMain.handle('add', (event, obj) => {
//   addProduct(obj)
// });

// ipcMain.handle('get_one', (event, obj) => {
//   getproduct(obj)    
// });

// ipcMain.handle('remove_product', (event, obj) => {
//   deleteproduct(obj)
// });

// ipcMain.handle('update', (event, obj) => {
//   updateproduct(obj)    
// });

// function getProducts()
// {

//   db.query('SELECT * FROM product', (error, results, fields) => {
//     if (error){
//       console.log(error);
//     }

//     win.webContents.send('products', results)
//   });  
// }

// function addProduct(obj)
// {
//   const sql = "INSERT INTO product SET ?";  
//   db.query(sql, obj, (error, results, fields) => {
//     if(error) {
//        console.log(error);
//     }
//     getProducts()  
//  });
// }

// function deleteproduct(obj)
// {
//   const { id }  = obj
//   const sql = "DELETE FROM product WHERE id = ?"
//   db.query(sql, id, (error, results, fields) => {
//     if(error) {
//        console.log(error);
//     }
//     getProducts()  
//   });
// }

// function getproduct(obj)
// {
//   let { id } = obj 
//   let sql = "SELECT * FROM product WHERE id = ?"
//   db.query(sql, id, (error, results, fields) => {
//     if (error){
//       console.log(error);
//     }
//     console.log(results)
//     win.webContents.send('product', results[0])
//   });
// }

// function updateproduct(obj) 
// {
//    let { id, name, price } = obj
//    const sql = "UPDATE product SET name=?, price=? WHERE id=?";  
//    db.query(sql, [name, price, id], (error, results, fields) => {
//      if(error) {
//         console.log(error);
//      }
//      getProducts()  
//    });
// }
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSSIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL21haW4vaGVscGVycy9UaWNrZXRzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbWFpbi9oZWxwZXJzL2RhdGFiYXNlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIHVtZCBcImJldHRlci1zcWxpdGUzXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgdW1kIFwiZXNjcG9zXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgdW1kIFwiZXNjcG9zLXVzYlwiIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9wYWQtc3RhcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3QvZW50cmllcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL3BhcnNlLWZsb2F0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvcGFyc2UtaW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9wYWQtc3RhcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9lbnRyaWVzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9wYXJzZS1mbG9hdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvcGFyc2UtaW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zdHJpbmcvdmlydHVhbC9wYWQtc3RhcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hLWNhbGxhYmxlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1jYWxsLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWFycmF5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbWF0aC10cnVuYy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL251bWJlci1wYXJzZS1mbG9hdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3BhdGguanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLXBhZC13ZWJraXQtYnVnLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLXBhZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RyeS10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZW50cmllcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5wYXJzZS1mbG9hdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5wYXJzZS1pbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3RyaW5nLnBhZC1zdGFydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvcGFkLXN0YXJ0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9wYXJzZS1mbG9hdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3BhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbWFpbi9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJldHRlci1zcWxpdGUzXCIpLCByZXF1aXJlKFwiZXNjcG9zXCIpLCByZXF1aXJlKFwiZXNjcG9zLXVzYlwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJiZXR0ZXItc3FsaXRlM1wiLCBcImVzY3Bvc1wiLCBcImVzY3Bvcy11c2JcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImJldHRlci1zcWxpdGUzXCIpLCByZXF1aXJlKFwiZXNjcG9zXCIpLCByZXF1aXJlKFwiZXNjcG9zLXVzYlwiKSkgOiBmYWN0b3J5KHJvb3RbXCJiZXR0ZXItc3FsaXRlM1wiXSwgcm9vdFtcImVzY3Bvc1wiXSwgcm9vdFtcImVzY3Bvcy11c2JcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iZXR0ZXJfc3FsaXRlM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2VzY3Bvc19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2VzY3Bvc191c2JfXykgPT4ge1xucmV0dXJuICIsImltcG9ydCBlc2Nwb3MgZnJvbSAnZXNjcG9zJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBJbnN0YWxsIGVzY3Bvcy11c2IgYWRhcHRlciBtb2R1bGUgbWFudWFsbHlcclxuZXNjcG9zLlVTQiA9IHJlcXVpcmUoJ2VzY3Bvcy11c2InKTtcclxuXHJcbmZ1bmN0aW9uIGdldERldmljZSgpIHtcclxuICBjb25zdCBkZXZpY2VQcmludGVyID0gZXNjcG9zLlVTQi5maW5kUHJpbnRlcigpO1xyXG4gIGlmIChkZXZpY2VQcmludGVyLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnNvbGUubG9nKFwibGVuXCIsIGRldmljZVByaW50ZXIubGVuZ3RoKTtcclxuICAgIGxldCBkZXZpY2VQcmludGVyRGVzYyA9IGRldmljZVByaW50ZXJbMF1bJ2RldmljZURlc2NyaXB0b3InXTtcclxuICAgIGNvbnN0IHZpZCA9IGRldmljZVByaW50ZXJEZXNjWydpZFZlbmRvciddO1xyXG4gICAgY29uc3QgcGlkID0gZGV2aWNlUHJpbnRlckRlc2NbJ2lkUHJvZHVjdCddO1xyXG4gICAgY29uc3QgZGV2aWNlID0gbmV3IGVzY3Bvcy5VU0IodmlkLCBwaWQpO1xyXG4gICAgcmV0dXJuIGRldmljZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBwcmludFRpY2tldCA9IChub21icmVfY2xpZW50ZSwgYXJyX25vdGFzLCBwcmVjaW9fY3VlbnRhX3RvdGFsKSA9PiB7XHJcbiAgY29uc3QgZGV2aWNlID0gZ2V0RGV2aWNlKCk7XHJcbiAgaWYgKGRldmljZSAhPSBudWxsKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0geyBlbmNvZGluZzogXCJDUDEyNTJcIiwgd2lkdGg6IDM2IH07XHJcbiAgICBjb25zdCBwcmludGVyID0gbmV3IGVzY3Bvcy5QcmludGVyKGRldmljZSwgb3B0aW9ucyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlByaW50aW5nXCIpO1xyXG4gICAgY29uc29sZS5sb2coYXJyX25vdGFzKTtcclxuICAgIGNvbnN0IGxvZ28gPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnRFJZbG9nb19vcmlnXzQwMHdfOTBwcHBfQldfOGJfZml0LnBuZycpO1xyXG5cclxuICAgIGVzY3Bvcy5JbWFnZS5sb2FkKGxvZ28sIFwiaW1hZ2UvcG5nXCIsIGZ1bmN0aW9uKGltYWdlKSB7XHJcbiAgICAgIGRldmljZS5vcGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFRpY2tldCBoZWFkZXJcclxuICAgICAgICBwcmludGVyLnNldENoYXJhY3RlckNvZGVUYWJsZSgxNilcclxuICAgICAgICAgIC5hbGlnbignY3QnKVxyXG4gICAgICAgICAgLmltYWdlKGltYWdlLCAnRDI0JykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHByaW50ZXIuZm9udChcIkJcIilcclxuICAgICAgICAgICAgICAuc2l6ZSgwLjA1LCAwLjA1KVxyXG4gICAgICAgICAgICAgIC50ZXh0KFwiU0VSVklDSU8gRFJZIENMRUFOIFNJWCBTVEFSU1wiKVxyXG4gICAgICAgICAgICAgIC50ZXh0KFwiVElDS0VUIERFIFBBR08gUE9SIFNFUlZJQ0lPUyBERSBUSU5UT1JFUklBIFkgTEFWQURPIERFIFJPUEEuIFwiKVxyXG4gICAgICAgICAgICAgIC50ZXh0KFwiQ0xJRU5URSBBIFBBR0FSOiBcIiArIG5vbWJyZV9jbGllbnRlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vdGFzXHJcbiAgICAgICAgICAgIGFycl9ub3Rhcy5mb3JFYWNoKG5vdGEgPT4ge1xyXG4gICAgICAgICAgICAgIHByaW50ZXIuYWxpZ24oJ0xUJylcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcIkJJXCIpXHJcbiAgICAgICAgICAgICAgICAudGV4dChcIiNOb3RhOiBcIiArIG5vdGEudGV4dF9udW1fbm90YSArIFwiIFwiICsgbm90YS5mZWNoYV9yZWdpc3RybyArIFwiIFRvdGFsOiAkXCIgKyBub3RhLnByZWNpb190b3RhbClcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcIk5PUk1BTFwiKVxyXG4gICAgICAgICAgICAgICAgLmFsaWduKFwiTFRcIilcclxuICAgICAgICAgICAgICAgIC50YWJsZUN1c3RvbShbXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCIjXCIsIGFsaWduOiBcIkxFRlRcIiwgd2lkdGg6IDAuMSB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiUHJlbmRhXCIsIGFsaWduOiBcIkxFRlRcIiwgd2lkdGg6IDAuNSB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiU2VydmljaW9cIiwgYWxpZ246IFwiQ0VOVEVSXCIsIHdpZHRoOiAwLjMgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlRvdGFsXCIsIGFsaWduOiBcIlJJR0hUXCIsIHdpZHRoOiAwLjIgfVxyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgbm90YS5wcmVuZGFzLmZvckVhY2gocm93X3ByZW5kYSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJpbnRlci50YWJsZUN1c3RvbShbXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogcm93X3ByZW5kYVswXSwgYWxpZ246IFwiTEVGVFwiLCB3aWR0aDogMC4xIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogcm93X3ByZW5kYVsxXSwgYWxpZ246IFwiTEVGVFwiLCB3aWR0aDogMC41IH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogcm93X3ByZW5kYVsyXSwgYWxpZ246IFwiQ0VOVEVSXCIsIHdpZHRoOiAwLjMgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiByb3dfcHJlbmRhWzNdLCBhbGlnbjogXCJSSUdIVFwiLCB3aWR0aDogMC4yIH1cclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHByaW50ZXIuZHJhd0xpbmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcmludGVyLnRleHQoXCJDdWVudGEgVG90YWw6ICRcIiArIFN0cmluZyhwcmVjaW9fY3VlbnRhX3RvdGFsKSlcclxuICAgICAgICAgICAgICAuZmVlZCgpXHJcbiAgICAgICAgICAgICAgLmN1dCgpXHJcbiAgICAgICAgICAgICAgLmNsb3NlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5VTEwgREVWSUNFLCBOTyBQUklOVElOR1wiKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBwcmludFRpY2tldCB9O1xyXG4iLCJcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTsgXHJcbmNvbnN0IERhdGFiYXNlID0gcmVxdWlyZSgnYmV0dGVyLXNxbGl0ZTMnKTtcclxuLy8gbGV0IGRiUGF0aCA9XHJcbi8vICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiXHJcbi8vICAgICAgICAgPyBwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJylcclxuLy8gICAgICAgICA6IHBhdGguam9pbihwcm9jZXNzLnJlc291cmNlc1BhdGgsIFwiLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiXCIpXHJcblxyXG5sZXQgZGJQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwnLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJylcclxuXHJcblxyXG5cclxuY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UoZGJQYXRoLCB7IHZlcmJvc2U6IGNvbnNvbGUubG9nIH0pO1xyXG5kYi5wcmFnbWEoJ2pvdXJuYWxfbW9kZSA9IFdBTCcpO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cy5kYiA9IGRiIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JldHRlcl9zcWxpdGUzX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2VzY3Bvc19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9lc2Nwb3NfdXNiX187IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3BhZC1zdGFydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9lbnRyaWVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvcGFyc2UtZmxvYXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9wYXJzZS1pbnRcIik7IiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaCcpO1xudmFyIGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kKCdBcnJheScsICdmb3JFYWNoJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgbWV0aG9kID0gcmVxdWlyZSgnLi4vc3RyaW5nL3ZpcnR1YWwvcGFkLXN0YXJ0Jyk7XG5cbnZhciBTdHJpbmdQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQucGFkU3RhcnQ7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N0cmluZycgfHwgaXQgPT09IFN0cmluZ1Byb3RvdHlwZVxuICAgIHx8IChpc1Byb3RvdHlwZU9mKFN0cmluZ1Byb3RvdHlwZSwgaXQpICYmIG93biA9PT0gU3RyaW5nUHJvdG90eXBlLnBhZFN0YXJ0KSA/IG1ldGhvZCA6IG93bjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5PYmplY3QuZW50cmllcztcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucGFyc2UtZmxvYXQnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLnBhcnNlRmxvYXQ7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnBhcnNlLWludCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGgucGFyc2VJbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5wYWQtc3RhcnQnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnU3RyaW5nJywgJ3BhZFN0YXJ0Jyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ2FsbGFibGUoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcigkU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT09IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT09IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcblxudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4LCBmaWx0ZXJSZWplY3QgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT09IDY7XG4gIHZhciBJU19GSUxURVJfUkVKRUNUID0gVFlQRSA9PT0gNztcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2Uoc2VsZik7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrZm4sIHRoYXQpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSIHx8IElTX0ZJTFRFUl9SRUpFQ1QgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoKHRhcmdldCwgdmFsdWUpOyAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2Ugc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSA0OiByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICAgICAgY2FzZSA3OiBwdXNoKHRhcmdldCwgdmFsdWUpOyAgICAgIC8vIGZpbHRlclJlamVjdFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyUmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktZmlsdGVyaW5nXG4gIGZpbHRlclJlamVjdDogY3JlYXRlTWV0aG9kKDcpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgJEFycmF5ID0gQXJyYXk7XG5cbi8vIGEgcGFydCBvZiBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5KSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKGlzQ29uc3RydWN0b3IoQykgJiYgKEMgPT09ICRBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyAkQXJyYXkgOiBDO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhcnJheVNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbi8vIGBBcnJheVNwZWNpZXNDcmVhdGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChhcnJheVNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbEFycmF5KSkobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gJE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09PSAnT2JqZWN0JyAmJiBpc0NhbGxhYmxlKE8uY2FsbGVlKSA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIG5hdmlnYXRvciAhPSAndW5kZWZpbmVkJyAmJiBTdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgJyc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG4vLyBhZGQgZGVidWdnaW5nIGluZm9cbnJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIHdyYXBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChOYXRpdmVDb25zdHJ1Y3Rvcikge1xuICB2YXIgV3JhcHBlciA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBXcmFwcGVyKSB7XG4gICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEsIGIpO1xuICAgICAgfSByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEsIGIsIGMpO1xuICAgIH0gcmV0dXJuIGFwcGx5KE5hdGl2ZUNvbnN0cnVjdG9yLCB0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuICBXcmFwcGVyLnByb3RvdHlwZSA9IE5hdGl2ZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgcmV0dXJuIFdyYXBwZXI7XG59O1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgUFJPVE8gPSBvcHRpb25zLnByb3RvO1xuXG4gIHZhciBuYXRpdmVTb3VyY2UgPSBHTE9CQUwgPyBnbG9iYWwgOiBTVEFUSUMgPyBnbG9iYWxbVEFSR0VUXSA6IGdsb2JhbFtUQVJHRVRdICYmIGdsb2JhbFtUQVJHRVRdLnByb3RvdHlwZTtcblxuICB2YXIgdGFyZ2V0ID0gR0xPQkFMID8gcGF0aCA6IHBhdGhbVEFSR0VUXSB8fCBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocGF0aCwgVEFSR0VULCB7fSlbVEFSR0VUXTtcbiAgdmFyIHRhcmdldFByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG5cbiAgdmFyIEZPUkNFRCwgVVNFX05BVElWRSwgVklSVFVBTF9QUk9UT1RZUEU7XG4gIHZhciBrZXksIHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSwgbmF0aXZlUHJvcGVydHksIHJlc3VsdFByb3BlcnR5LCBkZXNjcmlwdG9yO1xuXG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgVVNFX05BVElWRSA9ICFGT1JDRUQgJiYgbmF0aXZlU291cmNlICYmIGhhc093bihuYXRpdmVTb3VyY2UsIGtleSk7XG5cbiAgICB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG4gICAgaWYgKFVTRV9OQVRJVkUpIGlmIChvcHRpb25zLmRvbnRDYWxsR2V0U2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5hdGl2ZVNvdXJjZSwga2V5KTtcbiAgICAgIG5hdGl2ZVByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSBuYXRpdmVQcm9wZXJ0eSA9IG5hdGl2ZVNvdXJjZVtrZXldO1xuXG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBpbXBsZW1lbnRhdGlvblxuICAgIHNvdXJjZVByb3BlcnR5ID0gKFVTRV9OQVRJVkUgJiYgbmF0aXZlUHJvcGVydHkpID8gbmF0aXZlUHJvcGVydHkgOiBzb3VyY2Vba2V5XTtcblxuICAgIGlmICghRk9SQ0VEICYmICFQUk9UTyAmJiB0eXBlb2YgdGFyZ2V0UHJvcGVydHkgPT0gdHlwZW9mIHNvdXJjZVByb3BlcnR5KSBjb250aW51ZTtcblxuICAgIC8vIGJpbmQgbWV0aG9kcyB0byBnbG9iYWwgZm9yIGNhbGxpbmcgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGlmIChvcHRpb25zLmJpbmQgJiYgVVNFX05BVElWRSkgcmVzdWx0UHJvcGVydHkgPSBiaW5kKHNvdXJjZVByb3BlcnR5LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2VzIGluIHRoaXMgdmVyc2lvblxuICAgIGVsc2UgaWYgKG9wdGlvbnMud3JhcCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IHdyYXBDb25zdHJ1Y3Rvcihzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgZWxzZSBpZiAoUFJPVE8gJiYgaXNDYWxsYWJsZShzb3VyY2VQcm9wZXJ0eSkpIHJlc3VsdFByb3BlcnR5ID0gdW5jdXJyeVRoaXMoc291cmNlUHJvcGVydHkpO1xuICAgIC8vIGRlZmF1bHQgY2FzZVxuICAgIGVsc2UgcmVzdWx0UHJvcGVydHkgPSBzb3VyY2VQcm9wZXJ0eTtcblxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8IChzb3VyY2VQcm9wZXJ0eSAmJiBzb3VyY2VQcm9wZXJ0eS5zaGFtKSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShyZXN1bHRQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0LCBrZXksIHJlc3VsdFByb3BlcnR5KTtcblxuICAgIGlmIChQUk9UTykge1xuICAgICAgVklSVFVBTF9QUk9UT1RZUEUgPSBUQVJHRVQgKyAnUHJvdG90eXBlJztcbiAgICAgIGlmICghaGFzT3duKHBhdGgsIFZJUlRVQUxfUFJPVE9UWVBFKSkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocGF0aCwgVklSVFVBTF9QUk9UT1RZUEUsIHt9KTtcbiAgICAgIH1cbiAgICAgIC8vIGV4cG9ydCB2aXJ0dWFsIHByb3RvdHlwZSBtZXRob2RzXG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocGF0aFtWSVJUVUFMX1BST1RPVFlQRV0sIGtleSwgc291cmNlUHJvcGVydHkpO1xuICAgICAgLy8gZXhwb3J0IHJlYWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIGlmIChvcHRpb25zLnJlYWwgJiYgdGFyZ2V0UHJvdG90eXBlICYmIChGT1JDRUQgfHwgIXRhcmdldFByb3RvdHlwZVtrZXldKSkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0UHJvdG90eXBlLCBrZXksIHNvdXJjZVByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBhcHBseSA9IEZ1bmN0aW9uUHJvdG90eXBlLmFwcGx5O1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgYmluZCA9IHVuY3VycnlUaGlzKHVuY3VycnlUaGlzLmJpbmQpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0KSB7XG4gIGFDYWxsYWJsZShmbik7XG4gIHJldHVybiB0aGF0ID09PSB1bmRlZmluZWQgPyBmbiA6IE5BVElWRV9CSU5EID8gYmluZChmbiwgdGhhdCkgOiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1mdW5jdGlvbi1wcm90b3R5cGUtYmluZCAtLSBzYWZlXG4gIHZhciB0ZXN0ID0gKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkuYmluZCgpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuIHR5cGVvZiB0ZXN0ICE9ICdmdW5jdGlvbicgfHwgdGVzdC5oYXNPd25Qcm9wZXJ0eSgncHJvdG90eXBlJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGNhbGwpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShjYWxsLCBhcmd1bWVudHMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIC8vIE5hc2hvcm4gYnVnOlxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTI4XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzExMzBcbiAgaWYgKGNsYXNzb2ZSYXcoZm4pID09PSAnRnVuY3Rpb24nKSByZXR1cm4gdW5jdXJyeVRoaXMoZm4pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG52YXIgdW5jdXJyeVRoaXNXaXRoQmluZCA9IE5BVElWRV9CSU5EICYmIEZ1bmN0aW9uUHJvdG90eXBlLmJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IHVuY3VycnlUaGlzV2l0aEJpbmQgOiBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbC5hcHBseShmbiwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUiwgTUVUSE9EKSB7XG4gIHZhciBOYW1lc3BhY2UgPSBwYXRoW0NPTlNUUlVDVE9SICsgJ1Byb3RvdHlwZSddO1xuICB2YXIgcHVyZU1ldGhvZCA9IE5hbWVzcGFjZSAmJiBOYW1lc3BhY2VbTUVUSE9EXTtcbiAgaWYgKHB1cmVNZXRob2QpIHJldHVybiBwdXJlTWV0aG9kO1xuICB2YXIgTmF0aXZlQ29uc3RydWN0b3IgPSBnbG9iYWxbQ09OU1RSVUNUT1JdO1xuICB2YXIgTmF0aXZlUHJvdG90eXBlID0gTmF0aXZlQ29uc3RydWN0b3IgJiYgTmF0aXZlQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICByZXR1cm4gTmF0aXZlUHJvdG90eXBlICYmIE5hdGl2ZVByb3RvdHlwZVtNRVRIT0RdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHZhcmlhYmxlKSA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxuLy8gYEdldE1ldGhvZGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoViwgUCkge1xuICB2YXIgZnVuYyA9IFZbUF07XG4gIHJldHVybiBpc051bGxPclVuZGVmaW5lZChmdW5jKSA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICBjaGVjayh0eXBlb2YgdGhpcyA9PSAnb2JqZWN0JyAmJiB0aGlzKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFua3MgdG8gSUU4IGZvciBpdHMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT09IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICEkT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6ICRPYmplY3QoaXQpO1xufSA6ICRPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IHVuY3VycnlUaGlzKEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKCFpc0NhbGxhYmxlKHN0b3JlLmluc3BlY3RTb3VyY2UpKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZyhpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbi8vIGBJc0FycmF5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNhcnJheVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWlzYXJyYXkgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJndW1lbnQpID09PSAnQXJyYXknO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3RcbnZhciBkb2N1bWVudEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PSAnb2JqZWN0JyAmJiBkb2N1bWVudC5hbGw7XG5cbi8vIGBJc0NhbGxhYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tdHlwZW9mLXVuZGVmaW5lZCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgZG9jdW1lbnRBbGwgPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRBbGwgIT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbicgfHwgYXJndW1lbnQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBjb25zdHJ1Y3QgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ2NvbnN0cnVjdCcpO1xudmFyIGNvbnN0cnVjdG9yUmVnRXhwID0gL15cXHMqKD86Y2xhc3N8ZnVuY3Rpb24pXFxiLztcbnZhciBleGVjID0gdW5jdXJyeVRoaXMoY29uc3RydWN0b3JSZWdFeHAuZXhlYyk7XG52YXIgSU5DT1JSRUNUX1RPX1NUUklORyA9ICFjb25zdHJ1Y3RvclJlZ0V4cC50ZXN0KG5vb3ApO1xuXG52YXIgaXNDb25zdHJ1Y3Rvck1vZGVybiA9IGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcbiAgaWYgKCFpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIGNvbnN0cnVjdChub29wLCBbXSwgYXJndW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxudmFyIGlzQ29uc3RydWN0b3JMZWdhY3kgPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgc3dpdGNoIChjbGFzc29mKGFyZ3VtZW50KSkge1xuICAgIGNhc2UgJ0FzeW5jRnVuY3Rpb24nOlxuICAgIGNhc2UgJ0dlbmVyYXRvckZ1bmN0aW9uJzpcbiAgICBjYXNlICdBc3luY0dlbmVyYXRvckZ1bmN0aW9uJzogcmV0dXJuIGZhbHNlO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gd2UgY2FuJ3QgY2hlY2sgLnByb3RvdHlwZSBzaW5jZSBjb25zdHJ1Y3RvcnMgcHJvZHVjZWQgYnkgLmJpbmQgaGF2ZW4ndCBpdFxuICAgIC8vIGBGdW5jdGlvbiN0b1N0cmluZ2AgdGhyb3dzIG9uIHNvbWUgYnVpbHQtaXQgZnVuY3Rpb24gaW4gc29tZSBsZWdhY3kgZW5naW5lc1xuICAgIC8vIChmb3IgZXhhbXBsZSwgYERPTVF1YWRgIGFuZCBzaW1pbGFyIGluIEZGNDEtKVxuICAgIHJldHVybiBJTkNPUlJFQ1RfVE9fU1RSSU5HIHx8ICEhZXhlYyhjb25zdHJ1Y3RvclJlZ0V4cCwgaW5zcGVjdFNvdXJjZShhcmd1bWVudCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5pc0NvbnN0cnVjdG9yTGVnYWN5LnNoYW0gPSB0cnVlO1xuXG4vLyBgSXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gIWNvbnN0cnVjdCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBjYWxsZWQ7XG4gIHJldHVybiBpc0NvbnN0cnVjdG9yTW9kZXJuKGlzQ29uc3RydWN0b3JNb2Rlcm4uY2FsbClcbiAgICB8fCAhaXNDb25zdHJ1Y3Rvck1vZGVybihPYmplY3QpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlOyB9KVxuICAgIHx8IGNhbGxlZDtcbn0pID8gaXNDb25zdHJ1Y3RvckxlZ2FjeSA6IGlzQ29uc3RydWN0b3JNb2Rlcm47XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT09IE5BVElWRSA/IGZhbHNlXG4gICAgOiBpc0NhbGxhYmxlKGRldGVjdGlvbikgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHdlIGNhbid0IHVzZSBqdXN0IGBpdCA9PSBudWxsYCBzaW5jZSBvZiBgZG9jdW1lbnQuYWxsYCBzcGVjaWFsIGNhc2Vcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3QtYWVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IG51bGwgfHwgaXQgPT09IHVuZGVmaW5lZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyICRTeW1ib2wgPSBnZXRCdWlsdEluKCdTeW1ib2wnKTtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoJFN5bWJvbCkgJiYgaXNQcm90b3R5cGVPZigkU3ltYm9sLnByb3RvdHlwZSwgJE9iamVjdChpdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYExlbmd0aE9mQXJyYXlMaWtlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbGVuZ3Rob2ZhcnJheWxpa2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdG9MZW5ndGgob2JqLmxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgTWF0aC50cnVuY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hdGgudHJ1bmNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1tYXRoLXRydW5jIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gIHZhciBuID0gK3g7XG4gIHJldHVybiAobiA+IDAgPyBmbG9vciA6IGNlaWwpKG4pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciAkcGFyc2VGbG9hdCA9IGdsb2JhbC5wYXJzZUZsb2F0O1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgSVRFUkFUT1IgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZPUkNFRCA9IDEgLyAkcGFyc2VGbG9hdCh3aGl0ZXNwYWNlcyArICctMCcpICE9PSAtSW5maW5pdHlcbiAgLy8gTVMgRWRnZSAxOC0gYnJva2VuIHdpdGggYm94ZWQgc3ltYm9sc1xuICB8fCAoSVRFUkFUT1IgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHsgJHBhcnNlRmxvYXQoT2JqZWN0KElURVJBVE9SKSk7IH0pKTtcblxuLy8gYHBhcnNlRmxvYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wYXJzZWZsb2F0LXN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUZsb2F0KHN0cmluZykge1xuICB2YXIgdHJpbW1lZFN0cmluZyA9IHRyaW0odG9TdHJpbmcoc3RyaW5nKSk7XG4gIHZhciByZXN1bHQgPSAkcGFyc2VGbG9hdCh0cmltbWVkU3RyaW5nKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gMCAmJiBjaGFyQXQodHJpbW1lZFN0cmluZywgMCkgPT09ICctJyA/IC0wIDogcmVzdWx0O1xufSA6ICRwYXJzZUZsb2F0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciAkcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBJVEVSQVRPUiA9IFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgaGV4ID0gL15bKy1dPzB4L2k7XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKGhleC5leGVjKTtcbnZhciBGT1JDRUQgPSAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMHgxNicpICE9PSAyMlxuICAvLyBNUyBFZGdlIDE4LSBicm9rZW4gd2l0aCBib3hlZCBzeW1ib2xzXG4gIHx8IChJVEVSQVRPUiAmJiAhZmFpbHMoZnVuY3Rpb24gKCkgeyAkcGFyc2VJbnQoT2JqZWN0KElURVJBVE9SKSk7IH0pKTtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIHBhcnNlSW50KHN0cmluZywgcmFkaXgpIHtcbiAgdmFyIFMgPSB0cmltKHRvU3RyaW5nKHN0cmluZykpO1xuICByZXR1cm4gJHBhcnNlSW50KFMsIChyYWRpeCA+Pj4gMCkgfHwgKGV4ZWMoaGV4LCBTKSA/IDE2IDogMTApKTtcbn0gOiAkcGFyc2VJbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IG5ldyAkVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhc093bihPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLCBPLCBQKSwgT1tQXSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBPYmplY3RQcm90b3R5cGUgPSAkT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/ICRPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICB2YXIgb2JqZWN0ID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXNPd24ob2JqZWN0LCBJRV9QUk9UTykpIHJldHVybiBvYmplY3RbSUVfUFJPVE9dO1xuICB2YXIgY29uc3RydWN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmIChpc0NhbGxhYmxlKGNvbnN0cnVjdG9yKSAmJiBvYmplY3QgaW5zdGFuY2VvZiBjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mICRPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyh7fS5pc1Byb3RvdHlwZU9mKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhc093bihoaWRkZW5LZXlzLCBrZXkpICYmIGhhc093bihPLCBrZXkpICYmIHB1c2gocmVzdWx0LCBrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzT3duKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHB1c2gocmVzdWx0LCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qta2V5cyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgb2JqZWN0R2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gdW5jdXJyeVRoaXMoJHByb3BlcnR5SXNFbnVtZXJhYmxlKTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbi8vIGluIHNvbWUgSUUgdmVyc2lvbnMsIGBwcm9wZXJ0eUlzRW51bWVyYWJsZWAgcmV0dXJucyBpbmNvcnJlY3QgcmVzdWx0IG9uIGludGVnZXIga2V5c1xuLy8gb2YgYG51bGxgIHByb3RvdHlwZSBvYmplY3RzXG52YXIgSUVfQlVHID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWNyZWF0ZSAtLSBzYWZlXG4gIHZhciBPID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgT1syXSA9IDI7XG4gIHJldHVybiAhcHJvcGVydHlJc0VudW1lcmFibGUoTywgMik7XG59KTtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIElFX1dPUktBUk9VTkQgPSBJRV9CVUcgJiYgb2JqZWN0R2V0UHJvdG90eXBlT2YoTykgPT09IG51bGw7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCAoSUVfV09SS0FST1VORCA/IGtleSBpbiBPIDogcHJvcGVydHlJc0VudW1lcmFibGUoTywga2V5KSkpIHtcbiAgICAgICAgcHVzaChyZXN1bHQsIFRPX0VOVFJJRVMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgT2JqZWN0LmVudHJpZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4gIGVudHJpZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYE9iamVjdC52YWx1ZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC52YWx1ZXNcbiAgdmFsdWVzOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIGdsb2JhbFRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXNbU0hBUkVEXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShTSEFSRUQsIHt9KTtcblxuKHN0b3JlLnZlcnNpb25zIHx8IChzdG9yZS52ZXJzaW9ucyA9IFtdKSkucHVzaCh7XG4gIHZlcnNpb246ICczLjM2LjAnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTQtMjAyNCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KScsXG4gIGxpY2Vuc2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9ibG9iL3YzLjM2LjAvTElDRU5TRScsXG4gIHNvdXJjZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzJ1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSB8fCB7fSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzI4MFxudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC9WZXJzaW9uXFwvMTAoPzpcXC5cXGQrKXsxLDJ9KD86IFtcXHcuL10rKT8oPzogTW9iaWxlXFwvXFx3Kyk/IFNhZmFyaVxcLy8udGVzdCh1c2VyQWdlbnQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciAkcmVwZWF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1yZXBlYXQnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgcmVwZWF0ID0gdW5jdXJyeVRoaXMoJHJlcGVhdCk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG52YXIgY2VpbCA9IE1hdGguY2VpbDtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBwYWRTdGFydCwgcGFkRW5kIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfRU5EKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIG1heExlbmd0aCwgZmlsbFN0cmluZykge1xuICAgIHZhciBTID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBpbnRNYXhMZW5ndGggPSB0b0xlbmd0aChtYXhMZW5ndGgpO1xuICAgIHZhciBzdHJpbmdMZW5ndGggPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlsbFN0ciA9IGZpbGxTdHJpbmcgPT09IHVuZGVmaW5lZCA/ICcgJyA6IHRvU3RyaW5nKGZpbGxTdHJpbmcpO1xuICAgIHZhciBmaWxsTGVuLCBzdHJpbmdGaWxsZXI7XG4gICAgaWYgKGludE1heExlbmd0aCA8PSBzdHJpbmdMZW5ndGggfHwgZmlsbFN0ciA9PT0gJycpIHJldHVybiBTO1xuICAgIGZpbGxMZW4gPSBpbnRNYXhMZW5ndGggLSBzdHJpbmdMZW5ndGg7XG4gICAgc3RyaW5nRmlsbGVyID0gcmVwZWF0KGZpbGxTdHIsIGNlaWwoZmlsbExlbiAvIGZpbGxTdHIubGVuZ3RoKSk7XG4gICAgaWYgKHN0cmluZ0ZpbGxlci5sZW5ndGggPiBmaWxsTGVuKSBzdHJpbmdGaWxsZXIgPSBzdHJpbmdTbGljZShzdHJpbmdGaWxsZXIsIDAsIGZpbGxMZW4pO1xuICAgIHJldHVybiBJU19FTkQgPyBTICsgc3RyaW5nRmlsbGVyIDogc3RyaW5nRmlsbGVyICsgUztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5wYWRzdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUucGFkRW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnBhZGVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgJFJhbmdlRXJyb3IgPSBSYW5nZUVycm9yO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGVhdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpIHtcbiAgdmFyIHN0ciA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBuID0gdG9JbnRlZ2VyT3JJbmZpbml0eShjb3VudCk7XG4gIGlmIChuIDwgMCB8fCBuID09PSBJbmZpbml0eSkgdGhyb3cgbmV3ICRSYW5nZUVycm9yKCdXcm9uZyBudW1iZXIgb2YgcmVwZXRpdGlvbnMnKTtcbiAgZm9yICg7biA+IDA7IChuID4+Pj0gMSkgJiYgKHN0ciArPSBzdHIpKSBpZiAobiAmIDEpIHJlc3VsdCArPSBzdHI7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXlsnICsgd2hpdGVzcGFjZXMgKyAnXSsnKTtcbnZhciBydHJpbSA9IFJlZ0V4cCgnKF58W14nICsgd2hpdGVzcGFjZXMgKyAnXSlbJyArIHdoaXRlc3BhY2VzICsgJ10rJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSByZXBsYWNlKHN0cmluZywgbHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHJlcGxhY2Uoc3RyaW5nLCBydHJpbSwgJyQxJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciAkU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBzeW1ib2wgPSBTeW1ib2woJ3N5bWJvbCBkZXRlY3Rpb24nKTtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gYGdldC1vd24tcHJvcGVydHktc3ltYm9sc2AgcG9seWZpbGwgc3ltYm9scyBjb252ZXJ0ZWQgdG8gb2JqZWN0IGFyZSBub3QgU3ltYm9sIGluc3RhbmNlc1xuICAvLyBuYjogRG8gbm90IGNhbGwgYFN0cmluZ2AgZGlyZWN0bHkgdG8gYXZvaWQgdGhpcyBiZWluZyBvcHRpbWl6ZWQgb3V0IHRvIGBzeW1ib2wrJydgIHdoaWNoIHdpbGwsXG4gIC8vIG9mIGNvdXJzZSwgZmFpbC5cbiAgcmV0dXJuICEkU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0cnVuYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYXRoLXRydW5jJyk7XG5cbi8vIGBUb0ludGVnZXJPckluZmluaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2Vyb3JpbmZpbml0eVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIG51bWJlciA9ICthcmd1bWVudDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiB0cnVuYyhudW1iZXIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGxlbiA9IHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpO1xuICByZXR1cm4gbGVuID4gMCA/IG1pbihsZW4sIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiAkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBvcmRpbmFyeVRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSB8fCBpc1N5bWJvbChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGV4b3RpY1RvUHJpbSA9IGdldE1ldGhvZChpbnB1dCwgVE9fUFJJTUlUSVZFKTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSkge1xuICAgIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnZGVmYXVsdCc7XG4gICAgcmVzdWx0ID0gY2FsbChleG90aWNUb1ByaW0sIGlucHV0LCBwcmVmKTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkgfHwgaXNTeW1ib2wocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoY2xhc3NvZihhcmd1bWVudCkgPT09ICdTeW1ib2wnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDM2LVxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzMzNFxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdwcm90b3R5cGUnLCB7XG4gICAgdmFsdWU6IDQyLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KS5wcm90b3R5cGUgIT09IDQyO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sWydmb3InXSB8fCBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzT3duKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkpIHtcbiAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBOQVRJVkVfU1lNQk9MICYmIGhhc093bihTeW1ib2wsIG5hbWUpXG4gICAgICA/IFN5bWJvbFtuYW1lXVxuICAgICAgOiBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDInICtcbiAgJ1xcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9PSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZW50cmllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXknKS5lbnRyaWVzO1xuXG4vLyBgT2JqZWN0LmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZW50cmllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKE8pIHtcbiAgICByZXR1cm4gJGVudHJpZXMoTyk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHBhcnNlRmxvYXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWZsb2F0Jyk7XG5cbi8vIGBwYXJzZUZsb2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VmbG9hdC1zdHJpbmdcbiQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogcGFyc2VGbG9hdCAhPT0gJHBhcnNlRmxvYXQgfSwge1xuICBwYXJzZUZsb2F0OiAkcGFyc2VGbG9hdFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkcGFyc2VJbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludCcpO1xuXG4vLyBgcGFyc2VJbnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wYXJzZWludC1zdHJpbmctcmFkaXhcbiQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogcGFyc2VJbnQgIT09ICRwYXJzZUludCB9LCB7XG4gIHBhcnNlSW50OiAkcGFyc2VJbnRcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHBhZFN0YXJ0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1wYWQnKS5zdGFydDtcbnZhciBXRUJLSVRfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1wYWQtd2Via2l0LWJ1ZycpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucGFkc3RhcnRcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBXRUJLSVRfQlVHIH0sIHtcbiAgcGFkU3RhcnQ6IGZ1bmN0aW9uIHBhZFN0YXJ0KG1heExlbmd0aCAvKiAsIGZpbGxTdHJpbmcgPSAnICcgKi8pIHtcbiAgICByZXR1cm4gJHBhZFN0YXJ0KHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIi8vIGVtcHR5XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vLi4vZXMvYXJyYXkvdmlydHVhbC9mb3ItZWFjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIG1ldGhvZCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbnZhciBET01JdGVyYWJsZXMgPSB7XG4gIERPTVRva2VuTGlzdDogdHJ1ZSxcbiAgTm9kZUxpc3Q6IHRydWVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5mb3JFYWNoO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpc1Byb3RvdHlwZU9mKEFycmF5UHJvdG90eXBlLCBpdCkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5mb3JFYWNoKVxuICAgIHx8IGhhc093bihET01JdGVyYWJsZXMsIGNsYXNzb2YoaXQpKSA/IG1ldGhvZCA6IG93bjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvcGFkLXN0YXJ0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9lbnRyaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uL2VzL3BhcnNlLWZsb2F0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uL2VzL3BhcnNlLWludCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcblxuY29uc3QgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4sIE5vdGlmaWNhdGlvbiB9ID0gcmVxdWlyZSgnZWxlY3Ryb24nKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7IFxuXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcblxuXG5cbmNvbnN0IGRibWdyID0gcmVxdWlyZShcIi4vaGVscGVycy9kYXRhYmFzZS5qc1wiKVxuY29uc3QgZGIgPSBkYm1nci5kYlxuXG5jb25zdCB7cHJpbnRUaWNrZXR9ID0gcmVxdWlyZShcIi4vaGVscGVycy9UaWNrZXRzLmpzXCIpXG5cbi8vR0xPQkFMIFdpbmRvd3NcbmxldCB3aW47XG5sZXQgd2lubG9naW47XG5cblxuYXBwLndoZW5SZWFkeSgpLnRoZW4oY3JlYXRlV2luZG93KVxuXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXG5cblxuLy8gLS0tLS0tLS0tLS0tXG4vLyAgICBXSU5ET1dTXG4vLyAtLS0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVdpbmRvdyAoKSB7XG4gIHdpbiA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgIFxuICAgZnVsbHNjcmVlbjp0cnVlLFxuICAgbWF4aW1pemU6IHRydWUsXG4gICB0aXRsZUJhclN0eWxlOiAnaGlkZGVuJyxcbiAgIHRpdGxlQmFyT3ZlcmxheTogdHJ1ZSxcbiAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgIC8vICBub2RlSW50ZWdyYXRpb246IHRydWUsXG4gICAgLy8gY29udGV4dElzb2xhdGlvbjp0cnVlLFxuICAgICBkZXZUb29sczp0cnVlLFxuICAgICBcbiAgIHByZWxvYWQ6cGF0aC5qb2luKF9fZGlybmFtZSwgJ3ByZWxvYWQtaW5kZXguanMnKVxuICAgfVxuXG4gfSlcblxuICAvL3dpbi5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi9Gcm9udEVuZC9wYWdlcy9ub3Rhcy92ZXJfbm90YXMuaHRtbCcpKVxuICAvLyB3aW4ubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vRnJvbnRFbmQvaW5kZXguaHRtbCcpKVxuICB3aW4ubWF4aW1pemUodHJ1ZSlcbiAgd2luLndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xuICBcbiAgaWYgKGlzUHJvZCkge1xuICAgIGF3YWl0IHdpbi5sb2FkVVJMKCdhcHA6Ly8uL2hvbWUnKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmFyZ3ZbMl1cbiAgICBhd2FpdCB3aW4ubG9hZFVSTChgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2hvbWVgKVxuICAgIHdpbi53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvZ2luV2luZG93ICgpIHtcbiAgd2lubG9naW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICB3aWR0aDogODAwLFxuICAgaGVpZ2h0OiA2MDAsXG4gICB3ZWJQcmVmZXJlbmNlczoge1xuICAgIC8vIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZSxcbiAgICAvLyBjb250ZXh0SXNvbGF0aW9uOnRydWUsXG4gICAgIGRldlRvb2xzOnRydWUsXG4gICAgIHByZWxvYWQ6cGF0aC5qb2luKF9fZGlybmFtZSwgJ3ByZWxvYWQtbG9naW4uanMnKVxuICAgICBcbiAgIH1cbiB9KVxuXG4vLyAgd2lubG9naW4ubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vbG9naW4uaHRtbCcpKTtcbiB3aW5sb2dpbi53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcblxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgICBBUFAgRVZFTlRTXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnZGFyd2luJykge1xuICAgIGFwcC5xdWl0KClcbiAgICBkYi5jbG9zZSgpXG4gIH1cbn0pXG5cbmFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XG4gIGlmIChCcm93c2VyV2luZG93LmdldEFsbFdpbmRvd3MoKS5sZW5ndGggPT09IDApIHtcbiAgICBjcmVhdGVXaW5kb3coKVxuICB9XG59KVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgICAgICAgICBIQU5ETEVSU1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlwY01haW4uaGFuZGxlKCd2YWxpZGF0ZScsIChldmVudCwgb2JqKSA9PiB7XG4gIHZhbGlkYXRlbG9naW4ob2JqKVxufSk7XG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6Z2V0X2xpc3QnLCBoYW5kbGVTdWN1cnNhbEdldExpc3QpXG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6Z2V0X2xpc3RfcHJlY2lvcycsIGhhbmRsZVN1Y3Vyc2FsR2V0TGlzdFByZWNpb3MpXG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6dXBkYXRlX2xpc3RfcHJlY2lvcycsIGhhbmRsZVN1Y3Vyc2FsVXBkYXRlTGlzdFByZWNpb3MpXG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6c2F2ZV9wcmVuZGEnLCBoYW5kbGVyU2F2ZVByZW5kYVByZWNpbylcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDpkZWxldGVfcHJlbmRhJywgaGFuZGxlckRlbGV0ZVByZW5kYSlcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDp1cGRhdGVfcHJlbmRhJywgaGFuZGxlclVwZGF0ZVByZW5kYSlcbmlwY01haW4uaGFuZGxlKCdOb3RhczpzYXZlX25vdGEnLCBoYW5kbGVyU2F2ZU5vdGEpXG5pcGNNYWluLmhhbmRsZSgnTm90YXM6Z2V0X2xpc3Rfbm90YXMnLCBoYW5kbGVyR2V0TGlzdE5vdGFzKVxuaXBjTWFpbi5oYW5kbGUoJ05vdGFzOmltcHJpbWlyX3RpY2tldCcsIGhhbmRsZXJQcmludFRpY2tldClcbmlwY01haW4uaGFuZGxlKCdOb3RhczplbGltaW5hcl9ub3RhJyxoYW5kbGVyRGVsZXRlTm90YSlcblxuLy8gaGFuZGxlcnMgRnVuY3Rpb25zXG5mdW5jdGlvbiAgdmFsaWRhdGVsb2dpbihvYmopIHtcbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IG9iaiBcbiAgLy8gQ29ubmVjdGlvblxuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG5cbiAgLy9RdWVyeVxuICBsZXQgc3FsID0gYFNFTEVDVCBwYXNzd29yZCAgZnJvbSBVc3VhcmlvIHUgV0hFUkUgdXNlcm5hbWUgPSA/IDtgO1xuICBjb25zdCByb3cgPSBkYi5wcmVwYXJlKHNxbCkuZ2V0KGVtYWlsKTtcbiAgXG4gIC8vIE1hbmFnZSBkYXRhXG4gIGlmKHJvdyl7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUocGFzc3dvcmQpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgaWYgKHJvdy5wYXNzd29yZCA9PSBoYXNoKXtcbiAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzIHZhbGlkYXRpb24nKVxuICAgICAgY3JlYXRlV2luZG93ICgpXG4gICAgICB3aW4uc2hvdygpXG4gICAgICB3aW5sb2dpbi5jbG9zZSgpXG4gICAgfWVsc2V7XG4gICAgICB3aW5sb2dpbi53ZWJDb250ZW50cy5zZW5kKCdlcnJvcicsYHBhc3N3b3JkIGlzbid0IGNvcnJlY3RgKVxuICAgIH1cbiAgfWVsc2V7XG4gICAgd2lubG9naW4ud2ViQ29udGVudHMuc2VuZCgnZXJyb3InLGBVc2VybmFtZSBkb2Vzbid0IGV4aXN0YClcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZVN1Y3Vyc2FsR2V0TGlzdCgpIHtcbiAgLy8gQ29ubmVjdGlvblxuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG5cbiAgICBcbiAgLy9RdWVyeVxuICBsZXQgc3FsID0gYFNFTEVDVCBzdWN1cnNhbF9pZCBhcyBpZCxub21icmUgIGZyb20gU3VjdXJzYWwgO2A7IFxuICBsZXQgZGF0YT1kYi5wcmVwYXJlKHNxbCkuYWxsKCk7XG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN1Y3Vyc2FsR2V0TGlzdFByZWNpb3MoZXZlbnQsc3VjdXJzYWxfaWQsIHJlZ2lzdHJhZG89ZmFsc2UpIHtcbiAgLy8gQ29ubmVjdGlvblxuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG4gIGxldCBzcWwgXG4gIFxuICAvL1F1ZXJ5XG4gIHNxbD0gYFNFTEVDVCAke3JlZ2lzdHJhZG8/J2xwLmxpc3Rhc19wcmVjaW9zX2lkJzoncC5wcmVuZGFfaWQnfSBhcyBpZCxwLm5vbWJyZSxwLnRpcG9fc2VydmljaW8gYXMgc2VydmljaW8sbHAucHJlY2lvICBGUk9NIFByZW5kYSBwXG4gICR7cmVnaXN0cmFkbz8naW5uZXInOidsZWZ0J30gam9pbiAoXG4gICAgU0VMRUNUIGxpc3Rhc19wcmVjaW9zX2lkLHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8gZnJvbSBMaXN0YXNfUHJlY2lvcyBscCBcbiAgICBXSEVSRSBwcmVuZGFfaWQgaXMgbm90IG51bGxcbiAgICAgIGFuZCBpc19hY3RpdmUgaXMgVFJVRSAgXG4gICAgICBhbmQgc3VjdXJzYWxfaWQgPSA/XG4gICkgbHBcbiAgb24gcC5wcmVuZGFfaWQgPWxwLnByZW5kYV9pZCBgOyBcblxuICBsZXQgZGF0YT1kYi5wcmVwYXJlKHNxbCkuYWxsKHN1Y3Vyc2FsX2lkKTtcbiAgXG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3VjdXJzYWxVcGRhdGVMaXN0UHJlY2lvcyhldmVudCxsaXN0X3ByZWNpb3Mpe1xuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG4gIGxpc3RfcHJlY2lvcy5mb3JFYWNoKG9ial9wcmVjaW8gPT4ge1xuICAgIGNvbnN0IHtpZF9wcmVuZGEsaWRfc3VjdXJzYWwscHJlY2lvfSA9IG9ial9wcmVjaW9cbiAgICAvLyBjaGVjYXIgcXVlIGV4aXN0ZSBlbCBlbGVtZW50byBlbiBsYSBsaXN0YSBkZSBwcmVjaW9cbiAgICBcbiAgICBsZXQgc3FsID0gYFNFTEVDVCBwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvIGZyb20gTGlzdGFzX1ByZWNpb3MgbHAgXG4gICAgICAgICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPT8gYW5kIGlzX2FjdGl2ZSBpcyBUUlVFYDsgXG4gICAgbGV0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmdldChbaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsXSk7XG4gICAgXG4gICAgLy8gc2kgZXhpc3RlLCByZXZpc2FyIHNpIGVzIHVuIHByZWNpbyBsbGVubyBvIHZhY2lvXG4gICAgaWYoZGF0YSAhPSBudWxsKXtcbiAgICAgIC8vIHNpIGNhbWJpbyBlbCBwcmVjaW8sIHVwZGF0ZSBhbmQgaW5zZXJ0IG5ldyBwcmVjaW9cbiAgICAgIGlmKHByZWNpby5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYgKGRhdGEucHJlY2lvICE9IHByZWNpbyl7IC8vIEFjdHVhbGl6YSB5IGFncmVnYSBzb2xvIGN1YW5kbyBjYW1iaWEgZWwgcHJlY2lvXG4gICAgICAgICAgLy8gc2UgZGVzYWN0aXZhIGVsIHByZWNpbyBhY3R1YWxcbiAgICAgICAgICBjb25zdCBxdWVyeVVwZGF0ZT1gVVBEQVRFIExpc3Rhc19QcmVjaW9zIFxuICAgICAgICAgIFNFVCBpc19hY3RpdmUgPSBGQUxTRVxuICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0gPyAgYFxuICAgICAgICAgIGNvbnN0IHJlc3VsdFVwZD0gZGIucHJlcGFyZShxdWVyeVVwZGF0ZSkucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU2UgYWdyZWdhIGVsIG51ZXZvIHByZWNpbyBhY3Rpdm9cbiAgICAgICAgICBjb25zdCBxdWVyeUluc2VydE5ldz1gSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MgKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWQUxVRVMgKD8sPyw/KWBcbiAgICAgICAgICBjb25zdCByZXN1bHRJbj0gZGIucHJlcGFyZShxdWVyeUluc2VydE5ldykucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCxwcmVjaW8pO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgcHJpY2UnLHJlc3VsdFVwZCxyZXN1bHRJbilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH1lbHNle1xuICAgICAgICAvLyBzaSBubyBoYXkgcHJlY2lvLCBkZXNhY3RpdmFyIHNvbGFtZW50ZVxuICAgICAgICBjb25zdCBxdWVyeVVwZGF0ZT1gVVBEQVRFIExpc3Rhc19QcmVjaW9zIFxuICAgICAgICAgICAgICAgICAgICBTRVQgaXNfYWN0aXZlID0gRkFMU0VcbiAgICAgICAgICAgICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPSA/ICBgXG4gICAgICAgIGNvbnN0IHJlc3VsdFVwZD0gZGIucHJlcGFyZShxdWVyeVVwZGF0ZSkucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgdG8gZmFsc2UnLHJlc3VsdFVwZClcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgICAvL3Npbm8gZXhpc3RlLCByZXZpc2FyIHNpIHRpZW5lIHByZWNpb1xuICAgICAgLy8gc2kgdGllbmUgcHJlY2lvIC0+IGluc2VydCBwcmVjaW9cbiAgICAgIGlmKHByZWNpby5sZW5ndGggPiAwKXtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0PWBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyAocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbylcbiAgICAgICAgICAgICAgICAgICAgICBWQUxVRVMgKD8sPyw/KWBcbiAgICAgICAgY29uc3QgcmVzdWx0PSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0KS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsLHByZWNpbyk7XG4gICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFxuXG59XG5cbmZ1bmN0aW9uIGhhbmRsZXJTYXZlUHJlbmRhUHJlY2lvKGV2ZW50LGRhdGFQcmVuZGEpe1xuICBjb25zb2xlLmxvZyhkYXRhUHJlbmRhKVxuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG4gIGNvbnN0IHF1ZXJ5SW5zZXJ0TmV3UHJlbmRhPWBJTlNFUlQgSU5UTyBQcmVuZGEgKG5vbWJyZSx0aXBvX3NlcnZpY2lvKVxuICBWQUxVRVMgKD8sPyk7YFxuICBjb25zdCByZXN1bHRJblByZW5kYT0gZGIucHJlcGFyZShxdWVyeUluc2VydE5ld1ByZW5kYSkucnVuKGRhdGFQcmVuZGFbJ25vbWJyZSddLGRhdGFQcmVuZGFbJ3RpcG9fc2VydmljaW8nXSk7XG4gIGNvbnNvbGUubG9nKCdQcmVuZGEgYWdyZWdhZGEuLi4gJyxyZXN1bHRJblByZW5kYSlcbiAgY29uc3QgaWRfcHJlbmRhPXJlc3VsdEluUHJlbmRhLmxhc3RJbnNlcnRSb3dpZFxuICAvLyBTZSBhZ3JlZ2EgZWwgbnVldm8gcHJlY2lvIGFjdGl2b1xuICBjb25zdCBxdWVyeUluc2VydE5ld0xQPWBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyAocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbylcbiAgVkFMVUVTIChsYXN0X2luc2VydF9yb3dpZCgpLD8sPylgXG4gIGNvbnN0IHJlc3VsdEluTFA9IGRiLnByZXBhcmUocXVlcnlJbnNlcnROZXdMUCkucnVuKGRhdGFQcmVuZGFbJ2lkX3N1Y3Vyc2FsJ10sZGF0YVByZW5kYVsncHJlY2lvJ10pO1xuICBcbiAgY29uc29sZS5sb2coJ1ByZW5kYSBhZ3JlZ2FkYSBlbiBMUC4uLiAnLHJlc3VsdEluTFApXG4gIHJldHVybiBpZF9wcmVuZGFcbn1cblxuZnVuY3Rpb24gaGFuZGxlckRlbGV0ZVByZW5kYShldmVudCwgZGF0YVByZW5kYSkge1xuICBjb25zdCB7IGlkX3ByZW5kYSB9ID0gZGF0YVByZW5kYVxuXG4gIHRyeSB7XG4gICAgLy8gVmVyaWZpY2FyIHF1ZSBsb3MgSURzIG5vIHNlYW4gdW5kZWZpbmVkXG4gICAgaWYgKGlkX3ByZW5kYSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbCBpZCBkZSBsYSBwcmVuZGEgbm8gcHVlZGUgc2VyIHVuZGVmaW5lZC4nKTtcbiAgICB9XG4gIFxuICAgICAvLyBFbGltaW5hciBsb3MgcHJlY2lvcyBkZSBsYSBwcmVuZGEgZGUgbGEgdGFibGEgTGlzdGFzX1ByZWNpb3NcbiAgICBjb25zdCBxdWVyeURlbGV0ZUxQID0gYERFTEVURSBGUk9NIExpc3Rhc19QcmVjaW9zIFdIRVJFIHByZW5kYV9pZCA9ID87YDtcbiAgICBjb25zdCByZXN1bHREZWxldGVMUCA9IGRiLnByZXBhcmUocXVlcnlEZWxldGVMUCkucnVuKGlkX3ByZW5kYSk7XG4gICAgY29uc29sZS5sb2coJ1ByZWNpb3MgZGUgcHJlbmRhIGVsaW1pbmFkb3MgZGUgTFAuLi4nLCByZXN1bHREZWxldGVMUCk7XG5cbiAgICAvLyBFbGltaW5hciBsYSBwcmVuZGEgZGUgbGEgdGFibGEgUHJlbmRhXG4gICAgY29uc3QgcXVlcnlEZWxldGVQcmVuZGEgPSBgREVMRVRFIEZST00gUHJlbmRhIFdIRVJFIHByZW5kYV9pZCA9ID87YDtcbiAgICBjb25zdCByZXN1bHREZWxldGVQcmVuZGEgPSBkYi5wcmVwYXJlKHF1ZXJ5RGVsZXRlUHJlbmRhKS5ydW4oaWRfcHJlbmRhKTtcbiAgICBjb25zb2xlLmxvZygnUHJlbmRhIGVsaW1pbmFkYS4uLicsIHJlc3VsdERlbGV0ZVByZW5kYSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG4gIFxufVxuXG5mdW5jdGlvbiBoYW5kbGVyVXBkYXRlUHJlbmRhKGV2ZW50LCBkYXRhUHJlbmRhKXtcblxuICBjb25zdCB7IGlkX3ByZW5kYSwgbm9tYnJlLCBwcmVjaW8sIHRpcG9fc2VydmljaW8sIGlkX3N1Y3Vyc2FsIH0gPSBkYXRhUHJlbmRhO1xuXG4gIHRyeSB7XG4gICAgLy8gVmVyaWZpY2FyIHF1ZSBsb3MgSURzIG5vIHNlYW4gdW5kZWZpbmVkXG4gICAgaWYgKGlkX3ByZW5kYSA9PT0gdW5kZWZpbmVkIHx8IGlkX3N1Y3Vyc2FsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWwgaWQgZGUgbGEgcHJlbmRhIG8gZGUgbGEgc3VjdXJzYWwgbm8gcHVlZGUgc2VyIHVuZGVmaW5lZC4nKTtcbiAgICB9XG4gIFxuICAgIC8vIEFjdHVhbGl6YXIgbm9tYnJlIG8gdGlwb19zZXJ2aWNpbyBcbiAgICBjb25zdCBxdWVyeVVwZGF0ZVByZW5kYSA9IGBVUERBVEUgUHJlbmRhIFNFVCBub21icmUgPSA/LCB0aXBvX3NlcnZpY2lvID0gPyBXSEVSRSBwcmVuZGFfaWQgPSA/O2A7XG4gICAgY29uc3QgcmVzdWx0VXBkYXRlUHJlbmRhID0gZGIucHJlcGFyZShxdWVyeVVwZGF0ZVByZW5kYSkucnVuKG5vbWJyZSwgdGlwb19zZXJ2aWNpbywgaWRfcHJlbmRhKTtcbiAgICBjb25zb2xlLmxvZygnUHJlbmRhIGFjdHVhbGl6YWRhLi4uICcsIHJlc3VsdFVwZGF0ZVByZW5kYSk7XG5cbiAgICBjb25zdCBzcWwgPSBgU0VMRUNUIHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8gZnJvbSBMaXN0YXNfUHJlY2lvcyBscCBcbiAgICAgICAgICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0/IGFuZCBpc19hY3RpdmUgaXMgVFJVRWA7IFxuXG4gICAgY29uc3QgZGF0YT1kYi5wcmVwYXJlKHNxbCkuZ2V0KFtpZF9wcmVuZGEsaWRfc3VjdXJzYWxdKTtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgXG4gICAgLy8gc2kgZXhpc3RlLCByZXZpc2FyIHNpIGVzIHVuIHByZWNpbyBsbGVubyBvIHZhY2lvXG4gICAgaWYoZGF0YSAhPSBudWxsKXtcbiAgICAgIC8vIHNpIGNhbWJpbyBlbCBwcmVjaW8sIHVwZGF0ZSBhbmQgaW5zZXJ0IG5ldyBwcmVjaW9cbiAgICAgIGlmKGRhdGFQcmVuZGEucHJlY2lvLmxlbmd0aCA+IDApe1xuICAgICAgICBpZiAoZGF0YS5wcmVjaW8gIT0gcHJlY2lvKXsgLy8gQWN0dWFsaXphIHkgYWdyZWdhIHNvbG8gY3VhbmRvIGNhbWJpYSBlbCBwcmVjaW9cbiAgICAgICAgICAvLyBzZSBkZXNhY3RpdmEgZWwgcHJlY2lvIGFjdHVhbFxuICAgICAgICAgIGNvbnN0IHF1ZXJ5VXBkYXRlPWBVUERBVEUgTGlzdGFzX1ByZWNpb3MgXG4gICAgICAgICAgICBTRVQgaXNfYWN0aXZlID0gRkFMU0VcbiAgICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0gPyAgYFxuICAgICAgICAgIGNvbnN0IHJlc3VsdFVwZD0gZGIucHJlcGFyZShxdWVyeVVwZGF0ZSkucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU2UgYWdyZWdhIGVsIG51ZXZvIHByZWNpbyBhY3Rpdm9cbiAgICAgICAgICBjb25zdCBxdWVyeUluc2VydE5ldz1gSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MgKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWQUxVRVMgKD8sPyw/KWBcbiAgICAgICAgICBjb25zdCByZXN1bHRJbj0gZGIucHJlcGFyZShxdWVyeUluc2VydE5ldykucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCxwcmVjaW8pO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgcHJpY2UnLHJlc3VsdFVwZCxyZXN1bHRJbilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH1lbHNle1xuICAgICAgICAvLyBzaSBubyBoYXkgcHJlY2lvLCBkZXNhY3RpdmFyIHNvbGFtZW50ZVxuICAgICAgICBjb25zdCBxdWVyeVVwZGF0ZT1gVVBEQVRFIExpc3Rhc19QcmVjaW9zIFxuICAgICAgICAgICAgICAgICAgICBTRVQgaXNfYWN0aXZlID0gRkFMU0VcbiAgICAgICAgICAgICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPSA/ICBgXG4gICAgICAgIGNvbnN0IHJlc3VsdFVwZD0gZGIucHJlcGFyZShxdWVyeVVwZGF0ZSkucnVuKGlkX3ByZW5kYSwgaWRfc3VjdXJzYWwpO1xuICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIHRvIGZhbHNlJyxyZXN1bHRVcGQpXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAvL3Npbm8gZXhpc3RlLCByZXZpc2FyIHNpIHRpZW5lIHByZWNpb1xuICAgICAgLy8gc2kgdGllbmUgcHJlY2lvIC0+IGluc2VydCBwcmVjaW9cbiAgICAgIGlmKHByZWNpby5sZW5ndGggPiAwKXtcbiAgICAgICBcbiAgICAgICBjb25zdCBxdWVyeUluc2VydD1gSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MgKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8pXG4gICAgICAgICAgICAgICAgICAgICBWQUxVRVMgKD8sPyw/KWBcbiAgICAgICBjb25zdCByZXN1bHQ9IGRiLnByZXBhcmUocXVlcnlJbnNlcnQpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwscHJlY2lvKTtcbiAgICAgICBcbiAgICAgIH1cbiAgICB9XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG59XG5cblxuXG5mdW5jdGlvbiBoYW5kbGVyU2F2ZU5vdGEoZXZlbnQsZGF0YU5vdGEpe1xuICBjb25zb2xlLmxvZyhkYXRhTm90YSlcblxuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG4gIGNvbnN0IHtudW1fbm90YSxjbGllbnRlLGlkX3N1Y3Vyc2FsLGZlY2hhX3JlY2VwY2lvbixmZWNoYV9lbnRyZWdhLHByZW5kYXN9PWRhdGFOb3RhXG4gIGNvbnN0IG51bV9ub3RhX2ludD1wYXJzZUludChudW1fbm90YSlcbiAgY29uc3QgaWRfc3VjdXJzYWxfaW50PXBhcnNlSW50KGlkX3N1Y3Vyc2FsKVxuICBjb25zdCBGRV9kaWEgPSBmZWNoYV9yZWNlcGNpb24uZ2V0RGF0ZSgpOyAvLyBPYnRlbmVyIGVsIGTDrWEgZGVsIG1lcyAoZWouIDIzKVxuICBjb25zdCBGRV9tZXMgPSBmZWNoYV9yZWNlcGNpb24uZ2V0TW9udGgoKTsgLy8gT2J0ZW5lciBlbCBtZXMgKDAgcGFyYSBlbmVybywgMSBwYXJhIGZlYnJlcm8sIGV0Yy4pXG4gIGNvbnN0IEZFX2FuaW8gPSBmZWNoYV9yZWNlcGNpb24uZ2V0RnVsbFllYXIoKTsgLy8gT2J0ZW5lciBlbCBhw7FvIChlai4gMjAyNClcbiAgY29uc3QgRkVfZGF0ZT1GRV9hbmlvKyctJytGRV9tZXMrJy0nK0ZFX2RpYVxuICBjb25zdCBGUl9kaWEgPSBmZWNoYV9lbnRyZWdhLmdldERhdGUoKTsgLy8gT2J0ZW5lciBlbCBkw61hIGRlbCBtZXMgKGVqLiAyMylcbiAgY29uc3QgRlJfbWVzID0gZmVjaGFfZW50cmVnYS5nZXRNb250aCgpOyAvLyBPYnRlbmVyIGVsIG1lcyAoMCBwYXJhIGVuZXJvLCAxIHBhcmEgZmVicmVybywgZXRjLilcbiAgY29uc3QgRlJfYW5pbyA9IGZlY2hhX2VudHJlZ2EuZ2V0RnVsbFllYXIoKTsgLy8gT2J0ZW5lciBlbCBhw7FvIChlai4gMjAyNClcbiAgY29uc3QgRlJfZGF0ZT1GUl9hbmlvKyctJytGUl9tZXMrJy0nK0ZSX2RpYVxuICBsZXQgY2xpZW50ZV9pZFxuICBpZihCb29sZWFuKGNsaWVudGUpKXtcbiAgICBjb25zdCBxdWVyeUluc2VydENsaWVudGU9YFxuICAgIElOU0VSVCBJTlRPIGNsaWVudGUgKG5vbWJyZSxzdWN1cnNhbF9pZCxpc19vd25lcl9zdWN1cnNhbClcbiAgICBWQUxVRVMgXHQoPyw/LEZhbHNlKTtcbiAgICBgXG4gICAgY29uc3QgY2xpZW50ZV9pbmZvPWRiLnByZXBhcmUocXVlcnlJbnNlcnRDbGllbnRlKS5ydW4oY2xpZW50ZSxpZF9zdWN1cnNhbF9pbnQpXG4gICAgY2xpZW50ZV9pZD1jbGllbnRlX2luZm8ubGFzdEluc2VydFJvd2lkXG4gIH1lbHNle1xuICAgIGNvbnN0IHF1ZXJ5R2V0Q2xpZW50ZT1gXG4gICAgU0VMRUNUIGMuY2xpZW50ZV9pZCAgZnJvbSBjbGllbnRlIGNcbiAgICB3aGVyZSBjLnN1Y3Vyc2FsX2lkID0gPyBhbmQgYy5pc19vd25lcl9zdWN1cnNhbCA9IFRSVUUgXG4gICAgbGltaXQgMTtcbiAgICBgXG4gICAgY29uc3QgY2xpZW50ZV9pbmZvPWRiLnByZXBhcmUocXVlcnlHZXRDbGllbnRlKS5nZXQoaWRfc3VjdXJzYWxfaW50KVxuICAgIGNsaWVudGVfaWQ9Y2xpZW50ZV9pbmZvLmNsaWVudGVfaWRcbiAgfVxuICBjb25zb2xlLmxvZyhcImNsaWVudGUgYWdyZWdhZG8uLi4gXCIsQm9vbGVhbihjbGllbnRlKSxjbGllbnRlX2lkKVxuICAvLyBPYnRlbmVyIGlkcyBkZSBwcmVuZGFzXG4gIGxldCByZWdfcHJlbmRhcz1bXVxuICBsZXQgcHJlY2lvVG90YWw9MFxuICBwcmVuZGFzLmZvckVhY2gocHJlbmRhX29iaj0+e1xuICAgIGxldCBwcmVuZGFfaWRcbiAgICBpZiAocHJlbmRhX29iai5pc19jb21vZGluKXsgLy9yZWdpc3RybyBkZSBwcmVuZGEgY29tb2RpblxuICAgICAgY29uc3QgcXVlcnlJbnNlcnRQcmVuZGFDb21vZGluPWBcbiAgICAgIElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8sbm9tYnJlX2NvbW9kaW4pXG4gICAgICBWYWx1ZXNcdFx0KG51bGwsPyw/LD8pO2BcbiAgICAgIGxldCBwcmVuZGFfY29tb2Rpbl9yZXM9ZGIucHJlcGFyZShxdWVyeUluc2VydFByZW5kYUNvbW9kaW4pLnJ1bihpZF9zdWN1cnNhbF9pbnQscGFyc2VJbnQocHJlbmRhX29iai5wcmVjaW8pLHByZW5kYV9vYmoucHJlbmRhX2lkKVxuICAgICAgcHJlbmRhX2lkPXByZW5kYV9jb21vZGluX3Jlcy5sYXN0SW5zZXJ0Um93aWRcblxuICAgICAgcHJlY2lvVG90YWwrPShwYXJzZUludChwcmVuZGFfb2JqLnByZWNpbykqcHJlbmRhX29iai5udW1fcHJlbmRhcylcbiAgICB9ZWxzZXsgLy8gTGEgcHJlbmRhIHlhIGVzdMOhIHJlZ2lzdHJhZGEsIG9idGVuZXIgaWRcbiAgICAgIGNvbnN0IHF1ZXJ5R2V0TGlzdGFzUHJlY2lvc0lkPWBcbiAgICAgICAgc2VsZWN0IGwubGlzdGFzX3ByZWNpb3NfaWQsbC5wcmVjaW8gIGZyb20gTGlzdGFzX1ByZWNpb3MgbFxuICAgICAgICBXSEVSRSBsLnByZW5kYV9pZCA9ID9cbiAgICAgICAgYW5kIGwuc3VjdXJzYWxfaWQgPSA/XG4gICAgICAgIGFuZCBsLmlzX2FjdGl2ZSAgaXMgVFJVRVxuICAgICAgICBsaW1pdCAxO2BcbiAgICAgIGxldCBsaXN0YXNfcHJlY2lvc19yZXM9ZGIucHJlcGFyZShxdWVyeUdldExpc3Rhc1ByZWNpb3NJZCkuZ2V0KHBhcnNlSW50KHByZW5kYV9vYmoucHJlbmRhX2lkKSxpZF9zdWN1cnNhbF9pbnQpXG4gICAgICBjb25zb2xlLmxvZyhcImxpc3RhX3ByZWNpb3NcIiwgbGlzdGFzX3ByZWNpb3NfcmVzKVxuICAgICAgcHJlbmRhX2lkPWxpc3Rhc19wcmVjaW9zX3Jlcy5saXN0YXNfcHJlY2lvc19pZFxuICAgICAgcHJlY2lvVG90YWwrPShsaXN0YXNfcHJlY2lvc19yZXMucHJlY2lvKnByZW5kYV9vYmoubnVtX3ByZW5kYXMpXG4gICAgfVxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwcmVuZGFfb2JqLm51bV9wcmVuZGFzOyBpbmRleCsrKSB7IC8vIGFncmVnYW1vcyBlbCBudW1lcm8gZGUgcHJlbmRhc1xuICAgICAgaWYocHJlbmRhX29iai5jb2xvcmVzW2luZGV4XSl7XG4gICAgICAgIHJlZ19wcmVuZGFzLnB1c2goeydwcmVuZGFfbGlzdGFzX3ByZWNpb3NfaWQnOnByZW5kYV9pZCwnY29sb3InOnByZW5kYV9vYmouY29sb3Jlc1tpbmRleF19KVxuICAgICAgfWVsc2V7IC8vIHNpIG5vIHNlIHJlZ2lzdHJhcm9uIG3DoXMgY29sb3Jlcywgc2UgdXRpbGl6YSBlbCB1bHRpbW8sIGxhcyB2ZWNlcyBuZWNlc2FyaWFzXG4gICAgICAgIGxldCBsYXN0X2lkPXByZW5kYV9vYmouY29sb3Jlcy5sZW5ndGgtMVxuICAgICAgICByZWdfcHJlbmRhcy5wdXNoKHsncHJlbmRhX2xpc3Rhc19wcmVjaW9zX2lkJzpwcmVuZGFfaWQsJ2NvbG9yJzpwcmVuZGFfb2JqLmNvbG9yZXNbbGFzdF9pZF19KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgY29uc29sZS5sb2coJ1ByZW5kYXMgcmVnaXN0cmFkYXMnKVxuICBjb25zb2xlLmxvZyhyZWdfcHJlbmRhcylcbiAgY29uc29sZS5sb2coJ1ByZWNpbyB0b3RhbDonLHByZWNpb1RvdGFsKVxuICAvLyBSZWdpc3RybyBkZSBOb3RhXG4gIGNvbnN0IHF1ZXJ5SW5zZXJ0TmV3Tm90YT1gXG4gIElOU0VSVCBJTlRPIE5vdGEgKG51bV9ub3RhLGNsaWVudGVfaWQsZmVjaGFfcmVjZXBjaW9uLGZlY2hhX2VudHJlZ2EscHJlY2lvX3RvdGFsKVxuICAgIFZBTFVFUyBcdCg/LD8sPyw/LD8pO2A7XG5cbiAgY29uc3QgcmVzUHJlbmRhPSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0TmV3Tm90YSkucnVuKG51bV9ub3RhX2ludCxjbGllbnRlX2lkLEZSX2RhdGUsRkVfZGF0ZSxwcmVjaW9Ub3RhbCk7XG4gXG4gIGNvbnN0IG5vdGFfaWQ9cmVzUHJlbmRhLmxhc3RJbnNlcnRSb3dpZDtcbiAgY29uc29sZS5sb2coXCJOb3RhX2lkXCIsbm90YV9pZClcbiAgLy8gUmVnaXN0cm8gZGUgTm90YV9Sb3BhIHBvciBwcmVuZGFcbiAgcmVnX3ByZW5kYXMuZm9yRWFjaChwcmVuZGE9PntcbiAgICBjb25zdCBxdWVyeUluc2VydE5vdGFSb3BhPWBcbiAgICAgIElOU0VSVCBJTlRPIE5vdGFfUm9wYSAobm90YV9pZCxwcmVuZGFfbGlzdGFfcHJlY2lvc19pZCxjb2xvcixkZXRhbGxlcylcbiAgICAgIHZhbHVlc1x0KD8sPyw/LG51bGwpO2A7XG4gICAgZGIucHJlcGFyZShxdWVyeUluc2VydE5vdGFSb3BhKS5ydW4obm90YV9pZCxwcmVuZGEucHJlbmRhX2xpc3Rhc19wcmVjaW9zX2lkLHByZW5kYS5jb2xvcik7XG4gIH0pXG4gIFxuICByZXR1cm4gXCJzdWNjZXNzXCJcbiAgXG5cblxufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZXJHZXRMaXN0Tm90YXMoZXZlbnQsZGF0YU5vdGEpe1xuICAvL2NvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKSk7XG4gIGNvbnN0IHtzdWN1cnNhbF9pZCxudW1fbm90YSxjbGllbnRlX25hbWUsZmVjaGFfZGVzZGUsZmVjaGFfaGFzdGF9PWRhdGFOb3RhXG4gIGNvbnN0IG51bV9ub3RhX2ludD1wYXJzZUludChudW1fbm90YSlcbiAgY29uc3QgaWRfc3VjdXJzYWxfaW50PXBhcnNlSW50KHN1Y3Vyc2FsX2lkKVxuICBjb25zb2xlLmxvZyhzdWN1cnNhbF9pZCxpZF9zdWN1cnNhbF9pbnQsQm9vbGVhbihpZF9zdWN1cnNhbF9pbnQpKVxuXG4gIC8vUXVlcnlcbiAgbGV0IHNxbD0gYFNFTEVDVCBuLm5vdGFfaWQsbi5udW1fbm90YSxcbiAgICAgICAgICBjLm5vbWJyZSBhcyBub21icmVfY2xpZW50ZSxcbiAgICAgICAgICBzLm5vbWJyZSAgYXMgbm9tYnJlX3N1Y3Vyc2FsLFxuICAgICAgICAgIG4ucHJlY2lvX3RvdGFsLFxuICAgICAgICAgIG4uZmVjaGFfcmVnaXN0cm8sXG4gICAgICAgICAgbi5mZWNoYV9yZWNlcGNpb24sXG4gICAgICAgICAgbi5mZWNoYV9lbnRyZWdhLFxuICAgICAgICAgIGxwLmxpc3Rhc19wcmVjaW9zX2lkIGFzIHByZW5kYV9pZCAsXG4gICAgICAgICAgaWZudWxsKHAubm9tYnJlLGxwLm5vbWJyZV9jb21vZGluKSBhcyBub21icmVfcHJlbmRhLFxuICAgICAgICAgIG5yLmNvbG9yLFxuICAgICAgICAgIHAudGlwb19zZXJ2aWNpbyxcbiAgICAgICAgICBscC5wcmVjaW9cbiAgICAgICAgRlJPTSBOb3RhIG4gXG4gICAgICAgIElOTkVSIEpPSU4gTm90YV9Sb3BhIG5yIFxuICAgICAgICBPTiBuLm5vdGFfaWQgPW5yLm5vdGFfaWQgXG4gICAgICAgIElOTkVSIEpPSU4gTGlzdGFzX1ByZWNpb3MgbHAgXG4gICAgICAgIE9OIG5yLnByZW5kYV9saXN0YV9wcmVjaW9zX2lkID1scC5saXN0YXNfcHJlY2lvc19pZCBcbiAgICAgICAgTEVGVCBqb2luIFByZW5kYSBwIFxuICAgICAgICBPTiBscC5wcmVuZGFfaWQgPXAucHJlbmRhX2lkXG4gICAgICAgIExFRlQgSk9JTiBDbGllbnRlIGNcbiAgICAgICAgT04gbi5jbGllbnRlX2lkID1jLmNsaWVudGVfaWRcbiAgICAgICAgTEVGVCBKT0lOIFN1Y3Vyc2FsIHMgXG4gICAgICAgIE9OIGMuc3VjdXJzYWxfaWQgID1zLnN1Y3Vyc2FsX2lkICBcbiAgICAgICAgV0hFUkUgVFJVRSBgOyBcblxuICBsZXQgYmluZFBhcmFtZXRlcnM9W11cbiAgaWYoaWRfc3VjdXJzYWxfaW50KXtcbiAgICBzcWwrPWAgQU5EIHMuc3VjdXJzYWxfaWQgPSA/IGA7XG4gICAgYmluZFBhcmFtZXRlcnMucHVzaChpZF9zdWN1cnNhbF9pbnQpXG4gIH1cbiAgaWYobnVtX25vdGFfaW50KXtcbiAgICBzcWwrPWAgQU5EIG4ubnVtX25vdGEgPSA/IGA7XG4gICAgYmluZFBhcmFtZXRlcnMucHVzaChudW1fbm90YV9pbnQpXG4gIH1cbiAgaWYoY2xpZW50ZV9uYW1lKXtcbiAgICBzcWwrPWAgQU5EIGxvd2VyKGMubm9tYnJlKSBsaWtlID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKCclJytjbGllbnRlX25hbWUudG9Mb3dlckNhc2UoKSsnJScpXG4gIH1cbiAgaWYoZmVjaGFfZGVzZGUpe1xuICAgIGNvbnN0IEZlY2hhX2Rlc2RlX2RpYT1mZWNoYV9kZXNkZS5zcGxpdCgnLycpWzBdXG4gICAgY29uc3QgRmVjaGFfZGVzZGVfbWVzPWZlY2hhX2Rlc2RlLnNwbGl0KCcvJylbMV1cbiAgICBjb25zdCBGZWNoYV9kZXNkZV9hbmlvPXBhcnNlSW50KGZlY2hhX2Rlc2RlLnNwbGl0KCcvJylbMl0pXG4gICAgY29uc3QgRmVjaGFfZGVzZGVfZGF0ZT1GZWNoYV9kZXNkZV9hbmlvKyctJytGZWNoYV9kZXNkZV9tZXMrJy0nK0ZlY2hhX2Rlc2RlX2RpYVxuXG4gICAgc3FsKz1gIEFORCBmZWNoYV9yZWdpc3RybyAgPj0gPyBgO1xuICAgIGJpbmRQYXJhbWV0ZXJzLnB1c2goRmVjaGFfZGVzZGVfZGF0ZSlcblxuICB9XG4gIGlmKGZlY2hhX2hhc3RhKXtcbiAgICBjb25zdCBGZWNoYV9oYXN0YV9kaWE9KHBhcnNlSW50KGZlY2hhX2hhc3RhLnNwbGl0KCcvJylbMF0pKzEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKVxuICAgIGNvbnN0IEZlY2hhX2hhc3RhX21lcz1mZWNoYV9oYXN0YS5zcGxpdCgnLycpWzFdXG4gICAgY29uc3QgRmVjaGFfaGFzdGFfYW5pbz1wYXJzZUludChmZWNoYV9oYXN0YS5zcGxpdCgnLycpWzJdKVxuICAgIGNvbnN0IEZlY2hhX2hhc3RhX2RhdGU9RmVjaGFfaGFzdGFfYW5pbysnLScrRmVjaGFfaGFzdGFfbWVzKyctJytGZWNoYV9oYXN0YV9kaWFcblxuICAgIHNxbCs9YCBBTkQgZmVjaGFfcmVnaXN0cm8gIDw9ID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKEZlY2hhX2hhc3RhX2RhdGUpXG4gIH1cbiAgY29uc29sZS5sb2coc3FsKVxuICBjb25zb2xlLmxvZyhiaW5kUGFyYW1ldGVycylcbiAgbGV0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmFsbChiaW5kUGFyYW1ldGVycyk7XG4gIFxuICBsZXQgZF9ub3Rhcz17fVxuICBcbiAgZGF0YS5mb3JFYWNoKHJvdz0+e1xuICAgIGxldCBuYW1lX3ByZW5kYT1yb3dbJ3RpcG9fc2VydmljaW8nXSE9bnVsbD9yb3dbJ25vbWJyZV9wcmVuZGEnXTpyb3dbJ25vbWJyZV9wcmVuZGEnXS5zcGxpdCgnLScpWzBdXG4gICAgbGV0IG5hbWVfc2VydmljZT1yb3dbJ3RpcG9fc2VydmljaW8nXSE9bnVsbD9yb3dbJ3RpcG9fc2VydmljaW8nXTpyb3dbJ25vbWJyZV9wcmVuZGEnXS5zcGxpdCgnLScpLmxlbmd0aD4xP3Jvd1snbm9tYnJlX3ByZW5kYSddLnNwbGl0KCctJylbMV06bnVsbFxuICAgIGlmKHJvd1snbm90YV9pZCddIGluIGRfbm90YXMpe1xuICAgICAgZF9ub3Rhc1tyb3dbJ25vdGFfaWQnXV1bJ3ByZW5kYXMnXS5wdXNoKHtcbiAgICAgICAgaWRfcHJlbmRhOnJvd1sncHJlbmRhX2lkJ10sXG4gICAgICAgIG5vbWJyZV9wcmVuZGE6IG5hbWVfcHJlbmRhLFxuICAgICAgICBjb2xvcjogcm93Wydjb2xvciddLFxuICAgICAgICB0aXBvX3NlcnZpY2lvOiBuYW1lX3NlcnZpY2UsXG4gICAgICAgIHByZWNpbzogcm93WydwcmVjaW8nXVxuICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgIGRfbm90YXNbcm93Wydub3RhX2lkJ11dPXtcbiAgICAgICAgbnVtX25vdGE6IHJvd1snbnVtX25vdGEnXSxcbiAgICAgICAgbm9tYnJlX2NsaWVudGUgOiByb3dbJ25vbWJyZV9jbGllbnRlJ10sXG4gICAgICAgIG5vbWJyZV9zdWN1cnNhbCA6IHJvd1snbm9tYnJlX3N1Y3Vyc2FsJ10sXG4gICAgICAgIHByZWNpb190b3RhbCA6IHJvd1sncHJlY2lvX3RvdGFsJ10sXG4gICAgICAgIGZlY2hhX3JlZ2lzdHJvIDogcm93WydmZWNoYV9yZWdpc3RybyddLFxuICAgICAgICBmZWNoYV9yZWNlcGNpb24gOiByb3dbJ2ZlY2hhX3JlY2VwY2lvbiddLFxuICAgICAgICBmZWNoYV9lbnRyZWdhIDogcm93WydmZWNoYV9lbnRyZWdhJ10sXG4gICAgICAgIHByZW5kYXMgOiBbe1xuICAgICAgICAgIGlkX3ByZW5kYTpyb3dbJ3ByZW5kYV9pZCddLFxuICAgICAgICAgIG5vbWJyZV9wcmVuZGE6IG5hbWVfcHJlbmRhLFxuICAgICAgICAgIGNvbG9yOiByb3dbJ2NvbG9yJ10sXG4gICAgICAgICAgdGlwb19zZXJ2aWNpbzogbmFtZV9zZXJ2aWNlLFxuICAgICAgICAgIHByZWNpbzogcm93WydwcmVjaW8nXVxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBcbiAgcmV0dXJuIGRfbm90YXNcblxufVxuXG5mdW5jdGlvbiBnZXRfcHJlbmRhc19jdWVudGEocHJlbmRhcyl7XG4gIHByZW5kYXNfY3VlbnRhPXt9XG4gIHByZW5kYXMuZm9yRWFjaChwcmVuZGE9PntcbiAgICBpZihwcmVuZGFbJ2lkX3ByZW5kYSddIGluIHByZW5kYXNfY3VlbnRhKXtcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydudW1fcHJlbmRhcyddKytcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydjb2xvcmVzJ10ucHVzaChwcmVuZGFbJ2NvbG9yJ10pXG4gICAgfWVsc2V7XG4gICAgICBwcmVuZGFzX2N1ZW50YVtwcmVuZGFbJ2lkX3ByZW5kYSddXT17XG4gICAgICAgIG51bV9wcmVuZGFzOjEsXG4gICAgICAgIG5vbWJyZV9wcmVuZGE6cHJlbmRhWydub21icmVfcHJlbmRhJ10sXG4gICAgICAgIHRpcG9fc2VydmljaW86cHJlbmRhWyd0aXBvX3NlcnZpY2lvJ10sXG4gICAgICAgIGNvbG9yZXM6W3ByZW5kYVsnY29sb3InXV0sXG4gICAgICAgIHByZWNpbzpwcmVuZGFbJ3ByZWNpbyddXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gcHJlbmRhc19jdWVudGFcbn1cblxuZnVuY3Rpb24gaGFuZGxlclByaW50VGlja2V0KGV2ZW50LGRhdGFOb3Rhcyxub21icmVfY2xpZW50ZSl7XG4gIFxuICBsZXQgbm90YXM9W11cbiAgbGV0IHByZWNpb19jdWVudGFfdG90YWw9MFxuICBPYmplY3QuZW50cmllcyhkYXRhTm90YXMpLmZvckVhY2goKFtub3RhX2lkLCBub3RhX29ial0pID0+IHtcbiAgICBsZXQgbm90YV9kZXNjPXtcbiAgICAgIHRleHRfbnVtX25vdGE6bm90YV9vYmpbJ251bV9ub3RhJ10hPW51bGw/bm90YV9vYmpbJ251bV9ub3RhJ106XCJTaW4gTsO6bWVyb1wiLFxuICAgICAgZmVjaGFfcmVnaXN0cm86bm90YV9vYmpbJ2ZlY2hhX3JlZ2lzdHJvJ10uc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgbm9tYnJlX2NsaWVudGU6bm90YV9vYmpbJ25vbWJyZV9jbGllbnRlJ10sXG4gICAgICBudW1fcHJlbmRhczowLFxuICAgICAgcHJlY2lvX3RvdGFsOjAsXG4gICAgICBwcmVuZGFzOiBbXVxuICAgIH1cbiAgICBcbiAgICBsZXQgcHJlbmRhc19jdWVudGE9Z2V0X3ByZW5kYXNfY3VlbnRhKG5vdGFfb2JqWydwcmVuZGFzJ10pXG4gICAgT2JqZWN0LmVudHJpZXMocHJlbmRhc19jdWVudGEpLmZvckVhY2goKFtwcmVuZGFfaWQscHJlbmRhX29ial0pPT57XG4gICAgICAvLyBsZXQgY29sb3Jlcz1wcmVuZGFfb2JqWydjb2xvcmVzJ10uam9pbignLCcpXG4gICAgICBub3RhX2Rlc2MucHJlbmRhcy5wdXNoKFtwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbmRhX29ialsnbm9tYnJlX3ByZW5kYSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbmRhX29ialsndGlwb19zZXJ2aWNpbyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3JlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXCIkXCIrU3RyaW5nKHByZW5kYV9vYmpbJ3ByZWNpbyddKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiK1N0cmluZyhwYXJzZUZsb2F0KHByZW5kYV9vYmpbJ3ByZWNpbyddKSpwYXJzZUludChwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgXG4gICAgICBub3RhX2Rlc2MucHJlY2lvX3RvdGFsKz1wYXJzZUZsb2F0KHByZW5kYV9vYmpbJ3ByZWNpbyddKSpwYXJzZUludChwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddKVxuICAgIH0pXG4gICAgXG4gICAgcHJlY2lvX2N1ZW50YV90b3RhbCs9bm90YV9kZXNjLnByZWNpb190b3RhbFxuICAgIG5vdGFzLnB1c2gobm90YV9kZXNjKVxuICB9KTtcblxuICBwcmludFRpY2tldChub21icmVfY2xpZW50ZSxub3RhcyxwcmVjaW9fY3VlbnRhX3RvdGFsKVxuXG59XG5cblxuZnVuY3Rpb24gaGFuZGxlckRlbGV0ZU5vdGEoZXZlbnQsbm90YV9pZCl7XG4gIGNvbnN0IGRlbGV0ZU5vdGFSb3BhPWBcbiAgREVMRVRFIEZST00gTm90YV9Sb3BhIFdIRVJFIG5vdGFfaWQgPSA/OyBgXG4gIGRiLnByZXBhcmUoZGVsZXRlTm90YVJvcGEpLnJ1bihub3RhX2lkKTtcbiAgY29uc3QgZGVsZXRlTm90YT1gXG4gIERFTEVURSBGUk9NIE5vdGEgV0hFUkUgbm90YV9pZCA9ID87YFxuICBkYi5wcmVwYXJlKGRlbGV0ZU5vdGEpLnJ1bihub3RhX2lkKTtcblxuICByZXR1cm4ge3JlczpcInN1Y2Nlc3NcIn1cbn1cblxuLy8gaXBjTWFpbi5oYW5kbGUoJ2dldCcsICgpID0+IHtcbi8vICAgIGdldFByb2R1Y3RzKClcbi8vIH0pO1xuXG5cbi8vIGlwY01haW4uaGFuZGxlKCdhZGQnLCAoZXZlbnQsIG9iaikgPT4ge1xuLy8gICBhZGRQcm9kdWN0KG9iailcbi8vIH0pO1xuXG5cbi8vIGlwY01haW4uaGFuZGxlKCdnZXRfb25lJywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgZ2V0cHJvZHVjdChvYmopICAgIFxuLy8gfSk7XG5cblxuLy8gaXBjTWFpbi5oYW5kbGUoJ3JlbW92ZV9wcm9kdWN0JywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgZGVsZXRlcHJvZHVjdChvYmopXG4vLyB9KTtcblxuXG4vLyBpcGNNYWluLmhhbmRsZSgndXBkYXRlJywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgdXBkYXRlcHJvZHVjdChvYmopICAgIFxuLy8gfSk7XG5cblxuLy8gZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKVxuLy8ge1xuICBcbi8vICAgZGIucXVlcnkoJ1NFTEVDVCAqIEZST00gcHJvZHVjdCcsIChlcnJvciwgcmVzdWx0cywgZmllbGRzKSA9PiB7XG4vLyAgICAgaWYgKGVycm9yKXtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbi8vICAgICB9XG4gICAgXG4vLyAgICAgd2luLndlYkNvbnRlbnRzLnNlbmQoJ3Byb2R1Y3RzJywgcmVzdWx0cylcbi8vICAgfSk7ICBcbi8vIH1cblxuXG4vLyBmdW5jdGlvbiBhZGRQcm9kdWN0KG9iailcbi8vIHtcbi8vICAgY29uc3Qgc3FsID0gXCJJTlNFUlQgSU5UTyBwcm9kdWN0IFNFVCA/XCI7ICBcbi8vICAgZGIucXVlcnkoc3FsLCBvYmosIChlcnJvciwgcmVzdWx0cywgZmllbGRzKSA9PiB7XG4vLyAgICAgaWYoZXJyb3IpIHtcbi8vICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgfVxuLy8gICAgIGdldFByb2R1Y3RzKCkgIFxuLy8gIH0pO1xuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGRlbGV0ZXByb2R1Y3Qob2JqKVxuLy8ge1xuLy8gICBjb25zdCB7IGlkIH0gID0gb2JqXG4vLyAgIGNvbnN0IHNxbCA9IFwiREVMRVRFIEZST00gcHJvZHVjdCBXSEVSRSBpZCA9ID9cIlxuLy8gICBkYi5xdWVyeShzcWwsIGlkLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmKGVycm9yKSB7XG4vLyAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgICBnZXRQcm9kdWN0cygpICBcbi8vICAgfSk7XG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gZ2V0cHJvZHVjdChvYmopXG4vLyB7XG4vLyAgIGxldCB7IGlkIH0gPSBvYmogXG4vLyAgIGxldCBzcWwgPSBcIlNFTEVDVCAqIEZST00gcHJvZHVjdCBXSEVSRSBpZCA9ID9cIlxuLy8gICBkYi5xdWVyeShzcWwsIGlkLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmIChlcnJvcil7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpXG4vLyAgICAgd2luLndlYkNvbnRlbnRzLnNlbmQoJ3Byb2R1Y3QnLCByZXN1bHRzWzBdKVxuLy8gICB9KTtcbi8vIH1cblxuXG4vLyBmdW5jdGlvbiB1cGRhdGVwcm9kdWN0KG9iaikgXG4vLyB7XG4vLyAgICBsZXQgeyBpZCwgbmFtZSwgcHJpY2UgfSA9IG9ialxuLy8gICAgY29uc3Qgc3FsID0gXCJVUERBVEUgcHJvZHVjdCBTRVQgbmFtZT0/LCBwcmljZT0/IFdIRVJFIGlkPT9cIjsgIFxuLy8gICAgZGIucXVlcnkoc3FsLCBbbmFtZSwgcHJpY2UsIGlkXSwgKGVycm9yLCByZXN1bHRzLCBmaWVsZHMpID0+IHtcbi8vICAgICAgaWYoZXJyb3IpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgICB9XG4vLyAgICAgIGdldFByb2R1Y3RzKCkgIFxuLy8gICAgfSk7XG4vLyB9XG5cblxuIl0sIm5hbWVzIjpbImVzY3BvcyIsInBhdGgiLCJVU0IiLCJyZXF1aXJlIiwiZ2V0RGV2aWNlIiwiZGV2aWNlUHJpbnRlciIsImZpbmRQcmludGVyIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImRldmljZVByaW50ZXJEZXNjIiwidmlkIiwicGlkIiwiZGV2aWNlIiwicHJpbnRUaWNrZXQiLCJub21icmVfY2xpZW50ZSIsImFycl9ub3RhcyIsInByZWNpb19jdWVudGFfdG90YWwiLCJvcHRpb25zIiwiZW5jb2RpbmciLCJ3aWR0aCIsInByaW50ZXIiLCJQcmludGVyIiwibG9nbyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJJbWFnZSIsImxvYWQiLCJpbWFnZSIsIm9wZW4iLCJzZXRDaGFyYWN0ZXJDb2RlVGFibGUiLCJhbGlnbiIsInRoZW4iLCJmb250Iiwic2l6ZSIsInRleHQiLCJfZm9yRWFjaEluc3RhbmNlUHJvcGVydHkiLCJjYWxsIiwibm90YSIsIl9jb250ZXh0Iiwic3R5bGUiLCJ0ZXh0X251bV9ub3RhIiwiZmVjaGFfcmVnaXN0cm8iLCJwcmVjaW9fdG90YWwiLCJ0YWJsZUN1c3RvbSIsInByZW5kYXMiLCJyb3dfcHJlbmRhIiwiZHJhd0xpbmUiLCJTdHJpbmciLCJmZWVkIiwiY3V0IiwiY2xvc2UiLCJEYXRhYmFzZSIsImRiUGF0aCIsImRiIiwidmVyYm9zZSIsInByYWdtYSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcHAiLCJCcm93c2VyV2luZG93IiwiaXBjTWFpbiIsIk5vdGlmaWNhdGlvbiIsImNyeXB0byIsImRibWdyIiwid2luIiwid2lubG9naW4iLCJ3aGVuUmVhZHkiLCJjcmVhdGVXaW5kb3ciLCJpc1Byb2QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJmdWxsc2NyZWVuIiwibWF4aW1pemUiLCJ0aXRsZUJhclN0eWxlIiwidGl0bGVCYXJPdmVybGF5Iiwid2ViUHJlZmVyZW5jZXMiLCJkZXZUb29scyIsInByZWxvYWQiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsImxvYWRVUkwiLCJwb3J0IiwiYXJndiIsImxvZ2luV2luZG93IiwiaGVpZ2h0Iiwib24iLCJwbGF0Zm9ybSIsInF1aXQiLCJnZXRBbGxXaW5kb3dzIiwiaGFuZGxlIiwiZXZlbnQiLCJvYmoiLCJ2YWxpZGF0ZWxvZ2luIiwiaGFuZGxlU3VjdXJzYWxHZXRMaXN0IiwiaGFuZGxlU3VjdXJzYWxHZXRMaXN0UHJlY2lvcyIsImhhbmRsZVN1Y3Vyc2FsVXBkYXRlTGlzdFByZWNpb3MiLCJoYW5kbGVyU2F2ZVByZW5kYVByZWNpbyIsImhhbmRsZXJEZWxldGVQcmVuZGEiLCJoYW5kbGVyVXBkYXRlUHJlbmRhIiwiaGFuZGxlclNhdmVOb3RhIiwiaGFuZGxlckdldExpc3ROb3RhcyIsImhhbmRsZXJQcmludFRpY2tldCIsImhhbmRsZXJEZWxldGVOb3RhIiwiZW1haWwiLCJwYXNzd29yZCIsInNxbCIsInJvdyIsInByZXBhcmUiLCJnZXQiLCJoYXNoIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCIsInNob3ciLCJzZW5kIiwiZGF0YSIsImFsbCIsInN1Y3Vyc2FsX2lkIiwicmVnaXN0cmFkbyIsImxpc3RfcHJlY2lvcyIsIm9ial9wcmVjaW8iLCJpZF9wcmVuZGEiLCJpZF9zdWN1cnNhbCIsInByZWNpbyIsInF1ZXJ5VXBkYXRlIiwicmVzdWx0VXBkIiwicnVuIiwicXVlcnlJbnNlcnROZXciLCJyZXN1bHRJbiIsInF1ZXJ5SW5zZXJ0IiwicmVzdWx0IiwiZGF0YVByZW5kYSIsInF1ZXJ5SW5zZXJ0TmV3UHJlbmRhIiwicmVzdWx0SW5QcmVuZGEiLCJsYXN0SW5zZXJ0Um93aWQiLCJxdWVyeUluc2VydE5ld0xQIiwicmVzdWx0SW5MUCIsInVuZGVmaW5lZCIsIkVycm9yIiwicXVlcnlEZWxldGVMUCIsInJlc3VsdERlbGV0ZUxQIiwicXVlcnlEZWxldGVQcmVuZGEiLCJyZXN1bHREZWxldGVQcmVuZGEiLCJlcnJvciIsIm5vbWJyZSIsInRpcG9fc2VydmljaW8iLCJxdWVyeVVwZGF0ZVByZW5kYSIsInJlc3VsdFVwZGF0ZVByZW5kYSIsImRhdGFOb3RhIiwibnVtX25vdGEiLCJjbGllbnRlIiwiZmVjaGFfcmVjZXBjaW9uIiwiZmVjaGFfZW50cmVnYSIsIm51bV9ub3RhX2ludCIsIl9wYXJzZUludCIsImlkX3N1Y3Vyc2FsX2ludCIsIkZFX2RpYSIsImdldERhdGUiLCJGRV9tZXMiLCJnZXRNb250aCIsIkZFX2FuaW8iLCJnZXRGdWxsWWVhciIsIkZFX2RhdGUiLCJGUl9kaWEiLCJGUl9tZXMiLCJGUl9hbmlvIiwiRlJfZGF0ZSIsImNsaWVudGVfaWQiLCJCb29sZWFuIiwicXVlcnlJbnNlcnRDbGllbnRlIiwiY2xpZW50ZV9pbmZvIiwicXVlcnlHZXRDbGllbnRlIiwicmVnX3ByZW5kYXMiLCJwcmVjaW9Ub3RhbCIsInByZW5kYV9vYmoiLCJwcmVuZGFfaWQiLCJpc19jb21vZGluIiwicXVlcnlJbnNlcnRQcmVuZGFDb21vZGluIiwicHJlbmRhX2NvbW9kaW5fcmVzIiwibnVtX3ByZW5kYXMiLCJxdWVyeUdldExpc3Rhc1ByZWNpb3NJZCIsImxpc3Rhc19wcmVjaW9zX3JlcyIsImxpc3Rhc19wcmVjaW9zX2lkIiwiaW5kZXgiLCJjb2xvcmVzIiwicHVzaCIsImxhc3RfaWQiLCJxdWVyeUluc2VydE5ld05vdGEiLCJyZXNQcmVuZGEiLCJub3RhX2lkIiwicHJlbmRhIiwicXVlcnlJbnNlcnROb3RhUm9wYSIsInByZW5kYV9saXN0YXNfcHJlY2lvc19pZCIsImNvbG9yIiwiY2xpZW50ZV9uYW1lIiwiZmVjaGFfZGVzZGUiLCJmZWNoYV9oYXN0YSIsImJpbmRQYXJhbWV0ZXJzIiwidG9Mb3dlckNhc2UiLCJGZWNoYV9kZXNkZV9kaWEiLCJzcGxpdCIsIkZlY2hhX2Rlc2RlX21lcyIsIkZlY2hhX2Rlc2RlX2FuaW8iLCJGZWNoYV9kZXNkZV9kYXRlIiwiRmVjaGFfaGFzdGFfZGlhIiwiX3BhZFN0YXJ0SW5zdGFuY2VQcm9wZXJ0eSIsInRvU3RyaW5nIiwiRmVjaGFfaGFzdGFfbWVzIiwiRmVjaGFfaGFzdGFfYW5pbyIsIkZlY2hhX2hhc3RhX2RhdGUiLCJkX25vdGFzIiwibmFtZV9wcmVuZGEiLCJuYW1lX3NlcnZpY2UiLCJub21icmVfcHJlbmRhIiwibm9tYnJlX3N1Y3Vyc2FsIiwiZ2V0X3ByZW5kYXNfY3VlbnRhIiwicHJlbmRhc19jdWVudGEiLCJkYXRhTm90YXMiLCJfY29udGV4dDIiLCJub3RhcyIsIl9PYmplY3QkZW50cmllcyIsIm5vdGFfb2JqIiwiX2NvbnRleHQzIiwibm90YV9kZXNjIiwiX3BhcnNlRmxvYXQiLCJkZWxldGVOb3RhUm9wYSIsImRlbGV0ZU5vdGEiLCJyZXMiXSwic291cmNlUm9vdCI6IiJ9