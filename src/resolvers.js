import usersQuery from "./resolvers/query/users";
import studyQuery from "./resolvers/query/studies";
import studyBoardQuery from "./resolvers/query/studyBoard";
import studyBoardCommentQuery from "./resolvers/query/studyBoardComment";
import studyMemberQuery from "./resolvers/query/studyMember";
import studyActionLogQuery from "./resolvers/query/studyActionLog";
import studyBookmarkQuery from "./resolvers/query/studyBookmark";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";
import studyBoardCommentMutations from "./resolvers/mutation/studyBoardComment";
import studyMemberMutations from "./resolvers/mutation/studyMember";
import studyActionLogMutations from "./resolvers/mutation/studyActionLogs";
import studyBookmarkMutations from "./resolvers/mutation/studyBookmark";

const resolvers = {
  Query: {
    ...usersQuery,
    ...studyQuery,
    ...studyBoardQuery,
    ...studyBoardCommentQuery,
    ...studyMemberQuery,
    ...studyActionLogQuery,
    ...studyBookmarkQuery
  },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations,
    ...studyBoardCommentMutations,
    ...studyMemberMutations,
    ...studyActionLogMutations,
    ...studyBookmarkMutations
  }
};

export default resolvers;
