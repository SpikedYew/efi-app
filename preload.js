const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("Electron", {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  ping: async () => await ipcRenderer.invoke("ping"),
  markIntroSeen: (name) => ipcRenderer.send("mark-intro-seen", name),
  getUserName: async () => {
    try {
      return await ipcRenderer.invoke("get-user-name");
    } catch (error) {
      alert("Input name");
      console.error("Error fetching user name:", error);
      return "User"; // Domyślna wartość w razie błędu
    }
  },
  loadPrevious: (fileName) => ipcRenderer.send("load-file", fileName),
});
