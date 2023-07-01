const mathOperations = require('./tasks/task_02');

describe(
  'Testing 4 math operations',
  () => {
    const testCases = [
      {
        arg1: '-',
        arg2: [0],
        expected: 0
      },
      {
        arg1: '-',
        arg2: [1, 4, 5, 8, 3, 1, 4],
        expected: -26
      },
      {
        arg1: '+',
        arg2: [90, 189, 0, 1111],
        expected: 1390
      },
      {
        arg1: '+',
        arg2: [1, 1, 1, 4],
        expected: 7
      },
      {
        arg1: '*',
        arg2: [0],
        expected: 0
      },
      {
        arg1: '*',
        arg2: [-2, 3, 6, 22],
        expected: -792
      },
      {
        arg1: '*',
        arg2: [1, 2, 4],
        expected: 8
      },
      {
        arg1: '/',
        arg2: [1, 2, 3],
        expected: 0.3
      },
      {
        arg1: '/',
        arg2: [9, 4, 6, 21, 3, 2],
        expected: 3.6
      },
      {
        arg1: '+',
        arg2: [70, 0.267, 1, -3],
        expected: 68.267
      },
      {
        arg1: '-',
        arg2: [90, 1000, 49, 1],
        expected: -1140
      }
    ];
    testCases.forEach(test => {
      it(
        `Arguments: ${test.arg1}, ${test.arg2} Expected: ${test.expected}`,
        () => {
          const res = mathOperations(test.arg1, test.arg2);
          expect(res).toBe(test.expected);
        }
      );
    });
  }
);
