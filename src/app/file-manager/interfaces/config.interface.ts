export interface ConfigInterface {
  showFilesInsideTree: boolean;
  baseURL: string;
  startingFolder?: string;
  offlineMode: boolean;
  upload: {
    containsFileTable: boolean;
    containsFileCount: boolean;
  };
  api: {
    listFile: string;
    uploadFile: string;
    downloadFile: string;
  };
}
