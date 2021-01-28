"use strict";
/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 嘗試重拋機制
 * @CREATE Wed Jan 27 2021 下午1:59:42
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retry = void 0;
const retry_template_1 = require("./retry.template");
/**
 * 嘗試重拋機制
 */
class Retry extends retry_template_1.RetryTemplate {
    /**
     * @param producer 資料拋送者
     * @param options  重拋配置
     */
    constructor(producer, options) {
        super(producer, options);
        this.producer = producer;
    }
    /**
     * 嘗試重拋數據
     *
     * @method public
     * @param payload 要重拋的數據
     */
    retry(payload) {
        this.retry$.next({ retry: 0, payload });
    }
}
exports.Retry = Retry;
