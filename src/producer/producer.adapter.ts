/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 發送者轉接器
 * @CREATE Thu Jan 28 2021 下午2:33:10
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Retry, RetryOption } from './../retry';
import { Producer } from './producer';

/**
 * 發送者轉接器
 */
export abstract class ProducerAdapter<T> implements Producer {
  /**
   * 嘗試重拋機制
   */
  private retry = new Retry(this);

  /**
   * @param producer 拋送者
   * @param options  重拋配置
   */
  constructor(protected producer: T, protected options?: RetryOption) {
    if (options) {
      this.retry.updateOptions(options);
    }
  }

  /**
   * 發送數據
   *
   * @method public
   * @param payload  要拋送的數據
   * @param callback 拋送後的回乎函數
   */
  public abstract send(
    payload: any,
    callback: (error: any, result: any) => void
  ): void;

  /**
   * 發送數據，失敗可重新拋送
   *
   * @method public
   * @param payload  要拋送的數據
   * @param callback 拋送後的回乎函數
   */
  public publish(payload: any): void {
    this.send(payload, (error) => {
      if (error) {
        this.retry.retry(payload);
      }
    });
  }
}
