const express = require('express');
const peerflix = require('peerflix');
const http = require('http');
const url = require('url');
const fs = require('fs');
const cors = require('cors');

const app = express();
const serverPort = 8808;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Range'],
}))

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const torrentUrl = parsedUrl.query.torrentUrl;

  if (!torrentUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Debe proporcionar un enlace magnético como parámetro "torrentUrl".');
    return;
  }

  // Resto del código para iniciar el servidor de streaming usando el enlace magnético
  const engine = peerflix(torrentUrl, {
    connections: 100,
    path: '/home/andres/Vídeos', // Directorio temporal para almacenar los archivos del torrent
  });

  engine.on('ready', () => {
    const videoFile = engine.files.find(file => {
        const allowedExtensions = ['.mkv', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', 'mpeg', 'mpg'];
        return allowedExtensions.some(extension => file.name.toLowerCase().endsWith(extension));
    });

    if (!videoFile) {
      console.error('No se encontró el archivo de video en el torrent.');
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('No se encontró el archivo de video en el torrent.');
      return;
    }

    if (parsedUrl.pathname === '/stream') {
      const fileStream = videoFile.createReadStream();
      res.setHeader('Content-Type', 'video/mp4');
      fileStream.pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada.');
    }
  });
});

server.listen(serverPort, () => {
  console.log(`Servidor de streaming iniciado en http://localhost:${serverPort}/stream?torrentUrl=`);
});