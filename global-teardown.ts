import fs from 'fs';

async function globalTeardown() {

    console.log('Global teardown started');

    const authFile = './playwright/.auth/auth.json';

    if (fs.existsSync(authFile)) {
        fs.unlinkSync(authFile);
        console.log('Authentication file deleted');
    }

    console.log('Global teardown completed');
}

export default globalTeardown;