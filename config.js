const config = {
  project: "apollo-server",
  version: "0.1",
  port: 4000,
  db: {
    host: "saemii-mysql.c6y8amaqyn1o.us-east-2.rds.amazonaws.com",
    database: "studybooster",
    username: "saemii",
    password: "1q2w3e4r!",
    dialect: "mysql",
    timezone: "+09:00",
    forceSync: false,
    alter: false
  }
};

export default config;
