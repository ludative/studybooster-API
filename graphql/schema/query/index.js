import users from "./users";

const query = `
type Query {
  ${users}
}
`;

export default query;
