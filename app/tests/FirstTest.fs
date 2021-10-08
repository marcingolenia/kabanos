module Tests

open Expect
open Expect.Dom
open Sutil
open WebTestRunner

describe "Testing!" <| fun () ->
    it "whatever works" <| fun () -> promise {
        use container = Container.New()
        container.El.innerHTML <- "whatever works."
        container.El |> Expect.innerText "whatever works."
    }
    
    it "element renders" <| fun () -> promise {
        use container = Container.New()
        DOM.mountOn (App.app()) container.El |> ignore
        container.El |> Expect.innerText "Hello World from sutil."
    }