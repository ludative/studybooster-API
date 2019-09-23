const calculatePagination = ({page = 0, pageSize = 10}) => {
    const limit = +pageSize;
    const offset = +page > 1 ? (+page - 1) * limit : 0;
    return { offset, limit }
};

export default calculatePagination;