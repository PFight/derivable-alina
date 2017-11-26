import * as Alina from "alina-std";
import * as D from "derivable";
import * as DA from "../derivable-alina";

export class DRepeat extends DA.AlinaComponent {
  repeat<T>(items: T[] | D.Derivable<T[]>, update: (renderer: Alina.Alina, model: T) => void, options?: Alina.RepeatExtraOptions<T>) {
    if (D.isDerivable(items)) {
      this.root.once(() => {
        (items as D.Derivable<T[]>).react((values: T[]) => {
          this.root.mount(Alina.AlRepeat).repeat(values, update, options);
        }, { from: this.$initialized, until: this.$disposed });
      });
    } else {
      this.root.mount(Alina.AlRepeat).repeat(items as T[], update, options);
    }
  }

  repeatEx<T>(items: T[] | D.Derivable<T[]>, context: Alina.AlRepeatContext<T>) {
    if (D.isDerivable(items)) {
      this.root.once(() => {
        (items as D.Derivable<T[]>).react((values: T[]) => {
          this.root.mount(Alina.AlRepeat).repeatEx(values, context);
        }, { from: this.$initialized, until: this.$disposed });
      });
    } else {
      this.root.mount(Alina.AlRepeat).repeatEx(items as T[], context);
    }
  }
}