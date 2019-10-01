import models from "../../models";
import {authenticatedMiddleware} from "../../utils/middleware";

const getStudyActionLogs = async (_, args, {user}) => {
    return await models.StudyActionLog.findAll({
        limit: 20,
        include: [{
            model: models.User,
            attributes: {
                exclude: ['password']
            }
        }, {
            model: models.Study,
            where: {
                UserId: user.id
            }
        }]
    });
};

const studyActionLogQuery = {
    getStudyActionLogs: authenticatedMiddleware(getStudyActionLogs)
};

export default studyActionLogQuery;
