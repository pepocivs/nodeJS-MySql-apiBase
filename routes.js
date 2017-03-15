var myDB        = require('./controllers/myDB/myDBController.js');
var fs          = require('fs');
var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 1 - Create new Call (router.x) and go to the controller

function restRouter(router) {
    this.handleRoutes(router);
}

restRouter.prototype.handleRoutes = handleRoutes;

function handleRoutes(router) {
    router.get('/', function(req, res) {
        res.json({'Message' : 'Welcome to '+packageJson.name+' REST-API v'+packageJson.version});
    });

    // You can add middleware to protect the call (FE: login middleware)

    router.get('/first-call', myDB.getFirstCall);
}

module.exports = restRouter;
