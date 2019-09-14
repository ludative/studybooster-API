const type = `
type User {
  id: Int!
  email: String!
  password: String!
  nickname: String,
  introduction: String,
  profileImage: String,
  isAdmin: Boolean!
  deleted: Boolean!
  createdAt: String
  updatedAt: String
}

type getUsers implements IPagination {
  count: Int!
  rows: [User]
}
`;

export default { type };
