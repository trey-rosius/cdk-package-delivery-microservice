import { util } from "@aws-appsync/utils";
export function request(ctx) {
  const { input } = ctx.args;

  const timestamp = util.time.nowEpochSeconds();
  const id = util.autoKsuid();

  console.log(`create package input ${input}`);

  const packageItem = {
    ...input,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return {
    method: "POST",
    version: "2018-05-29",
    resourcePath: "/v1.0/state/packages",

    params: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        Accept: "application/json",
      },

      body: {
        ...packageItem,
      },
    },
  };
}

export function response(ctx) {
  console.log(`response is ${ctx.result}`);
  const res = JSON.parse(ctx.result.body);
  return res;
}
