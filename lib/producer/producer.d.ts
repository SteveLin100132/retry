/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 發送者
 * @CREATE Tue Jan 26 2021 下午3:48:30
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 發送者
 */
export interface Producer {
    /**
     * 發送數據
     *
     * @method public
     * @param payload  要拋送的數據
     * @param callback 拋送後的回乎函數
     */
    send(payload: any, callback: (error: any, result: any) => void): void;
}
