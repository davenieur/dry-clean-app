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
  sql = `SELECT n.nota_id,n.num_nota,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eEI7O0FBRUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9tYWluL2hlbHBlcnMvVGlja2V0cy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL21haW4vaGVscGVycy9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCB1bWQgXCJiZXR0ZXItc3FsaXRlM1wiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIHVtZCBcImVzY3Bvc1wiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIHVtZCBcImVzY3Bvcy11c2JcIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvcGFkLXN0YXJ0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9wYXJzZS1mbG9hdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL3BhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvcGFkLXN0YXJ0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZW50cmllcy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvcGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3BhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3RyaW5nL3ZpcnR1YWwvcGFkLXN0YXJ0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jbGFzc29mLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZXhwb3J0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtYnVpbHQtaW4tcHJvdG90eXBlLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL21hdGgtdHJ1bmMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9udW1iZXItcGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9udW1iZXItcGFyc2UtaW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9wYXRoLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1wYWQtd2Via2l0LWJ1Zy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1wYWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctcmVwZWF0LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLXRyaW0uanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXkuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdWlkLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmVudHJpZXMuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucGFyc2UtaW50LmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN0cmluZy5wYWQtc3RhcnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3BhZC1zdGFydC5qcyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9lbnRyaWVzLmpzIiwid2VicGFjazovL215LW5leHRyb24tYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvcGFyc2UtZmxvYXQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9wYXJzZS1pbnQuanMiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC8uL21haW4vYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiZXR0ZXItc3FsaXRlM1wiKSwgcmVxdWlyZShcImVzY3Bvc1wiKSwgcmVxdWlyZShcImVzY3Bvcy11c2JcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYmV0dGVyLXNxbGl0ZTNcIiwgXCJlc2Nwb3NcIiwgXCJlc2Nwb3MtdXNiXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJiZXR0ZXItc3FsaXRlM1wiKSwgcmVxdWlyZShcImVzY3Bvc1wiKSwgcmVxdWlyZShcImVzY3Bvcy11c2JcIikpIDogZmFjdG9yeShyb290W1wiYmV0dGVyLXNxbGl0ZTNcIl0sIHJvb3RbXCJlc2Nwb3NcIl0sIHJvb3RbXCJlc2Nwb3MtdXNiXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmV0dGVyX3NxbGl0ZTNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9lc2Nwb3NfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9lc2Nwb3NfdXNiX18pID0+IHtcbnJldHVybiAiLCJpbXBvcnQgZXNjcG9zIGZyb20gJ2VzY3Bvcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gSW5zdGFsbCBlc2Nwb3MtdXNiIGFkYXB0ZXIgbW9kdWxlIG1hbnVhbGx5XHJcbmVzY3Bvcy5VU0IgPSByZXF1aXJlKCdlc2Nwb3MtdXNiJyk7XHJcblxyXG5mdW5jdGlvbiBnZXREZXZpY2UoKSB7XHJcbiAgY29uc3QgZGV2aWNlUHJpbnRlciA9IGVzY3Bvcy5VU0IuZmluZFByaW50ZXIoKTtcclxuICBpZiAoZGV2aWNlUHJpbnRlci5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImxlblwiLCBkZXZpY2VQcmludGVyLmxlbmd0aCk7XHJcbiAgICBsZXQgZGV2aWNlUHJpbnRlckRlc2MgPSBkZXZpY2VQcmludGVyWzBdWydkZXZpY2VEZXNjcmlwdG9yJ107XHJcbiAgICBjb25zdCB2aWQgPSBkZXZpY2VQcmludGVyRGVzY1snaWRWZW5kb3InXTtcclxuICAgIGNvbnN0IHBpZCA9IGRldmljZVByaW50ZXJEZXNjWydpZFByb2R1Y3QnXTtcclxuICAgIGNvbnN0IGRldmljZSA9IG5ldyBlc2Nwb3MuVVNCKHZpZCwgcGlkKTtcclxuICAgIHJldHVybiBkZXZpY2U7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcHJpbnRUaWNrZXQgPSAobm9tYnJlX2NsaWVudGUsIGFycl9ub3RhcywgcHJlY2lvX2N1ZW50YV90b3RhbCkgPT4ge1xyXG4gIGNvbnN0IGRldmljZSA9IGdldERldmljZSgpO1xyXG4gIGlmIChkZXZpY2UgIT0gbnVsbCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgZW5jb2Rpbmc6IFwiQ1AxMjUyXCIsIHdpZHRoOiAzNiB9O1xyXG4gICAgY29uc3QgcHJpbnRlciA9IG5ldyBlc2Nwb3MuUHJpbnRlcihkZXZpY2UsIG9wdGlvbnMpO1xyXG4gICAgY29uc29sZS5sb2coXCJQcmludGluZ1wiKTtcclxuICAgIGNvbnNvbGUubG9nKGFycl9ub3Rhcyk7XHJcbiAgICBjb25zdCBsb2dvID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ0RSWWxvZ29fb3JpZ180MDB3XzkwcHBwX0JXXzhiX2ZpdC5wbmcnKTtcclxuXHJcbiAgICBlc2Nwb3MuSW1hZ2UubG9hZChsb2dvLCBcImltYWdlL3BuZ1wiLCBmdW5jdGlvbihpbWFnZSkge1xyXG4gICAgICBkZXZpY2Uub3BlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBUaWNrZXQgaGVhZGVyXHJcbiAgICAgICAgcHJpbnRlci5zZXRDaGFyYWN0ZXJDb2RlVGFibGUoMTYpXHJcbiAgICAgICAgICAuYWxpZ24oJ2N0JylcclxuICAgICAgICAgIC5pbWFnZShpbWFnZSwgJ0QyNCcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmludGVyLmZvbnQoXCJCXCIpXHJcbiAgICAgICAgICAgICAgLnNpemUoMC4wNSwgMC4wNSlcclxuICAgICAgICAgICAgICAudGV4dChcIlNFUlZJQ0lPIERSWSBDTEVBTiBTSVggU1RBUlNcIilcclxuICAgICAgICAgICAgICAudGV4dChcIlRJQ0tFVCBERSBQQUdPIFBPUiBTRVJWSUNJT1MgREUgVElOVE9SRVJJQSBZIExBVkFETyBERSBST1BBLiBcIilcclxuICAgICAgICAgICAgICAudGV4dChcIkNMSUVOVEUgQSBQQUdBUjogXCIgKyBub21icmVfY2xpZW50ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBub3Rhc1xyXG4gICAgICAgICAgICBhcnJfbm90YXMuZm9yRWFjaChub3RhID0+IHtcclxuICAgICAgICAgICAgICBwcmludGVyLmFsaWduKCdMVCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJCSVwiKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoXCIjTm90YTogXCIgKyBub3RhLnRleHRfbnVtX25vdGEgKyBcIiBcIiArIG5vdGEuZmVjaGFfcmVnaXN0cm8gKyBcIiBUb3RhbDogJFwiICsgbm90YS5wcmVjaW9fdG90YWwpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJOT1JNQUxcIilcclxuICAgICAgICAgICAgICAgIC5hbGlnbihcIkxUXCIpXHJcbiAgICAgICAgICAgICAgICAudGFibGVDdXN0b20oW1xyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiI1wiLCBhbGlnbjogXCJMRUZUXCIsIHdpZHRoOiAwLjEgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlByZW5kYVwiLCBhbGlnbjogXCJMRUZUXCIsIHdpZHRoOiAwLjUgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlNlcnZpY2lvXCIsIGFsaWduOiBcIkNFTlRFUlwiLCB3aWR0aDogMC4zIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJUb3RhbFwiLCBhbGlnbjogXCJSSUdIVFwiLCB3aWR0aDogMC4yIH1cclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgIG5vdGEucHJlbmRhcy5mb3JFYWNoKHJvd19wcmVuZGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByaW50ZXIudGFibGVDdXN0b20oW1xyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IHJvd19wcmVuZGFbMF0sIGFsaWduOiBcIkxFRlRcIiwgd2lkdGg6IDAuMSB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IHJvd19wcmVuZGFbMV0sIGFsaWduOiBcIkxFRlRcIiwgd2lkdGg6IDAuNSB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IHJvd19wcmVuZGFbMl0sIGFsaWduOiBcIkNFTlRFUlwiLCB3aWR0aDogMC4zIH0sXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogcm93X3ByZW5kYVszXSwgYWxpZ246IFwiUklHSFRcIiwgd2lkdGg6IDAuMiB9XHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBwcmludGVyLmRyYXdMaW5lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJpbnRlci50ZXh0KFwiQ3VlbnRhIFRvdGFsOiAkXCIgKyBTdHJpbmcocHJlY2lvX2N1ZW50YV90b3RhbCkpXHJcbiAgICAgICAgICAgICAgLmZlZWQoKVxyXG4gICAgICAgICAgICAgIC5jdXQoKVxyXG4gICAgICAgICAgICAgIC5jbG9zZSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCJOVUxMIERFVklDRSwgTk8gUFJJTlRJTkdcIik7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgcHJpbnRUaWNrZXQgfTtcclxuIiwiXHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7IFxyXG5jb25zdCBEYXRhYmFzZSA9IHJlcXVpcmUoJ2JldHRlci1zcWxpdGUzJyk7XHJcbi8vIGxldCBkYlBhdGggPVxyXG4vLyAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIlxyXG4vLyAgICAgICAgID8gcGF0aC5qb2luKF9fZGlybmFtZSwnLi4vLi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpXHJcbi8vICAgICAgICAgOiBwYXRoLmpvaW4ocHJvY2Vzcy5yZXNvdXJjZXNQYXRoLCBcIi4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYlwiKVxyXG5cclxubGV0IGRiUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsJy4vZGIvZHJ5X2NsZWFuX3NpeF9zdGFycy5kYicpXHJcblxyXG5cclxuXHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCwgeyB2ZXJib3NlOiBjb25zb2xlLmxvZyB9KTtcclxuZGIucHJhZ21hKCdqb3VybmFsX21vZGUgPSBXQUwnKTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMuZGIgPSBkYiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iZXR0ZXJfc3FsaXRlM19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9lc2Nwb3NfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNjcG9zX3VzYl9fOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9wYWQtc3RhcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZW50cmllc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL3BhcnNlLWZsb2F0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvcGFyc2UtaW50XCIpOyIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2gnKTtcbnZhciBnZXRCdWlsdEluUHJvdG90eXBlTWV0aG9kID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbi1wcm90b3R5cGUtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCgnQXJyYXknLCAnZm9yRWFjaCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIG1ldGhvZCA9IHJlcXVpcmUoJy4uL3N0cmluZy92aXJ0dWFsL3BhZC1zdGFydCcpO1xuXG52YXIgU3RyaW5nUHJvdG90eXBlID0gU3RyaW5nLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LnBhZFN0YXJ0O1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzdHJpbmcnIHx8IGl0ID09PSBTdHJpbmdQcm90b3R5cGVcbiAgICB8fCAoaXNQcm90b3R5cGVPZihTdHJpbmdQcm90b3R5cGUsIGl0KSAmJiBvd24gPT09IFN0cmluZ1Byb3RvdHlwZS5wYWRTdGFydCkgPyBtZXRob2QgOiBvd247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZW50cmllcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmVudHJpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnBhcnNlLWZsb2F0Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5wYXJzZUZsb2F0O1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5wYXJzZS1pbnQnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLnBhcnNlSW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5zdHJpbmcucGFkLXN0YXJ0Jyk7XG52YXIgZ2V0QnVpbHRJblByb3RvdHlwZU1ldGhvZCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4tcHJvdG90eXBlLW1ldGhvZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW5Qcm90b3R5cGVNZXRob2QoJ1N0cmluZycsICdwYWRTdGFydCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IFR5cGUoYXJndW1lbnQpIGlzIE9iamVjdGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc09iamVjdChhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdmb3JFYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICFTVFJJQ1RfTUVUSE9EID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1mb3JlYWNoIC0tIHNhZmVcbn0gOiBbXS5mb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIGlmIChsZW5ndGggPT09IDApIHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9PSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCwgZmlsdGVyUmVqZWN0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09PSA2O1xuICB2YXIgSVNfRklMVEVSX1JFSkVDVCA9IFRZUEUgPT09IDc7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCwgc3BlY2lmaWNDcmVhdGUpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKHNlbGYpO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0KTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiB8fCBJU19GSUxURVJfUkVKRUNUID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaCh0YXJnZXQsIHZhbHVlKTsgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgNDogcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAvLyBldmVyeVxuICAgICAgICAgIGNhc2UgNzogcHVzaCh0YXJnZXQsIHZhbHVlKTsgICAgICAvLyBmaWx0ZXJSZWplY3RcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlclJlamVjdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWZpbHRlcmluZ1xuICBmaWx0ZXJSZWplY3Q6IGNyZWF0ZU1ldGhvZCg3KVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jb25zdHJ1Y3RvcicpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyICRBcnJheSA9IEFycmF5O1xuXG4vLyBhIHBhcnQgb2YgYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmIChpc0NvbnN0cnVjdG9yKEMpICYmIChDID09PSAkQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGVsc2UgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gJEFycmF5IDogQztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXJyYXlTcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5LCBsZW5ndGgpIHtcbiAgcmV0dXJuIG5ldyAoYXJyYXlTcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWxBcnJheSkpKGxlbmd0aCA9PT0gMCA/IDAgOiBsZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoe30udG9TdHJpbmcpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gc3RyaW5nU2xpY2UodG9TdHJpbmcoaXQpLCA4LCAtMSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9ICRPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PT0gJ09iamVjdCcgJiYgaXNDYWxsYWJsZShPLmNhbGxlZSkgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGRlZmluZVByb3BlcnR5KGdsb2JhbCwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT0gJ3VuZGVmaW5lZCcgJiYgU3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8ICcnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgLy8gaW4gb2xkIENocm9tZSwgdmVyc2lvbnMgb2YgVjggaXNuJ3QgVjggPSBDaHJvbWUgLyAxMFxuICAvLyBidXQgdGhlaXIgY29ycmVjdCB2ZXJzaW9ucyBhcmUgbm90IGludGVyZXN0aW5nIGZvciB1c1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gPiAwICYmIG1hdGNoWzBdIDwgNCA/IDEgOiArKG1hdGNoWzBdICsgbWF0Y2hbMV0pO1xufVxuXG4vLyBCcm93c2VyRlMgTm9kZUpTIGBwcm9jZXNzYCBwb2x5ZmlsbCBpbmNvcnJlY3RseSBzZXQgYC52OGAgdG8gYDAuMGBcbi8vIHNvIGNoZWNrIGB1c2VyQWdlbnRgIGV2ZW4gaWYgYC52OGAgZXhpc3RzLCBidXQgMFxuaWYgKCF2ZXJzaW9uICYmIHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9ICttYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb247XG4iLCIndXNlIHN0cmljdCc7XG4vLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuLy8gYWRkIGRlYnVnZ2luZyBpbmZvXG5yZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciB3cmFwQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoTmF0aXZlQ29uc3RydWN0b3IpIHtcbiAgdmFyIFdyYXBwZXIgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgV3JhcHBlcikge1xuICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiKTtcbiAgICAgIH0gcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiLCBjKTtcbiAgICB9IHJldHVybiBhcHBseShOYXRpdmVDb25zdHJ1Y3RvciwgdGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbiAgV3JhcHBlci5wcm90b3R5cGUgPSBOYXRpdmVDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHJldHVybiBXcmFwcGVyO1xufTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgICAgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5kb250Q2FsbEdldFNldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiAgb3B0aW9ucy5uYW1lICAgICAgICAgICAtIHRoZSAubmFtZSBvZiB0aGUgZnVuY3Rpb24gaWYgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGtleVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIFBST1RPID0gb3B0aW9ucy5wcm90bztcblxuICB2YXIgbmF0aXZlU291cmNlID0gR0xPQkFMID8gZ2xvYmFsIDogU1RBVElDID8gZ2xvYmFsW1RBUkdFVF0gOiBnbG9iYWxbVEFSR0VUXSAmJiBnbG9iYWxbVEFSR0VUXS5wcm90b3R5cGU7XG5cbiAgdmFyIHRhcmdldCA9IEdMT0JBTCA/IHBhdGggOiBwYXRoW1RBUkdFVF0gfHwgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHBhdGgsIFRBUkdFVCwge30pW1RBUkdFVF07XG4gIHZhciB0YXJnZXRQcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuXG4gIHZhciBGT1JDRUQsIFVTRV9OQVRJVkUsIFZJUlRVQUxfUFJPVE9UWVBFO1xuICB2YXIga2V5LCBzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHksIG5hdGl2ZVByb3BlcnR5LCByZXN1bHRQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcblxuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIFVTRV9OQVRJVkUgPSAhRk9SQ0VEICYmIG5hdGl2ZVNvdXJjZSAmJiBoYXNPd24obmF0aXZlU291cmNlLCBrZXkpO1xuXG4gICAgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcblxuICAgIGlmIChVU0VfTkFUSVZFKSBpZiAob3B0aW9ucy5kb250Q2FsbEdldFNldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihuYXRpdmVTb3VyY2UsIGtleSk7XG4gICAgICBuYXRpdmVQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgbmF0aXZlUHJvcGVydHkgPSBuYXRpdmVTb3VyY2Vba2V5XTtcblxuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgaW1wbGVtZW50YXRpb25cbiAgICBzb3VyY2VQcm9wZXJ0eSA9IChVU0VfTkFUSVZFICYmIG5hdGl2ZVByb3BlcnR5KSA/IG5hdGl2ZVByb3BlcnR5IDogc291cmNlW2tleV07XG5cbiAgICBpZiAoIUZPUkNFRCAmJiAhUFJPVE8gJiYgdHlwZW9mIHRhcmdldFByb3BlcnR5ID09IHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSkgY29udGludWU7XG5cbiAgICAvLyBiaW5kIG1ldGhvZHMgdG8gZ2xvYmFsIGZvciBjYWxsaW5nIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZiAob3B0aW9ucy5iaW5kICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gYmluZChzb3VyY2VQcm9wZXJ0eSwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlcyBpbiB0aGlzIHZlcnNpb25cbiAgICBlbHNlIGlmIChvcHRpb25zLndyYXAgJiYgVVNFX05BVElWRSkgcmVzdWx0UHJvcGVydHkgPSB3cmFwQ29uc3RydWN0b3Ioc291cmNlUHJvcGVydHkpO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIGVsc2UgaWYgKFBST1RPICYmIGlzQ2FsbGFibGUoc291cmNlUHJvcGVydHkpKSByZXN1bHRQcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHNvdXJjZVByb3BlcnR5KTtcbiAgICAvLyBkZWZhdWx0IGNhc2VcbiAgICBlbHNlIHJlc3VsdFByb3BlcnR5ID0gc291cmNlUHJvcGVydHk7XG5cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAoc291cmNlUHJvcGVydHkgJiYgc291cmNlUHJvcGVydHkuc2hhbSkgfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocmVzdWx0UHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldCwga2V5LCByZXN1bHRQcm9wZXJ0eSk7XG5cbiAgICBpZiAoUFJPVE8pIHtcbiAgICAgIFZJUlRVQUxfUFJPVE9UWVBFID0gVEFSR0VUICsgJ1Byb3RvdHlwZSc7XG4gICAgICBpZiAoIWhhc093bihwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSkpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHBhdGgsIFZJUlRVQUxfUFJPVE9UWVBFLCB7fSk7XG4gICAgICB9XG4gICAgICAvLyBleHBvcnQgdmlydHVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHBhdGhbVklSVFVBTF9QUk9UT1RZUEVdLCBrZXksIHNvdXJjZVByb3BlcnR5KTtcbiAgICAgIC8vIGV4cG9ydCByZWFsIHByb3RvdHlwZSBtZXRob2RzXG4gICAgICBpZiAob3B0aW9ucy5yZWFsICYmIHRhcmdldFByb3RvdHlwZSAmJiAoRk9SQ0VEIHx8ICF0YXJnZXRQcm90b3R5cGVba2V5XSkpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldFByb3RvdHlwZSwga2V5LCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXJlZmxlY3QgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgUmVmbGVjdCA9PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmFwcGx5IHx8IChOQVRJVkVfQklORCA/IGNhbGwuYmluZChhcHBseSkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGFwcGx5LCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGJpbmQgPSB1bmN1cnJ5VGhpcyh1bmN1cnJ5VGhpcy5iaW5kKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCkge1xuICBhQ2FsbGFibGUoZm4pO1xuICByZXR1cm4gdGhhdCA9PT0gdW5kZWZpbmVkID8gZm4gOiBOQVRJVkVfQklORCA/IGJpbmQoZm4sIHRoYXQpIDogZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBOYXNob3JuIGJ1ZzpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEyOFxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTMwXG4gIGlmIChjbGFzc29mUmF3KGZuKSA9PT0gJ0Z1bmN0aW9uJykgcmV0dXJuIHVuY3VycnlUaGlzKGZuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzV2l0aEJpbmQgPSBOQVRJVkVfQklORCAmJiBGdW5jdGlvblByb3RvdHlwZS5iaW5kLmJpbmQoY2FsbCwgY2FsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyB1bmN1cnJ5VGhpc1dpdGhCaW5kIDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1IsIE1FVEhPRCkge1xuICB2YXIgTmFtZXNwYWNlID0gcGF0aFtDT05TVFJVQ1RPUiArICdQcm90b3R5cGUnXTtcbiAgdmFyIHB1cmVNZXRob2QgPSBOYW1lc3BhY2UgJiYgTmFtZXNwYWNlW01FVEhPRF07XG4gIGlmIChwdXJlTWV0aG9kKSByZXR1cm4gcHVyZU1ldGhvZDtcbiAgdmFyIE5hdGl2ZUNvbnN0cnVjdG9yID0gZ2xvYmFsW0NPTlNUUlVDVE9SXTtcbiAgdmFyIE5hdGl2ZVByb3RvdHlwZSA9IE5hdGl2ZUNvbnN0cnVjdG9yICYmIE5hdGl2ZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgcmV0dXJuIE5hdGl2ZVByb3RvdHlwZSAmJiBOYXRpdmVQcm90b3R5cGVbTUVUSE9EXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gaXNDYWxsYWJsZSh2YXJpYWJsZSkgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgY2hlY2sodHlwZW9mIHRoaXMgPT0gJ29iamVjdCcgJiYgdGhpcykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtaGFzb3duIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmtzIHRvIElFOCBmb3IgaXRzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhJE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09PSAnU3RyaW5nJyA/IHNwbGl0KGl0LCAnJykgOiAkT2JqZWN0KGl0KTtcbn0gOiAkT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhGdW5jdGlvbi50b1N0cmluZyk7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgY29yZS1qc0AzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICghaXNDYWxsYWJsZShzdG9yZS5pbnNwZWN0U291cmNlKSkge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1pc2FycmF5IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZ3VtZW50KSB7XG4gIHJldHVybiBjbGFzc29mKGFyZ3VtZW50KSA9PT0gJ0FycmF5Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG52YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBgSXNDYWxsYWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLXR5cGVvZi11bmRlZmluZWQgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIGRvY3VtZW50QWxsID09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50QWxsICE9PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nIHx8IGFyZ3VtZW50ID09PSBkb2N1bWVudEFsbDtcbn0gOiBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgY29uc3RydWN0ID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdjb25zdHJ1Y3QnKTtcbnZhciBjb25zdHJ1Y3RvclJlZ0V4cCA9IC9eXFxzKig/OmNsYXNzfGZ1bmN0aW9uKVxcYi87XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKGNvbnN0cnVjdG9yUmVnRXhwLmV4ZWMpO1xudmFyIElOQ09SUkVDVF9UT19TVFJJTkcgPSAhY29uc3RydWN0b3JSZWdFeHAudGVzdChub29wKTtcblxudmFyIGlzQ29uc3RydWN0b3JNb2Rlcm4gPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBjb25zdHJ1Y3Qobm9vcCwgW10sIGFyZ3VtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBpc0NvbnN0cnVjdG9yTGVnYWN5ID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHN3aXRjaCAoY2xhc3NvZihhcmd1bWVudCkpIHtcbiAgICBjYXNlICdBc3luY0Z1bmN0aW9uJzpcbiAgICBjYXNlICdHZW5lcmF0b3JGdW5jdGlvbic6XG4gICAgY2FzZSAnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbic6IHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIC8vIHdlIGNhbid0IGNoZWNrIC5wcm90b3R5cGUgc2luY2UgY29uc3RydWN0b3JzIHByb2R1Y2VkIGJ5IC5iaW5kIGhhdmVuJ3QgaXRcbiAgICAvLyBgRnVuY3Rpb24jdG9TdHJpbmdgIHRocm93cyBvbiBzb21lIGJ1aWx0LWl0IGZ1bmN0aW9uIGluIHNvbWUgbGVnYWN5IGVuZ2luZXNcbiAgICAvLyAoZm9yIGV4YW1wbGUsIGBET01RdWFkYCBhbmQgc2ltaWxhciBpbiBGRjQxLSlcbiAgICByZXR1cm4gSU5DT1JSRUNUX1RPX1NUUklORyB8fCAhIWV4ZWMoY29uc3RydWN0b3JSZWdFeHAsIGluc3BlY3RTb3VyY2UoYXJndW1lbnQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuaXNDb25zdHJ1Y3RvckxlZ2FjeS5zaGFtID0gdHJ1ZTtcblxuLy8gYElzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9ICFjb25zdHJ1Y3QgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGVkO1xuICByZXR1cm4gaXNDb25zdHJ1Y3Rvck1vZGVybihpc0NvbnN0cnVjdG9yTW9kZXJuLmNhbGwpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oT2JqZWN0KVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZTsgfSlcbiAgICB8fCBjYWxsZWQ7XG59KSA/IGlzQ29uc3RydWN0b3JMZWdhY3kgOiBpc0NvbnN0cnVjdG9yTW9kZXJuO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogaXNDYWxsYWJsZShkZXRlY3Rpb24pID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiBpc0NhbGxhYmxlKCRTeW1ib2wpICYmIGlzUHJvdG90eXBlT2YoJFN5bWJvbC5wcm90b3R5cGUsICRPYmplY3QoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tbWF0aC10cnVuYyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICB2YXIgbiA9ICt4O1xuICByZXR1cm4gKG4gPiAwID8gZmxvb3IgOiBjZWlsKShuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgJHBhcnNlRmxvYXQgPSBnbG9iYWwucGFyc2VGbG9hdDtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIElURVJBVE9SID0gU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGT1JDRUQgPSAxIC8gJHBhcnNlRmxvYXQod2hpdGVzcGFjZXMgKyAnLTAnKSAhPT0gLUluZmluaXR5XG4gIC8vIE1TIEVkZ2UgMTgtIGJyb2tlbiB3aXRoIGJveGVkIHN5bWJvbHNcbiAgfHwgKElURVJBVE9SICYmICFmYWlscyhmdW5jdGlvbiAoKSB7ICRwYXJzZUZsb2F0KE9iamVjdChJVEVSQVRPUikpOyB9KSk7XG5cbi8vIGBwYXJzZUZsb2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VmbG9hdC1zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gRk9SQ0VEID8gZnVuY3Rpb24gcGFyc2VGbG9hdChzdHJpbmcpIHtcbiAgdmFyIHRyaW1tZWRTdHJpbmcgPSB0cmltKHRvU3RyaW5nKHN0cmluZykpO1xuICB2YXIgcmVzdWx0ID0gJHBhcnNlRmxvYXQodHJpbW1lZFN0cmluZyk7XG4gIHJldHVybiByZXN1bHQgPT09IDAgJiYgY2hhckF0KHRyaW1tZWRTdHJpbmcsIDApID09PSAnLScgPyAtMCA6IHJlc3VsdDtcbn0gOiAkcGFyc2VGbG9hdDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgJHBhcnNlSW50ID0gZ2xvYmFsLnBhcnNlSW50O1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgSVRFUkFUT1IgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIGhleCA9IC9eWystXT8weC9pO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhoZXguZXhlYyk7XG52YXIgRk9SQ0VEID0gJHBhcnNlSW50KHdoaXRlc3BhY2VzICsgJzA4JykgIT09IDggfHwgJHBhcnNlSW50KHdoaXRlc3BhY2VzICsgJzB4MTYnKSAhPT0gMjJcbiAgLy8gTVMgRWRnZSAxOC0gYnJva2VuIHdpdGggYm94ZWQgc3ltYm9sc1xuICB8fCAoSVRFUkFUT1IgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHsgJHBhcnNlSW50KE9iamVjdChJVEVSQVRPUikpOyB9KSk7XG5cbi8vIGBwYXJzZUludGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUludChzdHJpbmcsIHJhZGl4KSB7XG4gIHZhciBTID0gdHJpbSh0b1N0cmluZyhzdHJpbmcpKTtcbiAgcmV0dXJuICRwYXJzZUludChTLCAocmFkaXggPj4+IDApIHx8IChleGVjKGhleCwgUykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gJE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyAkT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzT3duKG9iamVjdCwgSUVfUFJPVE8pKSByZXR1cm4gb2JqZWN0W0lFX1BST1RPXTtcbiAgdmFyIGNvbnN0cnVjdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoaXNDYWxsYWJsZShjb25zdHJ1Y3RvcikgJiYgb2JqZWN0IGluc3RhbmNlb2YgY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiAkT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIG9iamVjdEdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpLmY7XG5cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHVuY3VycnlUaGlzKCRwcm9wZXJ0eUlzRW51bWVyYWJsZSk7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG4vLyBpbiBzb21lIElFIHZlcnNpb25zLCBgcHJvcGVydHlJc0VudW1lcmFibGVgIHJldHVybnMgaW5jb3JyZWN0IHJlc3VsdCBvbiBpbnRlZ2VyIGtleXNcbi8vIG9mIGBudWxsYCBwcm90b3R5cGUgb2JqZWN0c1xudmFyIElFX0JVRyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1jcmVhdGUgLS0gc2FmZVxuICB2YXIgTyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIE9bMl0gPSAyO1xuICByZXR1cm4gIXByb3BlcnR5SXNFbnVtZXJhYmxlKE8sIDIpO1xufSk7XG5cbi8vIGBPYmplY3QueyBlbnRyaWVzLCB2YWx1ZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUT19FTlRSSUVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChpdCk7XG4gICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKE8pO1xuICAgIHZhciBJRV9XT1JLQVJPVU5EID0gSUVfQlVHICYmIG9iamVjdEdldFByb3RvdHlwZU9mKE8pID09PSBudWxsO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGkpIHtcbiAgICAgIGtleSA9IGtleXNbaSsrXTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMgfHwgKElFX1dPUktBUk9VTkQgPyBrZXkgaW4gTyA6IHByb3BlcnR5SXNFbnVtZXJhYmxlKE8sIGtleSkpKSB7XG4gICAgICAgIHB1c2gocmVzdWx0LCBUT19FTlRSSUVTID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYE9iamVjdC5lbnRyaWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZW50cmllc1xuICBlbnRyaWVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBPYmplY3QudmFsdWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QudmFsdWVzXG4gIHZhbHVlczogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgT3JkaW5hcnlUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAocHJlZiA9PT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKGlzQ2FsbGFibGUoZm4gPSBpbnB1dC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHByZWYgIT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGl0KSkgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBnbG9iYWxUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbihzdG9yZS52ZXJzaW9ucyB8fCAoc3RvcmUudmVyc2lvbnMgPSBbXSkpLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4zNi4wJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjQgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4zNi4wL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgfHwge30pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8yODBcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvVmVyc2lvblxcLzEwKD86XFwuXFxkKyl7MSwyfSg/OiBbXFx3Li9dKyk/KD86IE1vYmlsZVxcL1xcdyspPyBTYWZhcmlcXC8vLnRlc3QodXNlckFnZW50KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgJHJlcGVhdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctcmVwZWF0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyIHJlcGVhdCA9IHVuY3VycnlUaGlzKCRyZXBlYXQpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgcGFkU3RhcnQsIHBhZEVuZCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0VORCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcpIHtcbiAgICB2YXIgUyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgaW50TWF4TGVuZ3RoID0gdG9MZW5ndGgobWF4TGVuZ3RoKTtcbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpbGxTdHIgPSBmaWxsU3RyaW5nID09PSB1bmRlZmluZWQgPyAnICcgOiB0b1N0cmluZyhmaWxsU3RyaW5nKTtcbiAgICB2YXIgZmlsbExlbiwgc3RyaW5nRmlsbGVyO1xuICAgIGlmIChpbnRNYXhMZW5ndGggPD0gc3RyaW5nTGVuZ3RoIHx8IGZpbGxTdHIgPT09ICcnKSByZXR1cm4gUztcbiAgICBmaWxsTGVuID0gaW50TWF4TGVuZ3RoIC0gc3RyaW5nTGVuZ3RoO1xuICAgIHN0cmluZ0ZpbGxlciA9IHJlcGVhdChmaWxsU3RyLCBjZWlsKGZpbGxMZW4gLyBmaWxsU3RyLmxlbmd0aCkpO1xuICAgIGlmIChzdHJpbmdGaWxsZXIubGVuZ3RoID4gZmlsbExlbikgc3RyaW5nRmlsbGVyID0gc3RyaW5nU2xpY2Uoc3RyaW5nRmlsbGVyLCAwLCBmaWxsTGVuKTtcbiAgICByZXR1cm4gSVNfRU5EID8gUyArIHN0cmluZ0ZpbGxlciA6IHN0cmluZ0ZpbGxlciArIFM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUucGFkU3RhcnRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucGFkc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnBhZEVuZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5wYWRlbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRSYW5nZUVycm9yID0gUmFuZ2VFcnJvcjtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUucmVwZWF0YCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gIHZhciBzdHIgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgbiA9IHRvSW50ZWdlck9ySW5maW5pdHkoY291bnQpO1xuICBpZiAobiA8IDAgfHwgbiA9PT0gSW5maW5pdHkpIHRocm93IG5ldyAkUmFuZ2VFcnJvcignV3JvbmcgbnVtYmVyIG9mIHJlcGV0aXRpb25zJyk7XG4gIGZvciAoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSkgaWYgKG4gJiAxKSByZXN1bHQgKz0gc3RyO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ15bJyArIHdoaXRlc3BhY2VzICsgJ10rJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAoJyhefFteJyArIHdoaXRlc3BhY2VzICsgJ10pWycgKyB3aGl0ZXNwYWNlcyArICddKyQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gcmVwbGFjZShzdHJpbmcsIGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSByZXBsYWNlKHN0cmluZywgcnRyaW0sICckMScpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgJFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCdzeW1ib2wgZGV0ZWN0aW9uJyk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgLy8gbmI6IERvIG5vdCBjYWxsIGBTdHJpbmdgIGRpcmVjdGx5IHRvIGF2b2lkIHRoaXMgYmVpbmcgb3B0aW1pemVkIG91dCB0byBgc3ltYm9sKycnYCB3aGljaCB3aWxsLFxuICAvLyBvZiBjb3Vyc2UsIGZhaWwuXG4gIHJldHVybiAhJFN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyT3JJbmZpbml0eShpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdHJ1bmMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWF0aC10cnVuYycpO1xuXG4vLyBgVG9JbnRlZ2VyT3JJbmZpbml0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlcm9yaW5maW5pdHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBudW1iZXIgPSArYXJndW1lbnQ7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gIHJldHVybiBudW1iZXIgIT09IG51bWJlciB8fCBudW1iZXIgPT09IDAgPyAwIDogdHJ1bmMobnVtYmVyKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBsZW4gPSB0b0ludGVnZXJPckluZmluaXR5KGFyZ3VtZW50KTtcbiAgcmV0dXJuIGxlbiA+IDAgPyBtaW4obGVuLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gJE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkgfHwgaXNTeW1ib2woaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBleG90aWNUb1ByaW0gPSBnZXRNZXRob2QoaW5wdXQsIFRPX1BSSU1JVElWRSk7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChleG90aWNUb1ByaW0pIHtcbiAgICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ2RlZmF1bHQnO1xuICAgIHJlc3VsdCA9IGNhbGwoZXhvdGljVG9QcmltLCBpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG4gIH1cbiAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdudW1iZXInO1xuICByZXR1cm4gb3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgcHJlZik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xuXG4vLyBgVG9Qcm9wZXJ0eUtleWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgJ3N0cmluZycpO1xuICByZXR1cm4gaXNTeW1ib2woa2V5KSA/IGtleSA6IGtleSArICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGNsYXNzb2YoYXJndW1lbnQpID09PSAnU3ltYm9sJykgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBTeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcnKTtcbiAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB0cnkge1xuICAgIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ09iamVjdCc7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcygxLjAudG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyB0b1N0cmluZygrK2lkICsgcG9zdGZpeCwgMzYpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBWOCB+IENocm9tZSAzNi1cbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMzMzRcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAncHJvdG90eXBlJywge1xuICAgIHZhbHVlOiA0MixcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSkucHJvdG90eXBlICE9PSA0Mjtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbFsnZm9yJ10gfHwgU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKVxuICAgICAgPyBTeW1ib2xbbmFtZV1cbiAgICAgIDogY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyJyArXG4gICdcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGVudHJpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5JykuZW50cmllcztcblxuLy8gYE9iamVjdC5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlIH0sIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhPKSB7XG4gICAgcmV0dXJuICRlbnRyaWVzKE8pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL251bWJlci1wYXJzZS1mbG9hdCcpO1xuXG4vLyBgcGFyc2VGbG9hdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXBhcnNlZmxvYXQtc3RyaW5nXG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlRmxvYXQgIT09ICRwYXJzZUZsb2F0IH0sIHtcbiAgcGFyc2VGbG9hdDogJHBhcnNlRmxvYXRcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQnKTtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlSW50ICE9PSAkcGFyc2VJbnQgfSwge1xuICBwYXJzZUludDogJHBhcnNlSW50XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRwYWRTdGFydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctcGFkJykuc3RhcnQ7XG52YXIgV0VCS0lUX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctcGFkLXdlYmtpdC1idWcnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUucGFkU3RhcnRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnBhZHN0YXJ0XG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogV0VCS0lUX0JVRyB9LCB7XG4gIHBhZFN0YXJ0OiBmdW5jdGlvbiBwYWRTdGFydChtYXhMZW5ndGggLyogLCBmaWxsU3RyaW5nID0gJyAnICovKSB7XG4gICAgcmV0dXJuICRwYWRTdGFydCh0aGlzLCBtYXhMZW5ndGgsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIvLyBlbXB0eVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL2VzL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBtZXRob2QgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2Zvci1lYWNoJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2gnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIE5vZGVMaXN0OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuZm9yRWFjaDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXNQcm90b3R5cGVPZihBcnJheVByb3RvdHlwZSwgaXQpICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuZm9yRWFjaClcbiAgICB8fCBoYXNPd24oRE9NSXRlcmFibGVzLCBjbGFzc29mKGl0KSkgPyBtZXRob2QgOiBvd247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3BhZC1zdGFydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZW50cmllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi9lcy9wYXJzZS1mbG9hdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi9lcy9wYXJzZS1pbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cbmNvbnN0IHsgYXBwLCBCcm93c2VyV2luZG93LCBpcGNNYWluLCBOb3RpZmljYXRpb24gfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpOyBcblxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpXG5cblxuXG5jb25zdCBkYm1nciA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZGF0YWJhc2UuanNcIilcbmNvbnN0IGRiID0gZGJtZ3IuZGJcblxuY29uc3Qge3ByaW50VGlja2V0fSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVGlja2V0cy5qc1wiKVxuXG4vL0dMT0JBTCBXaW5kb3dzXG5sZXQgd2luO1xubGV0IHdpbmxvZ2luO1xuXG5cbmFwcC53aGVuUmVhZHkoKS50aGVuKGNyZWF0ZVdpbmRvdylcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXG5cbi8vIC0tLS0tLS0tLS0tLVxuLy8gICAgV0lORE9XU1xuLy8gLS0tLS0tLS0tLS0tXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVXaW5kb3cgKCkge1xuICB3aW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICBcbiAgIGZ1bGxzY3JlZW46dHJ1ZSxcbiAgIG1heGltaXplOiB0cnVlLFxuICAgdGl0bGVCYXJTdHlsZTogJ2hpZGRlbicsXG4gICB0aXRsZUJhck92ZXJsYXk6IHRydWUsXG4gICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAvLyAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgIC8vIGNvbnRleHRJc29sYXRpb246dHJ1ZSxcbiAgICAgZGV2VG9vbHM6dHJ1ZSxcbiAgICAgXG4gICBwcmVsb2FkOnBhdGguam9pbihfX2Rpcm5hbWUsICdwcmVsb2FkLWluZGV4LmpzJylcbiAgIH1cblxuIH0pXG5cbiAgLy93aW4ubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwnLi4vRnJvbnRFbmQvcGFnZXMvbm90YXMvdmVyX25vdGFzLmh0bWwnKSlcbiAgLy8gd2luLmxvYWRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uL0Zyb250RW5kL2luZGV4Lmh0bWwnKSlcbiAgd2luLm1heGltaXplKHRydWUpXG4gIHdpbi53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcbiAgXG4gIGlmIChpc1Byb2QpIHtcbiAgICBhd2FpdCB3aW4ubG9hZFVSTCgnYXBwOi8vLi9ob21lJylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwb3J0ID0gcHJvY2Vzcy5hcmd2WzJdXG4gICAgYXdhaXQgd2luLmxvYWRVUkwoYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9ob21lYClcbiAgICB3aW4ud2ViQ29udGVudHMub3BlbkRldlRvb2xzKClcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dpbldpbmRvdyAoKSB7XG4gIHdpbmxvZ2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgd2lkdGg6IDgwMCxcbiAgIGhlaWdodDogNjAwLFxuICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAvLyBub2RlSW50ZWdyYXRpb246IHRydWUsXG4gICAgLy8gY29udGV4dElzb2xhdGlvbjp0cnVlLFxuICAgICBkZXZUb29sczp0cnVlLFxuICAgICBwcmVsb2FkOnBhdGguam9pbihfX2Rpcm5hbWUsICdwcmVsb2FkLWxvZ2luLmpzJylcbiAgICAgXG4gICB9XG4gfSlcblxuLy8gIHdpbmxvZ2luLmxvYWRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsJy4uL2xvZ2luLmh0bWwnKSk7XG4gd2lubG9naW4ud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG5cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgQVBQIEVWRU5UU1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICBhcHAucXVpdCgpXG4gICAgZGIuY2xvc2UoKVxuICB9XG59KVxuXG5hcHAub24oJ2FjdGl2YXRlJywgKCkgPT4ge1xuICBpZiAoQnJvd3NlcldpbmRvdy5nZXRBbGxXaW5kb3dzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgY3JlYXRlV2luZG93KClcbiAgfVxufSlcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgICAgICAgICAgSEFORExFUlNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5pcGNNYWluLmhhbmRsZSgndmFsaWRhdGUnLCAoZXZlbnQsIG9iaikgPT4ge1xuICB2YWxpZGF0ZWxvZ2luKG9iailcbn0pO1xuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOmdldF9saXN0JywgaGFuZGxlU3VjdXJzYWxHZXRMaXN0KVxuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOmdldF9saXN0X3ByZWNpb3MnLCBoYW5kbGVTdWN1cnNhbEdldExpc3RQcmVjaW9zKVxuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOnVwZGF0ZV9saXN0X3ByZWNpb3MnLCBoYW5kbGVTdWN1cnNhbFVwZGF0ZUxpc3RQcmVjaW9zKVxuaXBjTWFpbi5oYW5kbGUoJ1N1Y3Vyc2FsOnNhdmVfcHJlbmRhJywgaGFuZGxlclNhdmVQcmVuZGFQcmVjaW8pXG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6ZGVsZXRlX3ByZW5kYScsIGhhbmRsZXJEZWxldGVQcmVuZGEpXG5pcGNNYWluLmhhbmRsZSgnU3VjdXJzYWw6dXBkYXRlX3ByZW5kYScsIGhhbmRsZXJVcGRhdGVQcmVuZGEpXG5pcGNNYWluLmhhbmRsZSgnTm90YXM6c2F2ZV9ub3RhJywgaGFuZGxlclNhdmVOb3RhKVxuaXBjTWFpbi5oYW5kbGUoJ05vdGFzOmdldF9saXN0X25vdGFzJywgaGFuZGxlckdldExpc3ROb3RhcylcbmlwY01haW4uaGFuZGxlKCdOb3RhczppbXByaW1pcl90aWNrZXQnLCBoYW5kbGVyUHJpbnRUaWNrZXQpXG5pcGNNYWluLmhhbmRsZSgnTm90YXM6ZWxpbWluYXJfbm90YScsaGFuZGxlckRlbGV0ZU5vdGEpXG5cbi8vIGhhbmRsZXJzIEZ1bmN0aW9uc1xuZnVuY3Rpb24gIHZhbGlkYXRlbG9naW4ob2JqKSB7XG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBvYmogXG4gIC8vIENvbm5lY3Rpb25cbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuXG4gIC8vUXVlcnlcbiAgbGV0IHNxbCA9IGBTRUxFQ1QgcGFzc3dvcmQgIGZyb20gVXN1YXJpbyB1IFdIRVJFIHVzZXJuYW1lID0gPyA7YDtcbiAgY29uc3Qgcm93ID0gZGIucHJlcGFyZShzcWwpLmdldChlbWFpbCk7XG4gIFxuICAvLyBNYW5hZ2UgZGF0YVxuICBpZihyb3cpe1xuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHBhc3N3b3JkKS5kaWdlc3QoJ2hleCcpO1xuICAgIGlmIChyb3cucGFzc3dvcmQgPT0gaGFzaCl7XG4gICAgICBjb25zb2xlLmxvZygnU3VjY2VzcyB2YWxpZGF0aW9uJylcbiAgICAgIGNyZWF0ZVdpbmRvdyAoKVxuICAgICAgd2luLnNob3coKVxuICAgICAgd2lubG9naW4uY2xvc2UoKVxuICAgIH1lbHNle1xuICAgICAgd2lubG9naW4ud2ViQ29udGVudHMuc2VuZCgnZXJyb3InLGBwYXNzd29yZCBpc24ndCBjb3JyZWN0YClcbiAgICB9XG4gIH1lbHNle1xuICAgIHdpbmxvZ2luLndlYkNvbnRlbnRzLnNlbmQoJ2Vycm9yJyxgVXNlcm5hbWUgZG9lc24ndCBleGlzdGApXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVTdWN1cnNhbEdldExpc3QoKSB7XG4gIC8vIENvbm5lY3Rpb25cbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuXG4gICAgXG4gIC8vUXVlcnlcbiAgbGV0IHNxbCA9IGBTRUxFQ1Qgc3VjdXJzYWxfaWQgYXMgaWQsbm9tYnJlICBmcm9tIFN1Y3Vyc2FsIDtgOyBcbiAgbGV0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmFsbCgpO1xuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWN1cnNhbEdldExpc3RQcmVjaW9zKGV2ZW50LHN1Y3Vyc2FsX2lkLCByZWdpc3RyYWRvPWZhbHNlKSB7XG4gIC8vIENvbm5lY3Rpb25cbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuICBsZXQgc3FsIFxuICBcbiAgLy9RdWVyeVxuICBzcWw9IGBTRUxFQ1QgJHtyZWdpc3RyYWRvPydscC5saXN0YXNfcHJlY2lvc19pZCc6J3AucHJlbmRhX2lkJ30gYXMgaWQscC5ub21icmUscC50aXBvX3NlcnZpY2lvIGFzIHNlcnZpY2lvLGxwLnByZWNpbyAgRlJPTSBQcmVuZGEgcFxuICAke3JlZ2lzdHJhZG8/J2lubmVyJzonbGVmdCd9IGpvaW4gKFxuICAgIFNFTEVDVCBsaXN0YXNfcHJlY2lvc19pZCxwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvIGZyb20gTGlzdGFzX1ByZWNpb3MgbHAgXG4gICAgV0hFUkUgcHJlbmRhX2lkIGlzIG5vdCBudWxsXG4gICAgICBhbmQgaXNfYWN0aXZlIGlzIFRSVUUgIFxuICAgICAgYW5kIHN1Y3Vyc2FsX2lkID0gP1xuICApIGxwXG4gIG9uIHAucHJlbmRhX2lkID1scC5wcmVuZGFfaWQgYDsgXG5cbiAgbGV0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmFsbChzdWN1cnNhbF9pZCk7XG4gIFxuXG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN1Y3Vyc2FsVXBkYXRlTGlzdFByZWNpb3MoZXZlbnQsbGlzdF9wcmVjaW9zKXtcbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuICBsaXN0X3ByZWNpb3MuZm9yRWFjaChvYmpfcHJlY2lvID0+IHtcbiAgICBjb25zdCB7aWRfcHJlbmRhLGlkX3N1Y3Vyc2FsLHByZWNpb30gPSBvYmpfcHJlY2lvXG4gICAgLy8gY2hlY2FyIHF1ZSBleGlzdGUgZWwgZWxlbWVudG8gZW4gbGEgbGlzdGEgZGUgcHJlY2lvXG4gICAgXG4gICAgbGV0IHNxbCA9IGBTRUxFQ1QgcHJlbmRhX2lkLHN1Y3Vyc2FsX2lkLHByZWNpbyBmcm9tIExpc3Rhc19QcmVjaW9zIGxwIFxuICAgICAgICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0/IGFuZCBpc19hY3RpdmUgaXMgVFJVRWA7IFxuICAgIGxldCBkYXRhPWRiLnByZXBhcmUoc3FsKS5nZXQoW2lkX3ByZW5kYSxpZF9zdWN1cnNhbF0pO1xuICAgIFxuICAgIC8vIHNpIGV4aXN0ZSwgcmV2aXNhciBzaSBlcyB1biBwcmVjaW8gbGxlbm8gbyB2YWNpb1xuICAgIGlmKGRhdGEgIT0gbnVsbCl7XG4gICAgICAvLyBzaSBjYW1iaW8gZWwgcHJlY2lvLCB1cGRhdGUgYW5kIGluc2VydCBuZXcgcHJlY2lvXG4gICAgICBpZihwcmVjaW8ubGVuZ3RoID4gMCl7XG4gICAgICAgIGlmIChkYXRhLnByZWNpbyAhPSBwcmVjaW8peyAvLyBBY3R1YWxpemEgeSBhZ3JlZ2Egc29sbyBjdWFuZG8gY2FtYmlhIGVsIHByZWNpb1xuICAgICAgICAgIC8vIHNlIGRlc2FjdGl2YSBlbCBwcmVjaW8gYWN0dWFsXG4gICAgICAgICAgY29uc3QgcXVlcnlVcGRhdGU9YFVQREFURSBMaXN0YXNfUHJlY2lvcyBcbiAgICAgICAgICBTRVQgaXNfYWN0aXZlID0gRkFMU0VcbiAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9ID8gIGBcbiAgICAgICAgICBjb25zdCByZXN1bHRVcGQ9IGRiLnByZXBhcmUocXVlcnlVcGRhdGUpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIFNlIGFncmVnYSBlbCBudWV2byBwcmVjaW8gYWN0aXZvXG4gICAgICAgICAgY29uc3QgcXVlcnlJbnNlcnROZXc9YElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zIChwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVkFMVUVTICg/LD8sPylgXG4gICAgICAgICAgY29uc3QgcmVzdWx0SW49IGRiLnByZXBhcmUocXVlcnlJbnNlcnROZXcpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwscHJlY2lvKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIHByaWNlJyxyZXN1bHRVcGQscmVzdWx0SW4pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8gc2kgbm8gaGF5IHByZWNpbywgZGVzYWN0aXZhciBzb2xhbWVudGVcbiAgICAgICAgY29uc3QgcXVlcnlVcGRhdGU9YFVQREFURSBMaXN0YXNfUHJlY2lvcyBcbiAgICAgICAgICAgICAgICAgICAgU0VUIGlzX2FjdGl2ZSA9IEZBTFNFXG4gICAgICAgICAgICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0gPyAgYFxuICAgICAgICBjb25zdCByZXN1bHRVcGQ9IGRiLnByZXBhcmUocXVlcnlVcGRhdGUpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwpO1xuICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIHRvIGZhbHNlJyxyZXN1bHRVcGQpXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgLy9zaW5vIGV4aXN0ZSwgcmV2aXNhciBzaSB0aWVuZSBwcmVjaW9cbiAgICAgIC8vIHNpIHRpZW5lIHByZWNpbyAtPiBpbnNlcnQgcHJlY2lvXG4gICAgICBpZihwcmVjaW8ubGVuZ3RoID4gMCl7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBxdWVyeUluc2VydD1gSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MgKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8pXG4gICAgICAgICAgICAgICAgICAgICAgVkFMVUVTICg/LD8sPylgXG4gICAgICAgIGNvbnN0IHJlc3VsdD0gZGIucHJlcGFyZShxdWVyeUluc2VydCkucnVuKGlkX3ByZW5kYSxpZF9zdWN1cnNhbCxwcmVjaW8pO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcblxufVxuXG5mdW5jdGlvbiBoYW5kbGVyU2F2ZVByZW5kYVByZWNpbyhldmVudCxkYXRhUHJlbmRhKXtcbiAgY29uc29sZS5sb2coZGF0YVByZW5kYSlcbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuICBjb25zdCBxdWVyeUluc2VydE5ld1ByZW5kYT1gSU5TRVJUIElOVE8gUHJlbmRhIChub21icmUsdGlwb19zZXJ2aWNpbylcbiAgVkFMVUVTICg/LD8pO2BcbiAgY29uc3QgcmVzdWx0SW5QcmVuZGE9IGRiLnByZXBhcmUocXVlcnlJbnNlcnROZXdQcmVuZGEpLnJ1bihkYXRhUHJlbmRhWydub21icmUnXSxkYXRhUHJlbmRhWyd0aXBvX3NlcnZpY2lvJ10pO1xuICBjb25zb2xlLmxvZygnUHJlbmRhIGFncmVnYWRhLi4uICcscmVzdWx0SW5QcmVuZGEpXG4gIGNvbnN0IGlkX3ByZW5kYT1yZXN1bHRJblByZW5kYS5sYXN0SW5zZXJ0Um93aWRcbiAgLy8gU2UgYWdyZWdhIGVsIG51ZXZvIHByZWNpbyBhY3Rpdm9cbiAgY29uc3QgcXVlcnlJbnNlcnROZXdMUD1gSU5TRVJUIElOVE8gTGlzdGFzX1ByZWNpb3MgKHByZW5kYV9pZCxzdWN1cnNhbF9pZCxwcmVjaW8pXG4gIFZBTFVFUyAobGFzdF9pbnNlcnRfcm93aWQoKSw/LD8pYFxuICBjb25zdCByZXN1bHRJbkxQPSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0TmV3TFApLnJ1bihkYXRhUHJlbmRhWydpZF9zdWN1cnNhbCddLGRhdGFQcmVuZGFbJ3ByZWNpbyddKTtcbiAgXG4gIGNvbnNvbGUubG9nKCdQcmVuZGEgYWdyZWdhZGEgZW4gTFAuLi4gJyxyZXN1bHRJbkxQKVxuICByZXR1cm4gaWRfcHJlbmRhXG59XG5cbmZ1bmN0aW9uIGhhbmRsZXJEZWxldGVQcmVuZGEoZXZlbnQsIGRhdGFQcmVuZGEpIHtcbiAgY29uc3QgeyBpZF9wcmVuZGEgfSA9IGRhdGFQcmVuZGFcblxuICB0cnkge1xuICAgIC8vIFZlcmlmaWNhciBxdWUgbG9zIElEcyBubyBzZWFuIHVuZGVmaW5lZFxuICAgIGlmIChpZF9wcmVuZGEgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWwgaWQgZGUgbGEgcHJlbmRhIG5vIHB1ZWRlIHNlciB1bmRlZmluZWQuJyk7XG4gICAgfVxuICBcbiAgICAgLy8gRWxpbWluYXIgbG9zIHByZWNpb3MgZGUgbGEgcHJlbmRhIGRlIGxhIHRhYmxhIExpc3Rhc19QcmVjaW9zXG4gICAgY29uc3QgcXVlcnlEZWxldGVMUCA9IGBERUxFVEUgRlJPTSBMaXN0YXNfUHJlY2lvcyBXSEVSRSBwcmVuZGFfaWQgPSA/O2A7XG4gICAgY29uc3QgcmVzdWx0RGVsZXRlTFAgPSBkYi5wcmVwYXJlKHF1ZXJ5RGVsZXRlTFApLnJ1bihpZF9wcmVuZGEpO1xuICAgIGNvbnNvbGUubG9nKCdQcmVjaW9zIGRlIHByZW5kYSBlbGltaW5hZG9zIGRlIExQLi4uJywgcmVzdWx0RGVsZXRlTFApO1xuXG4gICAgLy8gRWxpbWluYXIgbGEgcHJlbmRhIGRlIGxhIHRhYmxhIFByZW5kYVxuICAgIGNvbnN0IHF1ZXJ5RGVsZXRlUHJlbmRhID0gYERFTEVURSBGUk9NIFByZW5kYSBXSEVSRSBwcmVuZGFfaWQgPSA/O2A7XG4gICAgY29uc3QgcmVzdWx0RGVsZXRlUHJlbmRhID0gZGIucHJlcGFyZShxdWVyeURlbGV0ZVByZW5kYSkucnVuKGlkX3ByZW5kYSk7XG4gICAgY29uc29sZS5sb2coJ1ByZW5kYSBlbGltaW5hZGEuLi4nLCByZXN1bHREZWxldGVQcmVuZGEpO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxuICBcbn1cblxuZnVuY3Rpb24gaGFuZGxlclVwZGF0ZVByZW5kYShldmVudCwgZGF0YVByZW5kYSl7XG5cbiAgY29uc3QgeyBpZF9wcmVuZGEsIG5vbWJyZSwgcHJlY2lvLCB0aXBvX3NlcnZpY2lvLCBpZF9zdWN1cnNhbCB9ID0gZGF0YVByZW5kYTtcblxuICB0cnkge1xuICAgIC8vIFZlcmlmaWNhciBxdWUgbG9zIElEcyBubyBzZWFuIHVuZGVmaW5lZFxuICAgIGlmIChpZF9wcmVuZGEgPT09IHVuZGVmaW5lZCB8fCBpZF9zdWN1cnNhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsIGlkIGRlIGxhIHByZW5kYSBvIGRlIGxhIHN1Y3Vyc2FsIG5vIHB1ZWRlIHNlciB1bmRlZmluZWQuJyk7XG4gICAgfVxuICBcbiAgICAvLyBBY3R1YWxpemFyIG5vbWJyZSBvIHRpcG9fc2VydmljaW8gXG4gICAgY29uc3QgcXVlcnlVcGRhdGVQcmVuZGEgPSBgVVBEQVRFIFByZW5kYSBTRVQgbm9tYnJlID0gPywgdGlwb19zZXJ2aWNpbyA9ID8gV0hFUkUgcHJlbmRhX2lkID0gPztgO1xuICAgIGNvbnN0IHJlc3VsdFVwZGF0ZVByZW5kYSA9IGRiLnByZXBhcmUocXVlcnlVcGRhdGVQcmVuZGEpLnJ1bihub21icmUsIHRpcG9fc2VydmljaW8sIGlkX3ByZW5kYSk7XG4gICAgY29uc29sZS5sb2coJ1ByZW5kYSBhY3R1YWxpemFkYS4uLiAnLCByZXN1bHRVcGRhdGVQcmVuZGEpO1xuXG4gICAgY29uc3Qgc3FsID0gYFNFTEVDVCBwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvIGZyb20gTGlzdGFzX1ByZWNpb3MgbHAgXG4gICAgICAgICAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9PyBhbmQgaXNfYWN0aXZlIGlzIFRSVUVgOyBcblxuICAgIGNvbnN0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmdldChbaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsXSk7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIFxuICAgIC8vIHNpIGV4aXN0ZSwgcmV2aXNhciBzaSBlcyB1biBwcmVjaW8gbGxlbm8gbyB2YWNpb1xuICAgIGlmKGRhdGEgIT0gbnVsbCl7XG4gICAgICAvLyBzaSBjYW1iaW8gZWwgcHJlY2lvLCB1cGRhdGUgYW5kIGluc2VydCBuZXcgcHJlY2lvXG4gICAgICBpZihkYXRhUHJlbmRhLnByZWNpby5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYgKGRhdGEucHJlY2lvICE9IHByZWNpbyl7IC8vIEFjdHVhbGl6YSB5IGFncmVnYSBzb2xvIGN1YW5kbyBjYW1iaWEgZWwgcHJlY2lvXG4gICAgICAgICAgLy8gc2UgZGVzYWN0aXZhIGVsIHByZWNpbyBhY3R1YWxcbiAgICAgICAgICBjb25zdCBxdWVyeVVwZGF0ZT1gVVBEQVRFIExpc3Rhc19QcmVjaW9zIFxuICAgICAgICAgICAgU0VUIGlzX2FjdGl2ZSA9IEZBTFNFXG4gICAgICAgICAgICBXSEVSRSBwcmVuZGFfaWQgPSA/IGFuZCBzdWN1cnNhbF9pZCA9ID8gIGBcbiAgICAgICAgICBjb25zdCByZXN1bHRVcGQ9IGRiLnByZXBhcmUocXVlcnlVcGRhdGUpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIFNlIGFncmVnYSBlbCBudWV2byBwcmVjaW8gYWN0aXZvXG4gICAgICAgICAgY29uc3QgcXVlcnlJbnNlcnROZXc9YElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zIChwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVkFMVUVTICg/LD8sPylgXG4gICAgICAgICAgY29uc3QgcmVzdWx0SW49IGRiLnByZXBhcmUocXVlcnlJbnNlcnROZXcpLnJ1bihpZF9wcmVuZGEsaWRfc3VjdXJzYWwscHJlY2lvKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFIHByaWNlJyxyZXN1bHRVcGQscmVzdWx0SW4pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8gc2kgbm8gaGF5IHByZWNpbywgZGVzYWN0aXZhciBzb2xhbWVudGVcbiAgICAgICAgY29uc3QgcXVlcnlVcGRhdGU9YFVQREFURSBMaXN0YXNfUHJlY2lvcyBcbiAgICAgICAgICAgICAgICAgICAgU0VUIGlzX2FjdGl2ZSA9IEZBTFNFXG4gICAgICAgICAgICAgICAgICAgIFdIRVJFIHByZW5kYV9pZCA9ID8gYW5kIHN1Y3Vyc2FsX2lkID0gPyAgYFxuICAgICAgICBjb25zdCByZXN1bHRVcGQ9IGRiLnByZXBhcmUocXVlcnlVcGRhdGUpLnJ1bihpZF9wcmVuZGEsIGlkX3N1Y3Vyc2FsKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VQREFURSB0byBmYWxzZScscmVzdWx0VXBkKVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgLy9zaW5vIGV4aXN0ZSwgcmV2aXNhciBzaSB0aWVuZSBwcmVjaW9cbiAgICAgIC8vIHNpIHRpZW5lIHByZWNpbyAtPiBpbnNlcnQgcHJlY2lvXG4gICAgICBpZihwcmVjaW8ubGVuZ3RoID4gMCl7XG4gICAgICAgXG4gICAgICAgY29uc3QgcXVlcnlJbnNlcnQ9YElOU0VSVCBJTlRPIExpc3Rhc19QcmVjaW9zIChwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvKVxuICAgICAgICAgICAgICAgICAgICAgVkFMVUVTICg/LD8sPylgXG4gICAgICAgY29uc3QgcmVzdWx0PSBkYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0KS5ydW4oaWRfcHJlbmRhLGlkX3N1Y3Vyc2FsLHByZWNpbyk7XG4gICAgICAgXG4gICAgICB9XG4gICAgfVxuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gaGFuZGxlclNhdmVOb3RhKGV2ZW50LGRhdGFOb3RhKXtcbiAgY29uc29sZS5sb2coZGF0YU5vdGEpXG5cbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuICBjb25zdCB7bnVtX25vdGEsY2xpZW50ZSxpZF9zdWN1cnNhbCxmZWNoYV9yZWNlcGNpb24sZmVjaGFfZW50cmVnYSxwcmVuZGFzfT1kYXRhTm90YVxuICBjb25zdCBudW1fbm90YV9pbnQ9cGFyc2VJbnQobnVtX25vdGEpXG4gIGNvbnN0IGlkX3N1Y3Vyc2FsX2ludD1wYXJzZUludChpZF9zdWN1cnNhbClcbiAgY29uc3QgRkVfZGlhID0gZmVjaGFfcmVjZXBjaW9uLmdldERhdGUoKTsgLy8gT2J0ZW5lciBlbCBkw61hIGRlbCBtZXMgKGVqLiAyMylcbiAgY29uc3QgRkVfbWVzID0gZmVjaGFfcmVjZXBjaW9uLmdldE1vbnRoKCk7IC8vIE9idGVuZXIgZWwgbWVzICgwIHBhcmEgZW5lcm8sIDEgcGFyYSBmZWJyZXJvLCBldGMuKVxuICBjb25zdCBGRV9hbmlvID0gZmVjaGFfcmVjZXBjaW9uLmdldEZ1bGxZZWFyKCk7IC8vIE9idGVuZXIgZWwgYcOxbyAoZWouIDIwMjQpXG4gIGNvbnN0IEZFX2RhdGU9RkVfYW5pbysnLScrRkVfbWVzKyctJytGRV9kaWFcbiAgY29uc3QgRlJfZGlhID0gZmVjaGFfZW50cmVnYS5nZXREYXRlKCk7IC8vIE9idGVuZXIgZWwgZMOtYSBkZWwgbWVzIChlai4gMjMpXG4gIGNvbnN0IEZSX21lcyA9IGZlY2hhX2VudHJlZ2EuZ2V0TW9udGgoKTsgLy8gT2J0ZW5lciBlbCBtZXMgKDAgcGFyYSBlbmVybywgMSBwYXJhIGZlYnJlcm8sIGV0Yy4pXG4gIGNvbnN0IEZSX2FuaW8gPSBmZWNoYV9lbnRyZWdhLmdldEZ1bGxZZWFyKCk7IC8vIE9idGVuZXIgZWwgYcOxbyAoZWouIDIwMjQpXG4gIGNvbnN0IEZSX2RhdGU9RlJfYW5pbysnLScrRlJfbWVzKyctJytGUl9kaWFcbiAgbGV0IGNsaWVudGVfaWRcbiAgaWYoQm9vbGVhbihjbGllbnRlKSl7XG4gICAgY29uc3QgcXVlcnlJbnNlcnRDbGllbnRlPWBcbiAgICBJTlNFUlQgSU5UTyBjbGllbnRlIChub21icmUsc3VjdXJzYWxfaWQsaXNfb3duZXJfc3VjdXJzYWwpXG4gICAgVkFMVUVTIFx0KD8sPyxGYWxzZSk7XG4gICAgYFxuICAgIGNvbnN0IGNsaWVudGVfaW5mbz1kYi5wcmVwYXJlKHF1ZXJ5SW5zZXJ0Q2xpZW50ZSkucnVuKGNsaWVudGUsaWRfc3VjdXJzYWxfaW50KVxuICAgIGNsaWVudGVfaWQ9Y2xpZW50ZV9pbmZvLmxhc3RJbnNlcnRSb3dpZFxuICB9ZWxzZXtcbiAgICBjb25zdCBxdWVyeUdldENsaWVudGU9YFxuICAgIFNFTEVDVCBjLmNsaWVudGVfaWQgIGZyb20gY2xpZW50ZSBjXG4gICAgd2hlcmUgYy5zdWN1cnNhbF9pZCA9ID8gYW5kIGMuaXNfb3duZXJfc3VjdXJzYWwgPSBUUlVFIFxuICAgIGxpbWl0IDE7XG4gICAgYFxuICAgIGNvbnN0IGNsaWVudGVfaW5mbz1kYi5wcmVwYXJlKHF1ZXJ5R2V0Q2xpZW50ZSkuZ2V0KGlkX3N1Y3Vyc2FsX2ludClcbiAgICBjbGllbnRlX2lkPWNsaWVudGVfaW5mby5jbGllbnRlX2lkXG4gIH1cbiAgY29uc29sZS5sb2coXCJjbGllbnRlIGFncmVnYWRvLi4uIFwiLEJvb2xlYW4oY2xpZW50ZSksY2xpZW50ZV9pZClcbiAgLy8gT2J0ZW5lciBpZHMgZGUgcHJlbmRhc1xuICBsZXQgcmVnX3ByZW5kYXM9W11cbiAgbGV0IHByZWNpb1RvdGFsPTBcbiAgcHJlbmRhcy5mb3JFYWNoKHByZW5kYV9vYmo9PntcbiAgICBsZXQgcHJlbmRhX2lkXG4gICAgaWYgKHByZW5kYV9vYmouaXNfY29tb2Rpbil7IC8vcmVnaXN0cm8gZGUgcHJlbmRhIGNvbW9kaW5cbiAgICAgIGNvbnN0IHF1ZXJ5SW5zZXJ0UHJlbmRhQ29tb2Rpbj1gXG4gICAgICBJTlNFUlQgSU5UTyBMaXN0YXNfUHJlY2lvcyhwcmVuZGFfaWQsc3VjdXJzYWxfaWQscHJlY2lvLG5vbWJyZV9jb21vZGluKVxuICAgICAgVmFsdWVzXHRcdChudWxsLD8sPyw/KTtgXG4gICAgICBsZXQgcHJlbmRhX2NvbW9kaW5fcmVzPWRiLnByZXBhcmUocXVlcnlJbnNlcnRQcmVuZGFDb21vZGluKS5ydW4oaWRfc3VjdXJzYWxfaW50LHBhcnNlSW50KHByZW5kYV9vYmoucHJlY2lvKSxwcmVuZGFfb2JqLnByZW5kYV9pZClcbiAgICAgIHByZW5kYV9pZD1wcmVuZGFfY29tb2Rpbl9yZXMubGFzdEluc2VydFJvd2lkXG5cbiAgICAgIHByZWNpb1RvdGFsKz0ocGFyc2VJbnQocHJlbmRhX29iai5wcmVjaW8pKnByZW5kYV9vYmoubnVtX3ByZW5kYXMpXG4gICAgfWVsc2V7IC8vIExhIHByZW5kYSB5YSBlc3TDoSByZWdpc3RyYWRhLCBvYnRlbmVyIGlkXG4gICAgICBjb25zdCBxdWVyeUdldExpc3Rhc1ByZWNpb3NJZD1gXG4gICAgICAgIHNlbGVjdCBsLmxpc3Rhc19wcmVjaW9zX2lkLGwucHJlY2lvICBmcm9tIExpc3Rhc19QcmVjaW9zIGxcbiAgICAgICAgV0hFUkUgbC5wcmVuZGFfaWQgPSA/XG4gICAgICAgIGFuZCBsLnN1Y3Vyc2FsX2lkID0gP1xuICAgICAgICBhbmQgbC5pc19hY3RpdmUgIGlzIFRSVUVcbiAgICAgICAgbGltaXQgMTtgXG4gICAgICBsZXQgbGlzdGFzX3ByZWNpb3NfcmVzPWRiLnByZXBhcmUocXVlcnlHZXRMaXN0YXNQcmVjaW9zSWQpLmdldChwYXJzZUludChwcmVuZGFfb2JqLnByZW5kYV9pZCksaWRfc3VjdXJzYWxfaW50KVxuICAgICAgY29uc29sZS5sb2coXCJsaXN0YV9wcmVjaW9zXCIsIGxpc3Rhc19wcmVjaW9zX3JlcylcbiAgICAgIHByZW5kYV9pZD1saXN0YXNfcHJlY2lvc19yZXMubGlzdGFzX3ByZWNpb3NfaWRcbiAgICAgIHByZWNpb1RvdGFsKz0obGlzdGFzX3ByZWNpb3NfcmVzLnByZWNpbypwcmVuZGFfb2JqLm51bV9wcmVuZGFzKVxuICAgIH1cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJlbmRhX29iai5udW1fcHJlbmRhczsgaW5kZXgrKykgeyAvLyBhZ3JlZ2Ftb3MgZWwgbnVtZXJvIGRlIHByZW5kYXNcbiAgICAgIGlmKHByZW5kYV9vYmouY29sb3Jlc1tpbmRleF0pe1xuICAgICAgICByZWdfcHJlbmRhcy5wdXNoKHsncHJlbmRhX2xpc3Rhc19wcmVjaW9zX2lkJzpwcmVuZGFfaWQsJ2NvbG9yJzpwcmVuZGFfb2JqLmNvbG9yZXNbaW5kZXhdfSlcbiAgICAgIH1lbHNleyAvLyBzaSBubyBzZSByZWdpc3RyYXJvbiBtw6FzIGNvbG9yZXMsIHNlIHV0aWxpemEgZWwgdWx0aW1vLCBsYXMgdmVjZXMgbmVjZXNhcmlhc1xuICAgICAgICBsZXQgbGFzdF9pZD1wcmVuZGFfb2JqLmNvbG9yZXMubGVuZ3RoLTFcbiAgICAgICAgcmVnX3ByZW5kYXMucHVzaCh7J3ByZW5kYV9saXN0YXNfcHJlY2lvc19pZCc6cHJlbmRhX2lkLCdjb2xvcic6cHJlbmRhX29iai5jb2xvcmVzW2xhc3RfaWRdfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIGNvbnNvbGUubG9nKCdQcmVuZGFzIHJlZ2lzdHJhZGFzJylcbiAgY29uc29sZS5sb2cocmVnX3ByZW5kYXMpXG4gIGNvbnNvbGUubG9nKCdQcmVjaW8gdG90YWw6JyxwcmVjaW9Ub3RhbClcbiAgLy8gUmVnaXN0cm8gZGUgTm90YVxuICBjb25zdCBxdWVyeUluc2VydE5ld05vdGE9YFxuICBJTlNFUlQgSU5UTyBOb3RhIChudW1fbm90YSxjbGllbnRlX2lkLGZlY2hhX3JlY2VwY2lvbixmZWNoYV9lbnRyZWdhLHByZWNpb190b3RhbClcbiAgICBWQUxVRVMgXHQoPyw/LD8sPyw/KTtgO1xuXG4gIGNvbnN0IHJlc1ByZW5kYT0gZGIucHJlcGFyZShxdWVyeUluc2VydE5ld05vdGEpLnJ1bihudW1fbm90YV9pbnQsY2xpZW50ZV9pZCxGUl9kYXRlLEZFX2RhdGUscHJlY2lvVG90YWwpO1xuIFxuICBjb25zdCBub3RhX2lkPXJlc1ByZW5kYS5sYXN0SW5zZXJ0Um93aWQ7XG4gIGNvbnNvbGUubG9nKFwiTm90YV9pZFwiLG5vdGFfaWQpXG4gIC8vIFJlZ2lzdHJvIGRlIE5vdGFfUm9wYSBwb3IgcHJlbmRhXG4gIHJlZ19wcmVuZGFzLmZvckVhY2gocHJlbmRhPT57XG4gICAgY29uc3QgcXVlcnlJbnNlcnROb3RhUm9wYT1gXG4gICAgICBJTlNFUlQgSU5UTyBOb3RhX1JvcGEgKG5vdGFfaWQscHJlbmRhX2xpc3RhX3ByZWNpb3NfaWQsY29sb3IsZGV0YWxsZXMpXG4gICAgICB2YWx1ZXNcdCg/LD8sPyxudWxsKTtgO1xuICAgIGRiLnByZXBhcmUocXVlcnlJbnNlcnROb3RhUm9wYSkucnVuKG5vdGFfaWQscHJlbmRhLnByZW5kYV9saXN0YXNfcHJlY2lvc19pZCxwcmVuZGEuY29sb3IpO1xuICB9KVxuICBcbiAgcmV0dXJuIFwic3VjY2Vzc1wiXG4gIFxuXG5cbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVyR2V0TGlzdE5vdGFzKGV2ZW50LGRhdGFOb3RhKXtcbiAgLy9jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi8uLi9kYi9kcnlfY2xlYW5fc2l4X3N0YXJzLmRiJykpO1xuICBjb25zdCB7c3VjdXJzYWxfaWQsbnVtX25vdGEsY2xpZW50ZV9uYW1lLGZlY2hhX2Rlc2RlLGZlY2hhX2hhc3RhfT1kYXRhTm90YVxuICBjb25zdCBudW1fbm90YV9pbnQ9cGFyc2VJbnQobnVtX25vdGEpXG4gIGNvbnN0IGlkX3N1Y3Vyc2FsX2ludD1wYXJzZUludChzdWN1cnNhbF9pZClcbiAgY29uc29sZS5sb2coc3VjdXJzYWxfaWQsaWRfc3VjdXJzYWxfaW50LEJvb2xlYW4oaWRfc3VjdXJzYWxfaW50KSlcblxuICAvL1F1ZXJ5XG4gIHNxbD0gYFNFTEVDVCBuLm5vdGFfaWQsbi5udW1fbm90YSxcbiAgICAgICAgICBjLm5vbWJyZSBhcyBub21icmVfY2xpZW50ZSxcbiAgICAgICAgICBzLm5vbWJyZSAgYXMgbm9tYnJlX3N1Y3Vyc2FsLFxuICAgICAgICAgIG4ucHJlY2lvX3RvdGFsLFxuICAgICAgICAgIG4uZmVjaGFfcmVnaXN0cm8sXG4gICAgICAgICAgbi5mZWNoYV9yZWNlcGNpb24sXG4gICAgICAgICAgbi5mZWNoYV9lbnRyZWdhLFxuICAgICAgICAgIGxwLmxpc3Rhc19wcmVjaW9zX2lkIGFzIHByZW5kYV9pZCAsXG4gICAgICAgICAgaWZudWxsKHAubm9tYnJlLGxwLm5vbWJyZV9jb21vZGluKSBhcyBub21icmVfcHJlbmRhLFxuICAgICAgICAgIG5yLmNvbG9yLFxuICAgICAgICAgIHAudGlwb19zZXJ2aWNpbyxcbiAgICAgICAgICBscC5wcmVjaW9cbiAgICAgICAgRlJPTSBOb3RhIG4gXG4gICAgICAgIElOTkVSIEpPSU4gTm90YV9Sb3BhIG5yIFxuICAgICAgICBPTiBuLm5vdGFfaWQgPW5yLm5vdGFfaWQgXG4gICAgICAgIElOTkVSIEpPSU4gTGlzdGFzX1ByZWNpb3MgbHAgXG4gICAgICAgIE9OIG5yLnByZW5kYV9saXN0YV9wcmVjaW9zX2lkID1scC5saXN0YXNfcHJlY2lvc19pZCBcbiAgICAgICAgTEVGVCBqb2luIFByZW5kYSBwIFxuICAgICAgICBPTiBscC5wcmVuZGFfaWQgPXAucHJlbmRhX2lkXG4gICAgICAgIExFRlQgSk9JTiBDbGllbnRlIGNcbiAgICAgICAgT04gbi5jbGllbnRlX2lkID1jLmNsaWVudGVfaWRcbiAgICAgICAgTEVGVCBKT0lOIFN1Y3Vyc2FsIHMgXG4gICAgICAgIE9OIGMuc3VjdXJzYWxfaWQgID1zLnN1Y3Vyc2FsX2lkICBcbiAgICAgICAgV0hFUkUgVFJVRSBgOyBcblxuICBsZXQgYmluZFBhcmFtZXRlcnM9W11cbiAgaWYoaWRfc3VjdXJzYWxfaW50KXtcbiAgICBzcWwrPWAgQU5EIHMuc3VjdXJzYWxfaWQgPSA/IGA7XG4gICAgYmluZFBhcmFtZXRlcnMucHVzaChpZF9zdWN1cnNhbF9pbnQpXG4gIH1cbiAgaWYobnVtX25vdGFfaW50KXtcbiAgICBzcWwrPWAgQU5EIG4ubnVtX25vdGEgPSA/IGA7XG4gICAgYmluZFBhcmFtZXRlcnMucHVzaChudW1fbm90YV9pbnQpXG4gIH1cbiAgaWYoY2xpZW50ZV9uYW1lKXtcbiAgICBzcWwrPWAgQU5EIGxvd2VyKGMubm9tYnJlKSBsaWtlID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKCclJytjbGllbnRlX25hbWUudG9Mb3dlckNhc2UoKSsnJScpXG4gIH1cbiAgaWYoZmVjaGFfZGVzZGUpe1xuICAgIGNvbnN0IEZlY2hhX2Rlc2RlX2RpYT1mZWNoYV9kZXNkZS5zcGxpdCgnLycpWzBdXG4gICAgY29uc3QgRmVjaGFfZGVzZGVfbWVzPWZlY2hhX2Rlc2RlLnNwbGl0KCcvJylbMV1cbiAgICBjb25zdCBGZWNoYV9kZXNkZV9hbmlvPXBhcnNlSW50KGZlY2hhX2Rlc2RlLnNwbGl0KCcvJylbMl0pXG4gICAgY29uc3QgRmVjaGFfZGVzZGVfZGF0ZT1GZWNoYV9kZXNkZV9hbmlvKyctJytGZWNoYV9kZXNkZV9tZXMrJy0nK0ZlY2hhX2Rlc2RlX2RpYVxuXG4gICAgc3FsKz1gIEFORCBmZWNoYV9yZWdpc3RybyAgPj0gPyBgO1xuICAgIGJpbmRQYXJhbWV0ZXJzLnB1c2goRmVjaGFfZGVzZGVfZGF0ZSlcblxuICB9XG4gIGlmKGZlY2hhX2hhc3RhKXtcbiAgICBjb25zdCBGZWNoYV9oYXN0YV9kaWE9KHBhcnNlSW50KGZlY2hhX2hhc3RhLnNwbGl0KCcvJylbMF0pKzEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKVxuICAgIGNvbnN0IEZlY2hhX2hhc3RhX21lcz1mZWNoYV9oYXN0YS5zcGxpdCgnLycpWzFdXG4gICAgY29uc3QgRmVjaGFfaGFzdGFfYW5pbz1wYXJzZUludChmZWNoYV9oYXN0YS5zcGxpdCgnLycpWzJdKVxuICAgIGNvbnN0IEZlY2hhX2hhc3RhX2RhdGU9RmVjaGFfaGFzdGFfYW5pbysnLScrRmVjaGFfaGFzdGFfbWVzKyctJytGZWNoYV9oYXN0YV9kaWFcblxuICAgIHNxbCs9YCBBTkQgZmVjaGFfcmVnaXN0cm8gIDw9ID8gYDtcbiAgICBiaW5kUGFyYW1ldGVycy5wdXNoKEZlY2hhX2hhc3RhX2RhdGUpXG4gIH1cbiAgY29uc29sZS5sb2coc3FsKVxuICBjb25zb2xlLmxvZyhiaW5kUGFyYW1ldGVycylcbiAgbGV0IGRhdGE9ZGIucHJlcGFyZShzcWwpLmFsbChiaW5kUGFyYW1ldGVycyk7XG4gIFxuICBsZXQgZF9ub3Rhcz17fVxuICBcbiAgZGF0YS5mb3JFYWNoKHJvdz0+e1xuICAgIGxldCBuYW1lX3ByZW5kYT1yb3dbJ3RpcG9fc2VydmljaW8nXSE9bnVsbD9yb3dbJ25vbWJyZV9wcmVuZGEnXTpyb3dbJ25vbWJyZV9wcmVuZGEnXS5zcGxpdCgnLScpWzBdXG4gICAgbGV0IG5hbWVfc2VydmljZT1yb3dbJ3RpcG9fc2VydmljaW8nXSE9bnVsbD9yb3dbJ3RpcG9fc2VydmljaW8nXTpyb3dbJ25vbWJyZV9wcmVuZGEnXS5zcGxpdCgnLScpLmxlbmd0aD4xP3Jvd1snbm9tYnJlX3ByZW5kYSddLnNwbGl0KCctJylbMV06bnVsbFxuICAgIGlmKHJvd1snbm90YV9pZCddIGluIGRfbm90YXMpe1xuICAgICAgZF9ub3Rhc1tyb3dbJ25vdGFfaWQnXV1bJ3ByZW5kYXMnXS5wdXNoKHtcbiAgICAgICAgaWRfcHJlbmRhOnJvd1sncHJlbmRhX2lkJ10sXG4gICAgICAgIG5vbWJyZV9wcmVuZGE6IG5hbWVfcHJlbmRhLFxuICAgICAgICBjb2xvcjogcm93Wydjb2xvciddLFxuICAgICAgICB0aXBvX3NlcnZpY2lvOiBuYW1lX3NlcnZpY2UsXG4gICAgICAgIHByZWNpbzogcm93WydwcmVjaW8nXVxuICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgIGRfbm90YXNbcm93Wydub3RhX2lkJ11dPXtcbiAgICAgICAgbnVtX25vdGE6IHJvd1snbnVtX25vdGEnXSxcbiAgICAgICAgbm9tYnJlX2NsaWVudGUgOiByb3dbJ25vbWJyZV9jbGllbnRlJ10sXG4gICAgICAgIG5vbWJyZV9zdWN1cnNhbCA6IHJvd1snbm9tYnJlX3N1Y3Vyc2FsJ10sXG4gICAgICAgIHByZWNpb190b3RhbCA6IHJvd1sncHJlY2lvX3RvdGFsJ10sXG4gICAgICAgIGZlY2hhX3JlZ2lzdHJvIDogcm93WydmZWNoYV9yZWdpc3RybyddLFxuICAgICAgICBmZWNoYV9yZWNlcGNpb24gOiByb3dbJ2ZlY2hhX3JlY2VwY2lvbiddLFxuICAgICAgICBmZWNoYV9lbnRyZWdhIDogcm93WydmZWNoYV9lbnRyZWdhJ10sXG4gICAgICAgIHByZW5kYXMgOiBbe1xuICAgICAgICAgIGlkX3ByZW5kYTpyb3dbJ3ByZW5kYV9pZCddLFxuICAgICAgICAgIG5vbWJyZV9wcmVuZGE6IG5hbWVfcHJlbmRhLFxuICAgICAgICAgIGNvbG9yOiByb3dbJ2NvbG9yJ10sXG4gICAgICAgICAgdGlwb19zZXJ2aWNpbzogbmFtZV9zZXJ2aWNlLFxuICAgICAgICAgIHByZWNpbzogcm93WydwcmVjaW8nXVxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBcbiAgcmV0dXJuIGRfbm90YXNcblxufVxuXG5mdW5jdGlvbiBnZXRfcHJlbmRhc19jdWVudGEocHJlbmRhcyl7XG4gIHByZW5kYXNfY3VlbnRhPXt9XG4gIHByZW5kYXMuZm9yRWFjaChwcmVuZGE9PntcbiAgICBpZihwcmVuZGFbJ2lkX3ByZW5kYSddIGluIHByZW5kYXNfY3VlbnRhKXtcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydudW1fcHJlbmRhcyddKytcbiAgICAgIHByZW5kYXNfY3VlbnRhW3ByZW5kYVsnaWRfcHJlbmRhJ11dWydjb2xvcmVzJ10ucHVzaChwcmVuZGFbJ2NvbG9yJ10pXG4gICAgfWVsc2V7XG4gICAgICBwcmVuZGFzX2N1ZW50YVtwcmVuZGFbJ2lkX3ByZW5kYSddXT17XG4gICAgICAgIG51bV9wcmVuZGFzOjEsXG4gICAgICAgIG5vbWJyZV9wcmVuZGE6cHJlbmRhWydub21icmVfcHJlbmRhJ10sXG4gICAgICAgIHRpcG9fc2VydmljaW86cHJlbmRhWyd0aXBvX3NlcnZpY2lvJ10sXG4gICAgICAgIGNvbG9yZXM6W3ByZW5kYVsnY29sb3InXV0sXG4gICAgICAgIHByZWNpbzpwcmVuZGFbJ3ByZWNpbyddXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gcHJlbmRhc19jdWVudGFcbn1cblxuZnVuY3Rpb24gaGFuZGxlclByaW50VGlja2V0KGV2ZW50LGRhdGFOb3Rhcyxub21icmVfY2xpZW50ZSl7XG4gIFxuICBsZXQgbm90YXM9W11cbiAgbGV0IHByZWNpb19jdWVudGFfdG90YWw9MFxuICBPYmplY3QuZW50cmllcyhkYXRhTm90YXMpLmZvckVhY2goKFtub3RhX2lkLCBub3RhX29ial0pID0+IHtcbiAgICBsZXQgbm90YV9kZXNjPXtcbiAgICAgIHRleHRfbnVtX25vdGE6bm90YV9vYmpbJ251bV9ub3RhJ10hPW51bGw/bm90YV9vYmpbJ251bV9ub3RhJ106XCJTaW4gTsO6bWVyb1wiLFxuICAgICAgZmVjaGFfcmVnaXN0cm86bm90YV9vYmpbJ2ZlY2hhX3JlZ2lzdHJvJ10uc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgbm9tYnJlX2NsaWVudGU6bm90YV9vYmpbJ25vbWJyZV9jbGllbnRlJ10sXG4gICAgICBudW1fcHJlbmRhczowLFxuICAgICAgcHJlY2lvX3RvdGFsOjAsXG4gICAgICBwcmVuZGFzOiBbXVxuICAgIH1cbiAgICBcbiAgICBsZXQgcHJlbmRhc19jdWVudGE9Z2V0X3ByZW5kYXNfY3VlbnRhKG5vdGFfb2JqWydwcmVuZGFzJ10pXG4gICAgT2JqZWN0LmVudHJpZXMocHJlbmRhc19jdWVudGEpLmZvckVhY2goKFtwcmVuZGFfaWQscHJlbmRhX29ial0pPT57XG4gICAgICAvLyBsZXQgY29sb3Jlcz1wcmVuZGFfb2JqWydjb2xvcmVzJ10uam9pbignLCcpXG4gICAgICBub3RhX2Rlc2MucHJlbmRhcy5wdXNoKFtwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbmRhX29ialsnbm9tYnJlX3ByZW5kYSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbmRhX29ialsndGlwb19zZXJ2aWNpbyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3JlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXCIkXCIrU3RyaW5nKHByZW5kYV9vYmpbJ3ByZWNpbyddKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiK1N0cmluZyhwYXJzZUZsb2F0KHByZW5kYV9vYmpbJ3ByZWNpbyddKSpwYXJzZUludChwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgXG4gICAgICBub3RhX2Rlc2MucHJlY2lvX3RvdGFsKz1wYXJzZUZsb2F0KHByZW5kYV9vYmpbJ3ByZWNpbyddKSpwYXJzZUludChwcmVuZGFfb2JqWydudW1fcHJlbmRhcyddKVxuICAgIH0pXG4gICAgXG4gICAgcHJlY2lvX2N1ZW50YV90b3RhbCs9bm90YV9kZXNjLnByZWNpb190b3RhbFxuICAgIG5vdGFzLnB1c2gobm90YV9kZXNjKVxuICB9KTtcblxuICBwcmludFRpY2tldChub21icmVfY2xpZW50ZSxub3RhcyxwcmVjaW9fY3VlbnRhX3RvdGFsKVxuXG59XG5cblxuZnVuY3Rpb24gaGFuZGxlckRlbGV0ZU5vdGEoZXZlbnQsbm90YV9pZCl7XG4gIGNvbnN0IGRlbGV0ZU5vdGFSb3BhPWBcbiAgREVMRVRFIEZST00gTm90YV9Sb3BhIFdIRVJFIG5vdGFfaWQgPSA/OyBgXG4gIGRiLnByZXBhcmUoZGVsZXRlTm90YVJvcGEpLnJ1bihub3RhX2lkKTtcbiAgY29uc3QgZGVsZXRlTm90YT1gXG4gIERFTEVURSBGUk9NIE5vdGEgV0hFUkUgbm90YV9pZCA9ID87YFxuICBkYi5wcmVwYXJlKGRlbGV0ZU5vdGEpLnJ1bihub3RhX2lkKTtcblxuICByZXR1cm4ge3JlczpcInN1Y2Nlc3NcIn1cbn1cblxuLy8gaXBjTWFpbi5oYW5kbGUoJ2dldCcsICgpID0+IHtcbi8vICAgIGdldFByb2R1Y3RzKClcbi8vIH0pO1xuXG5cbi8vIGlwY01haW4uaGFuZGxlKCdhZGQnLCAoZXZlbnQsIG9iaikgPT4ge1xuLy8gICBhZGRQcm9kdWN0KG9iailcbi8vIH0pO1xuXG5cbi8vIGlwY01haW4uaGFuZGxlKCdnZXRfb25lJywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgZ2V0cHJvZHVjdChvYmopICAgIFxuLy8gfSk7XG5cblxuLy8gaXBjTWFpbi5oYW5kbGUoJ3JlbW92ZV9wcm9kdWN0JywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgZGVsZXRlcHJvZHVjdChvYmopXG4vLyB9KTtcblxuXG4vLyBpcGNNYWluLmhhbmRsZSgndXBkYXRlJywgKGV2ZW50LCBvYmopID0+IHtcbi8vICAgdXBkYXRlcHJvZHVjdChvYmopICAgIFxuLy8gfSk7XG5cblxuLy8gZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKVxuLy8ge1xuICBcbi8vICAgZGIucXVlcnkoJ1NFTEVDVCAqIEZST00gcHJvZHVjdCcsIChlcnJvciwgcmVzdWx0cywgZmllbGRzKSA9PiB7XG4vLyAgICAgaWYgKGVycm9yKXtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbi8vICAgICB9XG4gICAgXG4vLyAgICAgd2luLndlYkNvbnRlbnRzLnNlbmQoJ3Byb2R1Y3RzJywgcmVzdWx0cylcbi8vICAgfSk7ICBcbi8vIH1cblxuXG4vLyBmdW5jdGlvbiBhZGRQcm9kdWN0KG9iailcbi8vIHtcbi8vICAgY29uc3Qgc3FsID0gXCJJTlNFUlQgSU5UTyBwcm9kdWN0IFNFVCA/XCI7ICBcbi8vICAgZGIucXVlcnkoc3FsLCBvYmosIChlcnJvciwgcmVzdWx0cywgZmllbGRzKSA9PiB7XG4vLyAgICAgaWYoZXJyb3IpIHtcbi8vICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgfVxuLy8gICAgIGdldFByb2R1Y3RzKCkgIFxuLy8gIH0pO1xuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGRlbGV0ZXByb2R1Y3Qob2JqKVxuLy8ge1xuLy8gICBjb25zdCB7IGlkIH0gID0gb2JqXG4vLyAgIGNvbnN0IHNxbCA9IFwiREVMRVRFIEZST00gcHJvZHVjdCBXSEVSRSBpZCA9ID9cIlxuLy8gICBkYi5xdWVyeShzcWwsIGlkLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmKGVycm9yKSB7XG4vLyAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgICBnZXRQcm9kdWN0cygpICBcbi8vICAgfSk7XG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gZ2V0cHJvZHVjdChvYmopXG4vLyB7XG4vLyAgIGxldCB7IGlkIH0gPSBvYmogXG4vLyAgIGxldCBzcWwgPSBcIlNFTEVDVCAqIEZST00gcHJvZHVjdCBXSEVSRSBpZCA9ID9cIlxuLy8gICBkYi5xdWVyeShzcWwsIGlkLCAoZXJyb3IsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuLy8gICAgIGlmIChlcnJvcil7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpXG4vLyAgICAgd2luLndlYkNvbnRlbnRzLnNlbmQoJ3Byb2R1Y3QnLCByZXN1bHRzWzBdKVxuLy8gICB9KTtcbi8vIH1cblxuXG4vLyBmdW5jdGlvbiB1cGRhdGVwcm9kdWN0KG9iaikgXG4vLyB7XG4vLyAgICBsZXQgeyBpZCwgbmFtZSwgcHJpY2UgfSA9IG9ialxuLy8gICAgY29uc3Qgc3FsID0gXCJVUERBVEUgcHJvZHVjdCBTRVQgbmFtZT0/LCBwcmljZT0/IFdIRVJFIGlkPT9cIjsgIFxuLy8gICAgZGIucXVlcnkoc3FsLCBbbmFtZSwgcHJpY2UsIGlkXSwgKGVycm9yLCByZXN1bHRzLCBmaWVsZHMpID0+IHtcbi8vICAgICAgaWYoZXJyb3IpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgICB9XG4vLyAgICAgIGdldFByb2R1Y3RzKCkgIFxuLy8gICAgfSk7XG4vLyB9XG5cblxuIl0sIm5hbWVzIjpbImVzY3BvcyIsInBhdGgiLCJVU0IiLCJyZXF1aXJlIiwiZ2V0RGV2aWNlIiwiZGV2aWNlUHJpbnRlciIsImZpbmRQcmludGVyIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImRldmljZVByaW50ZXJEZXNjIiwidmlkIiwicGlkIiwiZGV2aWNlIiwicHJpbnRUaWNrZXQiLCJub21icmVfY2xpZW50ZSIsImFycl9ub3RhcyIsInByZWNpb19jdWVudGFfdG90YWwiLCJvcHRpb25zIiwiZW5jb2RpbmciLCJ3aWR0aCIsInByaW50ZXIiLCJQcmludGVyIiwibG9nbyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJJbWFnZSIsImxvYWQiLCJpbWFnZSIsIm9wZW4iLCJzZXRDaGFyYWN0ZXJDb2RlVGFibGUiLCJhbGlnbiIsInRoZW4iLCJmb250Iiwic2l6ZSIsInRleHQiLCJfZm9yRWFjaEluc3RhbmNlUHJvcGVydHkiLCJjYWxsIiwibm90YSIsIl9jb250ZXh0Iiwic3R5bGUiLCJ0ZXh0X251bV9ub3RhIiwiZmVjaGFfcmVnaXN0cm8iLCJwcmVjaW9fdG90YWwiLCJ0YWJsZUN1c3RvbSIsInByZW5kYXMiLCJyb3dfcHJlbmRhIiwiZHJhd0xpbmUiLCJTdHJpbmciLCJmZWVkIiwiY3V0IiwiY2xvc2UiLCJEYXRhYmFzZSIsImRiUGF0aCIsImRiIiwidmVyYm9zZSIsInByYWdtYSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcHAiLCJCcm93c2VyV2luZG93IiwiaXBjTWFpbiIsIk5vdGlmaWNhdGlvbiIsImNyeXB0byIsImRibWdyIiwid2luIiwid2lubG9naW4iLCJ3aGVuUmVhZHkiLCJjcmVhdGVXaW5kb3ciLCJpc1Byb2QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJmdWxsc2NyZWVuIiwibWF4aW1pemUiLCJ0aXRsZUJhclN0eWxlIiwidGl0bGVCYXJPdmVybGF5Iiwid2ViUHJlZmVyZW5jZXMiLCJkZXZUb29scyIsInByZWxvYWQiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsImxvYWRVUkwiLCJwb3J0IiwiYXJndiIsImxvZ2luV2luZG93IiwiaGVpZ2h0Iiwib24iLCJwbGF0Zm9ybSIsInF1aXQiLCJnZXRBbGxXaW5kb3dzIiwiaGFuZGxlIiwiZXZlbnQiLCJvYmoiLCJ2YWxpZGF0ZWxvZ2luIiwiaGFuZGxlU3VjdXJzYWxHZXRMaXN0IiwiaGFuZGxlU3VjdXJzYWxHZXRMaXN0UHJlY2lvcyIsImhhbmRsZVN1Y3Vyc2FsVXBkYXRlTGlzdFByZWNpb3MiLCJoYW5kbGVyU2F2ZVByZW5kYVByZWNpbyIsImhhbmRsZXJEZWxldGVQcmVuZGEiLCJoYW5kbGVyVXBkYXRlUHJlbmRhIiwiaGFuZGxlclNhdmVOb3RhIiwiaGFuZGxlckdldExpc3ROb3RhcyIsImhhbmRsZXJQcmludFRpY2tldCIsImhhbmRsZXJEZWxldGVOb3RhIiwiZW1haWwiLCJwYXNzd29yZCIsInNxbCIsInJvdyIsInByZXBhcmUiLCJnZXQiLCJoYXNoIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCIsInNob3ciLCJzZW5kIiwiZGF0YSIsImFsbCIsInN1Y3Vyc2FsX2lkIiwicmVnaXN0cmFkbyIsImxpc3RfcHJlY2lvcyIsIm9ial9wcmVjaW8iLCJpZF9wcmVuZGEiLCJpZF9zdWN1cnNhbCIsInByZWNpbyIsInF1ZXJ5VXBkYXRlIiwicmVzdWx0VXBkIiwicnVuIiwicXVlcnlJbnNlcnROZXciLCJyZXN1bHRJbiIsInF1ZXJ5SW5zZXJ0IiwicmVzdWx0IiwiZGF0YVByZW5kYSIsInF1ZXJ5SW5zZXJ0TmV3UHJlbmRhIiwicmVzdWx0SW5QcmVuZGEiLCJsYXN0SW5zZXJ0Um93aWQiLCJxdWVyeUluc2VydE5ld0xQIiwicmVzdWx0SW5MUCIsInVuZGVmaW5lZCIsIkVycm9yIiwicXVlcnlEZWxldGVMUCIsInJlc3VsdERlbGV0ZUxQIiwicXVlcnlEZWxldGVQcmVuZGEiLCJyZXN1bHREZWxldGVQcmVuZGEiLCJlcnJvciIsIm5vbWJyZSIsInRpcG9fc2VydmljaW8iLCJxdWVyeVVwZGF0ZVByZW5kYSIsInJlc3VsdFVwZGF0ZVByZW5kYSIsImRhdGFOb3RhIiwibnVtX25vdGEiLCJjbGllbnRlIiwiZmVjaGFfcmVjZXBjaW9uIiwiZmVjaGFfZW50cmVnYSIsIm51bV9ub3RhX2ludCIsIl9wYXJzZUludCIsImlkX3N1Y3Vyc2FsX2ludCIsIkZFX2RpYSIsImdldERhdGUiLCJGRV9tZXMiLCJnZXRNb250aCIsIkZFX2FuaW8iLCJnZXRGdWxsWWVhciIsIkZFX2RhdGUiLCJGUl9kaWEiLCJGUl9tZXMiLCJGUl9hbmlvIiwiRlJfZGF0ZSIsImNsaWVudGVfaWQiLCJCb29sZWFuIiwicXVlcnlJbnNlcnRDbGllbnRlIiwiY2xpZW50ZV9pbmZvIiwicXVlcnlHZXRDbGllbnRlIiwicmVnX3ByZW5kYXMiLCJwcmVjaW9Ub3RhbCIsInByZW5kYV9vYmoiLCJwcmVuZGFfaWQiLCJpc19jb21vZGluIiwicXVlcnlJbnNlcnRQcmVuZGFDb21vZGluIiwicHJlbmRhX2NvbW9kaW5fcmVzIiwibnVtX3ByZW5kYXMiLCJxdWVyeUdldExpc3Rhc1ByZWNpb3NJZCIsImxpc3Rhc19wcmVjaW9zX3JlcyIsImxpc3Rhc19wcmVjaW9zX2lkIiwiaW5kZXgiLCJjb2xvcmVzIiwicHVzaCIsImxhc3RfaWQiLCJxdWVyeUluc2VydE5ld05vdGEiLCJyZXNQcmVuZGEiLCJub3RhX2lkIiwicHJlbmRhIiwicXVlcnlJbnNlcnROb3RhUm9wYSIsInByZW5kYV9saXN0YXNfcHJlY2lvc19pZCIsImNvbG9yIiwiY2xpZW50ZV9uYW1lIiwiZmVjaGFfZGVzZGUiLCJmZWNoYV9oYXN0YSIsImJpbmRQYXJhbWV0ZXJzIiwidG9Mb3dlckNhc2UiLCJGZWNoYV9kZXNkZV9kaWEiLCJzcGxpdCIsIkZlY2hhX2Rlc2RlX21lcyIsIkZlY2hhX2Rlc2RlX2FuaW8iLCJGZWNoYV9kZXNkZV9kYXRlIiwiRmVjaGFfaGFzdGFfZGlhIiwiX3BhZFN0YXJ0SW5zdGFuY2VQcm9wZXJ0eSIsInRvU3RyaW5nIiwiRmVjaGFfaGFzdGFfbWVzIiwiRmVjaGFfaGFzdGFfYW5pbyIsIkZlY2hhX2hhc3RhX2RhdGUiLCJkX25vdGFzIiwibmFtZV9wcmVuZGEiLCJuYW1lX3NlcnZpY2UiLCJub21icmVfcHJlbmRhIiwibm9tYnJlX3N1Y3Vyc2FsIiwiZ2V0X3ByZW5kYXNfY3VlbnRhIiwicHJlbmRhc19jdWVudGEiLCJkYXRhTm90YXMiLCJfY29udGV4dDIiLCJub3RhcyIsIl9PYmplY3QkZW50cmllcyIsIm5vdGFfb2JqIiwiX2NvbnRleHQzIiwibm90YV9kZXNjIiwiX3BhcnNlRmxvYXQiLCJkZWxldGVOb3RhUm9wYSIsImRlbGV0ZU5vdGEiLCJyZXMiXSwic291cmNlUm9vdCI6IiJ9