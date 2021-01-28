/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 嘗試重拋資料模型
 * @CREATE Tue Jan 26 2021 下午3:02:34
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 嘗試重拋資料模型
 */
export interface RetryModel<T = any> {
  /**
   * 當前重送次數
   */
  retry: number;
  /**
   * 待重送的資料
   */
  payload: T;
}
