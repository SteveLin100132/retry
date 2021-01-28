/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 嘗試重拋配置向實體
 * @CREATE Wed Jan 27 2021 下午1:16:30
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { RetryOption } from '../../models';

/**
 * 嘗試重拋配置向實體
 */
export class RetryOptionEntity implements RetryOption {
  /**
   * 重拋次數
   */
  public count = 3;
  /**
   * 重拋間距
   */
  public interval = 5000;
  /**
   * 重拋失敗後的資料保存路徑
   */
  public backupDir = './backup';

  /**
   * @param options 重拋配置
   */
  constructor(options?: RetryOption) {
    Object.assign(this, options);
    this.count = this.initCount(this.count);
    this.interval = this.initInterval(this.interval);
    this.backupDir = this.initBackupDir(this.backupDir);
  }

  /**
   * 初始化重拋次數
   *
   * @method public
   * @param count 重拋次數
   * @return 回傳重拋次數
   */
  public initCount(count: number): number {
    if (count === null || count === undefined) {
      return 3;
    } else {
      return count;
    }
  }

  /**
   * 初始化重拋間距
   *
   * @method public
   * @param interval 重拋間距
   * @return 回傳重拋間距
   */
  public initInterval(interval: number): number {
    if (interval === null || interval === undefined || interval <= 0) {
      return 5000;
    } else {
      return interval;
    }
  }

  /**
   * 初始化重拋間距
   *
   * @method public
   * @param interval 重拋間距
   * @return 回傳重拋間距
   */
  public initBackupDir(backupDir: string): string {
    if (backupDir === null || backupDir === undefined || backupDir === '') {
      return './backup';
    } else {
      return backupDir;
    }
  }
}
