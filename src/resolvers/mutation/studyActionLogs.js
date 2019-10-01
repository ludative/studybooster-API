import models from "../../models";
import { authenticatedMiddleware } from "../../utils/middleware";

const createStudyActionLog = async (_, { status, studyId: StudyId }, { user }) => {
    await models.StudyActionLog.create({
        status,
        StudyId,
        UserId: user.id
    });

    return {isSuccess: true}
};

const studyActionLogMutations = {
    createStudyActionLog: authenticatedMiddleware(createStudyActionLog)
};

export default studyActionLogMutations;
