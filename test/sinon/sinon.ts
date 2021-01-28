/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： 客製Sinon
 * @CREATE Thu Jan 28 2021 上午9:26:35
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as sinon from 'sinon';
import { SinonSpy } from 'sinon';

export { sinon, SinonSpy };

export type StubbedInstanceWithSinonAccessor<T> = T & {
  stubs: sinon.SinonStubbedInstance<T>;
};

/**
 * Creates a new object with the given functions as the prototype and stubs all
 * implemented functions.
 *
 * Note: The given constructor function is not invoked. See also the stub API.
 *
 * This is a helper method replacing `sinon.createStubInstance` and working
 * around the limitations of TypeScript and Sinon, where Sinon is not able to
 * list private/protected members in the type definition of the stub instance
 * and therefore the stub instance cannot be assigned to places expecting TType.
 * See also
 *  - https://github.com/Microsoft/TypeScript/issues/13543
 *  - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14811
 *
 * @typeParam TType - Type being stubbed.
 * @param constructor - Object or class to stub.
 * @returns A stubbed version of the constructor, with an extra property `stubs`
 * providing access to stub API for individual methods.
 */
export function createStubInstance<TType>(
  constructor: sinon.StubbableType<TType>
): StubbedInstanceWithSinonAccessor<TType> {
  const stub = sinon.createStubInstance(constructor);
  return Object.assign(stub as TType, { stubs: stub });
}
