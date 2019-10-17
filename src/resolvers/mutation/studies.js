import models from "../../models";
import {
  authenticatedMiddleware,
  authenticatedStudyAdminMiddleware
} from "../../utils/middleware";

const createStudy = async (_, { params }) => {
  const study = await models.Study.create(params, {
    include: [models.StudyDay]
  });
  return study;
};

const updateStudy = async (_, { params }, { study }) => {
  const { StudyDays } = params;
  // abled / deleted status 값 넘겨서 데이터 처리하기
  if (StudyDays) {
    await Promise.all(
      StudyDays.map(studyDay =>
        models.StudyDay.update({ ...studyDay }, { where: { id: studyDay.id } })
      )
    );
  }
  await study.update({ ...params });

  return study;
};

const deleteStudy = async (_, { studyId: StudyId }, { study }) => {
  // 1. StudyDay 삭제하기
  const studyDays = await models.StudyDay.findAll({
    where: { StudyId }
  });
  // 2, StudyBoard 삭제하기
  const studyBoards = await models.StudyBoard.findAll({
    where: { StudyId }
  });
  // 3. StudyMember 삭제하기
  const studyMembers = await models.StudyMember.findAll({
    where: { StudyId }
  });
  // 4. StudyActionLog 삭제하기
  const studyActionLogs = await models.StudyActionLog.findAll({
    where: { StudyId }
  });
  // 5. StudyBookmark 삭제하기
  const studyBookmarks = await models.StudyBookmark.findAll({
    where: { StudyId }
  });

  await Promise.all(
    studyDays.map(day => day.destroy()),
    studyBoards.map(board => board.destroy()),
    studyBoards.map(board =>
      models.StudyBoardComment.destroy({ where: { StudyBoardId: board.id } })
    ),
    studyMembers.map(member => member.destroy()),
    studyActionLogs.map(actionLog => actionLog.destroy()),
    studyBookmarks.map(bookmark => bookmark.destroy())
  );

  await study.destroy();

  return { isSuccess: true };
};

const studyMutations = {
  createStudy: authenticatedMiddleware(createStudy),
  updateStudy: authenticatedStudyAdminMiddleware(updateStudy),
  deleteStudy: authenticatedStudyAdminMiddleware(deleteStudy)
};

export default studyMutations;
