import { ApolloServer, gql } from "apollo-server";

import type from "./graphql/schema/type";
import query from "./graphql/schema/query";
import interfaces from "./graphql/schema/interface";
import resolvers from "./graphql/resolvers";

import config from "./config";

import db from "./db";

db();

const typeDefs = gql`
  ${interfaces}
  ${type}
  ${query}
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
