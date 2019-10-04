import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import {authenticatedMiddleware} from "../../utils/middleware";

const getIsStudyBookmark = async (_,{studyId: StudyId}, context) => {
    const hasToken = context && context.user;
    if (!hasToken) {
        return { isBookmark: false }
    }

    const studyBookmark = await models.StudyBookmark.findOne({
        where: {
            StudyId,
            UserId: context.user.id
        }
    });

    let result;
    if (studyBookmark) {
        result = { isBookmark: true }
    } else {
        result = { isBookmark: false }
    }

    return result;
};


const getStudyBookmarks = async (_, {paginationParams}, {user: {id: UserId}}) => {
    const bookmarks = await models.StudyBookmark.findAndCountAll({
        where: { UserId },
        order: [['createdAt', 'DESC']],
        ...calculatePagination({...paginationParams}),
        include: {model: models.Study}
    });

    const studyBookmarks = bookmarks.rows.map(bookmark => bookmark.Study);
    return {
        count: bookmarks.count,
        rows: studyBookmarks
    }
};


const studyBookmarkMutations = {
    getIsStudyBookmark,
    getStudyBookmarks: authenticatedMiddleware(getStudyBookmarks)
};

export default studyBookmarkMutations;
