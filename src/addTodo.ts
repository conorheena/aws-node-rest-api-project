import { Handler } from "aws-lambda";
import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const baseHandler: Handler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = uuid();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  try {
    await dynamoDB
      .put({
        TableName: "TodoTable",
        Item: newTodo,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "todo created!",
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

export const handler = middy(baseHandler).use(httpJsonBodyParser());
