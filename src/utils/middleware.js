export const authenticatedMiddleware = next => (root, args, context, info) => {
    if (!context.user) {
        throw new Error("잘못된 접근입니다.");
    }

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
