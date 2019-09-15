import usersQuery from "./resolvers/query/users";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";

const resolvers = {
  Query: { ...usersQuery },
  Mutation: {
    ...usersMutation,
    ...studyMutations
  }
};

export default resolvers;
