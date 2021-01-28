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
export declare class RetryOptionEntity implements RetryOption {
    /**
     * 重拋次數
     */
    count: number;
    /**
     * 重拋間距
     */
    interval: number;
    /**
     * 重拋失敗後的資料保存路徑
     */
    backupDir: string;
    /**
     * @param options 重拋配置
     */
    constructor(options?: RetryOption);
    /**
     * 初始化重拋次數
     *
     * @method public
     * @param count 重拋次數
     * @return 回傳重拋次數
     */
    initCount(count: number): number;
    /**
     * 初始化重拋間距
     *
     * @method public
     * @param interval 重拋間距
     * @return 回傳重拋間距
     */
    initInterval(interval: number): number;
    /**
     * 初始化重拋間距
     *
     * @method public
     * @param interval 重拋間距
     * @return 回傳重拋間距
     */
    initBackupDir(backupDir: string): string;
}
