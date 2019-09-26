import usersQuery from "./resolvers/query/users";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";

import customScalars from "./scalar";

const resolvers = {
  Query: { ...usersQuery },
  Mutation: {
    ...usersMutation,
    ...studyMutations
  },
  ...customScalars
};

export default resolvers;
