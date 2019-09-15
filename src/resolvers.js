import usersQuery from "./resolvers/query/users";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";

const resolvers = {
  Query: { ...usersQuery },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations
  }
};

export default resolvers;
