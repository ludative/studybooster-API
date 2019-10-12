import { Op } from "sequelize";
import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";

// 스터디 리스트
const getStudies = async (_, { paginationParams, params }) => {
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
    orderBy = "createdAt",
    orderDirection = "DESC"
  } = params;

  const where = {};
  const order = [[orderBy, orderDirection]];

  /**
   * like 검새기 가능한 컬럼
   * name, description, location, customSubject
   */
  if (typeof name === "string") where.name = { [Op.like]: `%${name}%` };

  if (typeof description === "string")
    where.description = { [Op.like]: `%${description}%` };

  if (typeof location === "string")
    where.location = { [Op.like]: `%${location}%` };

  if (typeof customSubject === "string")
    where.customSubject = { [Op.like]: `%${customSubject}%` };

  /**
   * 일치 검색기 가능한 컬럼
   * weekPeriod,
   */
  if (typeof UserId === "integer") where.UserId = UserId;
  if (typeof weekPeriod === "integer") where.weekPeriod = weekPeriod;

  /**
   * 범위 검새기 가능한 컬럼
   * startDate, endDate, startTime, endTime, limitedMemberCount
   */
  if (typeof startDate === "float") where.startDate = { [Op.gte]: startDate };
  if (typeof endDate === "float") where.endDate = { [Op.lte]: endDate };
  if (typeof startTime === "integer") where.startTime = { [Op.gte]: startTime };
  if (typeof endTime === "integer") where.endTime = { [Op.lte]: endTime };
  if (typeof minLimitedMemberCount === "integer")
    where.limitedMemberCount = {
      [Op.gte]: minLimitedMemberCount
    };

  if (typeof maxLimitedMemberCount === "integer")
    where.limitedMemberCount = {
      [Op.lte]: maxLimitedMemberCount
    };

  if (typeof isPrivate === "boolean") where.isPrivate = isPrivate;

  const studies = await models.Study.findAndCountAll({
    where,
    order,
    ...calculatePagination({ ...paginationParams })
  });

  return studies;
};

// 스터디 상세
const getStudyById = async (_, { id }) => {
  const study = await models.Study.findByPk(id);

  return study;
};

const studyQuery = {
  getStudies,
  getStudyById
};

export default studyQuery;
