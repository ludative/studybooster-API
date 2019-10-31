import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";

// 게시판 댓글 가져오기
const getStudyBoardComments = async (
  _,
  { paginationParams, studyBoardId: StudyBoardId }
) => {
  const studyBoardComments = await models.StudyBoardComment.findAndCountAll({
    where: { StudyBoardId },
    ...calculatePagination({ ...paginationParams })
  });

  return studyBoardComments;
};

const studyBoardCommentQuery = {
  getStudyBoardComments
};

export default studyBoardCommentQuery;
