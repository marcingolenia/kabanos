module App

open Sutil

let app() =
    Html.div "Hello World"

app() |> Program.mountElement "sutil-app"