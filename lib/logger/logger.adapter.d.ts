/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 抽象日誌轉接器
 * @CREATE Thu Jan 28 2021 上午8:49:44
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 抽象日誌轉接器
 */
export interface LoggerAdapter {
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
