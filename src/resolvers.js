import usersQuery from "./resolvers/query/users";
import usersMutation from "./resolvers/mutation/users";

const resolvers = {
  Query: { ...usersQuery },
  Mutation: { ...usersMutation }
};

export default resolvers;
