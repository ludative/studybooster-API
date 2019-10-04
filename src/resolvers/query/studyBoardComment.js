import models from "../../models";

// 게시판 댓글 가져오기
const getStudyBoardComments = async (_, { studyBoardId }) => {
  const studyBoardComments = await models.StudyBoardComment.findAll({
    where: { StudyBoardId: studyBoardId }
  });

  return studyBoardComments;
};

const studyBoardCommentQuery = {
  getStudyBoardComments
};

export default studyBoardCommentQuery;
