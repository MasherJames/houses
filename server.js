import http from 'http';
import app from './server/index';

const port = process.env.PORT;

const server = http.createServer(app);
server.listen(port, () => console.log(`Server litening to port ${port}`));