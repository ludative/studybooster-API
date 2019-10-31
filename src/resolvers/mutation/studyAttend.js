import models from "../../models";

import moment from "moment";

import {
  authenticatedMiddleware,
  authenticatedStudyAdminMiddleware
} from "../../utils/middleware";

const createStudyAttend = async (_, { params }) => {
  return await models.StudyAttend.create({
    ...params,
    confirmedCount: 1,
    confirmed: false
  });
};

const updateStudyAttendByAttendee = async (_, { id, studyId: StudyId }) => {
  return await updateStudyAttend(id, { confirmed: false });
};

const updateStudyAttendByAdmin = async (_, { id, studyId: StudyId }) => {
  return await updateStudyAttend(id, {
    confirmed: true,
    confirmedDate: moment().valueOf()
  });
};

const updateStudyAttend = async (id, params) => {
  const attend = await models.StudyAttend.findByPk(id);
  return await attend.update({ ...params });
};

const studyAttendMutations = {
  createStudyAttend: authenticatedMiddleware(createStudyAttend),
  updateStudyAttendByAttendee: authenticatedMiddleware(
    updateStudyAttendByAttendee
  ),
  updateStudyAttendByAdmin: authenticatedStudyAdminMiddleware(
    updateStudyAttendByAdmin
  )
};

export default studyAttendMutations;
