//server.js
const express = require('express'),
      path = require('path'),
      distDir = path.join(__dirname, './dist'),
      appPage = path.join(distDir, 'index.html'),
      mysql = require('mysql'),
      { port, host, db, db_user, db_pwd } = require('./config'),
      app = express(),
      isDevelopment = process.env.NODE_ENV === "development",
      bodyParser = require('body-parser');

/* Hot Module Replacement */
if (isDevelopment) {
  const webpack = require('webpack'),
        webpackConfig = require('./webpack.config'),
        compiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

const mc = mysql.createConnection({
  host: host,
  user: db_user,
  password: db_pwd,
  database: db
})
mc.connect();
console.log('DB connected: ' + db);

app.use(express.static(distDir));

app.get('/', (req, res) => {
  res.sendFile(appPage);
 });

app.listen(port);
console.log('Express server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app); //register the route 