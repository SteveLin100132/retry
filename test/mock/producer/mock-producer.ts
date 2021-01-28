/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 假發送者
 * @CREATE Thu Jan 28 2021 上午9:45:50
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Producer } from '../../../src';

/**
 * 假發送者
 */
export class MockProducer implements Producer {
  /**
   * 發送數據
   *
   * @method public
   * @param payload  要拋送的數據
   * @param callback 拋送後的回乎函數
   */
  public send(payload: any, callback: (error: any, result: any) => void): void {
    // TODO
  }
}
