"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_CONF = void 0;
/**
 * 日誌設定
 */
exports.LOG_CONF = {
    appenders: {
        std: {
            type: 'stdout',
        },
        file: {
            type: 'dateFile',
            filename: 'logs/app.log',
            pattern: '.yyyy-MM-dd',
            keepFileExt: true,
        },
    },
    categories: {
        default: {
            appenders: ['std', 'file'],
            level: 'all',
        },
        retry: {
            appenders: ['std', 'file'],
            level: 'all',
        },
    },
};
