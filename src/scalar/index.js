import { GraphQLScalarType } from "graphql";

import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

const ValidateStringType = params => {
  return new GraphQLScalarType({
    name: params.name, // 내가 선언하는 Type 명
    serialize: value => {
      // 클라이언트에서 응답받는 값(string, number, array, object) 뭐든 될 수 있다.
      return value;
    },
    parseValue: value => {
      // 리턴되는 값(간단히?)
      return value;
    },
    parseLiteral: ast => {
      // 실제 params를 통해서 구햔하는 부분
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          "Query error: Can only parse strings got a: " + ast.kind,
          [ast]
        );
      }
      if (ast.value.length < params.min) {
        throw new GraphQLError(`최소 ${params.min}자이상 필요합니다.`, [ast]);
      }
      if (ast.value.length > params.max) {
        throw new GraphQLError(`최대 ${params.max}자까지 입니다.`, [ast]);
      }
      if (params.regex !== null) {
        if (!params.regex.test(ast.value)) {
          let errorSentence = "";
          switch (params.name) {
            case "Email":
              errorSentence = "이메일 형식에 맞지 않습니다.";
              break;
            case "Password":
              errorSentence = "비밀번호 형식에 맞지 않습니다.";
              break;
          }
          throw new GraphQLError(errorSentence, [ast]);
        }
      }
      return ast.value;
    }
  });
};

const Email = ValidateStringType({
  name: "Email",
  min: 1,
  max: 30,
  regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
});

const Password = ValidateStringType({
  name: "Password",
  min: 8,
  max: 20,
  regex: /^(?=.*?[#?!@$%^&*-]).{8,}$/
});

const customScalars = { Email, Password };

export default customScalars;
