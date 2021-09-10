import execa from 'execa';
import path from 'path';

function run() {
    execa('npm start', {
        cwd: path.join(process.cwd(), 'examples/react-service-worker-demo'),
        stdio: [2, 2, 2]
    })
}

run();
