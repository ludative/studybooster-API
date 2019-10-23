import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import {
  authenticatedMiddleware,
  authenticatedStudyAdminMiddleware
} from "../../utils/middleware";

const createStudyAttend = async (_, { params }) => {
  return await models.StudyAttend.create({ ...params, confirmed: false });
};

const updateStudyAttend = async (_, { params, studyId }) => {
  const attend = await models.StudyAttend.findByPk(params.id);
  return await attend.update({ ...params });
};

const studyAttendMutations = {
  createStudyAttend: authenticatedMiddleware(createStudyAttend),
  updateStudyAttend: authenticatedStudyAdminMiddleware(updateStudyAttend)
};

export default studyAttendMutations;
