import models from "../../models";

// 스터디 게시판 목록 가져오기
const getStudyBoards = async () => {
  const studyBoards = await models.StudyBoard.findAndCountAll();

  return studyBoards;
};

// 스터디 상세 가져오기
const getStudyBoardById = async (_, { id }) => {
  const studyBoard = await models.StudyBoard.findByPk(id);

  return studyBoard;
};

const studyBoardQuery = {
  getStudyBoards,
  getStudyBoardById
};

export default studyBoardQuery;
