import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

export const handler: Handler = async () => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    const results = await dynamoDB
      .scan({
        TableName: "TodoTable",
      })
      .promise();

    const todos = results.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    console.log(error);
  }
};
