module Tests

open Expect
open Expect.Dom
open WebTestRunner

let render _component =
    let container = Container.New()
    Sutil.DOM.mountOn _component container.El |> ignore
    container

describe "Testing!" <| fun () ->
    it "element renders" <| fun () -> promise {
        use sut = render App.app
        sut.El |> Expect.innerText "Hello World from sutil."
    }