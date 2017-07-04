module.exports = (wallaby) => {
  return {
    files: [
      'src/*.js'
    ],
    tests: [
      'test/*.test.js'
    ],
    debug: true,
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015','stage-2']
      })
    }
  };
};
