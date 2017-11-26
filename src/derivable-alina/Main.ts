import * as Al from "alina-std";
import * as DA from "../derivable-alina";
import * as D from "derivable";
import { FuncComponent } from "alina-core"; 

export type Alina = Al.Alina & DA.DerivableExtensions;
export class AlinaComponent<ContextT extends Alina = Alina> extends Al.AlinaComponent<ContextT> {
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
export type FuncAlinaComponent<PropsT, RetT> = FuncComponent<Alina, PropsT, RetT>;

export var Document: Alina = Al.Document && Al.Document.ext(DA.DerivableExt);