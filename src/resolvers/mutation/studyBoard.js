import models from "../../models";

// 게시판 글 생성
const createStudyBoard = async (_, { params }, context) => {
  params.UserId = context.user.id;
  const studyBoard = await models.StudyBoard.create(params);

  return studyBoard;
};

// 게시판 글 삭제
const deleteStudyBoard = async (_, { id }, context) => {
  const user = context.user;
  const studyBoard = await models.StudyBoard.findByPk(id);
  if (!user.isAdmin && studyBoard.UserId !== user.id)
    throw new Error("본인의 게시물만 삭제할 수 있습니다.");

  await models.StudyBoard.destroy({
    where: { id }
  });

  // 삭제 후 목록 리턴
  const studyBoards = await models.StudyBoard.findAndCountAll();

  return studyBoards;
};

const studyBoardMutations = {
  createStudyBoard,
  deleteStudyBoard
};

export default studyBoardMutations;
