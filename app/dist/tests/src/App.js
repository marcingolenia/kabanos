import { HtmlEngine$1__div_Z721C83C5 } from "../.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { Html } from "../.fable/Sutil.1.0.0-beta-011/Html.fs.js";
import { mountElement } from "../.fable/Sutil.1.0.0-beta-011/Program.fs.js";

export function app() {
    return HtmlEngine$1__div_Z721C83C5(Html, "Hello World");
}

mountElement("sutil-app", app());

