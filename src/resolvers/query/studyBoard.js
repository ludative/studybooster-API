import models from "../../models";

// 스터디 게시판 목록 가져오기
const getStudyBoards = async () => {
  const studyBoards = await models.StudyBoard.findAndCountAll();

  return studyBoards;
};

// 스터디 게시판 상세 가져오기
const getStudyBoardById = async (_, { id }) => {
  const studyBoard = await models.StudyBoard.findByPk(id);

  return studyBoard;
};

// 카테고리 별 스터디 게시판 목록 가져오기
const getStudyBoardsByCategory = async (_, { category }) => {
  const studyBoards = await models.StudyBoard.findAndCountAll({
    where: { category }
  });

  return studyBoards;
};

const studyBoardQuery = {
  getStudyBoards,
  getStudyBoardById,
  getStudyBoardsByCategory
};

export default studyBoardQuery;
