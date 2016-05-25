(function() {
'use strict';

  const express = require('express');  // node framework
  const app = express();  // start express

  const path = require('path');

  const port = process.env.PORT || 3000;  // dynamic port


  app.use(express.static(path.join(__dirname, 'public')));  // sets up routes for app (array of routes
  														  // of all files in the 'public' file)

  app.get('/hello', (req, res) => {
      res.write('<h1>Hello.</h1>');
  });

  app.use('/', (req, res) => {
    res.send('jQuery Mobile server is running, Red.');
  });

    app.listen(port, () => {
      console.log(`jQuery Mobile server running on port: ${port}`);
    });
})();
