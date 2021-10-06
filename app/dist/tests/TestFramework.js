import { int32_type, float64_type, list_type, record_type, lambda_type, unit_type, string_type, class_type } from "./.fable/fable-library.3.2.9/Reflection.js";
import { printf, interpolate, toText } from "./.fable/fable-library.3.2.9/String.js";
import { getEnumerator, int32ToString, equals } from "./.fable/fable-library.3.2.9/Util.js";
import { Record } from "./.fable/fable-library.3.2.9/Types.js";
import { some } from "./.fable/fable-library.3.2.9/Option.js";
import { toNumber } from "./.fable/fable-library.3.2.9/Long.js";
import { getTicks, now } from "./.fable/fable-library.3.2.9/Date.js";
import { mountElement } from "./.fable/Sutil.1.0.0-beta-011/Program.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./.fable/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "./.fable/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { zip, length, empty, head, tail, isEmpty } from "./.fable/fable-library.3.2.9/List.js";

export const testAppId = "test-app";

export class Expect {
    constructor() {
    }
}

export function Expect$reflection() {
    return class_type("TestFramework.Expect", void 0, Expect);
}

export function Expect_assertTrue(cond, message) {
    if (!cond) {
        throw (new Error(message));
    }
}

export function Expect_areEqual_7BAE419B(actual, expected, message) {
    const arg10 = toText(interpolate("%P(): areEqual: expected: \u0027%P()\u0027 actual: \u0027%P()\u0027", [message, expected, actual]));
    Expect_assertTrue(equals(expected, actual), arg10);
}

export function Expect_areEqual_5CCC09A0(actual, expected) {
    Expect_areEqual_7BAE419B(actual, expected, "");
}

export function Expect_notNull_4E60E31B(actual) {
    Expect_assertTrue(!(actual == null), "notNull: actual: \u0027{obj}\u0027");
}

export function Expect_queryText(query, expected) {
    const el = document.querySelector((("#" + testAppId) + "\u003e") + query);
    Expect_assertTrue(!(el == null), "queryText: Query failed: " + query);
    Expect_areEqual_7BAE419B(el.innerText, expected, "queryText");
}

export function Expect_queryNumChildren(query, expected) {
    const el = document.querySelector((("#" + testAppId) + "\u003e") + query);
    Expect_assertTrue(!(el == null), "queryText: Query failed: " + query);
    Expect_areEqual_7BAE419B(el.children.length, expected, "queryNumChildren");
}

export class TestCase extends Record {
    constructor(Name, Test) {
        super();
        this.Name = Name;
        this.Test = Test;
    }
}

export function TestCase$reflection() {
    return record_type("TestFramework.TestCase", [], TestCase, () => [["Name", string_type], ["Test", lambda_type(unit_type, class_type("Fable.Core.JS.Promise`1", [unit_type]))]]);
}

export class TestSuite extends Record {
    constructor(Name, Tests) {
        super();
        this.Name = Name;
        this.Tests = Tests;
    }
}

export function TestSuite$reflection() {
    return record_type("TestFramework.TestSuite", [], TestSuite, () => [["Name", string_type], ["Tests", list_type(TestCase$reflection())]]);
}

export function logC(s) {
    console.log(some(s));
}

export function log(category, s) {
    logC(s);
    const logE_1 = document.querySelector("#test-log");
    if (!(logE_1 == null)) {
        const span = document.createElement("span");
        span.classList.add(category);
        const t = document.createTextNode(s + "\n");
        void span.appendChild(t);
        void logE_1.appendChild(span);
    }
}

export function timeNow() {
    let copyOfStruct;
    return toNumber((copyOfStruct = now(), getTicks(copyOfStruct))) / 10000000;
}

export function timestamp(t) {
    return toText(printf("%0.3f"))(t);
}

export function logS(s) {
    log("success", s);
}

export function logE(s) {
    log("failure", s);
}

export function logH(s) {
    log("heading", s);
}

export function logI(s) {
    log("info", s);
}

