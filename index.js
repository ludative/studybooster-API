import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./src/resolvers";
import config from "./config";

import { verifyToken } from "./src/utils/token";

import db from "./db";

import models from "./src/models";

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
    if (token) {
      const user = await verifyToken(token);
      if (!user.id) throw new Error("잘못된 접근입니다.");
      const _user = await models.User.findByPk(user.id);
      if (!_user) throw new Error("존재하지 않는 회원입니다.");
      return { user: _user, token, ...user };
    }
  }
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
