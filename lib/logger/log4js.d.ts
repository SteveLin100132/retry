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
import { LoggerAdapter } from './logger.adapter';
import { LoggerCatrgoryType } from './models';
/**
 * Log4js日誌
 */
export declare class Log4js implements LoggerAdapter {
    /**
     * Log4js日誌
     */
    private logger;
    /**
     * @param type Log4js日誌類別
     */
    constructor(type: LoggerCatrgoryType);
    /**
     * 一般日誌
     *
     * @method public
     * @param args 日誌參數
     */
    log(...args: any[]): void;
    /**
     * TRACE級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    trace(message: any, ...args: any[]): void;
    /**
     * DEBUG級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    debug(message: any, ...args: any[]): void;
    /**
     * INFO級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    info(message: any, ...args: any[]): void;
    /**
     * WARN級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    warn(message: any, ...args: any[]): void;
    /**
     * ERROR級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    error(message: any, ...args: any[]): void;
    /**
     * FATAL級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    fatal(message: any, ...args: any[]): void;
    /**
     * MARK級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    mark(message: any, ...args: any[]): void;
}
