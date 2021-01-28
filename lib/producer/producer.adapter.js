"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerAdapter = void 0;
const retry_1 = require("./../retry");
/**
 * 發送者轉接器
 */
class ProducerAdapter {
    /**
     * @param producer 拋送者
     * @param options  重拋配置
     */
    constructor(producer, options) {
        this.producer = producer;
        this.options = options;
        /**
         * 嘗試重拋機制
         */
        this.retry = new retry_1.Retry(this);
        if (options) {
            this.retry.updateOptions(options);
        }
    }
    /**
     * 發送數據，失敗可重新拋送
     *
     * @method public
     * @param payload  要拋送的數據
     * @param callback 拋送後的回乎函數
     */
    publish(payload) {
        this.send(payload, (error) => {
            if (error) {
                this.retry.retry(payload);
            }
        });
    }
}
exports.ProducerAdapter = ProducerAdapter;
