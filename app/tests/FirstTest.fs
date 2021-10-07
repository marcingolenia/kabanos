module Tests

open Expect
open Expect.Dom
open Sutil
open Browser
open WebTestRunner

let createContainer (tagName: string) =
    let el = document.createElement(tagName)
    document.body.appendChild(el) |> ignore
    { new Container with
        member _.El = el
        member _.Dispose() = document.body.removeChild(el) |> ignore }

describe "LitElement" <| fun () ->
    it "whatever works" <| fun () -> promise {
        use container = Container.New()
        container.El.innerHTML <- "whatever works."
        container.El |> Expect.innerText "whatever works."
    }
    
    it "element renders" <| fun () -> promise {
        use container = createContainer("""<div id="sutil-app"></div>""")
        // Program.mountElement "sutil-app" App.app
        Program.mountElementOnDocument container.El.ownerDocument "sutil-app" App.app
        container.El |> Expect.innerText "Hello World from sutil."
    }