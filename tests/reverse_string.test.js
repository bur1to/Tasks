const reverseString = require('./tasks/task_01');

describe(
  'Reverse string function test:',
  () => {
    const testCases = [
      {
        inString: 'retro',
        expected: 'orter'
      },
      {
        inString: 'hello www',
        expected: 'www olleh'
      },
      {
        inString: 'vulcan',
        expected: 'nacluv'
      },
      {
        inString: 'lowercase',
        expected: 'esacrewol'
      },
      {
        inString: 'strong people',
        expected: 'elpoep gnorts'
      }
    ];
    testCases.forEach(test => {
      it(
        `In: ${test.inString} expected: ${test.expected}`,
        () => {
          const res = reverseString(test.inString);
          expect(res).toBe(test.expected);
        }
      );
    });
  }
);
