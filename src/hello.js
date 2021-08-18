"use strict";

const hello = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello there!",
    }),
  };
};

module.exports = {
  handler: hello,
};
