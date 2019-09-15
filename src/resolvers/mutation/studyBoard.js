import models from "../../models";

// 게시판 글 생성
const createStudyBoard = async (_, { params }) => {
  const studyBoard = await models.StudyBoard.create(params);

  return studyBoard;
};

// 게시판 글 삭제
const deleteStudyBoard = async (_, { id }) => {
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
