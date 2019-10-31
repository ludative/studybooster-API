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

const updateStudyAttendByAttendee = async (_, { params }) => {
  const attend = await models.StudyAttend.findByPk(params.id);
  return await attend.update({ ...params, confirmed: false });
};

const updateStudyAttendByAdmin = async (_, { params }) => {
  const attend = await models.StudyAttend.findByPk(params.id);
  return await attend.update({
    ...params,
    confirmed: true,
    confirmedDate: moment().valueOf()
  });
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
