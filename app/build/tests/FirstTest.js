import { Expect_innerText, Expect_Dom_Container__Container_New_Static_2297AD2E } from "./.fable/Fable.Expect.1.1.0/Expect.Dom.fs.js";
import { mountOn } from "./.fable/Sutil.1.0.0-beta-011/DOM.fs.js";
import { PromiseBuilder__Using_74F7E79D, PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./.fable/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "./.fable/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { app } from "./src/App.js";

export function render(_component) {
    const container = Expect_Dom_Container__Container_New_Static_2297AD2E();
    void mountOn(_component, container.El);
    return container;
}

describe("Testing!", () => {
    it("whatever works", () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => PromiseBuilder__Using_74F7E79D(promise, Expect_Dom_Container__Container_New_Static_2297AD2E(), (_arg1) => {
        const container = _arg1;
        container.El.innerHTML = "whatever works.";
        Expect_innerText("whatever works.", container.El);
        return Promise.resolve();
    }))));
    it("element renders", () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => PromiseBuilder__Using_74F7E79D(promise, render(app), (_arg2) => {
        Expect_innerText("Hello World from sutil.", _arg2.El);
        return Promise.resolve();
    }))));
});

