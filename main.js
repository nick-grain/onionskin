const { app, BrowserWindow, ipcMain, Menu } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 400,
    height: 100,
    transparent: true,
    alwaysOnTop: true,
    frame: false,
    hasShadow: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  win.loadFile('index.html');

  const menu = Menu.buildFromTemplate([
    { role: 'appMenu' },
    { role: 'editMenu' },
    {
      label: 'Opacity',
      submenu: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((p) => ({
        id: `opacity-${p}`,
        label: `${p}%`,
        type: 'radio',
        checked: p === 50,
        click: () => setOpacity(p / 100),
      })),
    },
  ]);
  Menu.setApplicationMenu(menu);

  let opacity = 0.5;
  const setOpacity = (v) => {
    opacity = Math.min(1, Math.max(0.1, Math.round(v * 10) / 10));
    win.webContents.send('opacity', opacity);
    menu.getMenuItemById(`opacity-${Math.round(opacity * 100)}`).checked = true;
  };

  ipcMain.on('opacity-step', (_e, dir) => setOpacity(opacity + dir * 0.1));
  ipcMain.on('resize', (_e, w, h) => win.setContentSize(w, h));
  ipcMain.on('nudge', (_e, dx, dy) => {
    const [x, y] = win.getPosition();
    win.setPosition(x + dx, y + dy);
  });
});
