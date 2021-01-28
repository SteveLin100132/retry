"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryTemplate = void 0;
const fs = require("fs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = require("./../logger");
const classes_1 = require("./classes");
const log_1 = require("./classes/log");
/**
 * 抽象嘗試重拋範本
 */
class RetryTemplate {
    /**
     * @param producer 資料拋送者
     * @param options  重拋配置
     */
    constructor(producer, options) {
        this.producer = producer;
        /**
         * 日誌
         */
        this.logger = new logger_1.Log4js('retry');
        /**
         * 嘗試重拋訂閱項目
         */
        this.retry$ = new rxjs_1.Subject();
        // 設定重拋配置
        this.options = new classes_1.RetryOptionEntity(options);
        // 監聽重拋資料
        this.subscription = this.listenToRetry();
    }
    /**
     * 監聽重拋資料
     *
     * @method private
     * @return 回傳訂閱項目
     */
    listenToRetry() {
        return this.retry$
            .pipe(operators_1.delay(this.options.interval))
            .subscribe((message) => this.send(message));
    }
    /**
     * 重新拋送資料
     *
     * @method private
     * @param message 要重拋的資料
     */
    send(message) {
        if (message.retry < this.options.count) {
            // 達重拋上限前，可繼續重拋資料
            this.producer.send(message.payload, (error) => {
                if (error) {
                    message.retry++;
                    this.retry$.next(message);
                }
            });
        }
        else {
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
    writeBackupFile(payload, dir) {
        try {
            const isDirExist = fs.existsSync(dir);
            if (!isDirExist) {
                fs.mkdirSync(dir);
            }
            const fileName = `backup-${new Date().getTime()}.json`;
            fs.writeFileSync(`${dir}/${fileName}`, JSON.stringify(payload));
        }
        catch (error) {
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
    updateOptions(options) {
        this.options = new classes_1.RetryOptionEntity(options);
        this.subscription.unsubscribe();
        this.subscription = this.listenToRetry();
        return this.options;
    }
}
__decorate([
    log_1.RetryLog(),
    __param(0, log_1.ParamLog)
], RetryTemplate.prototype, "send", null);
__decorate([
    log_1.RetryLog(),
    __param(0, log_1.BackupLog)
], RetryTemplate.prototype, "writeBackupFile", null);
exports.RetryTemplate = RetryTemplate;
