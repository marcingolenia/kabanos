module App

open Sutil

let app() =
    Html.div "Hello World from sutil"

app() |> Program.mountElement "sutil-app"