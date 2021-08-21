import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

const handler: Handler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  try {
    await dynamoDB
      .delete({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "todo deleted!",
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

export { handler };
