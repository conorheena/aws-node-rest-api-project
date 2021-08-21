import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

const handler: Handler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  try {
    const results = await dynamoDB
      .get({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();

    const todo = results.Item;

    if (!todo) {
      return {
        statusCode: 404,
        body: JSON.stringify("todo not found"),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    console.log(error);
  }
};

export { handler };