function rafu(f) {
    void window.requestAnimationFrame((_arg1) => {
        f();
    });
}

export function waitAnimationFrame() {
    return new Promise(((accept, _arg1) => {
        rafu(() => {
            accept();
        });
    }));
}

export function mountTestApp(app) {
    const el = document.querySelector("#" + testAppId);
    el.innerHTML = "";
    mountElement(testAppId, app);
}

export function testCase(name, f) {
    return new TestCase(name, () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        f();
        return Promise.resolve();
    })));
}

export function testCaseP(name, f) {
    return new TestCase(name, f);
}

export function testList(name, tests) {
    return new TestSuite(name, tests);
}

export class TestContext extends Record {
    constructor(StartTime, NumFail, NumPass, TestSuites, TestCases) {
        super();
        this.StartTime = StartTime;
        this.NumFail = (NumFail | 0);
        this.NumPass = (NumPass | 0);
        this.TestSuites = TestSuites;
        this.TestCases = TestCases;
    }
}

export function TestContext$reflection() {
    return record_type("TestFramework.TestContext", [], TestContext, () => [["StartTime", float64_type], ["NumFail", int32_type], ["NumPass", int32_type], ["TestSuites", list_type(TestSuite$reflection())], ["TestCases", list_type(TestCase$reflection())]]);
}

export function nextTestCase(testCtx) {
    rafu(() => {
        nextTestCaseNow(testCtx);
    });
}

export function nextTestCaseNow(testCtx) {
    let pr_1, pr;
    const matchValue = testCtx.TestCases;
    if (!isEmpty(matchValue)) {
        const tests = tail(matchValue);
        const test = head(matchValue);
        void ((pr_1 = ((pr = test.Test(), pr.then((() => {
            logS((toText(interpolate("%P(): ", [timestamp(timeNow() - testCtx.StartTime)])) + test.Name) + ": PASS");
            nextTestCase(new TestContext(testCtx.StartTime, testCtx.NumFail, testCtx.NumPass + 1, testCtx.TestSuites, tests));
        })))), pr_1.then(void 0, ((x) => {
            logE(((toText(interpolate("%P(): ", [timestamp(timeNow() - testCtx.StartTime)])) + test.Name) + ": FAIL: ") + x.message);
            nextTestCase(new TestContext(testCtx.StartTime, testCtx.NumFail + 1, testCtx.NumPass, testCtx.TestSuites, tests));
        }))));
    }
    else {
        nextTestSuite(testCtx);
    }
}

export function nextTestSuite(testCtx) {
    const matchValue = testCtx.TestSuites;
    if (!isEmpty(matchValue)) {
        const suites = tail(matchValue);
        const suite = head(matchValue);
        logH(suite.Name);
        nextTestCase(new TestContext(testCtx.StartTime, testCtx.NumFail, testCtx.NumPass, suites, suite.Tests));
    }
    else {
        logH("Result");
        if (testCtx.NumFail === 0) {
            logS((toText(interpolate("%P(): SUCCESS: All tests passed (", [timestamp(timeNow() - testCtx.StartTime)])) + int32ToString(testCtx.NumPass)) + ")");
        }
        else {
            logE((((toText(interpolate("%P(): FAIL: ", [timestamp(timeNow() - testCtx.StartTime)])) + int32ToString(testCtx.NumFail)) + " failed, ") + int32ToString(testCtx.NumPass)) + " passed");
        }
    }
}

export function runTests(tests) {
    logH(toText(interpolate("Test Suite", [])));
    logI(toText(interpolate("%P(): Starting test", [timestamp(0)])));
    nextTestSuite(new TestContext(timeNow(), 0, 0, tests, empty()));
}

export function expectListEqual(expected, value) {
    Expect_areEqual_7BAE419B(length(expected), length(value), "List lengths");
    const enumerator = getEnumerator(zip(expected, value));
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const p = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            Expect_areEqual_7BAE419B(p[0], p[1], "List elements equal");
        }
    }
    finally {
        enumerator.Dispose();
    }
}

