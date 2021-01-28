"use strict";
/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 重拋資料日誌裝飾器
 * @CREATE Thu Jan 28 2021 下午4:21:22
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryLog = exports.BackupLog = exports.ParamLog = void 0;
require("reflect-metadata");
const logger_1 = require("../../../logger");
const paramKey = Symbol('param');
const backupKey = Symbol('backup');
const logger = new logger_1.Log4js('retry');
/**
 * 重拋資料日誌參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
function ParamLog(target, key, parameterIndex) {
    const parameters = Reflect.getOwnMetadata(paramKey, target, key) || [];
    parameters.push(parameterIndex);
    Reflect.defineMetadata(paramKey, parameters, target, key);
}
exports.ParamLog = ParamLog;
/**
 * 重拋資料寫入檔案參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
function BackupLog(target, key, parameterIndex) {
    const parameters = Reflect.getOwnMetadata(backupKey, target, key) || [];
    parameters.push(parameterIndex);
    Reflect.defineMetadata(backupKey, parameters, target, key);
}
exports.BackupLog = BackupLog;
/**
 * 重拋資料日誌裝飾器
 */
function RetryLog() {
    return (target, propertyName, descriptor) => {
        const originalFunction = descriptor.value;
        descriptor.value = function () {
            // 重拋資料參數日誌
            const paramsIndexList = Reflect.getOwnMetadata(paramKey, target, propertyName) || [];
            paramsIndexList.forEach((index) => {
                const message = arguments[index] || null;
                if (message && message.retry > 0) {
                    logger.trace(`retry to send ${message.retry} times`);
                    logger.trace(JSON.stringify(message.payload));
                }
            });
            // 寫入資料參數日誌
            const backupIndexList = Reflect.getOwnMetadata(backupKey, target, propertyName) || [];
            backupIndexList.forEach((index) => {
                const message = arguments[index] || null;
                if (message) {
                    logger.trace('write following data into JSON');
                    logger.trace(JSON.stringify(message));
                }
            });
            return originalFunction.apply(this, arguments);
        };
        return descriptor;
    };
}
exports.RetryLog = RetryLog;
