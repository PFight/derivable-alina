import { AlEntry, AlQuery, AlRepeat, AlSet, AlShow, AlinaComponent, Document } from 'alina-std';
import { atom, isDerivable } from 'derivable';

class AlinaComponent$1 extends AlinaComponent {
    constructor() {
        super(...arguments);
        this.$initialized = atom(false);
        this.$disposed = atom(false);
    }
    onInit() {
        this.$initialized.set(true);
    }
    onDispose() {
        this.$initialized.set(false);
        this.$disposed.set(true);
    }
}

var Document$1 = Document && Document.ext(DerivableExt);

class DRepeat extends AlinaComponent$1 {
    repeat(items, update, options) {
        if (isDerivable(items)) {
            this.root.once(() => {
                items.react((values) => {
                    this.root.mount(AlRepeat).repeat(values, update, options);
                }, { from: this.$initialized, until: this.$disposed });
            });
        }
        else {
            this.root.mount(AlRepeat).repeat(items, update, options);
        }
    }
    repeatEx(items, context) {
        if (isDerivable(items)) {
            this.root.once(() => {
                items.react((values) => {
                    this.root.mount(AlRepeat).repeatEx(values, context);
                }, { from: this.$initialized, until: this.$disposed });
            });
        }
        else {
            this.root.mount(AlRepeat).repeatEx(items, context);
        }
    }
}

class DSet extends AlinaComponent$1 {
    setEntry(value) {
        if (isDerivable(value)) {
            this.root.once(() => value.react((val) => {
                this.root.mount(AlSet).setEntry(val);
            }, { from: this.$initialized, until: this.$disposed }));
        }
        else {
            this.root.mount(AlSet).setEntry(value);
        }
    }
    setEntryOnce(value) {
        if (isDerivable(value)) {
            this.root.once(() => value.react((val) => {
                this.root.mount(AlSet).setEntryOnce(val);
            }, { from: this.$initialized, until: this.$disposed }));
        }
        else {
            this.root.mount(AlSet).setEntryOnce(value);
        }
    }
}

class DShow extends AlinaComponent$1 {
    showIf(value) {
        if (isDerivable(value)) {
            this.root.once(() => value.react((val) => {
                this.root.mount(AlShow).showIf(val);
            }, { from: this.$initialized, until: this.$disposed }));
        }
        else {
            this.root.mount(AlShow).showIf(value);
        }
    }
}

function DerivableExt(renderer) {
    let result = renderer;
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
    if (isDerivable(value)) {
        this.getComponentContext(on, key, () => {
            let $disposed = atom(false);
            this.addDisposeListener(() => $disposed.set(true));
            value.react((val) => {
                standardOn.call(this, val, callback);
            }, { until: $disposed });
        });
    }
    else {
        standardOn.call(this, value, callback);
    }
}
function set(stub, value) {
    this.mount(AlEntry).getEntries(stub, (context) => {
        context.mount(DSet).setEntry(value);
    });
}
function setOnce(stub, value) {
    this.mount(AlEntry).getEntries(stub, (context) => {
        context.mount(DSet).setEntryOnce(value);
    });
}
function repeat(templateSelector, items, update) {
    this.mount(AlQuery).query(templateSelector)
        .mount(DRepeat).repeat(items, update);
}
function showIf(templateSelector, value) {
    this.mount(AlQuery).query(templateSelector)
        .mount(DShow).showIf(value);
}

export { AlinaComponent$1 as AlinaComponent, Document$1 as Document, DRepeat, DSet, DShow, DerivableExt };
