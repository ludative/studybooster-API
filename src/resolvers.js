import usersQuery from "./resolvers/query/users";
import studyBoardQuery from "./resolvers/query/studyBoard";
import studyMemberQuery from "./resolvers/query/studyMember";
import studyActionLogQuery from "./resolvers/query/studyActionLog";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";
import studyMemberMutations from "./resolvers/mutation/studyMember";
import studyActionLogMutations from "./resolvers/mutation/studyActionLogs";


const resolvers = {
  Query: {
    ...usersQuery,
    ...studyBoardQuery,
    ...studyMemberQuery,
    ...studyActionLogQuery
  },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations,
    ...studyMemberMutations,
    ...studyActionLogMutations
  }
};

export default resolvers;
