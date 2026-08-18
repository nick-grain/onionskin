const { app, BrowserWindow, ipcMain, Menu } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 400,
    height: 100,
    transparent: true,
    alwaysOnTop: true,
    frame: false,
    resizable: false,
    hasShadow: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  win.loadFile('index.html');

  const menu = Menu.buildFromTemplate([
    { role: 'appMenu' },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', click: () => win.webContents.send('undo') },
        { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', click: () => win.webContents.send('redo') },
        { type: 'separator' },
        { role: 'paste' },
      ],
    },
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

  win.on('move', () => win.webContents.send('pos', ...win.getPosition()));

  ipcMain.on('get-pos', (e) => { e.returnValue = win.getPosition(); });
  ipcMain.on('set-pos', (_e, x, y) => win.setPosition(x, y));
  ipcMain.on('opacity-step', (_e, dir) => setOpacity(opacity + dir * 0.1));
  ipcMain.on('opacity-set', (_e, v) => setOpacity(v));
  ipcMain.on('resize', (_e, w, h) => win.setContentSize(w, h));
  ipcMain.on('nudge', (_e, dx, dy) => {
    const [x, y] = win.getPosition();
    win.setPosition(x + dx, y + dy);
  });
});
