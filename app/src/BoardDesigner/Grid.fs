module Grid

open Browser.Types
open Sutil
open Sutil.Attr
open type Feliz.length

type Position =
    { Top: int
      Left: int
      Right: int
      Bottom: int }
    static member Default =
        { Top = 0
          Left = 0
          Right = 0
          Bottom = 0 }

type Signal = { Position: Position; Name: string }

let startDrawing draw (position: IStore<Position>) (e: MouseEvent) =
    position
    <~ { Top = int e.clientY
         Left = int e.clientX
         Bottom = int e.clientY
         Right = int e.clientX }

    e.currentTarget.addEventListener ("mousemove", draw, false)

let stopDrawing draw signals (newSignal: IStore<Position>) (e: MouseEvent) =
    e.currentTarget.removeEventListener ("mousemove", draw, false)

    signals
    <~ (signals.Value
        @ [ { Name = ""
              Position = newSignal.Value } ])

    newSignal <~ Position.Default


let view () =
    let position =
        Store.make (
            { Top = 0
              Left = 0
              Right = 0
              Bottom = 0 }
        )

    let newSignal =
        Html.div [ style [ Css.positionAbsolute
                           Css.backgroundColor "black" ]
                   Bind.attr (
                       "style",
                       position
                       |> Store.map
                           (fun pos ->
                               $"top: {pos.Top}px;
                                 height: {pos.Bottom - pos.Top}px;
                                 left: {pos.Left}px;
                                 width: {pos.Right - pos.Left}px;
                                 position: absolute;
                                 background-color: white; ")
                   ) ]

    let signals = Store.make ([]: Signal list)

    let draw (e: Event) =
        let mouseEvent = e :?> MouseEvent

        position
        <~ { position.Value with
                 Right = int mouseEvent.x
                 Bottom = int mouseEvent.y }

    Html.div [ style [ Css.width (vw 100)
                       Css.height (vh 100)
                       Css.backgroundSize("cover")
                       Css.backgroundImageUrl("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Asvgjs%3D%22http%3A%2F%2Fsvgjs.com%2Fsvgjs%22%20width%3D%221440%22%20height%3D%22800%22%20preserveAspectRatio%3D%22none%22%20viewBox%3D%220%200%201440%20800%22%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%26quot%3B%23SvgjsMask1018%26quot%3B)%22%20fill%3D%22none%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%221440%22%20height%3D%22800%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22rgba(13%2C%2045%2C%2077%2C%201)%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M31%20800L831%200L1167%200L367%20800z%22%20fill%3D%22url(%23SvgjsLinearGradient1019)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M476.20000000000005%20800L1276.2%200L1835.7%200L1035.7%20800z%22%20fill%3D%22url(%23SvgjsLinearGradient1019)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1351%20800L551%200L-104.5%200L695.5%20800z%22%20fill%3D%22url(%23SvgjsLinearGradient1020)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M922.8%20800L122.79999999999995%200L-492.20000000000005%200L307.79999999999995%20800z%22%20fill%3D%22url(%23SvgjsLinearGradient1020)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M702.147644158254%20800L1440%2062.147644158254025L1440%20800z%22%20fill%3D%22url(%23SvgjsLinearGradient1019)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M0%20800L737.852355841746%20800L%200%2062.147644158254025z%22%20fill%3D%22url(%23SvgjsLinearGradient1020)%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22SvgjsMask1018%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20width%3D%221440%22%20height%3D%22800%22%20fill%3D%22%23ffffff%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3C%2Fmask%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%220%25%22%20y1%3D%22100%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%20id%3D%22SvgjsLinearGradient1019%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22rgba(15%2C%2070%2C%20185%2C%200.2)%22%20offset%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-opacity%3D%220%22%20stop-color%3D%22rgba(15%2C%2070%2C%20185%2C%200.2)%22%20offset%3D%220.66%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20x1%3D%22100%25%22%20y1%3D%22100%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%20id%3D%22SvgjsLinearGradient1020%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22rgba(15%2C%2070%2C%20185%2C%200.2)%22%20offset%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20stop-opacity%3D%220%22%20stop-color%3D%22rgba(15%2C%2070%2C%20185%2C%200.2)%22%20offset%3D%220.66%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E")
                     ]
               Html.div [                   
                   style [
                   Css.width (vw 100)
                   Css.height (vh 100)
                   Css.backgroundSize(px 50, px 50)
                   Css.positionAbsolute
                   Css.backgroundImage "linear-gradient(to bottom, white 0.1px, transparent 1px),
                                        linear-gradient(to right, white 0.1px, transparent 1px)"
                   //background-image: url("data:image/svg+xml,***<here place encoded svg>***");
               ] ]
               (onMouse "mousedown" (startDrawing draw position) [])
               (onMouse "mouseup" (stopDrawing draw signals position) [])
               newSignal
               Html.div [ Bind.each (signals, (fun signal -> Html.div "Lala")) ] ]
