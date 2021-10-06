module Program

open TestFramework

Browser.Dom.console.log("Running tests")

let main() = runTests [
        Tests.tests
        ]

main()