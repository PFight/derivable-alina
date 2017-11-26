import * as Alina from "alina";
import * as DA from "./derivable-alina";
import * as D from "derivable";

export type Alina = Alina.Alina & DA.DerivableExtensions;
export class AlinaComponent<ContextT extends Alina = Alina> extends Alina.AlinaComponent<ContextT> {
  $initialized = D.atom(false);
  $disposed = D.atom(false);

  protected onInit() {
    this.$initialized.set(true);
  }

  protected onDispose() {
    this.$initialized.set(false);
    this.$disposed.set(true);
  }
};
export type FuncAlinaComponent<PropsT, RetT> = Alina.FuncComponent<Alina, PropsT, RetT>;

export var Document: Alina = Alina.Document && Alina.Document.ext(DA.DerivableExt);