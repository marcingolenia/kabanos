import { Union, Record } from "../.fable/fable-library.3.2.9/Types.js";
import { union_type, record_type, list_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { empty, singleton, append, ofArray } from "../.fable/fable-library.3.2.9/List.js";
import { text, fragment } from "../.fable/Sutil.1.0.0-beta-012/DOM.fs.js";
import { HtmlEngine$1__button_BB573A, HtmlEngine$1__h1_Z721C83C5, HtmlEngine$1__div_BB573A } from "../.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { Css, Html } from "../.fable/Sutil.1.0.0-beta-012/Html.fs.js";
import { rule } from "../.fable/Sutil.1.0.0-beta-012/Styling.fs.js";
import { CssEngine$1__get_textTransformCapitalize, CssEngine$1__color_Z721C83C5 } from "../.fable/Feliz.Engine.1.0.0-beta-004/CssEngine.fs.js";
import { Store_makeElmishSimple } from "../.fable/Sutil.1.0.0-beta-012/Store.fs.js";
import { bindFragment } from "../.fable/Sutil.1.0.0-beta-012/Bindings.fs.js";
import { interpolate, toText } from "../.fable/fable-library.3.2.9/String.js";
import { onClick, class$0027 } from "../.fable/Sutil.1.0.0-beta-012/Attr.fs.js";

export class Model extends Record {
    constructor(Columns) {
        super();
        this.Columns = Columns;
    }
}

export function Model$reflection() {
    return record_type("Board.Model", [], Model, () => [["Columns", list_type(string_type)]]);
}

export function init() {
    return new Model(ofArray(["Queue", "In progress", "Done"]));
}

export class Message extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["RenameColumn", "RemoveColumn", "AddColumn"];
    }
}

export function Message$reflection() {
    return union_type("Board.Message", [], Message, () => [[["Item1", string_type], ["Item2", string_type]], [["Item", string_type]], [["Item", string_type]]]);
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            return model;
        }
        case 2: {
            return new Model(append(model.Columns, singleton(msg.fields[0])));
        }
        default: {
            return model;
        }
    }
}

export const fag = fragment([HtmlEngine$1__div_BB573A(Html, [])]);

export const css = singleton(rule("div", ofArray([CssEngine$1__color_Z721C83C5(Css, "red"), CssEngine$1__get_textTransformCapitalize(Css)])));

export function view() {
    const patternInput = Store_makeElmishSimple(init, (msg, model) => update(msg, model), (value) => {
    })();
    return HtmlEngine$1__div_BB573A(Html, [bindFragment()(patternInput[0])((model_2) => HtmlEngine$1__h1_Z721C83C5(Html, toText(interpolate("The value is %P()", [model_2])))), HtmlEngine$1__button_BB573A(Html, [class$0027("block"), onClick((_arg1) => {
        patternInput[1](new Message(2, "Test"));
    }, empty()), text("add")])]);
}

