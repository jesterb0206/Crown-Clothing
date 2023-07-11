import {createAction} from '../reducer/reducer.utils';

describe('Reducer Utils', () => {
  const testType = 'test';

  test('createAction Generates an Object With Type Value', () => {
    expect(createAction(testType).type).toBe(testType);
  });

  test('createAction Generates an Object With Type Value and Payload When Passed', () => {
    const testPayload = ['test1', 'test2'];

    expect(createAction(testType, testPayload).type).toBe(testType);
    expect(createAction(testType, testPayload).payload).toBe(testPayload);
  });
});
