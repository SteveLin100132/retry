"use strict";
/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： Log4js日誌
 * @CREATE Thu Jan 28 2021 上午8:45:05
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log4js = void 0;
const log4js_1 = require("log4js");
const config_1 = require("./config");
/**
 * Log4js日誌
 */
class Log4js {
    /**
     * @param type Log4js日誌類別
     */
    constructor(type) {
        log4js_1.configure(config_1.LOG_CONF);
        this.logger = log4js_1.getLogger(type);
    }
    /**
     * 一般日誌
     *
     * @method public
     * @param args 日誌參數
     */
    log(...args) {
        this.logger.log(...args);
    }
    /**
     * TRACE級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    trace(message, ...args) {
        this.logger.trace(message, ...args);
    }
    /**
     * DEBUG級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    debug(message, ...args) {
        this.logger.debug(message, ...args);
    }
    /**
     * INFO級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    info(message, ...args) {
        this.logger.info(message, ...args);
    }
    /**
     * WARN級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    warn(message, ...args) {
        this.logger.warn(message, ...args);
    }
    /**
     * ERROR級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    error(message, ...args) {
        this.logger.error(message, ...args);
    }
    /**
     * FATAL級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    fatal(message, ...args) {
        this.logger.fatal(message, ...args);
    }
    /**
     * MARK級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    mark(message, ...args) {
        this.logger.mark(message, ...args);
    }
}
exports.Log4js = Log4js;
