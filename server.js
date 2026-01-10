const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const port = 8080;
const host = '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
  // Handle favicon.ico specifically to prevent 404s
  if (req.url.endsWith('favicon.ico')) {
    res.writeHead(204);
    res.end();
    return;
  }

  let filePath = '.' + req.url;

  // Clean URL params
  filePath = filePath.split('?')[0];

  // Directory handling
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      // Redirect to add trailing slash if missing (critical for relative path resolution)
      if (!req.url.endsWith('/')) {
        res.writeHead(301, { 'Location': req.url + '/' });
        res.end();
        return;
      }
      filePath += 'index.html';
    }

    if (filePath === './') filePath = './index.html';

    const extname = path.extname(filePath);
    let contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read file
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('Error: ' + error.code);
        }
      } else {
        // Cache Headers (1 hour for everything, 1 day for fonts/images)
        const isStatic = ['.png', '.jpg', '.woff', '.ttf', '.wasm'].includes(extname);
        const cacheTime = isStatic ? 86400 : 3600;

        const headers = {
          'Content-Type': contentType,
          'Cache-Control': `public, max-age=${cacheTime}`,
          'Vary': 'Accept-Encoding'
        };

        // Gzip Compression
        const acceptEncoding = req.headers['accept-encoding'] || '';
        if (acceptEncoding.includes('gzip') && ['.html', '.js', '.css', '.json', '.wasm', '.svg'].includes(extname)) {
          zlib.gzip(content, (err, buffer) => {
            if (!err) {
              headers['Content-Encoding'] = 'gzip';
              res.writeHead(200, headers);
              res.end(buffer);
            } else {
              res.writeHead(200, headers);
              res.end(content);
            }
          });
        } else {
          res.writeHead(200, headers);
          res.end(content);
        }
      }
    });
  });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/ with Compression enabled`);
});