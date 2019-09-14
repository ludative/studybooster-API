import { ApolloServer } from "apollo-server";
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from "./src/resolvers";
import config from "./config";

import db from "./db";

db();

const typeDefs = importSchema('src/schema.graphql');
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
const server = new ApolloServer({ schema });

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
