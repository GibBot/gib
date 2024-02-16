module.exports = {
  apps: [
    {
      name: 'AI-Backend',
      script: 'dist/src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        PORT: 2999,
        ENV: 'dev',
      },
    },
  ],
};
