import models from '../models'

export const authenticatedMiddleware = next => (root, args, context, info) => {
    if (!context.user) {
        throw new Error("잘못된 접근입니다.");
    }

    return next(root, args, context, info);
};

export const authenticatedStudyMemberMiddleware = next => async (root, args, context, info) => {
    if (!context.user) {
        throw new Error("잘못된 접근입니다.");
    }

    const isStudyAdmin = await models.Study.findOne({
        where: {
            UserId: context.user.id,
            id: args.studyId
        }
    });

    if (!isStudyAdmin) {
        const member = await models.StudyMember.findOne({
            where: {
                UserId: context.user.id,
                StudyId: args.studyId
            }
        });

        if (!member) throw new Error('일치하는 스터디 회원이 존재하지 않습니다.');
        if (member.isBanish) throw new Error('스터디장으로 부터 추방 당하셨습니다ㅠㅠ');
        if (member.isReject) throw new Error('스터디 신청이 거절되었습니다ㅠㅠ');
    }

    return next(root, args, context, info);
};

export const authenticatedStudyAdminMiddleware = next => async (root, args, context, info) => {
    if (!context.user) {
        throw new Error("잘못된 접근입니다.");
    }

    const isStudyAdmin = await models.Study.findOne({
        where: {
            UserId: context.user.id,
            id: args.studyId
        }
    });

    if (!isStudyAdmin) throw new Error('스터디를 생성한 관리자만 수정가능합니다.');

    return next(root, args, context, info);
};

export const authenticatedAdminMiddleware = next => (root, args, context, info) => {
    if (!context.user) {
        throw new Error("잘못된 접근입니다.");
    }

    if (!context.user.isAdmin) {
        throw new Error("관리자만 접근 가능합니다.")
    }

    return next(root, args, context, info);
};
