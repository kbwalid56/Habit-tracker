
const { contextBridge } = require('electron');

// Send application information to renderer
contextBridge.exposeInMainWorld('appInfo', {
    name: 'Habit Tracker'
});
