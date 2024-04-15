const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const fs = require('fs');
const {session} = require("electron");


function createWindow () {
        const win = new BrowserWindow({
            show: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        win.maximize();
        win.show()
        win.loadFile('Main.html')

}

// 获取extension目录的完整路径
const extensionDir = path.join(__dirname, 'extension');
let directories = [];
// 读取目录中的所有文件和文件夹
fs.readdir(extensionDir, (err, files) => {
    if (err) {
        console.error(`读取目录时出错: ${err}`);
        return;
    }
    // 过滤出目录
    directories = files.filter(file => fs.statSync(path.join(extensionDir, file)).isDirectory());
    console.log(directories); // 输出所有文件夹名
});

app.whenReady().then(async () => {
     for(let directory of directories) {
       await session.defaultSession.loadExtension(
            path.join(__dirname, 'extension', directory),
            { allowFileAccess: true }
        )
    }}
    )
    // Note that in order to use the React DevTools extension, you'll need to
    // download and unzip a copy of the extension.

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})