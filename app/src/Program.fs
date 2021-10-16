module Program

open Sutil
open Sutil.Styling

let css_reset = [
    rule "body" [
        Css.margin 0
    ]
]
App.app |> withStyle css_reset |> Program.mountElement "sutil-app" 
