module.exports = {
    apps: [
        {
            "name": "mealhub",
            "script": "npm run start",
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};