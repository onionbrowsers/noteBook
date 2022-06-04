module.exports = {
    testMatch : [
        '**/test/**/*.spec.js'
    ],
    coverageReporters : [
        'text-summary',
        'text',
        'lcov'
    ],
    collectCoverageFrom : [
        'www/lib/**/*.js'
    ],
    testEnvironment : 'node'
}
