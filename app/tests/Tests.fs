module Tests

open TestFramework
open Sutil

let tests = testList "Sutil.DOM" [

    // Simplest case
    testCase "Hello World" <| fun () ->
        let app =
            Html.div "Hello World"

        mountTestApp app

        Expect.queryText "div" "Hello World"
        Expect.areEqual(1, 1)
]