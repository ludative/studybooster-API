import { Op } from "sequelize";
import models from "../../models";

// 스터디 리스트
const getStudies = async ({ params, userId }) => {
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
    orderBy = "createdAt",
    orderDirection = "DESC"
  } = params;

  const where = {};

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
   * weekPeriod, startDate, endDate, startTime, endTime,
   */

  if (typeof startDate === "float") where.startDate = startDate;
  if (typeof endDate === "float") where.endDate = endDate;
  if (typeof startTime === "integer") where.startTime = startTime;
  if (typeof endTime === "integer") where.endTime = endTime;
  if (typeof weekPeriod === "integer") where.weekPeriod = weekPeriod;

  /**
   * 범위 검새기 가능한 컬럼
   * limitedMemberCount
   */
  if (typeof minLimitedMemberCount === "integer")
    where.limitedMemberCount = {
      [Op.lte]: minLimitedMemberCount
    };

  const studies = await models.Study.findAndCountAll();

  return studies;
};

// 스터디 상세
const getStudyById = async (_, { id }) => {
  const study = await models.Study.findByPk(id);

  return study;
};
