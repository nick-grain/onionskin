# onionskin

Overlay a pasted image on your screen at 50% opacity. For visual comparison of UI against a reference.

## Run

```
npm install
npm start
```

## Run at login (macOS)

```
./install-login-item.sh
```

Installs a launch agent (`com.onionskin.agent`) that starts the app at login and
leaves it resident, so the hotkey shows the window instead of cold-starting it.
Logs go to `/tmp/com.onionskin.agent.log`. To remove:

```
./install-login-item.sh --uninstall
```

## Use

The app runs in the background with a menu bar icon.

1. Press ⌃⇧⌘Space to show the window.
2. Copy an image (for example, a screenshot).
3. Click the window.
4. Press ⌘V. The window resizes to the image and shows it at 50% opacity.
5. Drag the image to position it.

Press ⌃⇧⌘Space again to hide it. The image and position are kept, so the next
show brings back what you left.

Retina screenshots display at 1:1 screen scale.

If you remap modifiers (Karabiner and friends), the hotkey is matched against
what the OS receives, not the keycaps you press.

The menu bar icon has Show/Hide and Quit. Closing the window only hides it.

## Keys

| Key | Action |
|-----|--------|
| ⌃⇧⌘Space | Show/hide the window (global) |
| ⌘V | Paste image |
| Arrows | Nudge window 1px |
| Shift+Arrows | Nudge window 10px |
| `=` / `+` | Increase opacity 10% |
| `-` / `_` | Decrease opacity 10% |
| ⌘`+` | Zoom in 10% |
| ⌘`-` | Zoom out 10% |
| ⌘`0` | Reset zoom |
| Esc / Delete | Clear image |
| Esc (no image) | Hide the window |
| ⌘Z | Undo |
| ⌘⇧Z / Ctrl+Y | Redo |
| ⌘Q | Quit |

Opacity can also be set from the Opacity menu.
