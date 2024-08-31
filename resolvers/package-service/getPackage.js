export function request(ctx) {
  const { packageId } = ctx.args;

  return {
    version: "2018-05-29",
    method: "GET",
    params: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        Accept: "application/json",
      },
    },
    resourcePath: `/v1.0/state/packages/${packageId}`,
  };
}

export function response(ctx) {
  console.log(`response is ${ctx.result}`);
  const res = JSON.parse(ctx.result.body);

  return res;
}
