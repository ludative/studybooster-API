import models from "../../models";

const createStudyBoard = async (_, { params }) => {
  const studyBoard = await models.StudyBoard.create(params);

  return studyBoard;
};

const studyBoardMutations = {
  createStudyBoard
};

export default studyBoardMutations;
