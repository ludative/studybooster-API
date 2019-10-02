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

// 게시판 댓글 삭제
const deleteStudyBoardComment = async (_, { id }, context) => {
  const user = context.user;
  const studyBoardComment = await models.StudyBoardComment.findByPk(id);
  if (studyBoardComment.UserId !== user.id)
    throw new Error("본인의 댓글만 삭제할 수 있습니다.");

  await studyBoardComment.destroy();

  return { isSuccess: true };
};

const studyBoardCommentMutations = {
  createStudyBoardComment: authenticatedMiddleware(createStudyBoardComment),
  deleteStudyBoardComment: authenticatedMiddleware(deleteStudyBoardComment)
};

export default studyBoardCommentMutations;
