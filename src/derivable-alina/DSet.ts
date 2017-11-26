import * as Alina from "alina-std";
import * as D from "derivable";
import * as DA from "../derivable-alina";

export class DSet extends DA.AlinaComponent {
  setEntry<T>(value: T | D.Derivable<T>) {
    if (D.isDerivable(value)) {
      this.root.once(() =>
        (value as D.Derivable<T>).react((val) => {
          this.root.mount(Alina.AlSet).setEntry(val);
        }, { from: this.$initialized, until: this.$disposed })
      );
    } else {
      this.root.mount(Alina.AlSet).setEntry(value as T);
    }
  }

  setEntryOnce<T>(value: T | D.Derivable<T>) {
    if (D.isDerivable(value)) {
      this.root.once(() =>
        (value as D.Derivable<T>).react((val) => {
          this.root.mount(Alina.AlSet).setEntryOnce(val);
        }, { from: this.$initialized, until: this.$disposed })
      );
    } else {
      this.root.mount(Alina.AlSet).setEntryOnce(value as T);
    }
  }
}