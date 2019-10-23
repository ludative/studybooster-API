import usersQuery from "./resolvers/query/users";
import studyBoardQuery from "./resolvers/query/studyBoard";
import studyBoardCommentQuery from "./resolvers/query/studyBoardComment";
import studyMemberQuery from "./resolvers/query/studyMember";
import studyActionLogQuery from "./resolvers/query/studyActionLog";
import studyBookmarkQuery from "./resolvers/query/studyBookmark";
import studyAttendQuery from "./resolvers/query/studyAttend";

import usersMutation from "./resolvers/mutation/users";
import studyMutations from "./resolvers/mutation/studies";
import studyBoardMutations from "./resolvers/mutation/studyBoard";
import studyBoardCommentMutations from "./resolvers/mutation/studyBoardComment";
import studyMemberMutations from "./resolvers/mutation/studyMember";
import studyActionLogMutations from "./resolvers/mutation/studyActionLogs";
import studyBookmarkMutations from "./resolvers/mutation/studyBookmark";
import studyAttendMutations from "./resolvers/mutation/studyAttend";

const resolvers = {
  Query: {
    ...usersQuery,
    ...studyBoardQuery,
    ...studyBoardCommentQuery,
    ...studyMemberQuery,
    ...studyActionLogQuery,
    ...studyBookmarkQuery,
    ...studyAttendQuery
  },
  Mutation: {
    ...usersMutation,
    ...studyMutations,
    ...studyBoardMutations,
    ...studyBoardCommentMutations,
    ...studyMemberMutations,
    ...studyActionLogMutations,
    ...studyBookmarkMutations,
    ...studyAttendMutations
  }
};

export default resolvers;
