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
/**
 * 重拋資料日誌參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
export declare function ParamLog(target: Object, key: string | symbol, parameterIndex: number): void;
/**
 * 重拋資料寫入檔案參數裝飾器
 *
 * @param target         呼叫對象
 * @param key            參數名稱
 * @param parameterIndex 參數索引值
 */
export declare function BackupLog(target: Object, key: string | symbol, parameterIndex: number): void;
/**
 * 重拋資料日誌裝飾器
 */
export declare function RetryLog(): Function;
