const config = {
  project: "apollo-server",
  version: "0.1",
  port: 4000,
  db: {
    dialect: "mysql",
    timezone: "+09:00",
    forceSync: false,
    alter: false
  }
};

export default config;
