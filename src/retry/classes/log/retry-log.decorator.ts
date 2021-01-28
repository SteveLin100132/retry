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

import 'reflect-metadata';
import { RetryModel } from 'src/retry/models';
import { Log4js } from '../../../logger';

const paramKey = Symbol('param');
const backupKey = Symbol('backup');
const logger = new Log4js('retry');

/**
 * 重拋資料日誌參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
export function ParamLog(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  const parameters = Reflect.getOwnMetadata(paramKey, target, key) || [];
  parameters.push(parameterIndex);
  Reflect.defineMetadata(paramKey, parameters, target, key);
}

/**
 * 重拋資料寫入檔案參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
export function BackupLog(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  const parameters = Reflect.getOwnMetadata(backupKey, target, key) || [];
  parameters.push(parameterIndex);
  Reflect.defineMetadata(backupKey, parameters, target, key);
}

/**
 * 重拋資料日誌裝飾器
 */
export function RetryLog(): Function {
  return (
    target: Object,
    propertyName: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalFunction: Function = descriptor.value;
    descriptor.value = function () {
      // 重拋資料參數日誌
      const paramsIndexList: number[] =
        Reflect.getOwnMetadata(paramKey, target, propertyName) || [];
      paramsIndexList.forEach((index) => {
        const message: RetryModel = arguments[index] || null;
        if (message && message.retry > 0) {
          logger.trace(`retry to send ${message.retry} times`);
          logger.trace(JSON.stringify(message.payload));
        }
      });

      // 寫入資料參數日誌
      const backupIndexList: number[] =
        Reflect.getOwnMetadata(backupKey, target, propertyName) || [];
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
