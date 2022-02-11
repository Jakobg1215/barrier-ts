import process from 'node:process';
import BarrierTs from './BarrierTs';

const server = new BarrierTs();

process.on('SIGINT', async () => {
    await server.stop();
    process.kill(process.pid, 'SIGKILL');
});
