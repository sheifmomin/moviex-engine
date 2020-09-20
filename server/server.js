const http = require('http');
const app = require('./app');

/** Defining port */
const port = process.env.PORT || 3000;
/** The createServer method creates a server on your computer */
const serve = http.createServer(app);

/** Serve the PORT we defined */
serve.listen(port);

/** This Server was design using the
 * Youtube video: https://www.youtube.com/watch?v=zoSJ3bNGPp0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=5
 */