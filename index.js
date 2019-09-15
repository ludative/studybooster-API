import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./src/resolvers";
import config from "./config";

import { verifyToken } from "./src/utils/token";

import db from "./db";

db();

const typeDefs = importSchema("src/schema.graphql");
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers["sb-token"] || "";

    const user = token ? await verifyToken(token) : "";

    return { user };
  }
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
