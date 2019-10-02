import usersQuery from "./resolvers/query/users";
import studyBoardQuery from "./resolvers/query/studyBoard";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";
import studyBoardCommentMutations from "./resolvers/mutation/studyBoardComment";

const resolvers = {
  Query: { ...usersQuery, ...studyBoardQuery },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations,
    ...studyBoardCommentMutations
  }
};

export default resolvers;
