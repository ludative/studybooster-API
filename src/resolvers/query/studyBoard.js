import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import { authenticatedStudyMemberMiddleware } from "../../utils/middleware";

// 스터디 게시판 목록 가져오기
const getStudyBoards = async (
  _,
  { paginationParams, studyId: StudyId, category }
) => {
  const where = {};

  if (category) {
    where.category = category;
  }

  const studyBoards = await models.StudyBoard.findAndCountAll({
    where,
    StudyId,
    ...calculatePagination({ ...paginationParams })
  });

  return studyBoards;
};

// 스터디 게시판 상세 가져오기
const getStudyBoardById = async (_, { id }) => {
  const studyBoard = await models.StudyBoard.findByPk(id);

  return studyBoard;
};

const studyBoardQuery = {
  getStudyBoards: authenticatedStudyMemberMiddleware(getStudyBoards),
  getStudyBoardById: authenticatedStudyMemberMiddleware(getStudyBoardById)
};

export default studyBoardQuery;
