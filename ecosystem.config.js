module.exports = {
    apps: [
        {
            name: "study-booster-api",
            script: "./index.js",
            watch: true,
            node_args: '-r esm',
            env_production: {
                NODE_ENV: "production",
                PORT: 18080,
            }
        }
    ]
};