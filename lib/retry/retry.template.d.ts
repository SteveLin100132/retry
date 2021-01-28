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
import { Subject } from 'rxjs';
import { Producer } from './../producer';
import { RetryOptionEntity } from './classes';
import { RetryModel, RetryOption } from './models';
/**
 * 抽象嘗試重拋範本
 */
export declare abstract class RetryTemplate {
    protected producer: Producer;
    /**
     * 日誌
     */
    private readonly logger;
    /**
     * 訂閱項目
     */
    private subscription;
    /**
     * 嘗試重拋訂閱項目
     */
    protected retry$: Subject<RetryModel<any>>;
    /**
     * 重拋配置
     */
    protected options: RetryOptionEntity;
    /**
     * @param producer 資料拋送者
     * @param options  重拋配置
     */
    constructor(producer: Producer, options?: RetryOption);
    /**
     * 監聽重拋資料
     *
     * @method private
     * @return 回傳訂閱項目
     */
    private listenToRetry;
    /**
     * 重新拋送資料
     *
     * @method private
     * @param message 要重拋的資料
     */
    private send;
    /**
     * 寫入備份資料
     *
     * @method private
     * @param payload 要寫入備份的資料
     * @param dir     備份的資料夾路徑
     */
    private writeBackupFile;
    /**
     * 更新重新拋送配置
     *
     * @method public
     * @param options 重新拋送配置
     * @return 回傳更新後的配置
     */
    updateOptions(options: RetryOption): RetryOption;
    /**
     * 嘗試重拋數據
     *
     * @method public
     * @param payload 要重拋的數據
     */
    abstract retry<T>(payload: T): void;
}
