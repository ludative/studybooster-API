import models from "../../models";

// 스터디 게시판 목록 가져오기
const getStudyBoards = async () => {
  const studyBoards = await models.StudyBoard.findAndCountAll();

  return studyBoards;
};

const studyBoardQuery = {
  getStudyBoards
};

export default studyBoardQuery;
