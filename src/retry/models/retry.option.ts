/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 嘗試重拋配置
 * @CREATE Wed Jan 27 2021 下午1:06:14
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 嘗試重拋配置
 */
export interface RetryOption {
  /**
   * 重拋次數
   */
  count?: number;
  /**
   * 重拋間距
   */
  interval?: number;
  /**
   * 重拋失敗後的資料保存路徑
   */
  backupDir?: string;
}
