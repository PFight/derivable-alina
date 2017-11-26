import * as Alina from "alina-std";
import * as D from "derivable";
import * as DA from "../derivable-alina";

export interface DerivableExtensions {
  set<T>(stub: string, value: T | D.Derivable<T>): void;
  setOnce<T>(stub: string, value: T | D.Derivable<T>): void;
  showIf(templateSelector: string, value: boolean | D.Derivable<boolean>): void;
  repeat<T>(templateSelector: string, items: T[] | D.Derivable<T[]>, update: (renderer: this, model: T) => void): void;
  on<T>(value: T | D.Derivable<T>, callback: (renderer: this, value?: T, prevValue?: T) => T | void, key?: string): void;
}

export function DerivableExt<T extends Alina.Alina>(renderer: T): T & DerivableExtensions {
  let result = renderer as T & DerivableExtensions;
  result.set = set;
  result.setOnce = setOnce;
  result.showIf = showIf;
  result.repeat = repeat;
  standardOn = result.on;
  result.on = on;
  return result;
}

var standardOn: Function;

function on<T>(this: Alina.Alina, value: T | D.Derivable<T>, callback: (renderer, value?: T, prevValue?: T) => T | void, key?: string): void {
  if (D.isDerivable(value)) {
    this.getComponentContext(on, key, () => {
      let $disposed = D.atom(false);
      this.addDisposeListener(() => $disposed.set(true));
      (value as D.Derivable<T>) .react((val) => {
        standardOn.call(this, val, callback);
      }, { until: $disposed });
    });
  } else {
    standardOn.call(this, value, callback);
  }
}

function set<T>(this: Alina.Alina, stub: string, value: T | D.Derivable<T>): void {
  this.mount(Alina.AlEntry).getEntries(stub, (context) => {
    context.mount(DA.DSet).setEntry(value);
  });
}

function setOnce<T>(this: Alina.Alina, stub: string, value: T | D.Derivable<T>): void {
  this.mount(Alina.AlEntry).getEntries(stub, (context) => {
    context.mount(DA.DSet).setEntryOnce(value);
  });
}

function repeat<T>(this: Alina.Alina, templateSelector: string, items: T[] | D.Derivable<T[]>, update: (renderer, model: T) => void): void {
  this.mount(Alina.AlQuery).query(templateSelector)
    .mount(DA.DRepeat).repeat(items, update);
}

function showIf(this: Alina.Alina, templateSelector: string, value: boolean | D.Derivable<boolean>): void {
  this.mount(Alina.AlQuery).query(templateSelector)
    .mount(DA.DShow).showIf(value);
}
