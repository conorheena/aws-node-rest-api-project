import { Handler } from "aws-lambda";
// import AWS from "aws-sdk";

export const handler: Handler = async () => {
  //   const dynamoDB = new AWS.DynamoDB.DocumentClient();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "fetched todos!",
    }),
  };
};
