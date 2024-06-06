# Package Delivery Service CDK Application

## Solutions Architecture

![solutions-architecture](https://raw.githubusercontent.com/trey-rosius/package-delivery-microservice-cdk/master/assets/solutions_arch.png)

This application serves as a single endpoint entry into the package delivery microservice api created [here](https://github.com/trey-rosius/package-delivery-microservice).

This application is a Graphql API built with AWS Appsync and Javascript Resolvers. No Lambda functions.

One of the main strengths of Graphql is it's ability to grab data from different datasources.

Our microservice API had 4 datasources hosted on AppRunner.

With a singular API, it's easier to add authentication and authorization, which we've done that through AWS Cognito. We've also added rate limiting and throttling to prevent miss-use of the api using AWS Web Application Firewall(WAF)

# Welcome to your CDK TypeScript project

API_URL=""
API_KEY=""
echo $API

jq -ncM '{method: "POST", url: "https://3clidexd65h2ri2ppl7d3jf6ii.appsync-api.us-east-2.amazonaws.com/graphql", body: {query: "query packagePickupRequest {
sendPackagePickupRequest(packageId: \"8ecf99c5-99bf-465c-b978-e7d21f79cf3e\")
}"} | @base64, header: {"content-type": ["application/json"], "x-api-key": ["da2-aoelbk46anfnxfhufpgp2alloy"]}}' | vegeta attack -format=json -duration=60s | tee report.bin | vegeta report

```

Requests      [total, rate, throughput]
                3000, 50.02, 47.55
Duration      [total, attack, wait]
                1m3s, 59.979s, 3.117s
Latencies     [min,       mean,   50,     90,     95,    99,     max]
               229.088ms, 4.179s, 6.054s, 7.344s, 7.44s, 7.614s, 8.046s

Bytes In      [total, mean]
               334174, 111.39
Bytes Out     [total, mean]
               372000, 124.00
Success       [ratio]
               100.00%
Status Codes  [code:count]
               200: 3000
```

AFTER STEPPING UP THE CPU OF `PACKAGE-SERVICE` AND `PICKUP-SERVICE` TO 2vCPU

```
Requests      [total, rate, throughput]         3000, 50.02, 47.61
Duration      [total, attack, wait]             1m3s, 59.979s, 3.032s
Latencies     [min, mean, 50, 90, 95, 99, max]
               245.281ms, 3.952s, 4.615s, 4.917s, 4.958s, 5.162s, 5.557s
Bytes In      [total, mean]                     321252, 107.08
Bytes Out     [total, mean]                     372000, 124.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:3000

```

Ran again

```
Requests      [total, rate, throughput]         3000, 50.02, 39.71
Duration      [total, attack, wait]             1m16s, 59.979s, 15.545s
Latencies     [min, mean, 50, 90, 95, 99, max]  227.947ms, 3.656s, 4.408s, 4.933s, 4.969s, 5.156s, 30.005s
Bytes In      [total, mean]                     327308, 109.10
Bytes Out     [total, mean]                     371876, 123.96
Success       [ratio]                           99.97%
Status Codes  [code:count]                      0:1  200:2999
Error Set:
Post "https://3clidexd65h2ri2ppl7d3jf6ii.appsync-api.us-east-2.amazonaws.com/graphql": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
```

https://docs.dapr.io/reference/components-reference/supported-state-stores/setup-mongodb/
