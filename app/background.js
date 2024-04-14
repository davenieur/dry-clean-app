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
  let prendas_cuenta = {};
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

// nombre_cliente es sucursal
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7RUFBUyxDQUFDO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbWFpbi9oZWxwZXJzL1RpY2tldHMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9tYWluL2hlbHBlcnMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNyeXB0b1wiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgdW1kIFwiYmV0dGVyLXNxbGl0ZTNcIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCB1bWQgXCJlc2Nwb3NcIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCB1bWQgXCJlc2Nwb3MtdXNiXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL3BhZC1zdGFydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9lbnRyaWVzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvcGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9wYXJzZS1pbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3BhZC1zdGFydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3BhcnNlLWZsb2F0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9wYXJzZS1pbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3N0cmluZy92aXJ0dWFsL3BhZC1zdGFydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2ZhaWxzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtbWV0aG9kLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1wdXJlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtc3ltYm9sLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWZsb2F0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcGF0aC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctcGFkLXdlYmtpdC1idWcuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctcGFkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLXJlcGVhdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3doaXRlc3BhY2VzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnBhcnNlLWZsb2F0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnBhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zdHJpbmcucGFkLXN0YXJ0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS92aXJ0dWFsL2Zvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9wYWQtc3RhcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZW50cmllcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3BhcnNlLWZsb2F0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvcGFyc2UtaW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9tYWluL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmV0dGVyLXNxbGl0ZTNcIiksIHJlcXVpcmUoXCJlc2Nwb3NcIiksIHJlcXVpcmUoXCJlc2Nwb3MtdXNiXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImJldHRlci1zcWxpdGUzXCIsIFwiZXNjcG9zXCIsIFwiZXNjcG9zLXVzYlwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiYmV0dGVyLXNxbGl0ZTNcIiksIHJlcXVpcmUoXCJlc2Nwb3NcIiksIHJlcXVpcmUoXCJlc2Nwb3MtdXNiXCIpKSA6IGZhY3Rvcnkocm9vdFtcImJldHRlci1zcWxpdGUzXCJdLCByb290W1wiZXNjcG9zXCJdLCByb290W1wiZXNjcG9zLXVzYlwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JldHRlcl9zcWxpdGUzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNjcG9zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNjcG9zX3VzYl9fKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IGVzY3BvcyBmcm9tICdlc2Nwb3MnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8vIEluc3RhbGwgZXNjcG9zLXVzYiBhZGFwdGVyIG1vZHVsZSBtYW51YWxseVxyXG5lc2Nwb3MuVVNCID0gcmVxdWlyZSgnZXNjcG9zLXVzYicpO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGV2aWNlKCkge1xyXG4gIGNvbnN0IGRldmljZVByaW50ZXIgPSBlc2Nwb3MuVVNCLmZpbmRQcmludGVyKCk7XHJcbiAgaWYgKGRldmljZVByaW50ZXIubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc29sZS5sb2coXCJsZW5cIiwgZGV2aWNlUHJpbnRlci5sZW5ndGgpO1xyXG4gICAgbGV0IGRldmljZVByaW50ZXJEZXNjID0gZGV2aWNlUHJpbnRlclswXVsnZGV2aWNlRGVzY3JpcHRvciddO1xyXG4gICAgY29uc3QgdmlkID0gZGV2aWNlUHJpbnRlckRlc2NbJ2lkVmVuZG9yJ107XHJcbiAgICBjb25zdCBwaWQgPSBkZXZpY2VQcmludGVyRGVzY1snaWRQcm9kdWN0J107XHJcbiAgICBjb25zdCBkZXZpY2UgPSBuZXcgZXNjcG9zLlVTQih2aWQsIHBpZCk7XHJcbiAgICByZXR1cm4gZGV2aWNlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHByaW50VGlja2V0ID0gKG5vbWJyZV9jbGllbnRlLCBhcnJfbm90YXMsIHByZWNpb19jdWVudGFfdG90YWwpID0+IHtcclxuICBjb25zdCBkZXZpY2UgPSBnZXREZXZpY2UoKTtcclxuICBpZiAoZGV2aWNlICE9IG51bGwpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGVuY29kaW5nOiBcIkNQMTI1MlwiLCB3aWR0aDogMzYgfTtcclxuICAgIGNvbnN0IHByaW50ZXIgPSBuZXcgZXNjcG9zLlByaW50ZXIoZGV2aWNlLCBvcHRpb25zKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUHJpbnRpbmdcIik7XHJcbiAgICBjb25zb2xlLmxvZyhhcnJfbm90YXMpO1xyXG4gICAgY29uc3QgbG9nbyA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdEUllsb2dvX29yaWdfNDAwd185MHBwcF9CV184Yl9maXQucG5nJyk7XHJcblxyXG4gICAgZXNjcG9zLkltYWdlLmxvYWQobG9nbywgXCJpbWFnZS9wbmdcIiwgZnVuY3Rpb24oaW1hZ2UpIHtcclxuICAgICAgZGV2aWNlLm9wZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gVGlja2V0IGhlYWRlclxyXG4gICAgICAgIHByaW50ZXIuc2V0Q2hhcmFjdGVyQ29kZVRhYmxlKDE2KVxyXG4gICAgICAgICAgLmFsaWduKCdjdCcpXHJcbiAgICAgICAgICAuaW1hZ2UoaW1hZ2UsICdEMjQnKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcHJpbnRlci5mb250KFwiQlwiKVxyXG4gICAgICAgICAgICAgIC5zaXplKDAuMDUsIDAuMDUpXHJcbiAgICAgICAgICAgICAgLnRleHQoXCJTRVJWSUNJTyBEUlkgQ0xFQU4gU0lYIFNUQVJTXCIpXHJcbiAgICAgICAgICAgICAgLnRleHQoXCJUSUNLRVQgREUgUEFHTyBQT1IgU0VSVklDSU9TIERFIFRJTlRPUkVSSUEgWSBMQVZBRE8gREUgUk9QQS4gXCIpXHJcbiAgICAgICAgICAgICAgLnRleHQoXCJDTElFTlRFIEEgUEFHQVI6IFwiICsgbm9tYnJlX2NsaWVudGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gbm90YXNcclxuICAgICAgICAgICAgYXJyX25vdGFzLmZvckVhY2gobm90YSA9PiB7XHJcbiAgICAgICAgICAgICAgcHJpbnRlci5hbGlnbignTFQnKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiQklcIilcclxuICAgICAgICAgICAgICAgIC50ZXh0KFwiI05vdGE6IFwiICsgbm90YS50ZXh0X251bV9ub3RhICsgXCIgXCIgKyBub3RhLmZlY2hhX3JlZ2lzdHJvICsgXCIgVG90YWw6ICRcIiArIG5vdGEucHJlY2lvX3RvdGFsKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiTk9STUFMXCIpXHJcbiAgICAgICAgICAgICAgICAuYWxpZ24oXCJMVFwiKVxyXG4gICAgICAgICAgICAgICAgLnRhYmxlQ3VzdG9tKFtcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIiNcIiwgYWxpZ246IFwiTEVGVFwiLCB3aWR0aDogMC4xIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJQcmVuZGFcIiwgYWxpZ246IFwiTEVGVFwiLCB3aWR0aDogMC41IH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJTZXJ2aWNpb1wiLCBhbGlnbjogXCJDRU5URVJcIiwgd2lkdGg6IDAuMyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiVG90YWxcIiwgYWxpZ246IFwiUklHSFRcIiwgd2lkdGg6IDAuMiB9XHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICBub3RhLnByZW5kYXMuZm9yRWFjaChyb3dfcHJlbmRhID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmludGVyLnRhYmxlQ3VzdG9tKFtcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiByb3dfcHJlbmRhWzBdLCBhbGlnbjogXCJMRUZUXCIsIHdpZHRoOiAwLjEgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiByb3dfcHJlbmRhWzFdLCBhbGlnbjogXCJMRUZUXCIsIHdpZHRoOiAwLjUgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiByb3dfcHJlbmRhWzJdLCBhbGlnbjogXCJDRU5URVJcIiwgd2lkdGg6IDAuMyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IHJvd19wcmVuZGFbM10sIGFsaWduOiBcIlJJR0hUXCIsIHdpZHRoOiAwLjIgfVxyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgcHJpbnRlci5kcmF3TGluZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHByaW50ZXIudGV4dChcIkN1ZW50YSBUb3RhbDogJFwiICsgU3RyaW5nKHByZWNpb19jdWVudGFfdG90YWwpKVxyXG4gICAgICAgICAgICAgIC5mZWVkKClcclxuICAgICAgICAgICAgICAuY3V0KClcclxuICAgICAgICAgICAgICAuY2xvc2UoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTlVMTCBERVZJQ0UsIE5PIFBSSU5USU5HXCIpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IHByaW50VGlja2V0IH07XHJcbiIsIlxyXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpOyBcclxuY29uc3QgRGF0YWJhc2UgPSByZXF1aXJlKCdiZXR0ZXItc3FsaXRlMycpO1xyXG4vLyBsZXQgZGJQYXRoID1cclxuLy8gICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCJcclxuLy8gICAgICAgICA/IHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLy4uL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKVxyXG4vLyAgICAgICAgIDogcGF0aC5qb2luKHByb2Nlc3MucmVzb3VyY2VzUGF0aCwgXCIuL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGJcIilcclxuXHJcbmxldCBkYlBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCcuL2RiL2RyeV9jbGVhbl9zaXhfc3RhcnMuZGInKVxyXG5cclxuXHJcblxyXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShkYlBhdGgsIHsgdmVyYm9zZTogY29uc29sZS5sb2cgfSk7XHJcbmRiLnByYWdtYSgnam91cm5hbF9tb2RlID0gV0FMJyk7XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzLmRiID0gZGIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmV0dGVyX3NxbGl0ZTNfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNjcG9zX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2VzY3Bvc191c2JfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvcGFkLXN0YXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2VudHJpZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9wYXJzZS1mbG9hdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL3BhcnNlLWludFwiKTsiLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoJyk7XG52YXIgZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4tcHJvdG90eXBlLW1ldGhvZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QoJ0FycmF5JywgJ2ZvckVhY2gnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBtZXRob2QgPSByZXF1aXJlKCcuLi9zdHJpbmcvdmlydHVhbC9wYWQtc3RhcnQnKTtcblxudmFyIFN0cmluZ1Byb3RvdHlwZSA9IFN0cmluZy5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5wYWRTdGFydDtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyB8fCBpdCA9PT0gU3RyaW5nUHJvdG90eXBlXG4gICAgfHwgKGlzUHJvdG90eXBlT2YoU3RyaW5nUHJvdG90eXBlLCBpdCkgJiYgb3duID09PSBTdHJpbmdQcm90b3R5cGUucGFkU3RhcnQpID8gbWV0aG9kIDogb3duO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmVudHJpZXMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5lbnRyaWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5wYXJzZS1mbG9hdCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGgucGFyc2VGbG9hdDtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucGFyc2UtaW50Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5wYXJzZUludDtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuc3RyaW5nLnBhZC1zdGFydCcpO1xudmFyIGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLXByb3RvdHlwZS1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kKCdTdHJpbmcnLCAncGFkU3RhcnQnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDYWxsYWJsZShhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBUeXBlKGFyZ3VtZW50KSBpcyBPYmplY3RgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNPYmplY3QoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKCRTdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAhU1RSSUNUX01FVEhPRCA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG59IDogW10uZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgZm9yRWFjaCwgbWFwLCBmaWx0ZXIsIHNvbWUsIGV2ZXJ5LCBmaW5kLCBmaW5kSW5kZXgsIGZpbHRlclJlamVjdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PT0gNjtcbiAgdmFyIElTX0ZJTFRFUl9SRUpFQ1QgPSBUWVBFID09PSA3O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShzZWxmKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgY3JlYXRlID0gc3BlY2lmaWNDcmVhdGUgfHwgYXJyYXlTcGVjaWVzQ3JlYXRlO1xuICAgIHZhciB0YXJnZXQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgfHwgSVNfRklMVEVSX1JFSkVDVCA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2godGFyZ2V0LCB2YWx1ZSk7ICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDQ6IHJldHVybiBmYWxzZTsgICAgICAgICAgICAgLy8gZXZlcnlcbiAgICAgICAgICBjYXNlIDc6IHB1c2godGFyZ2V0LCB2YWx1ZSk7ICAgICAgLy8gZmlsdGVyUmVqZWN0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4gIGZvckVhY2g6IGNyZWF0ZU1ldGhvZCgwKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4gIHNvbWU6IGNyZWF0ZU1ldGhvZCgzKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFxuICBmaW5kSW5kZXg6IGNyZWF0ZU1ldGhvZCg2KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJSZWplY3RgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1hcnJheS1maWx0ZXJpbmdcbiAgZmlsdGVyUmVqZWN0OiBjcmVhdGVNZXRob2QoNylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3InKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciAkQXJyYXkgPSBBcnJheTtcblxuLy8gYSBwYXJ0IG9mIGBBcnJheVNwZWNpZXNDcmVhdGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXkpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsQXJyYXkpKSB7XG4gICAgQyA9IG9yaWdpbmFsQXJyYXkuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAoaXNDb25zdHJ1Y3RvcihDKSAmJiAoQyA9PT0gJEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/ICRBcnJheSA6IEM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFycmF5U3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHJldHVybiBuZXcgKGFycmF5U3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsQXJyYXkpKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKHt9LnRvU3RyaW5nKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHN0cmluZ1NsaWNlKHRvU3RyaW5nKGl0KSwgOCwgLTEpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSAkT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT09ICdPYmplY3QnICYmIGlzQ2FsbGFibGUoTy5jYWxsZWUpID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBkZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtleSwgeyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT09IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgbmF2aWdhdG9yICE9ICd1bmRlZmluZWQnICYmIFN0cmluZyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCAnJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGVubyA9IGdsb2JhbC5EZW5vO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zIHx8IERlbm8gJiYgRGVuby52ZXJzaW9uO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIC8vIGluIG9sZCBDaHJvbWUsIHZlcnNpb25zIG9mIFY4IGlzbid0IFY4ID0gQ2hyb21lIC8gMTBcbiAgLy8gYnV0IHRoZWlyIGNvcnJlY3QgdmVyc2lvbnMgYXJlIG5vdCBpbnRlcmVzdGluZyBmb3IgdXNcbiAgdmVyc2lvbiA9IG1hdGNoWzBdID4gMCAmJiBtYXRjaFswXSA8IDQgPyAxIDogKyhtYXRjaFswXSArIG1hdGNoWzFdKTtcbn1cblxuLy8gQnJvd3NlckZTIE5vZGVKUyBgcHJvY2Vzc2AgcG9seWZpbGwgaW5jb3JyZWN0bHkgc2V0IGAudjhgIHRvIGAwLjBgXG4vLyBzbyBjaGVjayBgdXNlckFnZW50YCBldmVuIGlmIGAudjhgIGV4aXN0cywgYnV0IDBcbmlmICghdmVyc2lvbiAmJiB1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSArbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbi8vIGFkZCBkZWJ1Z2dpbmcgaW5mb1xucmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgd3JhcENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKE5hdGl2ZUNvbnN0cnVjdG9yKSB7XG4gIHZhciBXcmFwcGVyID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFdyYXBwZXIpIHtcbiAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoKTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEpO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSwgYik7XG4gICAgICB9IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSwgYiwgYyk7XG4gICAgfSByZXR1cm4gYXBwbHkoTmF0aXZlQ29uc3RydWN0b3IsIHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG4gIFdyYXBwZXIucHJvdG90eXBlID0gTmF0aXZlQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICByZXR1cm4gV3JhcHBlcjtcbn07XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAgICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMuZG9udENhbGxHZXRTZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4gIG9wdGlvbnMubmFtZSAgICAgICAgICAgLSB0aGUgLm5hbWUgb2YgdGhlIGZ1bmN0aW9uIGlmIGl0IGRvZXMgbm90IG1hdGNoIHRoZSBrZXlcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBQUk9UTyA9IG9wdGlvbnMucHJvdG87XG5cbiAgdmFyIG5hdGl2ZVNvdXJjZSA9IEdMT0JBTCA/IGdsb2JhbCA6IFNUQVRJQyA/IGdsb2JhbFtUQVJHRVRdIDogZ2xvYmFsW1RBUkdFVF0gJiYgZ2xvYmFsW1RBUkdFVF0ucHJvdG90eXBlO1xuXG4gIHZhciB0YXJnZXQgPSBHTE9CQUwgPyBwYXRoIDogcGF0aFtUQVJHRVRdIHx8IGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoLCBUQVJHRVQsIHt9KVtUQVJHRVRdO1xuICB2YXIgdGFyZ2V0UHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcblxuICB2YXIgRk9SQ0VELCBVU0VfTkFUSVZFLCBWSVJUVUFMX1BST1RPVFlQRTtcbiAgdmFyIGtleSwgc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5LCBuYXRpdmVQcm9wZXJ0eSwgcmVzdWx0UHJvcGVydHksIGRlc2NyaXB0b3I7XG5cbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBVU0VfTkFUSVZFID0gIUZPUkNFRCAmJiBuYXRpdmVTb3VyY2UgJiYgaGFzT3duKG5hdGl2ZVNvdXJjZSwga2V5KTtcblxuICAgIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cbiAgICBpZiAoVVNFX05BVElWRSkgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmF0aXZlU291cmNlLCBrZXkpO1xuICAgICAgbmF0aXZlUHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIG5hdGl2ZVByb3BlcnR5ID0gbmF0aXZlU291cmNlW2tleV07XG5cbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIGltcGxlbWVudGF0aW9uXG4gICAgc291cmNlUHJvcGVydHkgPSAoVVNFX05BVElWRSAmJiBuYXRpdmVQcm9wZXJ0eSkgPyBuYXRpdmVQcm9wZXJ0eSA6IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKCFGT1JDRUQgJiYgIVBST1RPICYmIHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSA9PSB0eXBlb2Ygc291cmNlUHJvcGVydHkpIGNvbnRpbnVlO1xuXG4gICAgLy8gYmluZCBtZXRob2RzIHRvIGdsb2JhbCBmb3IgY2FsbGluZyBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgaWYgKG9wdGlvbnMuYmluZCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IGJpbmQoc291cmNlUHJvcGVydHksIGdsb2JhbCk7XG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZXMgaW4gdGhpcyB2ZXJzaW9uXG4gICAgZWxzZSBpZiAob3B0aW9ucy53cmFwICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gd3JhcENvbnN0cnVjdG9yKHNvdXJjZVByb3BlcnR5KTtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICBlbHNlIGlmIChQUk9UTyAmJiBpc0NhbGxhYmxlKHNvdXJjZVByb3BlcnR5KSkgcmVzdWx0UHJvcGVydHkgPSB1bmN1cnJ5VGhpcyhzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gZGVmYXVsdCBjYXNlXG4gICAgZWxzZSByZXN1bHRQcm9wZXJ0eSA9IHNvdXJjZVByb3BlcnR5O1xuXG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHNvdXJjZVByb3BlcnR5ICYmIHNvdXJjZVByb3BlcnR5LnNoYW0pIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHJlc3VsdFByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgcmVzdWx0UHJvcGVydHkpO1xuXG4gICAgaWYgKFBST1RPKSB7XG4gICAgICBWSVJUVUFMX1BST1RPVFlQRSA9IFRBUkdFVCArICdQcm90b3R5cGUnO1xuICAgICAgaWYgKCFoYXNPd24ocGF0aCwgVklSVFVBTF9QUk9UT1RZUEUpKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSwge30pO1xuICAgICAgfVxuICAgICAgLy8gZXhwb3J0IHZpcnR1YWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoW1ZJUlRVQUxfUFJPVE9UWVBFXSwga2V5LCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgICAvLyBleHBvcnQgcmVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgaWYgKG9wdGlvbnMucmVhbCAmJiB0YXJnZXRQcm90b3R5cGUgJiYgKEZPUkNFRCB8fCAhdGFyZ2V0UHJvdG90eXBlW2tleV0pKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXRQcm90b3R5cGUsIGtleSwgc291cmNlUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGFwcGx5ID0gRnVuY3Rpb25Qcm90b3R5cGUuYXBwbHk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1yZWZsZWN0IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgPT0gJ29iamVjdCcgJiYgUmVmbGVjdC5hcHBseSB8fCAoTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoYXBwbHkpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShhcHBseSwgYXJndW1lbnRzKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWZ1bmN0aW9uLXByb3RvdHlwZS1iaW5kIC0tIHNhZmVcbiAgdmFyIHRlc3QgPSAoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KS5iaW5kKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gdHlwZW9mIHRlc3QgIT0gJ2Z1bmN0aW9uJyB8fCB0ZXN0Lmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoY2FsbCkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgLy8gTmFzaG9ybiBidWc6XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzExMjhcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEzMFxuICBpZiAoY2xhc3NvZlJhdyhmbikgPT09ICdGdW5jdGlvbicpIHJldHVybiB1bmN1cnJ5VGhpcyhmbik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcbnZhciB1bmN1cnJ5VGhpc1dpdGhCaW5kID0gTkFUSVZFX0JJTkQgJiYgRnVuY3Rpb25Qcm90b3R5cGUuYmluZC5iaW5kKGNhbGwsIGNhbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gdW5jdXJyeVRoaXNXaXRoQmluZCA6IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsLmFwcGx5KGZuLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SLCBNRVRIT0QpIHtcbiAgdmFyIE5hbWVzcGFjZSA9IHBhdGhbQ09OU1RSVUNUT1IgKyAnUHJvdG90eXBlJ107XG4gIHZhciBwdXJlTWV0aG9kID0gTmFtZXNwYWNlICYmIE5hbWVzcGFjZVtNRVRIT0RdO1xuICBpZiAocHVyZU1ldGhvZCkgcmV0dXJuIHB1cmVNZXRob2Q7XG4gIHZhciBOYXRpdmVDb25zdHJ1Y3RvciA9IGdsb2JhbFtDT05TVFJVQ1RPUl07XG4gIHZhciBOYXRpdmVQcm90b3R5cGUgPSBOYXRpdmVDb25zdHJ1Y3RvciAmJiBOYXRpdmVDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHJldHVybiBOYXRpdmVQcm90b3R5cGUgJiYgTmF0aXZlUHJvdG90eXBlW01FVEhPRF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUodmFyaWFibGUpID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG4vLyBgR2V0TWV0aG9kYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChWLCBQKSB7XG4gIHZhciBmdW5jID0gVltQXTtcbiAgcmV0dXJuIGlzTnVsbE9yVW5kZWZpbmVkKGZ1bmMpID8gdW5kZWZpbmVkIDogYUNhbGxhYmxlKGZ1bmMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIGNoZWNrKHR5cGVvZiB0aGlzID09ICdvYmplY3QnICYmIHRoaXMpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyh7fS5oYXNPd25Qcm9wZXJ0eSk7XG5cbi8vIGBIYXNPd25Qcm9wZXJ0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWhhc293bnByb3BlcnR5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWhhc293biAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5KHRvT2JqZWN0KGl0KSwga2V5KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gISRPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktaXNhcnJheSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmd1bWVudCkge1xuICByZXR1cm4gY2xhc3NvZihhcmd1bWVudCkgPT09ICdBcnJheSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdFxudmFyIGRvY3VtZW50QWxsID0gdHlwZW9mIGRvY3VtZW50ID09ICdvYmplY3QnICYmIGRvY3VtZW50LmFsbDtcblxuLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby10eXBlb2YtdW5kZWZpbmVkIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJyB8fCBhcmd1bWVudCA9PT0gZG9jdW1lbnRBbGw7XG59IDogZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBub29wID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIGNvbnN0cnVjdCA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnY29uc3RydWN0Jyk7XG52YXIgY29uc3RydWN0b3JSZWdFeHAgPSAvXlxccyooPzpjbGFzc3xmdW5jdGlvbilcXGIvO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhjb25zdHJ1Y3RvclJlZ0V4cC5leGVjKTtcbnZhciBJTkNPUlJFQ1RfVE9fU1RSSU5HID0gIWNvbnN0cnVjdG9yUmVnRXhwLnRlc3Qobm9vcCk7XG5cbnZhciBpc0NvbnN0cnVjdG9yTW9kZXJuID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHRyeSB7XG4gICAgY29uc3RydWN0KG5vb3AsIFtdLCBhcmd1bWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG52YXIgaXNDb25zdHJ1Y3RvckxlZ2FjeSA9IGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcbiAgaWYgKCFpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGZhbHNlO1xuICBzd2l0Y2ggKGNsYXNzb2YoYXJndW1lbnQpKSB7XG4gICAgY2FzZSAnQXN5bmNGdW5jdGlvbic6XG4gICAgY2FzZSAnR2VuZXJhdG9yRnVuY3Rpb24nOlxuICAgIGNhc2UgJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nOiByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyB3ZSBjYW4ndCBjaGVjayAucHJvdG90eXBlIHNpbmNlIGNvbnN0cnVjdG9ycyBwcm9kdWNlZCBieSAuYmluZCBoYXZlbid0IGl0XG4gICAgLy8gYEZ1bmN0aW9uI3RvU3RyaW5nYCB0aHJvd3Mgb24gc29tZSBidWlsdC1pdCBmdW5jdGlvbiBpbiBzb21lIGxlZ2FjeSBlbmdpbmVzXG4gICAgLy8gKGZvciBleGFtcGxlLCBgRE9NUXVhZGAgYW5kIHNpbWlsYXIgaW4gRkY0MS0pXG4gICAgcmV0dXJuIElOQ09SUkVDVF9UT19TVFJJTkcgfHwgISFleGVjKGNvbnN0cnVjdG9yUmVnRXhwLCBpbnNwZWN0U291cmNlKGFyZ3VtZW50KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmlzQ29uc3RydWN0b3JMZWdhY3kuc2hhbSA9IHRydWU7XG5cbi8vIGBJc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSAhY29uc3RydWN0IHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNhbGxlZDtcbiAgcmV0dXJuIGlzQ29uc3RydWN0b3JNb2Rlcm4oaXNDb25zdHJ1Y3Rvck1vZGVybi5jYWxsKVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKE9iamVjdClcbiAgICB8fCAhaXNDb25zdHJ1Y3Rvck1vZGVybihmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWU7IH0pXG4gICAgfHwgY2FsbGVkO1xufSkgPyBpc0NvbnN0cnVjdG9yTGVnYWN5IDogaXNDb25zdHJ1Y3Rvck1vZGVybjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gd2UgY2FuJ3QgdXNlIGp1c3QgYGl0ID09IG51bGxgIHNpbmNlIG9mIGBkb2N1bWVudC5hbGxgIHNwZWNpYWwgY2FzZVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdC1hZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gbnVsbCB8fCBpdCA9PT0gdW5kZWZpbmVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgTGVuZ3RoT2ZBcnJheUxpa2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1sZW5ndGhvZmFycmF5bGlrZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0b0xlbmd0aChvYmoubGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBNYXRoLnRydW5jYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWF0aC50cnVuY1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW1hdGgtdHJ1bmMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uIHRydW5jKHgpIHtcbiAgdmFyIG4gPSAreDtcbiAgcmV0dXJuIChuID4gMCA/IGZsb29yIDogY2VpbCkobik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyICRwYXJzZUZsb2F0ID0gZ2xvYmFsLnBhcnNlRmxvYXQ7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBJVEVSQVRPUiA9IFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRk9SQ0VEID0gMSAvICRwYXJzZUZsb2F0KHdoaXRlc3BhY2VzICsgJy0wJykgIT09IC1JbmZpbml0eVxuICAvLyBNUyBFZGdlIDE4LSBicm9rZW4gd2l0aCBib3hlZCBzeW1ib2xzXG4gIHx8IChJVEVSQVRPUiAmJiAhZmFpbHMoZnVuY3Rpb24gKCkgeyAkcGFyc2VGbG9hdChPYmplY3QoSVRFUkFUT1IpKTsgfSkpO1xuXG4vLyBgcGFyc2VGbG9hdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXBhcnNlZmxvYXQtc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIHBhcnNlRmxvYXQoc3RyaW5nKSB7XG4gIHZhciB0cmltbWVkU3RyaW5nID0gdHJpbSh0b1N0cmluZyhzdHJpbmcpKTtcbiAgdmFyIHJlc3VsdCA9ICRwYXJzZUZsb2F0KHRyaW1tZWRTdHJpbmcpO1xuICByZXR1cm4gcmVzdWx0ID09PSAwICYmIGNoYXJBdCh0cmltbWVkU3RyaW5nLCAwKSA9PT0gJy0nID8gLTAgOiByZXN1bHQ7XG59IDogJHBhcnNlRmxvYXQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyICRwYXJzZUludCA9IGdsb2JhbC5wYXJzZUludDtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIElURVJBVE9SID0gU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBoZXggPSAvXlsrLV0/MHgvaTtcbnZhciBleGVjID0gdW5jdXJyeVRoaXMoaGV4LmV4ZWMpO1xudmFyIEZPUkNFRCA9ICRwYXJzZUludCh3aGl0ZXNwYWNlcyArICcwOCcpICE9PSA4IHx8ICRwYXJzZUludCh3aGl0ZXNwYWNlcyArICcweDE2JykgIT09IDIyXG4gIC8vIE1TIEVkZ2UgMTgtIGJyb2tlbiB3aXRoIGJveGVkIHN5bWJvbHNcbiAgfHwgKElURVJBVE9SICYmICFmYWlscyhmdW5jdGlvbiAoKSB7ICRwYXJzZUludChPYmplY3QoSVRFUkFUT1IpKTsgfSkpO1xuXG4vLyBgcGFyc2VJbnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wYXJzZWludC1zdHJpbmctcmFkaXhcbm1vZHVsZS5leHBvcnRzID0gRk9SQ0VEID8gZnVuY3Rpb24gcGFyc2VJbnQoc3RyaW5nLCByYWRpeCkge1xuICB2YXIgUyA9IHRyaW0odG9TdHJpbmcoc3RyaW5nKSk7XG4gIHJldHVybiAkcGFyc2VJbnQoUywgKHJhZGl4ID4+PiAwKSB8fCAoZXhlYyhoZXgsIFMpID8gMTYgOiAxMCkpO1xufSA6ICRwYXJzZUludDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBFTlVNRVJBQkxFID0gJ2VudW1lcmFibGUnO1xudmFyIENPTkZJR1VSQUJMRSA9ICdjb25maWd1cmFibGUnO1xudmFyIFdSSVRBQkxFID0gJ3dyaXRhYmxlJztcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA/IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKHR5cGVvZiBPID09PSAnZnVuY3Rpb24nICYmIFAgPT09ICdwcm90b3R5cGUnICYmICd2YWx1ZScgaW4gQXR0cmlidXRlcyAmJiBXUklUQUJMRSBpbiBBdHRyaWJ1dGVzICYmICFBdHRyaWJ1dGVzW1dSSVRBQkxFXSkge1xuICAgIHZhciBjdXJyZW50ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgICBpZiAoY3VycmVudCAmJiBjdXJyZW50W1dSSVRBQkxFXSkge1xuICAgICAgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgICBBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IENPTkZJR1VSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tDT05GSUdVUkFCTEVdIDogY3VycmVudFtDT05GSUdVUkFCTEVdLFxuICAgICAgICBlbnVtZXJhYmxlOiBFTlVNRVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0VOVU1FUkFCTEVdIDogY3VycmVudFtFTlVNRVJBQkxFXSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xufSA6ICRkZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzT3duKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYsIE8sIFApLCBPW1BdKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIE9iamVjdFByb3RvdHlwZSA9ICRPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gJE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIHZhciBvYmplY3QgPSB0b09iamVjdChPKTtcbiAgaWYgKGhhc093bihvYmplY3QsIElFX1BST1RPKSkgcmV0dXJuIG9iamVjdFtJRV9QUk9UT107XG4gIHZhciBjb25zdHJ1Y3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKGlzQ2FsbGFibGUoY29uc3RydWN0b3IpICYmIG9iamVjdCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgJE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKHt9LmlzUHJvdG90eXBlT2YpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1rZXlzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBvYmplY3RHZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKS5mO1xuXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSB1bmN1cnJ5VGhpcygkcHJvcGVydHlJc0VudW1lcmFibGUpO1xudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxuLy8gaW4gc29tZSBJRSB2ZXJzaW9ucywgYHByb3BlcnR5SXNFbnVtZXJhYmxlYCByZXR1cm5zIGluY29ycmVjdCByZXN1bHQgb24gaW50ZWdlciBrZXlzXG4vLyBvZiBgbnVsbGAgcHJvdG90eXBlIG9iamVjdHNcbnZhciBJRV9CVUcgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtY3JlYXRlIC0tIHNhZmVcbiAgdmFyIE8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBPWzJdID0gMjtcbiAgcmV0dXJuICFwcm9wZXJ0eUlzRW51bWVyYWJsZShPLCAyKTtcbn0pO1xuXG4vLyBgT2JqZWN0LnsgZW50cmllcywgdmFsdWVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVE9fRU5UUklFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoaXQpO1xuICAgIHZhciBrZXlzID0gb2JqZWN0S2V5cyhPKTtcbiAgICB2YXIgSUVfV09SS0FST1VORCA9IElFX0JVRyAmJiBvYmplY3RHZXRQcm90b3R5cGVPZihPKSA9PT0gbnVsbDtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBpKSB7XG4gICAgICBrZXkgPSBrZXlzW2krK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IChJRV9XT1JLQVJPVU5EID8ga2V5IGluIE8gOiBwcm9wZXJ0eUlzRW51bWVyYWJsZShPLCBrZXkpKSkge1xuICAgICAgICBwdXNoKHJlc3VsdCwgVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiAgZW50cmllczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgT2JqZWN0LnZhbHVlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnZhbHVlc1xuICB2YWx1ZXM6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYE9yZGluYXJ5VG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKHByZWYgPT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChpc0NhbGxhYmxlKGZuID0gaW5wdXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChpdCkpIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsVGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpc1tTSEFSRURdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFNIQVJFRCwge30pO1xuXG4oc3RvcmUudmVyc2lvbnMgfHwgKHN0b3JlLnZlcnNpb25zID0gW10pKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMzYuMCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxNC0yMDI0IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJyxcbiAgbGljZW5zZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMzYuMC9MSUNFTlNFJyxcbiAgc291cmNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMnXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlIHx8IHt9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMjgwXG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gL1ZlcnNpb25cXC8xMCg/OlxcLlxcZCspezEsMn0oPzogW1xcdy4vXSspPyg/OiBNb2JpbGVcXC9cXHcrKT8gU2FmYXJpXFwvLy50ZXN0KHVzZXJBZ2VudCk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyICRyZXBlYXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXJlcGVhdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciByZXBlYXQgPSB1bmN1cnJ5VGhpcygkcmVwZWF0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHBhZFN0YXJ0LCBwYWRFbmQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19FTkQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgbWF4TGVuZ3RoLCBmaWxsU3RyaW5nKSB7XG4gICAgdmFyIFMgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIGludE1heExlbmd0aCA9IHRvTGVuZ3RoKG1heExlbmd0aCk7XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IFMubGVuZ3RoO1xuICAgIHZhciBmaWxsU3RyID0gZmlsbFN0cmluZyA9PT0gdW5kZWZpbmVkID8gJyAnIDogdG9TdHJpbmcoZmlsbFN0cmluZyk7XG4gICAgdmFyIGZpbGxMZW4sIHN0cmluZ0ZpbGxlcjtcbiAgICBpZiAoaW50TWF4TGVuZ3RoIDw9IHN0cmluZ0xlbmd0aCB8fCBmaWxsU3RyID09PSAnJykgcmV0dXJuIFM7XG4gICAgZmlsbExlbiA9IGludE1heExlbmd0aCAtIHN0cmluZ0xlbmd0aDtcbiAgICBzdHJpbmdGaWxsZXIgPSByZXBlYXQoZmlsbFN0ciwgY2VpbChmaWxsTGVuIC8gZmlsbFN0ci5sZW5ndGgpKTtcbiAgICBpZiAoc3RyaW5nRmlsbGVyLmxlbmd0aCA+IGZpbGxMZW4pIHN0cmluZ0ZpbGxlciA9IHN0cmluZ1NsaWNlKHN0cmluZ0ZpbGxlciwgMCwgZmlsbExlbik7XG4gICAgcmV0dXJuIElTX0VORCA/IFMgKyBzdHJpbmdGaWxsZXIgOiBzdHJpbmdGaWxsZXIgKyBTO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnBhZHN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5wYWRFbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucGFkZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkUmFuZ2VFcnJvciA9IFJhbmdlRXJyb3I7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGVhdGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwZWF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCkge1xuICB2YXIgc3RyID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKSk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIG4gPSB0b0ludGVnZXJPckluZmluaXR5KGNvdW50KTtcbiAgaWYgKG4gPCAwIHx8IG4gPT09IEluZmluaXR5KSB0aHJvdyBuZXcgJFJhbmdlRXJyb3IoJ1dyb25nIG51bWJlciBvZiByZXBldGl0aW9ucycpO1xuICBmb3IgKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpIGlmIChuICYgMSkgcmVzdWx0ICs9IHN0cjtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIGx0cmltID0gUmVnRXhwKCdeWycgKyB3aGl0ZXNwYWNlcyArICddKycpO1xudmFyIHJ0cmltID0gUmVnRXhwKCcoXnxbXicgKyB3aGl0ZXNwYWNlcyArICddKVsnICsgd2hpdGVzcGFjZXMgKyAnXSskJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbSwgdHJpbVN0YXJ0LCB0cmltRW5kLCB0cmltTGVmdCwgdHJpbVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzKSB7XG4gICAgdmFyIHN0cmluZyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHJlcGxhY2Uoc3RyaW5nLCBsdHJpbSwgJycpO1xuICAgIGlmIChUWVBFICYgMikgc3RyaW5nID0gcmVwbGFjZShzdHJpbmcsIHJ0cmltLCAnJDEnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyICRTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgnc3ltYm9sIGRldGVjdGlvbicpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIC8vIG5iOiBEbyBub3QgY2FsbCBgU3RyaW5nYCBkaXJlY3RseSB0byBhdm9pZCB0aGlzIGJlaW5nIG9wdGltaXplZCBvdXQgdG8gYHN5bWJvbCsnJ2Agd2hpY2ggd2lsbCxcbiAgLy8gb2YgY291cnNlLCBmYWlsLlxuICByZXR1cm4gISRTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbGVuID0gdG9JbnRlZ2VyT3JJbmZpbml0eShhcmd1bWVudCk7XG4gIHJldHVybiBsZW4gPiAwID8gbWluKGxlbiwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChjbGFzc29mKGFyZ3VtZW50KSA9PT0gJ1N5bWJvbCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG4gIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPT0gNDI7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2xbJ2ZvciddIHx8IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXNPd24oV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IE5BVElWRV9TWU1CT0wgJiYgaGFzT3duKFN5bWJvbCwgbmFtZSlcbiAgICAgID8gU3ltYm9sW25hbWVdXG4gICAgICA6IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG5tb2R1bGUuZXhwb3J0cyA9ICdcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTIwMDBcXHUyMDAxXFx1MjAwMicgK1xuICAnXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1mb3JlYWNoIC0tIHNhZmVcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT09IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRlbnRyaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1hcnJheScpLmVudHJpZXM7XG5cbi8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoTykge1xuICAgIHJldHVybiAkZW50cmllcyhPKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9udW1iZXItcGFyc2UtZmxvYXQnKTtcblxuLy8gYHBhcnNlRmxvYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wYXJzZWZsb2F0LXN0cmluZ1xuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiBwYXJzZUZsb2F0ICE9PSAkcGFyc2VGbG9hdCB9LCB7XG4gIHBhcnNlRmxvYXQ6ICRwYXJzZUZsb2F0XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRwYXJzZUludCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9udW1iZXItcGFyc2UtaW50Jyk7XG5cbi8vIGBwYXJzZUludGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxuJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiBwYXJzZUludCAhPT0gJHBhcnNlSW50IH0sIHtcbiAgcGFyc2VJbnQ6ICRwYXJzZUludFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkcGFkU3RhcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXBhZCcpLnN0YXJ0O1xudmFyIFdFQktJVF9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXBhZC13ZWJraXQtYnVnJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5wYWRzdGFydFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFdFQktJVF9CVUcgfSwge1xuICBwYWRTdGFydDogZnVuY3Rpb24gcGFkU3RhcnQobWF4TGVuZ3RoIC8qICwgZmlsbFN0cmluZyA9ICcgJyAqLykge1xuICAgIHJldHVybiAkcGFkU3RhcnQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiLy8gZW1wdHlcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi8uLi9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgbWV0aG9kID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9mb3ItZWFjaCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBOb2RlTGlzdDogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZvckVhY2g7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGlzUHJvdG90eXBlT2YoQXJyYXlQcm90b3R5cGUsIGl0KSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZvckVhY2gpXG4gICAgfHwgaGFzT3duKERPTUl0ZXJhYmxlcywgY2xhc3NvZihpdCkpID8gbWV0aG9kIDogb3duO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9wYWQtc3RhcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2VudHJpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vZXMvcGFyc2UtZmxvYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vZXMvcGFyc2UtaW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG5jb25zdCB7IGFwcCwgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgTm90aWZpY2F0aW9uIH0gPSByZXF1aXJlKCdlbGVjdHJvbicpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTsgXG5cbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxuXG5cblxuY29uc3QgZGJtZ3IgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2RhdGFiYXNlLmpzXCIpXG5jb25zdCBkYiA9IGRibWdyLmRiXG5cbmNvbnN0IHtwcmludFRpY2tldH0gPSByZXF1aXJlKFwiLi9oZWxwZXJzL1RpY2tldHMuanNcIilcblxuLy9HTE9CQUwgV2luZG93c1xubGV0IHdpbjtcbmxldCB3aW5sb2dpbjtcblxuXG5hcHAud2hlblJlYWR5KCkudGhlbihjcmVhdGVXaW5kb3cpXG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcblxuXG4vLyAtLS0tLS0tLS0tLS1cbi8vICAgIFdJTkRPV1Ncbi8vIC0tLS0tLS0tLS0tLVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2luZG93ICgpIHtcbiAgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgXG4gICBmdWxsc2NyZWVuOnRydWUsXG4gICBtYXhpbWl6ZTogdHJ1ZSxcbiAgIHRpdGxlQmFyU3R5bGU6ICdoaWRkZW4nLFxuICAgdGl0bGVCYXJPdmVybGF5OiB0cnVlLFxuICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgLy8gIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZSxcbiAgICAvLyBjb250ZXh0SXNvbGF0aW9uOnRydWUsXG4gICAgIGRldlRvb2xzOnRydWUsXG4gICAgIFxuICAgcHJlbG9hZDpwYXRoLmpvaW4oX19kaXJuYW1lLCAncHJlbG9hZC1pbmRleC5qcycpXG4gICB9XG5cbiB9KVxuXG4gIC8vd2luLmxvYWRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uL0Zyb250RW5kL3BhZ2VzL25vdGFzL3Zlcl9ub3Rhcy5odG1sJykpXG4gIC8vIHdpbi5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi9Gcm9udEVuZC9pbmRleC5odG1sJykpXG4gIHdpbi5tYXhpbWl6ZSh0cnVlKVxuICB3aW4ud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG4gIFxuICBpZiAoaXNQcm9kKSB7XG4gICAgYXdhaXQgd2luLmxvYWRVUkwoJ2FwcDovLy4vaG9tZScpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuYXJndlsyXVxuICAgIGF3YWl0IHdpbi5sb2FkVVJMKGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vaG9tZWApXG4gICAgd2luLndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpXG4gIH1cbn1cblxuZnVuY3Rpb24gbG9naW5XaW5kb3cgKCkge1xuICB3aW5sb2dpbiA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgIHdpZHRoOiA4MDAsXG4gICBoZWlnaHQ6IDYwMCxcbiAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgLy8gbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgIC8vIGNvbnRleHRJc29sYXRpb246dHJ1ZSxcbiAgICAgZGV2VG9vbHM6dHJ1ZSxcbiAgICAgcHJlbG9hZDpwYXRoLmpvaW4oX19kaXJuYW1lLCAncHJlbG9hZC1sb2dpbi5qcycpXG4gICAgIFxuICAgfVxuIH0pXG5cbi8vICB3aW5sb2dpbi5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi9sb2dpbi5odG1sJykpO1xuIHdpbmxvZ2luLndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgIEFQUCBFVkVOVFNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4gICAgYXBwLnF1aXQoKVxuICAgIGRiLmNsb3NlKClcbiAgfVxufSlcblxuYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHtcbiAgaWYgKEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmxlbmd0aCA9PT0gMCkge1xuICAgIGNyZWF0ZVdpbmRvdygpXG4gIH1cbn0pXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgICAgICAgICAgIEhBTkRMRVJTXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaXBjTWFpbi5oYW5kbGUoJ3ZhbGlkYXRlJywgKGV2ZW50LCBvYmopID0+IHtcbiAgdmFsaWRhdGVsb2dpbihvYmopXG59KTtcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDpnZXRfbGlzdCcsIGhhbmRsZVN1Y3Vyc2FsR2V0TGlzdClcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDpnZXRfbGlzdF9wcmVjaW9zJywgaGFuZGxlU3VjdXJzYWxHZXRMaXN0UHJlY2lvcylcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDp1cGRhdGVfbGlzdF9wcmVjaW9zJywgaGFuZGxlU3VjdXJzYWxVcGRhdGVMaXN0UHJlY2lvcylcbmlwY01haW4uaGFuZGxlKCdTdWN1cnNhbDpzYXZlX3ByZW5kYScsIGhhbmRsZXJTYXZlUHJlbmRhUHJlY2lvKVxuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOmRlbGV0ZV9wcmVuZGEnLCBoYW5kbGVyRGVsZXRlUHJlbmRhKVxuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOnVwZGF0ZV9wcmVuZGEnLCBoYW5kbGVyVXBkYXRlUHJlbmRhKVxuaXBjTWFpbi5oYW5kbGUoJ05vdGFzOnNhdmVfbm90YScsIGhhbmRsZXJTYXZlTm90YSlcbmlwY01haW4uaGFuZGxlKCdOb3RhczpnZXRfbGlzdF9ub3RhcycsIGhhbmRsZXJHZXRMaXN0Tm90YXMpXG5pcGNNYWluLmhhbmRsZSgnTm90YXM6aW1wcmltaXJfdGlja2V0JywgaGFuZGxlclByaW50VGlja2V0KVxuaXBjTWFpbi5oYW5kbGUoJ05vdGFzOmVsaW1pbmFyX25vdGEnLGhhbmRsZXJEZWxldGVOb3RhKVxuXG4vLyBoYW5kbGVycyBGdW5jdGlvbnNcbmZ1bmN0aW9uICB2YWxpZGF0ZWxvZ2luKG9iaikge1xuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gb2JqIFxuICAvLyBDb25uZWN0aW9uXG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcblxuICAvL1F1ZXJ5XG4gIGxldCBzcWwgPSBgU0VMRUNUIHBhc3N3b3JkICBmcm9tIFVzdWFyaW8gdSBXSEVSRSB1c2VybmFtZSA9ID8gO2A7XG4gIGNvbnN0IHJvdyA9IGRiLnByZXBhcmUoc3FsKS5nZXQoZW1haWwpO1xuICBcbiAgLy8gTWFuYWdlIGRhdGFcbiAgaWYocm93KXtcbiAgICBjb25zdCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShwYXNzd29yZCkuZGlnZXN0KCdoZXgnKTtcbiAgICBpZiAocm93LnBhc3N3b3JkID09IGhhc2gpe1xuICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3MgdmFsaWRhdGlvbicpXG4gICAgICBjcmVhdGVXaW5kb3cgKClcbiAgICAgIHdpbi5zaG93KClcbiAgICAgIHdpbmxvZ2luLmNsb3NlKClcbiAgICB9ZWxzZXtcbiAgICAgIHdpbmxvZ2luLndlYkNvbnRlbnRzLnNlbmQoJ2Vycm9yJyxgcGFzc3dvcmQgaXNuJ3QgY29ycmVjdGApXG4gICAgfVxuICB9ZWxzZXtcbiAgICB3aW5sb2dpbi53ZWJDb250ZW50cy5zZW5kKCdlcnJvcicsYFVzZXJuYW1lIGRvZXNuJ3QgZXhpc3RgKVxuICB9XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlU3VjdXJzYWxHZXRMaXN0KCkge1xuICAvLyBDb25uZWN0aW9uXG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcblxuICAgIFxuICAvL1F1ZXJ5XG4gIGxldCBzcWwgPSBgU0VMRUNUIHN1Y3Vyc2FsX2lkIGFzIGlkLG5vbWJyZSAgZnJvbSBTdWN1cnNhbCA7YDsgXG4gIGxldCBkYXRhPWRiLnByZXBhcmUoc3FsKS5hbGwoKTtcbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3VjdXJzYWxHZXRMaXN0UHJlY2lvcyhldmVudCxzdWN1cnNhbF9pZCwgcmVnaXN0cmFkbz1mYWxzZSkge1xuICAvLyBDb25uZWN0aW9uXG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcbiAgbGV0IHNxbCBcbiAgXG4gIC8vUXVlcnlcbiAgc3FsPSBgU0VMRUNUICR7cmVnaXN0cmFkbz8nbHAubGlzdGFzX3ByZWNpb3NfaWQnOidwLnByZW5kYV9pZCd9IGFzIGlkLHAubm9tYnJlLHAudGlwb19zZXJ2aWNpbyBhcyBzZXJ2aWNpbyxscC5wcmVjaW8gIEZST00gUHJlbmRhIHBcbiAgJHtyZWdpc3RyYWRvPydpbm5lcic6J2xlZnQnfSBqb2luIChcbiAgICBTRUxFQ1QgbGlzdGFzX3ByZWNpb3NfaWQscHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbyBmcm9tIExpc3Rhc19QcmVjaW9zIGxwIFxuICAgIFdIRVJFIHByZW5kYV9pZCBpcyBub3QgbnVsbFxuICAgICAgYW5kIGlzX2FjdGl2ZSBpcyBUUlVFICBcbiAgICAgIGFuZCBzdWN1cnNhbF9pZCA9ID9cbiAgKSBscFxuICBvbiBwLnByZW5kYV9pZCA9bHAucHJlbmRhX2lkIGA7IFxuXG4gIGxldCBkYXRhPWRiLnByZXBhcmUoc3FsKS5hbGwoc3VjdXJzYWxfaWQpO1xuICBcblxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWN1cnNhbFVwZGF0ZUxpc3RQcmVjaW9zKGV2ZW50LGxpc3RfcHJlY2lvcyl7XG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcbiAgbGlzdF9wcmVjaW9zLmZvckVhY2gob2JqX3ByZWNpbyA9PiB7XG4gICAgY29uc3Qge2lkX3ByZW5kYSxpZF9zdWN1cnNhbCxwcmVjaW99ID0gb2JqX3ByZWNpb1xuICAgIC8vIGNoZWNhciBxdWUgZXhpc3RlIGVsIGVsZW1lbnRvIGVuIGxhIGxpc3RhIGRlIHByZWNpb1xuICAgIFxuICAgIGxldCBzcWwgPSBgU0VMRUNUIHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8gZnJvbSBMaXN0YXNfUHJlY2lvcyBscCBcbiAgICAgICAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9PyBhbmQgaXNfYWN0aXZlIGlzIFRSVUVgOyBcbiAgICBsZXQgZGF0YT1kYi5wcmVwYXJlKHNxbCkuZ2V0KFtpZF9wcmVuZGEsaWRfc3VjdXJzYWxdKTtcbiAgICBcbiAgICAvLyBzaSBleGlzdGUsIHJldmlzYXIgc2kgZXMgdW4gcHJlY2lvIGxsZW5vIG8gdmFjaW9cbiAgICBpZihkYXRhICE9IG51bGwpe1xuICAgICAgLy8gc2kgY2FtYmlvIGVsIHByZWNpbywgdXBkYXRlIGFuZCBpbnNlcnQgbmV3IHByZWNpb1xuICAgICAgaWYocHJlY2lvLmxlbmd0aCA+IDApe1xuICAgICAgICBpZiAoZGF0YS5wcmVjaW8gIT0gcHJlY2lvKXsgLy8gQWN0dWFsaXphIHkgYWdyZWdhIHNvbG8gY3VhbmRvIGNhbWJpYSBlbCBwcmVjaW9cbiAgICAgICAgICAvLyBzZSBkZXNhY3RpdmEgZWwgcHJlY2lvIGFjdHVhbFxuICAgICAgICAgIGNvbnN0IHF1ZXJ5VXBkYXRlPWBVUERBVEUgTGlzdGFzX1ByZWNpb3MgXG4gICAgICAgICAgU0VUIGlzX2FjdGl2ZSA9IEZBTFNFXG4gICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPSA/ICBgXG4gICAgICAgICAgY29uc3QgcmVzdWx0VXBkPSBkYi5wcmVwYXJlKHF1ZXJ5VXBkYXRlKS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBTZSBhZ3JlZ2EgZWwgbnVldm8gcHJlY2lvIGFjdGl2b1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0TmV3PWBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyAocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZBTFVFUyAoPyw/LD8pYFxuICAgICAgICAgIGNvbnN0IHJlc3VsdEluPSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0TmV3KS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsLHByZWNpbyk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc29sZS5sb2coJ1VQREFURSBwcmljZScscmVzdWx0VXBkLHJlc3VsdEluKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIHNpIG5vIGhheSBwcmVjaW8sIGRlc2FjdGl2YXIgc29sYW1lbnRlXG4gICAgICAgIGNvbnN0IHF1ZXJ5VXBkYXRlPWBVUERBVEUgTGlzdGFzX1ByZWNpb3MgXG4gICAgICAgICAgICAgICAgICAgIFNFVCBpc19hY3RpdmUgPSBGQUxTRVxuICAgICAgICAgICAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9ID8gIGBcbiAgICAgICAgY29uc3QgcmVzdWx0VXBkPSBkYi5wcmVwYXJlKHF1ZXJ5VXBkYXRlKS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VQREFURSB0byBmYWxzZScscmVzdWx0VXBkKVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgIC8vc2lubyBleGlzdGUsIHJldmlzYXIgc2kgdGllbmUgcHJlY2lvXG4gICAgICAvLyBzaSB0aWVuZSBwcmVjaW8gLT4gaW5zZXJ0IHByZWNpb1xuICAgICAgaWYocHJlY2lvLmxlbmd0aCA+IDApe1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcXVlcnlJbnNlcnQ9YElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zIChwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvKVxuICAgICAgICAgICAgICAgICAgICAgIFZBTFVFUyAoPyw/LD8pYFxuICAgICAgICBjb25zdCByZXN1bHQ9IGRiLnByZXBhcmUocXVlcnlJbnNlcnQpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwscHJlY2lvKTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgXG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlclNhdmVQcmVuZGFQcmVjaW8oZXZlbnQsZGF0YVByZW5kYSl7XG4gIGNvbnNvbGUubG9nKGRhdGFQcmVuZGEpXG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcbiAgY29uc3QgcXVlcnlJbnNlcnROZXdQcmVuZGE9YElOU0VSVCBJTlRPIFByZW5kYSAobm9tYnJlLHRpcG9fc2VydmljaW8pXG4gIFZBTFVFUyAoPyw/KTtgXG4gIGNvbnN0IHJlc3VsdEluUHJlbmRhPSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0TmV3UHJlbmRhKS5ydW4oZGF0YVByZW5kYVsnbm9tYnJlJ10sZGF0YVByZW5kYVsndGlwb19zZXJ2aWNpbyddKTtcbiAgY29uc29sZS5sb2coJ1ByZW5kYSBhZ3JlZ2FkYS4uLiAnLHJlc3VsdEluUHJlbmRhKVxuICBjb25zdCBpZF9wcmVuZGE9cmVzdWx0SW5QcmVuZGEubGFzdEluc2VydFJvd2lkXG4gIC8vIFNlIGFncmVnYSBlbCBudWV2byBwcmVjaW8gYWN0aXZvXG4gIGNvbnN0IHF1ZXJ5SW5zZXJ0TmV3TFA9YElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zIChwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvKVxuICBWQUxVRVMgKGxhc3RfaW5zZXJ0X3Jvd2lkKCksPyw/KWBcbiAgY29uc3QgcmVzdWx0SW5MUD0gZGIucHJlcGFyZShxdWVyeUluc2VydE5ld0xQKS5ydW4oZGF0YVByZW5kYVsnaWRfc3VjdXJzYWwnXSxkYXRhUHJlbmRhWydwcmVjaW8nXSk7XG4gIFxuICBjb25zb2xlLmxvZygnUHJlbmRhIGFncmVnYWRhIGVuIExQLi4uICcscmVzdWx0SW5MUClcbiAgcmV0dXJuIGlkX3ByZW5kYVxufVxuXG5mdW5jdGlvbiBoYW5kbGVyRGVsZXRlUHJlbmRhKGV2ZW50LCBkYXRhUHJlbmRhKSB7XG4gIGNvbnN0IHsgaWRfcHJlbmRhIH0gPSBkYXRhUHJlbmRhXG5cbiAgdHJ5IHtcbiAgICAvLyBWZXJpZmljYXIgcXVlIGxvcyBJRHMgbm8gc2VhbiB1bmRlZmluZWRcbiAgICBpZiAoaWRfcHJlbmRhID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsIGlkIGRlIGxhIHByZW5kYSBubyBwdWVkZSBzZXIgdW5kZWZpbmVkLicpO1xuICAgIH1cbiAgXG4gICAgIC8vIEVsaW1pbmFyIGxvcyBwcmVjaW9zIGRlIGxhIHByZW5kYSBkZSBsYSB0YWJsYSBMaXN0YXNfUHJlY2lvc1xuICAgIGNvbnN0IHF1ZXJ5RGVsZXRlTFAgPSBgREVMRVRFIEZST00gTGlzdGFzX1ByZWNpb3MgV0hFUkUgcHJlbmRhX2lkID0gPztgO1xuICAgIGNvbnN0IHJlc3VsdERlbGV0ZUxQID0gZGIucHJlcGFyZShxdWVyeURlbGV0ZUxQKS5ydW4oaWRfcHJlbmRhKTtcbiAgICBjb25zb2xlLmxvZygnUHJlY2lvcyBkZSBwcmVuZGEgZWxpbWluYWRvcyBkZSBMUC4uLicsIHJlc3VsdERlbGV0ZUxQKTtcblxuICAgIC8vIEVsaW1pbmFyIGxhIHByZW5kYSBkZSBsYSB0YWJsYSBQcmVuZGFcbiAgICBjb25zdCBxdWVyeURlbGV0ZVByZW5kYSA9IGBERUxFVEUgRlJPTSBQcmVuZGEgV0hFUkUgcHJlbmRhX2lkID0gPztgO1xuICAgIGNvbnN0IHJlc3VsdERlbGV0ZVByZW5kYSA9IGRiLnByZXBhcmUocXVlcnlEZWxldGVQcmVuZGEpLnJ1bihpZF9wcmVuZGEpO1xuICAgIGNvbnNvbGUubG9nKCdQcmVuZGEgZWxpbWluYWRhLi4uJywgcmVzdWx0RGVsZXRlUHJlbmRhKTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbiAgXG59XG5cbmZ1bmN0aW9uIGhhbmRsZXJVcGRhdGVQcmVuZGEoZXZlbnQsIGRhdGFQcmVuZGEpe1xuXG4gIGNvbnN0IHsgaWRfcHJlbmRhLCBub21icmUsIHByZWNpbywgdGlwb19zZXJ2aWNpbywgaWRfc3VjdXJzYWwgfSA9IGRhdGFQcmVuZGE7XG5cbiAgdHJ5IHtcbiAgICAvLyBWZXJpZmljYXIgcXVlIGxvcyBJRHMgbm8gc2VhbiB1bmRlZmluZWRcbiAgICBpZiAoaWRfcHJlbmRhID09PSB1bmRlZmluZWQgfHwgaWRfc3VjdXJzYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbCBpZCBkZSBsYSBwcmVuZGEgbyBkZSBsYSBzdWN1cnNhbCBubyBwdWVkZSBzZXIgdW5kZWZpbmVkLicpO1xuICAgIH1cbiAgXG4gICAgLy8gQWN0dWFsaXphciBub21icmUgbyB0aXBvX3NlcnZpY2lvIFxuICAgIGNvbnN0IHF1ZXJ5VXBkYXRlUHJlbmRhID0gYFVQREFURSBQcmVuZGEgU0VUIG5vbWJyZSA9ID8sIHRpcG9fc2VydmljaW8gPSA/IFdIRVJFIHByZW5kYV9pZCA9ID87YDtcbiAgICBjb25zdCByZXN1bHRVcGRhdGVQcmVuZGEgPSBkYi5wcmVwYXJlKHF1ZXJ5VXBkYXRlUHJlbmRhKS5ydW4obm9tYnJlLCB0aXBvX3NlcnZpY2lvLCBpZF9wcmVuZGEpO1xuICAgIGNvbnNvbGUubG9nKCdQcmVuZGEgYWN0dWFsaXphZGEuLi4gJywgcmVzdWx0VXBkYXRlUHJlbmRhKTtcblxuICAgIGNvbnN0IHNxbCA9IGBTRUxFQ1QgcHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbyBmcm9tIExpc3Rhc19QcmVjaW9zIGxwIFxuICAgICAgICAgICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPT8gYW5kIGlzX2FjdGl2ZSBpcyBUUlVFYDsgXG5cbiAgICBjb25zdCBkYXRhPWRiLnByZXBhcmUoc3FsKS5nZXQoW2lkX3ByZW5kYSxpZF9zdWN1cnNhbF0pO1xuXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICBcbiAgICAvLyBzaSBleGlzdGUsIHJldmlzYXIgc2kgZXMgdW4gcHJlY2lvIGxsZW5vIG8gdmFjaW9cbiAgICBpZihkYXRhICE9IG51bGwpe1xuICAgICAgLy8gc2kgY2FtYmlvIGVsIHByZWNpbywgdXBkYXRlIGFuZCBpbnNlcnQgbmV3IHByZWNpb1xuICAgICAgaWYoZGF0YVByZW5kYS5wcmVjaW8ubGVuZ3RoID4gMCl7XG4gICAgICAgIGlmIChkYXRhLnByZWNpbyAhPSBwcmVjaW8peyAvLyBBY3R1YWxpemEgeSBhZ3JlZ2Egc29sbyBjdWFuZG8gY2FtYmlhIGVsIHByZWNpb1xuICAgICAgICAgIC8vIHNlIGRlc2FjdGl2YSBlbCBwcmVjaW8gYWN0dWFsXG4gICAgICAgICAgY29uc3QgcXVlcnlVcGRhdGU9YFVQREFURSBMaXN0YXNfUHJlY2lvcyBcbiAgICAgICAgICAgIFNFVCBpc19hY3RpdmUgPSBGQUxTRVxuICAgICAgICAgICAgV0hFUkUgcHJlbmRhX2lkID0gPyBhbmQgc3VjdXJzYWxfaWQgPSA/ICBgXG4gICAgICAgICAgY29uc3QgcmVzdWx0VXBkPSBkYi5wcmVwYXJlKHF1ZXJ5VXBkYXRlKS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBTZSBhZ3JlZ2EgZWwgbnVldm8gcHJlY2lvIGFjdGl2b1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0TmV3PWBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyAocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZBTFVFUyAoPyw/LD8pYFxuICAgICAgICAgIGNvbnN0IHJlc3VsdEluPSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0TmV3KS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsLHByZWNpbyk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc29sZS5sb2coJ1VQREFURSBwcmljZScscmVzdWx0VXBkLHJlc3VsdEluKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIHNpIG5vIGhheSBwcmVjaW8sIGRlc2FjdGl2YXIgc29sYW1lbnRlXG4gICAgICAgIGNvbnN0IHF1ZXJ5VXBkYXRlPWBVUERBVEUgTGlzdGFzX1ByZWNpb3MgXG4gICAgICAgICAgICAgICAgICAgIFNFVCBpc19hY3RpdmUgPSBGQUxTRVxuICAgICAgICAgICAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9ID8gIGBcbiAgICAgICAgY29uc3QgcmVzdWx0VXBkPSBkYi5wcmVwYXJlKHF1ZXJ5VXBkYXRlKS5ydW4oaWRfcHJlbmRhLCBpZF9zdWN1cnNhbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUERBVEUgdG8gZmFsc2UnLHJlc3VsdFVwZClcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIC8vc2lubyBleGlzdGUsIHJldmlzYXIgc2kgdGllbmUgcHJlY2lvXG4gICAgICAvLyBzaSB0aWVuZSBwcmVjaW8gLT4gaW5zZXJ0IHByZWNpb1xuICAgICAgaWYocHJlY2lvLmxlbmd0aCA+IDApe1xuICAgICAgIFxuICAgICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0PWBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyAocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbylcbiAgICAgICAgICAgICAgICAgICAgIFZBTFVFUyAoPyw/LD8pYFxuICAgICAgIGNvbnN0IHJlc3VsdD0gZGIucHJlcGFyZShxdWVyeUluc2VydCkucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCxwcmVjaW8pO1xuICAgICAgIFxuICAgICAgfVxuICAgIH1cblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGhhbmRsZXJTYXZlTm90YShldmVudCxkYXRhTm90YSl7XG4gIGNvbnNvbGUubG9nKGRhdGFOb3RhKVxuXG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcbiAgY29uc3Qge251bV9ub3RhLGNsaWVudGUsaWRfc3VjdXJzYWwsZmVjaGFfcmVjZXBjaW9uLGZlY2hhX2VudHJlZ2EscHJlbmRhc309ZGF0YU5vdGFcbiAgY29uc3QgbnVtX25vdGFfaW50PXBhcnNlSW50KG51bV9ub3RhKVxuICBjb25zdCBpZF9zdWN1cnNhbF9pbnQ9cGFyc2VJbnQoaWRfc3VjdXJzYWwpXG4gIGNvbnN0IEZFX2RpYSA9IGZlY2hhX3JlY2VwY2lvbi5nZXREYXRlKCk7IC8vIE9idGVuZXIgZWwgZMOtYSBkZWwgbWVzIChlai4gMjMpXG4gIGNvbnN0IEZFX21lcyA9IGZlY2hhX3JlY2VwY2lvbi5nZXRNb250aCgpOyAvLyBPYnRlbmVyIGVsIG1lcyAoMCBwYXJhIGVuZXJvLCAxIHBhcmEgZmVicmVybywgZXRjLilcbiAgY29uc3QgRkVfYW5pbyA9IGZlY2hhX3JlY2VwY2lvbi5nZXRGdWxsWWVhcigpOyAvLyBPYnRlbmVyIGVsIGHDsW8gKGVqLiAyMDI0KVxuICBjb25zdCBGRV9kYXRlPUZFX2FuaW8rJy0nK0ZFX21lcysnLScrRkVfZGlhXG4gIGNvbnN0IEZSX2RpYSA9IGZlY2hhX2VudHJlZ2EuZ2V0RGF0ZSgpOyAvLyBPYnRlbmVyIGVsIGTDrWEgZGVsIG1lcyAoZWouIDIzKVxuICBjb25zdCBGUl9tZXMgPSBmZWNoYV9lbnRyZWdhLmdldE1vbnRoKCk7IC8vIE9idGVuZXIgZWwgbWVzICgwIHBhcmEgZW5lcm8sIDEgcGFyYSBmZWJyZXJvLCBldGMuKVxuICBjb25zdCBGUl9hbmlvID0gZmVjaGFfZW50cmVnYS5nZXRGdWxsWWVhcigpOyAvLyBPYnRlbmVyIGVsIGHDsW8gKGVqLiAyMDI0KVxuICBjb25zdCBGUl9kYXRlPUZSX2FuaW8rJy0nK0ZSX21lcysnLScrRlJfZGlhXG4gIGxldCBjbGllbnRlX2lkXG4gIGlmKEJvb2xlYW4oY2xpZW50ZSkpe1xuICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0Q2xpZW50ZT1gXG4gICAgSU5TRVJUIElOVE8gY2xpZW50ZSAobm9tYnJlLHN1Y3Vyc2FsX2lkLGlzX293bmVyX3N1Y3Vyc2FsKVxuICAgIFZBTFVFUyBcdCg/LD8sRmFsc2UpO1xuICAgIGBcbiAgICBjb25zdCBjbGllbnRlX2luZm89ZGIucHJlcGFyZShxdWVyeUluc2VydENsaWVudGUpLnJ1bihjbGllbnRlLGlkX3N1Y3Vyc2FsX2ludClcbiAgICBjbGllbnRlX2lkPWNsaWVudGVfaW5mby5sYXN0SW5zZXJ0Um93aWRcbiAgfWVsc2V7XG4gICAgY29uc3QgcXVlcnlHZXRDbGllbnRlPWBcbiAgICBTRUxFQ1QgYy5jbGllbnRlX2lkICBmcm9tIGNsaWVudGUgY1xuICAgIHdoZXJlIGMuc3VjdXJzYWxfaWQgPSA/IGFuZCBjLmlzX293bmVyX3N1Y3Vyc2FsID0gVFJVRSBcbiAgICBsaW1pdCAxO1xuICAgIGBcbiAgICBjb25zdCBjbGllbnRlX2luZm89ZGIucHJlcGFyZShxdWVyeUdldENsaWVudGUpLmdldChpZF9zdWN1cnNhbF9pbnQpXG4gICAgY2xpZW50ZV9pZD1jbGllbnRlX2luZm8uY2xpZW50ZV9pZFxuICB9XG4gIGNvbnNvbGUubG9nKFwiY2xpZW50ZSBhZ3JlZ2Fkby4uLiBcIixCb29sZWFuKGNsaWVudGUpLGNsaWVudGVfaWQpXG4gIC8vIE9idGVuZXIgaWRzIGRlIHByZW5kYXNcbiAgbGV0IHJlZ19wcmVuZGFzPVtdXG4gIGxldCBwcmVjaW9Ub3RhbD0wXG4gIHByZW5kYXMuZm9yRWFjaChwcmVuZGFfb2JqPT57XG4gICAgbGV0IHByZW5kYV9pZFxuICAgIGlmIChwcmVuZGFfb2JqLmlzX2NvbW9kaW4peyAvL3JlZ2lzdHJvIGRlIHByZW5kYSBjb21vZGluXG4gICAgICBjb25zdCBxdWVyeUluc2VydFByZW5kYUNvbW9kaW49YFxuICAgICAgSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MocHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbyxub21icmVfY29tb2RpbilcbiAgICAgIFZhbHVlc1x0XHQobnVsbCw/LD8sPyk7YFxuICAgICAgbGV0IHByZW5kYV9jb21vZGluX3Jlcz1kYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0UHJlbmRhQ29tb2RpbikucnVuKGlkX3N1Y3Vyc2FsX2ludCxwYXJzZUludChwcmVuZGFfb2JqLnByZWNpbykscHJlbmRhX29iai5wcmVuZGFfaWQpXG4gICAgICBwcmVuZGFfaWQ9cHJlbmRhX2NvbW9kaW5fcmVzLmxhc3RJbnNlcnRSb3dpZFxuXG4gICAgICBwcmVjaW9Ub3RhbCs9KHBhcnNlSW50KHByZW5kYV9vYmoucHJlY2lvKSpwcmVuZGFfb2JqLm51bV9wcmVuZGFzKVxuICAgIH1lbHNleyAvLyBMYSBwcmVuZGEgeWEgZXN0w6EgcmVnaXN0cmFkYSwgb2J0ZW5lciBpZFxuICAgICAgY29uc3QgcXVlcnlHZXRMaXN0YXNQcmVjaW9zSWQ9YFxuICAgICAgICBzZWxlY3QgbC5saXN0YXNfcHJlY2lvc19pZCxsLnByZWNpbyAgZnJvbSBMaXN0YXNfUHJlY2lvcyBsXG4gICAgICAgIFdIRVJFIGwucHJlbmRhX2lkID0gP1xuICAgICAgICBhbmQgbC5zdWN1cnNhbF9pZCA9ID9cbiAgICAgICAgYW5kIGwuaXNfYWN0aXZlICBpcyBUUlVFXG4gICAgICAgIGxpbWl0IDE7YFxuICAgICAgbGV0IGxpc3Rhc19wcmVjaW9zX3Jlcz1kYi5wcmVwYXJlKHF1ZXJ5R2V0TGlzdGFzUHJlY2lvc0lkKS5nZXQocGFyc2VJbnQocHJlbmRhX29iai5wcmVuZGFfaWQpLGlkX3N1Y3Vyc2FsX2ludClcbiAgICAgIGNvbnNvbGUubG9nKFwibGlzdGFfcHJlY2lvc1wiLCBsaXN0YXNfcHJlY2lvc19yZXMpXG4gICAgICBwcmVuZGFfaWQ9bGlzdGFzX3ByZWNpb3NfcmVzLmxpc3Rhc19wcmVjaW9zX2lkXG4gICAgICBwcmVjaW9Ub3RhbCs9KGxpc3Rhc19wcmVjaW9zX3Jlcy5wcmVjaW8qcHJlbmRhX29iai5udW1fcHJlbmRhcylcbiAgICB9XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByZW5kYV9vYmoubnVtX3ByZW5kYXM7IGluZGV4KyspIHsgLy8gYWdyZWdhbW9zIGVsIG51bWVybyBkZSBwcmVuZGFzXG4gICAgICBpZihwcmVuZGFfb2JqLmNvbG9yZXNbaW5kZXhdKXtcbiAgICAgICAgcmVnX3ByZW5kYXMucHVzaCh7J3ByZW5kYV9saXN0YXNfcHJlY2lvc19pZCc6cHJlbmRhX2lkLCdjb2xvcic6cHJlbmRhX29iai5jb2xvcmVzW2luZGV4XX0pXG4gICAgICB9ZWxzZXsgLy8gc2kgbm8gc2UgcmVnaXN0cmFyb24gbcOhcyBjb2xvcmVzLCBzZSB1dGlsaXphIGVsIHVsdGltbywgbGFzIHZlY2VzIG5lY2VzYXJpYXNcbiAgICAgICAgbGV0IGxhc3RfaWQ9cHJlbmRhX29iai5jb2xvcmVzLmxlbmd0aC0xXG4gICAgICAgIHJlZ19wcmVuZGFzLnB1c2goeydwcmVuZGFfbGlzdGFzX3ByZWNpb3NfaWQnOnByZW5kYV9pZCwnY29sb3InOnByZW5kYV9vYmouY29sb3Jlc1tsYXN0X2lkXX0pXG4gICAgICB9XG4gICAgfVxuICB9KVxuICBjb25zb2xlLmxvZygnUHJlbmRhcyByZWdpc3RyYWRhcycpXG4gIGNvbnNvbGUubG9nKHJlZ19wcmVuZGFzKVxuICBjb25zb2xlLmxvZygnUHJlY2lvIHRvdGFsOicscHJlY2lvVG90YWwpXG4gIC8vIFJlZ2lzdHJvIGRlIE5vdGFcbiAgY29uc3QgcXVlcnlJbnNlcnROZXdOb3RhPWBcbiAgSU5TRVJUIElOVE8gTm90YSAobnVtX25vdGEsY2xpZW50ZV9pZCxmZWNoYV9yZWNlcGNpb24sZmVjaGFfZW50cmVnYSxwcmVjaW9fdG90YWwpXG4gICAgVkFMVUVTIFx0KD8sPyw/LD8sPyk7YDtcblxuICBjb25zdCByZXNQcmVuZGE9IGRiLnByZXBhcmUocXVlcnlJbnNlcnROZXdOb3RhKS5ydW4obnVtX25vdGFfaW50LGNsaWVudGVfaWQsRlJfZGF0ZSxGRV9kYXRlLHByZWNpb1RvdGFsKTtcbiBcbiAgY29uc3Qgbm90YV9pZD1yZXNQcmVuZGEubGFzdEluc2VydFJvd2lkO1xuICBjb25zb2xlLmxvZyhcIk5vdGFfaWRcIixub3RhX2lkKVxuICAvLyBSZWdpc3RybyBkZSBOb3RhX1JvcGEgcG9yIHByZW5kYVxuICByZWdfcHJlbmRhcy5mb3JFYWNoKHByZW5kYT0+e1xuICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0Tm90YVJvcGE9YFxuICAgICAgSU5TRVJUIElOVE8gTm90YV9Sb3BhIChub3RhX2lkLHByZW5kYV9saXN0YV9wcmVjaW9zX2lkLGNvbG9yLGRldGFsbGVzKVxuICAgICAgdmFsdWVzXHQoPyw/LD8sbnVsbCk7YDtcbiAgICBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0Tm90YVJvcGEpLnJ1bihub3RhX2lkLHByZW5kYS5wcmVuZGFfbGlzdGFzX3ByZWNpb3NfaWQscHJlbmRhLmNvbG9yKTtcbiAgfSlcbiAgXG4gIHJldHVybiBcInN1Y2Nlc3NcIlxuICBcblxuXG59XG5cblxuZnVuY3Rpb24gaGFuZGxlckdldExpc3ROb3RhcyhldmVudCxkYXRhTm90YSl7XG4gIC8vY29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpKTtcbiAgY29uc3Qge3N1Y3Vyc2FsX2lkLG51bV9ub3RhLGNsaWVudGVfbmFtZSxmZWNoYV9kZXNkZSxmZWNoYV9oYXN0YX09ZGF0YU5vdGFcbiAgY29uc3QgbnVtX25vdGFfaW50PXBhcnNlSW50KG51bV9ub3RhKVxuICBjb25zdCBpZF9zdWN1cnNhbF9pbnQ9cGFyc2VJbnQoc3VjdXJzYWxfaWQpXG4gIGNvbnNvbGUubG9nKHN1Y3Vyc2FsX2lkLGlkX3N1Y3Vyc2FsX2ludCxCb29sZWFuKGlkX3N1Y3Vyc2FsX2ludCkpXG5cbiAgLy9RdWVyeVxuICBsZXQgc3FsPSBgU0VMRUNUIG4ubm90YV9pZCxuLm51bV9ub3RhLFxuICAgICAgICAgIGMubm9tYnJlIGFzIG5vbWJyZV9jbGllbnRlLFxuICAgICAgICAgIHMubm9tYnJlICBhcyBub21icmVfc3VjdXJzYWwsXG4gICAgICAgICAgbi5wcmVjaW9fdG90YWwsXG4gICAgICAgICAgbi5mZWNoYV9yZWdpc3RybyxcbiAgICAgICAgICBuLmZlY2hhX3JlY2VwY2lvbixcbiAgICAgICAgICBuLmZlY2hhX2VudHJlZ2EsXG4gICAgICAgICAgbHAubGlzdGFzX3ByZWNpb3NfaWQgYXMgcHJlbmRhX2lkICxcbiAgICAgICAgICBpZm51bGwocC5ub21icmUsbHAubm9tYnJlX2NvbW9kaW4pIGFzIG5vbWJyZV9wcmVuZGEsXG4gICAgICAgICAgbnIuY29sb3IsXG4gICAgICAgICAgcC50aXBvX3NlcnZpY2lvLFxuICAgICAgICAgIGxwLnByZWNpb1xuICAgICAgICBGUk9NIE5vdGEgbiBcbiAgICAgICAgSU5ORVIgSk9JTiBOb3RhX1JvcGEgbnIgXG4gICAgICAgIE9OIG4ubm90YV9pZCA9bnIubm90YV9pZCBcbiAgICAgICAgSU5ORVIgSk9JTiBMaXN0YXNfUHJlY2lvcyBscCBcbiAgICAgICAgT04gbnIucHJlbmRhX2xpc3RhX3ByZWNpb3NfaWQgPWxwLmxpc3Rhc19wcmVjaW9zX2lkIFxuICAgICAgICBMRUZUIGpvaW4gUHJlbmRhIHAgXG4gICAgICAgIE9OIGxwLnByZW5kYV9pZCA9cC5wcmVuZGFfaWRcbiAgICAgICAgTEVGVCBKT0lOIENsaWVudGUgY1xuICAgICAgICBPTiBuLmNsaWVudGVfaWQgPWMuY2xpZW50ZV9pZFxuICAgICAgICBMRUZUIEpPSU4gU3VjdXJzYWwgcyBcbiAgICAgICAgT04gYy5zdWN1cnNhbF9pZCAgPXMuc3VjdXJzYWxfaWQgIFxuICAgICAgICBXSEVSRSBUUlVFIGA7IFxuXG4gIGxldCBiaW5kUGFyYW1ldGVycz1bXVxuICBpZihpZF9zdWN1cnNhbF9pbnQpe1xuICAgIHNxbCs9YCBBTkQgcy5zdWN1cnNhbF9pZCA9ID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKGlkX3N1Y3Vyc2FsX2ludClcbiAgfVxuICBpZihudW1fbm90YV9pbnQpe1xuICAgIHNxbCs9YCBBTkQgbi5udW1fbm90YSA9ID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKG51bV9ub3RhX2ludClcbiAgfVxuICBpZihjbGllbnRlX25hbWUpe1xuICAgIHNxbCs9YCBBTkQgbG93ZXIoYy5ub21icmUpIGxpa2UgPyBgO1xuICAgIGJpbmRQYXJhbWV0ZXJzLnB1c2goJyUnK2NsaWVudGVfbmFtZS50b0xvd2VyQ2FzZSgpKyclJylcbiAgfVxuICBpZihmZWNoYV9kZXNkZSl7XG4gICAgY29uc3QgRmVjaGFfZGVzZGVfZGlhPWZlY2hhX2Rlc2RlLnNwbGl0KCcvJylbMF1cbiAgICBjb25zdCBGZWNoYV9kZXNkZV9tZXM9ZmVjaGFfZGVzZGUuc3BsaXQoJy8nKVsxXVxuICAgIGNvbnN0IEZlY2hhX2Rlc2RlX2FuaW89cGFyc2VJbnQoZmVjaGFfZGVzZGUuc3BsaXQoJy8nKVsyXSlcbiAgICBjb25zdCBGZWNoYV9kZXNkZV9kYXRlPUZlY2hhX2Rlc2RlX2FuaW8rJy0nK0ZlY2hhX2Rlc2RlX21lcysnLScrRmVjaGFfZGVzZGVfZGlhXG5cbiAgICBzcWwrPWAgQU5EIGZlY2hhX3JlZ2lzdHJvICA+PSA/IGA7XG4gICAgYmluZFBhcmFtZXRlcnMucHVzaChGZWNoYV9kZXNkZV9kYXRlKVxuXG4gIH1cbiAgaWYoZmVjaGFfaGFzdGEpe1xuICAgIGNvbnN0IEZlY2hhX2hhc3RhX2RpYT0ocGFyc2VJbnQoZmVjaGFfaGFzdGEuc3BsaXQoJy8nKVswXSkrMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpXG4gICAgY29uc3QgRmVjaGFfaGFzdGFfbWVzPWZlY2hhX2hhc3RhLnNwbGl0KCcvJylbMV1cbiAgICBjb25zdCBGZWNoYV9oYXN0YV9hbmlvPXBhcnNlSW50KGZlY2hhX2hhc3RhLnNwbGl0KCcvJylbMl0pXG4gICAgY29uc3QgRmVjaGFfaGFzdGFfZGF0ZT1GZWNoYV9oYXN0YV9hbmlvKyctJytGZWNoYV9oYXN0YV9tZXMrJy0nK0ZlY2hhX2hhc3RhX2RpYVxuXG4gICAgc3FsKz1gIEFORCBmZWNoYV9yZWdpc3RybyAgPD0gPyBgO1xuICAgIGJpbmRQYXJhbWV0ZXJzLnB1c2goRmVjaGFfaGFzdGFfZGF0ZSlcbiAgfVxuICBjb25zb2xlLmxvZyhzcWwpXG4gIGNvbnNvbGUubG9nKGJpbmRQYXJhbWV0ZXJzKVxuICBsZXQgZGF0YT1kYi5wcmVwYXJlKHNxbCkuYWxsKGJpbmRQYXJhbWV0ZXJzKTtcbiAgXG4gIGxldCBkX25vdGFzPXt9XG4gIFxuICBkYXRhLmZvckVhY2gocm93PT57XG4gICAgbGV0IG5hbWVfcHJlbmRhPXJvd1sndGlwb19zZXJ2aWNpbyddIT1udWxsP3Jvd1snbm9tYnJlX3ByZW5kYSddOnJvd1snbm9tYnJlX3ByZW5kYSddLnNwbGl0KCctJylbMF1cbiAgICBsZXQgbmFtZV9zZXJ2aWNlPXJvd1sndGlwb19zZXJ2aWNpbyddIT1udWxsP3Jvd1sndGlwb19zZXJ2aWNpbyddOnJvd1snbm9tYnJlX3ByZW5kYSddLnNwbGl0KCctJykubGVuZ3RoPjE/cm93Wydub21icmVfcHJlbmRhJ10uc3BsaXQoJy0nKVsxXTpudWxsXG4gICAgaWYocm93Wydub3RhX2lkJ10gaW4gZF9ub3Rhcyl7XG4gICAgICBkX25vdGFzW3Jvd1snbm90YV9pZCddXVsncHJlbmRhcyddLnB1c2goe1xuICAgICAgICBpZF9wcmVuZGE6cm93WydwcmVuZGFfaWQnXSxcbiAgICAgICAgbm9tYnJlX3ByZW5kYTogbmFtZV9wcmVuZGEsXG4gICAgICAgIGNvbG9yOiByb3dbJ2NvbG9yJ10sXG4gICAgICAgIHRpcG9fc2VydmljaW86IG5hbWVfc2VydmljZSxcbiAgICAgICAgcHJlY2lvOiByb3dbJ3ByZWNpbyddXG4gICAgICB9KVxuICAgIH1lbHNle1xuICAgICAgZF9ub3Rhc1tyb3dbJ25vdGFfaWQnXV09e1xuICAgICAgICBudW1fbm90YTogcm93WydudW1fbm90YSddLFxuICAgICAgICBub21icmVfY2xpZW50ZSA6IHJvd1snbm9tYnJlX2NsaWVudGUnXSxcbiAgICAgICAgbm9tYnJlX3N1Y3Vyc2FsIDogcm93Wydub21icmVfc3VjdXJzYWwnXSxcbiAgICAgICAgcHJlY2lvX3RvdGFsIDogcm93WydwcmVjaW9fdG90YWwnXSxcbiAgICAgICAgZmVjaGFfcmVnaXN0cm8gOiByb3dbJ2ZlY2hhX3JlZ2lzdHJvJ10sXG4gICAgICAgIGZlY2hhX3JlY2VwY2lvbiA6IHJvd1snZmVjaGFfcmVjZXBjaW9uJ10sXG4gICAgICAgIGZlY2hhX2VudHJlZ2EgOiByb3dbJ2ZlY2hhX2VudHJlZ2EnXSxcbiAgICAgICAgcHJlbmRhcyA6IFt7XG4gICAgICAgICAgaWRfcHJlbmRhOnJvd1sncHJlbmRhX2lkJ10sXG4gICAgICAgICAgbm9tYnJlX3ByZW5kYTogbmFtZV9wcmVuZGEsXG4gICAgICAgICAgY29sb3I6IHJvd1snY29sb3InXSxcbiAgICAgICAgICB0aXBvX3NlcnZpY2lvOiBuYW1lX3NlcnZpY2UsXG4gICAgICAgICAgcHJlY2lvOiByb3dbJ3ByZWNpbyddXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIFxuICByZXR1cm4gZF9ub3Rhc1xuXG59XG5cbmZ1bmN0aW9uIGdldF9wcmVuZGFzX2N1ZW50YShwcmVuZGFzKXtcbiAgbGV0IHByZW5kYXNfY3VlbnRhPXt9XG4gIHByZW5kYXMuZm9yRWFjaChwcmVuZGE9PntcbiAgICBpZihwcmVuZGFbJ2lkX3ByZW5kYSddIGluIHByZW5kYXNfY3VlbnRhKXtcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydudW1fcHJlbmRhcyddKytcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydjb2xvcmVzJ10ucHVzaChwcmVuZGFbJ2NvbG9yJ10pXG4gICAgfWVsc2V7XG4gICAgICBwcmVuZGFzX2N1ZW50YVtwcmVuZGFbJ2lkX3ByZW5kYSddXT17XG4gICAgICAgIG51bV9wcmVuZGFzOjEsXG4gICAgICAgIG5vbWJyZV9wcmVuZGE6cHJlbmRhWydub21icmVfcHJlbmRhJ10sXG4gICAgICAgIHRpcG9fc2VydmljaW86cHJlbmRhWyd0aXBvX3NlcnZpY2lvJ10sXG4gICAgICAgIGNvbG9yZXM6W3ByZW5kYVsnY29sb3InXV0sXG4gICAgICAgIHByZWNpbzpwcmVuZGFbJ3ByZWNpbyddXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gcHJlbmRhc19jdWVudGFcbn1cblxuLy8gbm9tYnJlX2NsaWVudGUgZXMgc3VjdXJzYWxcbmZ1bmN0aW9uIGhhbmRsZXJQcmludFRpY2tldChldmVudCxkYXRhTm90YXMsbm9tYnJlX2NsaWVudGUpe1xuICBcbiAgbGV0IG5vdGFzPVtdXG4gIGxldCBwcmVjaW9fY3VlbnRhX3RvdGFsPTBcbiAgT2JqZWN0LmVudHJpZXMoZGF0YU5vdGFzKS5mb3JFYWNoKChbbm90YV9pZCwgbm90YV9vYmpdKSA9PiB7XG4gICAgbGV0IG5vdGFfZGVzYz17XG4gICAgICB0ZXh0X251bV9ub3RhOm5vdGFfb2JqWydudW1fbm90YSddIT1udWxsP25vdGFfb2JqWydudW1fbm90YSddOlwiU2luIE7Dum1lcm9cIixcbiAgICAgIGZlY2hhX3JlZ2lzdHJvOm5vdGFfb2JqWydmZWNoYV9yZWdpc3RybyddLnNwbGl0KFwiIFwiKVswXSxcbiAgICAgIG5vbWJyZV9jbGllbnRlOm5vdGFfb2JqWydub21icmVfY2xpZW50ZSddLFxuICAgICAgbnVtX3ByZW5kYXM6MCxcbiAgICAgIHByZWNpb190b3RhbDowLFxuICAgICAgcHJlbmRhczogW11cbiAgICB9XG4gICAgXG4gICAgbGV0IHByZW5kYXNfY3VlbnRhPWdldF9wcmVuZGFzX2N1ZW50YShub3RhX29ialsncHJlbmRhcyddKVxuICAgIE9iamVjdC5lbnRyaWVzKHByZW5kYXNfY3VlbnRhKS5mb3JFYWNoKChbcHJlbmRhX2lkLHByZW5kYV9vYmpdKT0+e1xuICAgICAgLy8gbGV0IGNvbG9yZXM9cHJlbmRhX29ialsnY29sb3JlcyddLmpvaW4oJywnKVxuICAgICAgbm90YV9kZXNjLnByZW5kYXMucHVzaChbcHJlbmRhX29ialsnbnVtX3ByZW5kYXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZW5kYV9vYmpbJ25vbWJyZV9wcmVuZGEnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZW5kYV9vYmpbJ3RpcG9fc2VydmljaW8nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wiJFwiK1N0cmluZyhwcmVuZGFfb2JqWydwcmVjaW8nXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIitTdHJpbmcocGFyc2VGbG9hdChwcmVuZGFfb2JqWydwcmVjaW8nXSkqcGFyc2VJbnQocHJlbmRhX29ialsnbnVtX3ByZW5kYXMnXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgIFxuICAgICAgbm90YV9kZXNjLnByZWNpb190b3RhbCs9cGFyc2VGbG9hdChwcmVuZGFfb2JqWydwcmVjaW8nXSkqcGFyc2VJbnQocHJlbmRhX29ialsnbnVtX3ByZW5kYXMnXSlcbiAgICB9KVxuICAgIFxuICAgIHByZWNpb19jdWVudGFfdG90YWwrPW5vdGFfZGVzYy5wcmVjaW9fdG90YWxcbiAgICBub3Rhcy5wdXNoKG5vdGFfZGVzYylcbiAgfSk7XG5cbiAgcHJpbnRUaWNrZXQobm9tYnJlX2NsaWVudGUsbm90YXMscHJlY2lvX2N1ZW50YV90b3RhbClcblxufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZXJEZWxldGVOb3RhKGV2ZW50LG5vdGFfaWQpe1xuICBjb25zdCBkZWxldGVOb3RhUm9wYT1gXG4gIERFTEVURSBGUk9NIE5vdGFfUm9wYSBXSEVSRSBub3RhX2lkID0gPzsgYFxuICBkYi5wcmVwYXJlKGRlbGV0ZU5vdGFSb3BhKS5ydW4obm90YV9pZCk7XG4gIGNvbnN0IGRlbGV0ZU5vdGE9YFxuICBERUxFVEUgRlJPTSBOb3RhIFdIRVJFIG5vdGFfaWQgPSA/O2BcbiAgZGIucHJlcGFyZShkZWxldGVOb3RhKS5ydW4obm90YV9pZCk7XG5cbiAgcmV0dXJuIHtyZXM6XCJzdWNjZXNzXCJ9XG59XG5cbi8vIGlwY01haW4uaGFuZGxlKCdnZXQnLCAoKSA9PiB7XG4vLyAgICBnZXRQcm9kdWN0cygpXG4vLyB9KTtcblxuXG4vLyBpcGNNYWluLmhhbmRsZSgnYWRkJywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgYWRkUHJvZHVjdChvYmopXG4vLyB9KTtcblxuXG4vLyBpcGNNYWluLmhhbmRsZSgnZ2V0X29uZScsIChldmVudCwgb2JqKSA9PiB7XG4vLyAgIGdldHByb2R1Y3Qob2JqKSAgICBcbi8vIH0pO1xuXG5cbi8vIGlwY01haW4uaGFuZGxlKCdyZW1vdmVfcHJvZHVjdCcsIChldmVudCwgb2JqKSA9PiB7XG4vLyAgIGRlbGV0ZXByb2R1Y3Qob2JqKVxuLy8gfSk7XG5cblxuLy8gaXBjTWFpbi5oYW5kbGUoJ3VwZGF0ZScsIChldmVudCwgb2JqKSA9PiB7XG4vLyAgIHVwZGF0ZXByb2R1Y3Qob2JqKSAgICBcbi8vIH0pO1xuXG5cbi8vIGZ1bmN0aW9uIGdldFByb2R1Y3RzKClcbi8vIHtcbiAgXG4vLyAgIGRiLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHByb2R1Y3QnLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmIChlcnJvcil7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgfVxuICAgIFxuLy8gICAgIHdpbi53ZWJDb250ZW50cy5zZW5kKCdwcm9kdWN0cycsIHJlc3VsdHMpXG4vLyAgIH0pOyAgXG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gYWRkUHJvZHVjdChvYmopXG4vLyB7XG4vLyAgIGNvbnN0IHNxbCA9IFwiSU5TRVJUIElOVE8gcHJvZHVjdCBTRVQgP1wiOyAgXG4vLyAgIGRiLnF1ZXJ5KHNxbCwgb2JqLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmKGVycm9yKSB7XG4vLyAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgICBnZXRQcm9kdWN0cygpICBcbi8vICB9KTtcbi8vIH1cblxuXG4vLyBmdW5jdGlvbiBkZWxldGVwcm9kdWN0KG9iailcbi8vIHtcbi8vICAgY29uc3QgeyBpZCB9ICA9IG9ialxuLy8gICBjb25zdCBzcWwgPSBcIkRFTEVURSBGUk9NIHByb2R1Y3QgV0hFUkUgaWQgPSA/XCJcbi8vICAgZGIucXVlcnkoc3FsLCBpZCwgKGVycm9yLCByZXN1bHRzLCBmaWVsZHMpID0+IHtcbi8vICAgICBpZihlcnJvcikge1xuLy8gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbi8vICAgICB9XG4vLyAgICAgZ2V0UHJvZHVjdHMoKSAgXG4vLyAgIH0pO1xuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGdldHByb2R1Y3Qob2JqKVxuLy8ge1xuLy8gICBsZXQgeyBpZCB9ID0gb2JqIFxuLy8gICBsZXQgc3FsID0gXCJTRUxFQ1QgKiBGUk9NIHByb2R1Y3QgV0hFUkUgaWQgPSA/XCJcbi8vICAgZGIucXVlcnkoc3FsLCBpZCwgKGVycm9yLCByZXN1bHRzLCBmaWVsZHMpID0+IHtcbi8vICAgICBpZiAoZXJyb3Ipe1xuLy8gICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKVxuLy8gICAgIHdpbi53ZWJDb250ZW50cy5zZW5kKCdwcm9kdWN0JywgcmVzdWx0c1swXSlcbi8vICAgfSk7XG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gdXBkYXRlcHJvZHVjdChvYmopIFxuLy8ge1xuLy8gICAgbGV0IHsgaWQsIG5hbWUsIHByaWNlIH0gPSBvYmpcbi8vICAgIGNvbnN0IHNxbCA9IFwiVVBEQVRFIHByb2R1Y3QgU0VUIG5hbWU9PywgcHJpY2U9PyBXSEVSRSBpZD0/XCI7ICBcbi8vICAgIGRiLnF1ZXJ5KHNxbCwgW25hbWUsIHByaWNlLCBpZF0sIChlcnJvciwgcmVzdWx0cywgZmllbGRzKSA9PiB7XG4vLyAgICAgIGlmKGVycm9yKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbi8vICAgICAgfVxuLy8gICAgICBnZXRQcm9kdWN0cygpICBcbi8vICAgIH0pO1xuLy8gfVxuXG5cbiJdLCJuYW1lcyI6WyJlc2Nwb3MiLCJwYXRoIiwiVVNCIiwicmVxdWlyZSIsImdldERldmljZSIsImRldmljZVByaW50ZXIiLCJmaW5kUHJpbnRlciIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJkZXZpY2VQcmludGVyRGVzYyIsInZpZCIsInBpZCIsImRldmljZSIsInByaW50VGlja2V0Iiwibm9tYnJlX2NsaWVudGUiLCJhcnJfbm90YXMiLCJwcmVjaW9fY3VlbnRhX3RvdGFsIiwib3B0aW9ucyIsImVuY29kaW5nIiwid2lkdGgiLCJwcmludGVyIiwiUHJpbnRlciIsImxvZ28iLCJqb2luIiwiX19kaXJuYW1lIiwiSW1hZ2UiLCJsb2FkIiwiaW1hZ2UiLCJvcGVuIiwic2V0Q2hhcmFjdGVyQ29kZVRhYmxlIiwiYWxpZ24iLCJ0aGVuIiwiZm9udCIsInNpemUiLCJ0ZXh0IiwiX2ZvckVhY2hJbnN0YW5jZVByb3BlcnR5IiwiY2FsbCIsIm5vdGEiLCJfY29udGV4dCIsInN0eWxlIiwidGV4dF9udW1fbm90YSIsImZlY2hhX3JlZ2lzdHJvIiwicHJlY2lvX3RvdGFsIiwidGFibGVDdXN0b20iLCJwcmVuZGFzIiwicm93X3ByZW5kYSIsImRyYXdMaW5lIiwiU3RyaW5nIiwiZmVlZCIsImN1dCIsImNsb3NlIiwiRGF0YWJhc2UiLCJkYlBhdGgiLCJkYiIsInZlcmJvc2UiLCJwcmFnbWEiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXBwIiwiQnJvd3NlcldpbmRvdyIsImlwY01haW4iLCJOb3RpZmljYXRpb24iLCJjcnlwdG8iLCJkYm1nciIsIndpbiIsIndpbmxvZ2luIiwid2hlblJlYWR5IiwiY3JlYXRlV2luZG93IiwiaXNQcm9kIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZnVsbHNjcmVlbiIsIm1heGltaXplIiwidGl0bGVCYXJTdHlsZSIsInRpdGxlQmFyT3ZlcmxheSIsIndlYlByZWZlcmVuY2VzIiwiZGV2VG9vbHMiLCJwcmVsb2FkIiwid2ViQ29udGVudHMiLCJvcGVuRGV2VG9vbHMiLCJsb2FkVVJMIiwicG9ydCIsImFyZ3YiLCJsb2dpbldpbmRvdyIsImhlaWdodCIsIm9uIiwicGxhdGZvcm0iLCJxdWl0IiwiZ2V0QWxsV2luZG93cyIsImhhbmRsZSIsImV2ZW50Iiwib2JqIiwidmFsaWRhdGVsb2dpbiIsImhhbmRsZVN1Y3Vyc2FsR2V0TGlzdCIsImhhbmRsZVN1Y3Vyc2FsR2V0TGlzdFByZWNpb3MiLCJoYW5kbGVTdWN1cnNhbFVwZGF0ZUxpc3RQcmVjaW9zIiwiaGFuZGxlclNhdmVQcmVuZGFQcmVjaW8iLCJoYW5kbGVyRGVsZXRlUHJlbmRhIiwiaGFuZGxlclVwZGF0ZVByZW5kYSIsImhhbmRsZXJTYXZlTm90YSIsImhhbmRsZXJHZXRMaXN0Tm90YXMiLCJoYW5kbGVyUHJpbnRUaWNrZXQiLCJoYW5kbGVyRGVsZXRlTm90YSIsImVtYWlsIiwicGFzc3dvcmQiLCJzcWwiLCJyb3ciLCJwcmVwYXJlIiwiZ2V0IiwiaGFzaCIsImNyZWF0ZUhhc2giLCJ1cGRhdGUiLCJkaWdlc3QiLCJzaG93Iiwic2VuZCIsImRhdGEiLCJhbGwiLCJzdWN1cnNhbF9pZCIsInJlZ2lzdHJhZG8iLCJsaXN0X3ByZWNpb3MiLCJvYmpfcHJlY2lvIiwiaWRfcHJlbmRhIiwiaWRfc3VjdXJzYWwiLCJwcmVjaW8iLCJxdWVyeVVwZGF0ZSIsInJlc3VsdFVwZCIsInJ1biIsInF1ZXJ5SW5zZXJ0TmV3IiwicmVzdWx0SW4iLCJxdWVyeUluc2VydCIsInJlc3VsdCIsImRhdGFQcmVuZGEiLCJxdWVyeUluc2VydE5ld1ByZW5kYSIsInJlc3VsdEluUHJlbmRhIiwibGFzdEluc2VydFJvd2lkIiwicXVlcnlJbnNlcnROZXdMUCIsInJlc3VsdEluTFAiLCJ1bmRlZmluZWQiLCJFcnJvciIsInF1ZXJ5RGVsZXRlTFAiLCJyZXN1bHREZWxldGVMUCIsInF1ZXJ5RGVsZXRlUHJlbmRhIiwicmVzdWx0RGVsZXRlUHJlbmRhIiwiZXJyb3IiLCJub21icmUiLCJ0aXBvX3NlcnZpY2lvIiwicXVlcnlVcGRhdGVQcmVuZGEiLCJyZXN1bHRVcGRhdGVQcmVuZGEiLCJkYXRhTm90YSIsIm51bV9ub3RhIiwiY2xpZW50ZSIsImZlY2hhX3JlY2VwY2lvbiIsImZlY2hhX2VudHJlZ2EiLCJudW1fbm90YV9pbnQiLCJfcGFyc2VJbnQiLCJpZF9zdWN1cnNhbF9pbnQiLCJGRV9kaWEiLCJnZXREYXRlIiwiRkVfbWVzIiwiZ2V0TW9udGgiLCJGRV9hbmlvIiwiZ2V0RnVsbFllYXIiLCJGRV9kYXRlIiwiRlJfZGlhIiwiRlJfbWVzIiwiRlJfYW5pbyIsIkZSX2RhdGUiLCJjbGllbnRlX2lkIiwiQm9vbGVhbiIsInF1ZXJ5SW5zZXJ0Q2xpZW50ZSIsImNsaWVudGVfaW5mbyIsInF1ZXJ5R2V0Q2xpZW50ZSIsInJlZ19wcmVuZGFzIiwicHJlY2lvVG90YWwiLCJwcmVuZGFfb2JqIiwicHJlbmRhX2lkIiwiaXNfY29tb2RpbiIsInF1ZXJ5SW5zZXJ0UHJlbmRhQ29tb2RpbiIsInByZW5kYV9jb21vZGluX3JlcyIsIm51bV9wcmVuZGFzIiwicXVlcnlHZXRMaXN0YXNQcmVjaW9zSWQiLCJsaXN0YXNfcHJlY2lvc19yZXMiLCJsaXN0YXNfcHJlY2lvc19pZCIsImluZGV4IiwiY29sb3JlcyIsInB1c2giLCJsYXN0X2lkIiwicXVlcnlJbnNlcnROZXdOb3RhIiwicmVzUHJlbmRhIiwibm90YV9pZCIsInByZW5kYSIsInF1ZXJ5SW5zZXJ0Tm90YVJvcGEiLCJwcmVuZGFfbGlzdGFzX3ByZWNpb3NfaWQiLCJjb2xvciIsImNsaWVudGVfbmFtZSIsImZlY2hhX2Rlc2RlIiwiZmVjaGFfaGFzdGEiLCJiaW5kUGFyYW1ldGVycyIsInRvTG93ZXJDYXNlIiwiRmVjaGFfZGVzZGVfZGlhIiwic3BsaXQiLCJGZWNoYV9kZXNkZV9tZXMiLCJGZWNoYV9kZXNkZV9hbmlvIiwiRmVjaGFfZGVzZGVfZGF0ZSIsIkZlY2hhX2hhc3RhX2RpYSIsIl9wYWRTdGFydEluc3RhbmNlUHJvcGVydHkiLCJ0b1N0cmluZyIsIkZlY2hhX2hhc3RhX21lcyIsIkZlY2hhX2hhc3RhX2FuaW8iLCJGZWNoYV9oYXN0YV9kYXRlIiwiZF9ub3RhcyIsIm5hbWVfcHJlbmRhIiwibmFtZV9zZXJ2aWNlIiwibm9tYnJlX3ByZW5kYSIsIm5vbWJyZV9zdWN1cnNhbCIsImdldF9wcmVuZGFzX2N1ZW50YSIsInByZW5kYXNfY3VlbnRhIiwiZGF0YU5vdGFzIiwiX2NvbnRleHQyIiwibm90YXMiLCJfT2JqZWN0JGVudHJpZXMiLCJub3RhX29iaiIsIl9jb250ZXh0MyIsIm5vdGFfZGVzYyIsIl9wYXJzZUZsb2F0IiwiZGVsZXRlTm90YVJvcGEiLCJkZWxldGVOb3RhIiwicmVzIl0sInNvdXJjZVJvb3QiOiIifQ==