/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 日誌設定
 * @CREATE Thu Jan 28 2021 上午8:41:41
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 日誌設定
 */
export declare const LOG_CONF: {
    appenders: {
        std: {
            type: string;
        };
        file: {
            type: string;
            filename: string;
            pattern: string;
            keepFileExt: boolean;
        };
    };
    categories: {
        default: {
            appenders: string[];
            level: string;
        };
        retry: {
            appenders: string[];
            level: string;
        };
    };
};
