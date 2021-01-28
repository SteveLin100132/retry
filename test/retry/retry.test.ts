/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 嘗試重拋機制單元測試
 * @CREATE Thu Jan 28 2021 上午9:28:51
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as should from 'should';
import { Producer } from '../../lib';
import { Retry, RetryOption } from '../../src';
import { MockProducer } from '../mock';
import {
  createStubInstance,
  StubbedInstanceWithSinonAccessor,
} from './../sinon';

/**
 * 嘗試重拋機制單元測試
 */
describe('Retry', () => {
  /**
   * 嘗試重拋機制
   */
  let retry: Retry;
  /**
   * 發送者Stub
   */
  let producerStub: StubbedInstanceWithSinonAccessor<Producer>;

  /**
   * 測試前準備
   */
  beforeEach(() => {
    producerStub = createStubInstance<Producer>(MockProducer);
    retry = new Retry(producerStub);
  });

  /**
   * 測試更新重新拋送配置
   */
  it('updateOptions: update retry options', () => {
    // Arrange
    const options: RetryOption = { count: 0, interval: 1000 };

    // Act
    const result = retry.updateOptions(options);

    // Assert
    should(result).containDeep(options);
  });
});
