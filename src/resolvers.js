import usersQuery from "./resolvers/query/users";
import studyBoardQuery from "./resolvers/query/studyBoard";
import studyMemberQuery from "./resolvers/query/studyMember";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";
import studyMemberMutations from "./resolvers/mutation/studyMember";

const resolvers = {
  Query: {
    ...usersQuery,
    ...studyBoardQuery,
    ...studyMemberQuery
  },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations,
    ...studyMemberMutations
  }
};

export default resolvers;
