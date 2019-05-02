const path = require('path');

module.exports = (server) => {
  
  server.get('*', (req, res) => {
    res.sendFile(path.join(global.appDir,'client', 'build','index.html'));
  });
  
}
