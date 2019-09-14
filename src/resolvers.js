import usersQuery from "./resolvers/query/users";

const resolvers = {
  Query: { ...usersQuery }
};

export default resolvers;
