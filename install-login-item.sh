#!/bin/bash
# Starts onionskin at login via launchd. Usage: ./install-login-item.sh [--uninstall]
set -euo pipefail

LABEL=com.onionskin.agent
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ELECTRON="$REPO/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron"

unload() { launchctl bootout "gui/$UID/$LABEL" 2>/dev/null || true; }

if [[ "${1:-}" == "--uninstall" ]]; then
  unload
  rm -f "$PLIST"
  echo "removed $LABEL"
  exit 0
fi

if [[ ! -x "$ELECTRON" ]]; then
  echo "electron not found at $ELECTRON -- run 'npm install' first" >&2
  exit 1
fi

mkdir -p "$(dirname "$PLIST")"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$ELECTRON</string>
    <string>$REPO</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>/tmp/$LABEL.log</string>
  <key>StandardErrorPath</key><string>/tmp/$LABEL.log</string>
</dict>
</plist>
EOF

unload
launchctl bootstrap "gui/$UID" "$PLIST"
echo "installed $LABEL -- logs at /tmp/$LABEL.log"
