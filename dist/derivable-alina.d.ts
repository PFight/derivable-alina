declare module "Main" {
    import * as Alina from "alina";
    import * as DA from "derivable-alina";
    import * as D from "derivable";
    export type Alina = Alina.Alina & DA.DerivableExtensions;
    export class AlinaComponent<ContextT extends Alina = Alina> extends Alina.AlinaComponent<ContextT> {
        $initialized: D.Atom<boolean>;
        $disposed: D.Atom<boolean>;
        protected onInit(): void;
        protected onDispose(): void;
    }
    export type FuncAlinaComponent<PropsT, RetT> = Alina.FuncComponent<Alina, PropsT, RetT>;
    export var Document: Alina;
}
declare module "DRepeat" {
    import * as Alina from "alina";
    import * as D from "derivable";
    import * as DA from "derivable-alina";
    export class DRepeat extends DA.AlinaComponent {
        repeat<T>(items: T[] | D.Derivable<T[]>, update: (renderer: Alina.Alina, model: T) => void, options?: Alina.RepeatExtraOptions<T>): void;
        repeatEx<T>(items: T[] | D.Derivable<T[]>, context: Alina.AlRepeatContext<T>): void;
    }
}
declare module "DSet" {
    import * as D from "derivable";
    import * as DA from "derivable-alina";
    export class DSet extends DA.AlinaComponent {
        setEntry<T>(value: T | D.Derivable<T>): void;
        setEntryOnce<T>(value: T | D.Derivable<T>): void;
    }
}
declare module "DShow" {
    import * as D from "derivable";
    import * as DA from "derivable-alina";
    export class DShow extends DA.AlinaComponent {
        showIf(value: boolean | D.Derivable<boolean>): void;
    }
}
declare module "DerivableExtensions" {
    import * as Alina from "alina";
    import * as D from "derivable";
    export interface DerivableExtensions {
        set<T>(stub: string, value: T | D.Derivable<T>): void;
        setOnce<T>(stub: string, value: T | D.Derivable<T>): void;
        showIf(templateSelector: string, value: boolean | D.Derivable<boolean>): void;
        repeat<T>(templateSelector: string, items: T[] | D.Derivable<T[]>, update: (renderer: this, model: T) => void): void;
        on<T>(value: T | D.Derivable<T>, callback: (renderer: this, value?: T, prevValue?: T) => T | void, key?: string): void;
    }
    export function DerivableExt<T extends Alina.Alina>(renderer: T): T & DerivableExtensions;
}
declare module "derivable-alina" {
    export * from "Main";
    export * from "DRepeat";
    export * from "DSet";
    export * from "DShow";
    export * from "DerivableExtensions";
}
