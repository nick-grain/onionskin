# onionskin

Overlay a pasted image on your screen at 50% opacity. For visual comparison of UI against a reference.

## Run

```
npm install
npm start
```

## Use

1. Copy an image (for example, a screenshot).
2. Click the window.
3. Press ⌘V. The window resizes to the image and shows it at 50% opacity.
4. Drag the image to position it.

Retina screenshots display at 1:1 screen scale.

## Keys

| Key | Action |
|-----|--------|
| ⌘V | Paste image |
| Arrows | Nudge window 1px |
| Shift+Arrows | Nudge window 10px |
| `=` / `+` | Increase opacity 10% |
| `-` / `_` | Decrease opacity 10% |
| ⌘`+` | Zoom in 10% |
| ⌘`-` | Zoom out 10% |
| ⌘`0` | Reset zoom |
| Esc / Delete | Clear image |
| ⌘Q | Quit |

Opacity can also be set from the Opacity menu.
