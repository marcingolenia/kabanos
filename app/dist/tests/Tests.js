import { Expect_areEqual_5CCC09A0, Expect_queryText, mountTestApp, testCase, testList } from "./TestFramework.js";
import { HtmlEngine$1__div_Z721C83C5 } from "./.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { Html } from "./.fable/Sutil.1.0.0-beta-011/Html.fs.js";
import { singleton } from "./.fable/fable-library.3.2.9/List.js";

export const tests = testList("Sutil.DOM", singleton(testCase("Hello World", () => {
    const app = HtmlEngine$1__div_Z721C83C5(Html, "Hello World");
    mountTestApp(app);
    Expect_queryText("div", "Hello World");
    Expect_areEqual_5CCC09A0(1, 1);
})));

