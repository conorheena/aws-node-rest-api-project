import { Handler } from "aws-lambda";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

export const handler: Handler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = uuid();

  console.log("THIS IS AN ID", id);

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  dynamoDB.put({
    TableName: "TodoTable",
    Item: newTodo,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "todo created!",
    }),
  };
};
