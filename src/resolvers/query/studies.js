import { Op } from "sequelize";
import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import { authenticatedMiddleware } from "../../utils/middleware";

// 스터디 리스트
const getStudies = async (
  _,
  { paginationParams, params, isMine = false },
  context
) => {
  const user = context.user;
  const {
    name,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    weekPeriod,
    location,
    customSubject,
    minLimitedMemberCount,
    maxLimitedMemberCount,
    isPrivate,
    UserId,
    StudyDays,
    orderBy = "createdAt",
    orderDirection = "DESC"
  } = params;

  const where = {};
  const whereDays = {};
  const order = [[orderBy, orderDirection]];
  /**
   *
   * StudyDays: 0-6 검색 되도록
   */
  if (StudyDays && StudyDays.length)
    whereDays.id = StudyDays.map(day => day.id);

  /**
   * like 검새기 가능한 컬럼
   * name, description, location, customSubject
   */
  if (name) where.name = { [Op.like]: `%${name}%` };

  if (description) where.description = { [Op.like]: `%${description}%` };

  if (location) where.location = { [Op.like]: `%${location}%` };

  if (customSubject) where.customSubject = { [Op.like]: `%${customSubject}%` };

  /**
   * 일치 검색기 가능한 컬럼
   * weekPeriod,
   */
  if (UserId) where.UserId = UserId;
  // if (isMine && user) where.UserId = user.id;
  if (weekPeriod) where.weekPeriod = weekPeriod;

  /**
   * 범위 검새기 가능한 컬럼
   * startDate, endDate, startTime, endTime, limitedMemberCount
   */
  if (startDate) where.startDate = { [Op.gte]: startDate };
  if (endDate) where.endDate = { [Op.lte]: endDate };
  if (startTime) where.startTime = { [Op.gte]: startTime };
  if (endTime) where.endTime = { [Op.lte]: endTime };
  if (minLimitedMemberCount)
    where.limitedMemberCount = {
      [Op.gte]: minLimitedMemberCount
    };

  if (maxLimitedMemberCount)
    where.limitedMemberCount = {
      [Op.lte]: maxLimitedMemberCount
    };

  if (typeof isPrivate === "boolean") where.isPrivate = isPrivate;

  const studies =
    user && isMine // 마이페이지
      ? await models.Study.findAndCountAll({
          where,
          order,
          ...calculatePagination({ ...paginationParams }),
          include: [
            { model: models.StudyDay, where: whereDays },
            { model: models.StudyMember, where: { UserId: user.id } }
          ]
        })
      : await models.Study.findAndCountAll({
          where,
          order,
          ...calculatePagination({ ...paginationParams }),
          include: [{ model: models.StudyDay, where: whereDays }]
        });

  return studies;
};

// 스터디 상세
const getStudyById = async (_, { id }) => {
  const study = await models.Study.findByPk(id, { include: [models.StudyDay] });

  return study;
};

const studyQuery = {
  getStudies,
  getStudyById
};

export default studyQuery;
