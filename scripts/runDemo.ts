import execa from 'execa';
import path from 'path';

async function run() {
    const cwd = path.join(process.cwd(), 'examples/react-demo');

    await execa('npm run dll', {
        cwd
    });
    await execa('npm start', {
        cwd,
        stdio: [2, 2, 2]
    });
}

run();
