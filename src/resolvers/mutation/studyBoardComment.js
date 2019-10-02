import models from "../../models";
import { authenticatedMiddleware } from "../../utils/middleware";

// 게시판 댓글 생성
const createStudyBoardComment = async (
  _,
  { comment, StudyBoardId },
  context
) => {
  const params = {
    comment,
    StudyBoardId,
    UserId: context.user.id
  };

  const studyBoardComment = await models.StudyBoardComment.create(params);

  return studyBoardComment;
};

const studyBoardCommentMutations = {
  createStudyBoardComment: authenticatedMiddleware(createStudyBoardComment)
};

export default studyBoardCommentMutations;
