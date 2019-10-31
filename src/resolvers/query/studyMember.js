import models from "../../models";
import {authenticatedStudyMemberMiddleware} from "../../utils/middleware";
import calculatePagination from "../../utils/calculatePagination";

const getStudyMembers = async (_, {paginationParams, params, studyId}) => {
    const {
        isApprove,
        isReject,
        isBanish,
        orderBy = 'createdAt',
        orderDirection = 'DESC'
    } = params;
    const where = {
        StudyId: studyId
    };
    const order = [[orderBy, orderDirection]];

    if (typeof isApprove === 'boolean') where.isApprove = isApprove;
    if (typeof isReject === 'boolean') where.isReject = isReject;
    if (typeof isBanish === 'boolean') where.isBanish = isBanish;

    const members = await models.StudyMember.findAndCountAll({
        where,
        order,
        ...calculatePagination({...paginationParams}),
        include: [{
            model: models.User,
            attributes: {
                exclude: ['password']
            }
        }]
    });

    return members;
};

const studyMemberQuery = {
    getStudyMembers: authenticatedStudyMemberMiddleware(getStudyMembers)
};

export default studyMemberQuery;