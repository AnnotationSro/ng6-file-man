import {DownloadModeEnum} from '../enums/download-mode.enum';

export interface ConfigInterface {
  baseURL: string;
  // startingFolder?: string; // todo implement
  // offlineMode: boolean; // todo implement
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
    allowFolderDownload: DownloadModeEnum;
    showFilesInsideTree: boolean;
  }
}
