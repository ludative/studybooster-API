import models from "../../models";
import {authenticatedMiddleware} from "../../utils/middleware";

const toggleStudyBookmark = async (_,{studyId: StudyId}, {user: {id: UserId}}) => {
    const studyBookmark = await models.StudyBookmark.findOne({
        where: {
            StudyId,
            UserId
        }
    });

    let result;
    if (studyBookmark) {
        await studyBookmark.destroy();
        result = { isBookmark: false }
    } else {
        await models.StudyBookmark.create({
            StudyId,
            UserId
        });
        result = { isBookmark: true }
    }

    return result;
};


const studyBookmarkMutations = {
    toggleStudyBookmark: authenticatedMiddleware(toggleStudyBookmark)
};

export default studyBookmarkMutations;
