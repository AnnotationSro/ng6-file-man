export interface ConfigInterface {
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
    deleteFile: string;
    createFolder: string;
    renameFile: string;
    searchFiles: string;
  };
  options: {
    allowFolderDownload: boolean;
    showFilesInsideTree: boolean;
  }
}
