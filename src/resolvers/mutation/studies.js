import models from "../../models";
import { authenticatedMiddleware } from "../../utils/middleware";

const createStudy = async (_, { params }) => {
  const study = await models.Study.create(params, {
    include: [models.StudyDay]
  });
  return study;
};

const deleteStudy = async (_, { id }, context) => {
  try {
    const user = context.user;
    const study = await models.Study.findByPk(id);

    if (study.UserId !== user.id)
      throw new Error("스터디 관리자만 스터디 삭제가 가능합니다.");

    // 1. StudyDay 삭제하기
    const studyDays = await models.StudyDay.findAll({
      where: { StudyId: id }
    });
    // 2, StudyBoard 삭제하기
    const studyBoards = await models.StudyBoard.findAll({
      where: { StudyId: id }
    });
    // 3. StudyMember 삭제하기
    const studyMembers = await models.StudyMember.findAll({
      where: { StudyId: id }
    });
    // 4. StudyActionLog 삭제하기
    const studyActionLogs = await models.StudyActionLog.findAll({
      where: { StudyId: id }
    });
    // 5. StudyBookmark 삭제하기
    const studyBookmarks = await models.StudyBookmark.findAll({
      where: { StudyId: id }
    });

    await Promise.all(
      studyDays.map(day => models.StudyDay.destroy({ where: { id: day.id } })),
      studyBoards.map(board =>
        models.StudyBoard.destroy({ where: { id: board.id } })
      ),
      studyMembers.map(member =>
        models.StudyMember.destroy({ where: { id: member.id } })
      ),
      studyActionLogs.map(actionLog =>
        models.StudyActionLog.destroy({ where: { id: actionLog.id } })
      ),
      studyBookmarks.map(bookmark =>
        models.StudyBookmark.destroy({ where: { id: bookmark.id } })
      )
    );

    await study.destroy();

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};

const studyMutations = {
  createStudy,
  deleteStudy: authenticatedMiddleware(deleteStudy)
};

export default studyMutations;
