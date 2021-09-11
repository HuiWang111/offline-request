import execa from 'execa';
import path from 'path';

async function run() {
    const cwd = path.join(process.cwd(), 'examples/react-demo')

    await execa('rm -rf node_modules', {
        cwd
    });
    await execa('npm install', {
        cwd,
        stdio: [2, 2, 2]
    });
}

run();
