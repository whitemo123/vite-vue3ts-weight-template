const ipc = window.androidIpcRenderer || window.ipcRenderer;
/**
 * 存储数据
 * @param key
 * @param value
 */
const setData = (key: string, value: any, mode: boolean = true): void => {
  const param = window.androidIpcRenderer
    ? JSON.stringify({ key, value })
    : { key, value };
  if (mode) {
    ipc?.send("setItem", param);
  } else {
    ipc?.send("setItemSemi", param);
  }
};

/**
 * 获取数据
 * @param key
 */
const getData = (key: string) => {
  return ipc?.sendSync("getItem", key);
};

/**
 * 删除数据
 * @param key
 */
const delData = (key: string) => {
  ipc.send("deleteItem", key);
};

export default {
  setData,
  getData,
  delData,
};
