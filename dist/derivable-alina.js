var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('alina-std'), require('derivable')) :
        typeof define === 'function' && define.amd ? define(['exports', 'alina-std', 'derivable'], factory) :
            (factory((global.alina = {}), global.AlStd, global.derivable));
}(this, (function (exports, Alina, D) {
    'use strict';
    var AlinaComponent$1 = /** @class */ (function (_super) {
        __extends(AlinaComponent$1, _super);
        function AlinaComponent$1() {
            var _this = _super.apply(this, arguments) || this;
            _this.$initialized = D.atom(false);
            _this.$disposed = D.atom(false);
            return _this;
        }
        AlinaComponent$1.prototype.onInit = function () {
            this.$initialized.set(true);
        };
        AlinaComponent$1.prototype.onDispose = function () {
            this.$initialized.set(false);
            this.$disposed.set(true);
        };
        return AlinaComponent$1;
    }(Alina.AlinaComponent));
    var Document$1 = Alina.Document && Alina.Document.ext(DerivableExt);
    var DRepeat = /** @class */ (function (_super) {
        __extends(DRepeat, _super);
        function DRepeat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DRepeat.prototype.repeat = function (items, update, options) {
            var _this = this;
            if (D.isDerivable(items)) {
                this.root.once(function () {
                    items.react(function (values) {
                        _this.root.mount(Alina.AlRepeat).repeat(values, update, options);
                    }, { from: _this.$initialized, until: _this.$disposed });
                });
            }
            else {
                this.root.mount(Alina.AlRepeat).repeat(items, update, options);
            }
        };
        DRepeat.prototype.repeatEx = function (items, context) {
            var _this = this;
            if (D.isDerivable(items)) {
                this.root.once(function () {
                    items.react(function (values) {
                        _this.root.mount(Alina.AlRepeat).repeatEx(values, context);
                    }, { from: _this.$initialized, until: _this.$disposed });
                });
            }
            else {
                this.root.mount(Alina.AlRepeat).repeatEx(items, context);
            }
        };
        return DRepeat;
    }(AlinaComponent$1));
    var DSet = /** @class */ (function (_super) {
        __extends(DSet, _super);
        function DSet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DSet.prototype.setEntry = function (value) {
            var _this = this;
            if (D.isDerivable(value)) {
                this.root.once(function () { return value.react(function (val) {
                    _this.root.mount(Alina.AlSet).setEntry(val);
                }, { from: _this.$initialized, until: _this.$disposed }); });
            }
            else {
                this.root.mount(Alina.AlSet).setEntry(value);
            }
        };
        DSet.prototype.setEntryOnce = function (value) {
            var _this = this;
            if (D.isDerivable(value)) {
                this.root.once(function () { return value.react(function (val) {
                    _this.root.mount(Alina.AlSet).setEntryOnce(val);
                }, { from: _this.$initialized, until: _this.$disposed }); });
            }
            else {
                this.root.mount(Alina.AlSet).setEntryOnce(value);
            }
        };
        return DSet;
    }(AlinaComponent$1));
    var DShow = /** @class */ (function (_super) {
        __extends(DShow, _super);
        function DShow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DShow.prototype.showIf = function (value) {
            var _this = this;
            if (D.isDerivable(value)) {
                this.root.once(function () { return value.react(function (val) {
                    _this.root.mount(Alina.AlShow).showIf(val);
                }, { from: _this.$initialized, until: _this.$disposed }); });
            }
            else {
                this.root.mount(Alina.AlShow).showIf(value);
            }
        };
        return DShow;
    }(AlinaComponent$1));
    function DerivableExt(renderer) {
        var result = renderer;
        result.set = set;
        result.setOnce = setOnce;
        result.showIf = showIf;
        result.repeat = repeat;
        standardOn = result.on;
        result.on = on;
        return result;
    }
    var standardOn;
    function on(value, callback, key) {
        var _this = this;
        if (D.isDerivable(value)) {
            this.getComponentContext(on, key, function () {
                var $disposed = D.atom(false);
                _this.addDisposeListener(function () { return $disposed.set(true); });
                value.react(function (val) {
                    standardOn.call(_this, val, callback);
                }, { until: $disposed });
            });
        }
        else {
            standardOn.call(this, value, callback);
        }
    }
    function set(stub, value) {
        this.mount(Alina.AlEntry).getEntries(stub, function (context) {
            context.mount(DSet).setEntry(value);
        });
    }
    function setOnce(stub, value) {
        this.mount(Alina.AlEntry).getEntries(stub, function (context) {
            context.mount(DSet).setEntryOnce(value);
        });
    }
    function repeat(templateSelector, items, update) {
        this.mount(Alina.AlQuery).query(templateSelector)
            .mount(DRepeat).repeat(items, update);
    }
    function showIf(templateSelector, value) {
        this.mount(Alina.AlQuery).query(templateSelector)
            .mount(DShow).showIf(value);
    }
    exports.AlinaComponent = AlinaComponent$1;
    exports.Document = Document$1;
    exports.DRepeat = DRepeat;
    exports.DSet = DSet;
    exports.DShow = DShow;
    exports.DerivableExt = DerivableExt;
    Object.defineProperty(exports, '__esModule', { value: true });
})));
