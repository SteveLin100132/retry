/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 抽象嘗試重拋範本
 * @CREATE Tue Jan 26 2021 下午2:30:04
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as fs from 'fs';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Log4js } from './../logger';
import { Producer } from './../producer';
import { RetryOptionEntity } from './classes';
import { BackupLog, ParamLog, RetryLog } from './classes/log';
import { RetryModel, RetryOption } from './models';

/**
 * 抽象嘗試重拋範本
 */
export abstract class RetryTemplate {
  /**
   * 日誌
   */
  private readonly logger = new Log4js('retry');
  /**
   * 訂閱項目
   */
  private subscription: Subscription;
  /**
   * 嘗試重拋訂閱項目
   */
  protected retry$ = new Subject<RetryModel>();
  /**
   * 重拋配置
   */
  protected options: RetryOptionEntity;

  /**
   * @param producer 資料拋送者
   * @param options  重拋配置
   */
  constructor(protected producer: Producer, options?: RetryOption) {
    // 設定重拋配置
    this.options = new RetryOptionEntity(options);

    // 監聽重拋資料
    this.subscription = this.listenToRetry();
  }

  /**
   * 監聽重拋資料
   *
   * @method private
   * @return 回傳訂閱項目
   */
  private listenToRetry(): Subscription {
    return this.retry$
      .pipe(delay(this.options.interval))
      .subscribe((message) => this.send(message));
  }

  /**
   * 重新拋送資料
   *
   * @method private
   * @param message 要重拋的資料
   */
  @RetryLog()
  private send(@ParamLog message: RetryModel): void {
    if (message.retry < this.options.count) {
      // 達重拋上限前，可繼續重拋資料
      this.producer.send(message.payload, (error) => {
        if (error) {
          message.retry++;
          this.retry$.next(message);
        }
      });
    } else {
      // 達重拋上限，則將資料匯出
      this.writeBackupFile(message.payload, this.options.backupDir);
    }
  }

  /**
   * 寫入備份資料
   *
   * @method private
   * @param payload 要寫入備份的資料
   * @param dir     備份的資料夾路徑
   */
  @RetryLog()
  private writeBackupFile<T>(@BackupLog payload: T, dir: string): void {
    try {
      const isDirExist = fs.existsSync(dir);
      if (!isDirExist) {
        fs.mkdirSync(dir);
      }
      const fileName = `backup-${new Date().getTime()}.json`;
      fs.writeFileSync(`${dir}/${fileName}`, JSON.stringify(payload));
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * 更新重新拋送配置
   *
   * @method public
   * @param options 重新拋送配置
   * @return 回傳更新後的配置
   */
  public updateOptions(options: RetryOption): RetryOption {
    this.options = new RetryOptionEntity(options);
    this.subscription.unsubscribe();
    this.subscription = this.listenToRetry();
    return this.options;
  }

  /**
   * 嘗試重拋數據
   *
   * @method public
   * @param payload 要重拋的數據
   */
  public abstract retry<T>(payload: T): void;
}
