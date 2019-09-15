import models from "../../models";

const createStudy = async (_, {params}) => {
    const study = await models.Study.create(params, {
        include: [models.StudyDay]
    });
    return study;
};

const studyMutations = {
    createStudy
};

export default studyMutations;
