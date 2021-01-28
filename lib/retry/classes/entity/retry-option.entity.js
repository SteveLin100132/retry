"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryOptionEntity = void 0;
/**
 * 嘗試重拋配置向實體
 */
class RetryOptionEntity {
    /**
     * @param options 重拋配置
     */
    constructor(options) {
        /**
         * 重拋次數
         */
        this.count = 3;
        /**
         * 重拋間距
         */
        this.interval = 5000;
        /**
         * 重拋失敗後的資料保存路徑
         */
        this.backupDir = './backup';
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
    initCount(count) {
        if (count === null || count === undefined) {
            return 3;
        }
        else {
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
    initInterval(interval) {
        if (interval === null || interval === undefined || interval <= 0) {
            return 5000;
        }
        else {
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
    initBackupDir(backupDir) {
        if (backupDir === null || backupDir === undefined || backupDir === '') {
            return './backup';
        }
        else {
            return backupDir;
        }
    }
}
exports.RetryOptionEntity = RetryOptionEntity;
