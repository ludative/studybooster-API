import models from "../../models";
import { authenticatedMiddleware, authenticatedStudyMemberMiddleware } from "../../utils/middleware";

// 게시판 글 생성
const createStudyBoard = async (_, { params }, context) => {
  params.UserId = context.user.id;
  const studyBoard = await models.StudyBoard.create(params);

  return studyBoard;
};

// 게시판 글 삭제
const deleteStudyBoard = async (_, { id }, context) => {
  const user = context.user;
  const promises = [];

  const studyBoardComments = await models.StudyBoardComment.findAll({
    where: {
      StudyBoardId: id
    }
  });

  studyBoardComments.forEach(studyBoardComment => {
    promises.push(studyBoardComment.destroy());
  });

  const studyBoard = await models.StudyBoard.findOne({
    where: { id, UserId: user.id }
  });
  if (!studyBoard)
    throw new Error("본인의 게시물만 삭제할 수 있습니다.");

  await Promise.all([...promises, studyBoard.destroy()]);

  return { isSuccess: true };
};

// 게시판 글 수정
// StudyId도 입력받아서 체크해줘야 하는지?
const updateStudyBoard = async (_, { params }, context) => {
  const user = context.user;
  const studyBoard = await models.StudyBoard.findByPk(params.id);
  if (studyBoard.UserId !== user.id)
    throw new Error("본인의 게시물만 수정할 수 있습니다.");

  await studyBoard.update({ ...params });

  return studyBoard;
};

const studyBoardMutations = {
  createStudyBoard: authenticatedMiddleware(createStudyBoard),
  deleteStudyBoard: authenticatedStudyMemberMiddleware(deleteStudyBoard),
  updateStudyBoard: authenticatedStudyMemberMiddleware(updateStudyBoard)
};

export default studyBoardMutations;
