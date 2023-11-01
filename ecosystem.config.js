/**
 * This specifies the entry point for the application, running "node /myapp/app.js"
 * 
 * Used by PM2 to ensure the NodeJS app is always running.
 * https://pm2.keymetrics.io/
 */
module.exports = {
    apps: [
        {
            name: 'nodejs-app',
            script: 'node',
            args: '/myapp/app.js',
            interpreter: 'none',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
} 