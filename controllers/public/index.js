const PublicController = require('./public');
const TestController = require('./test');

module.exports = [
    PublicController,
    {prefix: '/test', routes: TestController},
];
