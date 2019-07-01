import http from 'http';
import app from './server/index';

const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Server litening to port ${port}`));