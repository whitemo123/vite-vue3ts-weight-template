/// <reference types="vite/client" />
// 异步发送
interface ISendFunc {
  (channel: string, arg?: any): void;
}

// 同步发送并接受结果
interface ISendSyncFunc {
  (channel: string, arg?: any): any;
}
// 监听数据
interface IOn {
  (channel: string, arg?: (event?: any, arg?: any) => void): void;
}

interface IIpc {
  // 发送指令
  send: ISendFunc;
  // 发送指令并等待指令结果
  sendSync: ISendSyncFunc;
  // windows端监听数据结果
  on: IOn;
}

// 全局对象补充
declare interface Window {
  androidIpcRenderer: IIpc;
  ipcRenderer: IIpc;
  scaleData: any;
  androidError: any;
  secChange: any;
  onHidPosMessage: any;
  onNetworkSpeed: any;
}
