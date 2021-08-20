import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const baseHandler: Handler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const { completed } = event.body;

  try {
    await dynamoDB
      .update({
        TableName: "TodoTable",
        Key: { id },
        UpdateExpression: "set completed = :completed",
        ExpressionAttributeValues: {
          ":completed": completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "todo updated!",
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

export const handler = middy(baseHandler).use(httpJsonBodyParser());
