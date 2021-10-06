import { some } from "./.fable/fable-library.3.2.9/Option.js";
import { runTests } from "./TestFramework.js";
import { tests } from "./Tests.js";
import { singleton } from "./.fable/fable-library.3.2.9/List.js";

console.log(some("Running tests"));

export function main() {
    runTests(singleton(tests));
}

main();

