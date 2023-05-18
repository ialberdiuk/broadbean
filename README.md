# Broadbean-test

# Given one throw of the handful of dice identify these outcome; two-of-a-kind and three-of-a-kind

Two projects have been created to show the advantages/disadvantages of different approaches and AWS Serverless knowledge

This repo is made up of two lambda functions that are created via CloudFormation

The function 'RollDiceFunction' will create five dice assigning randomly a number (1 - 6 dots) and gets called through an endpoint (API Gateway). It invokes another lambda function to check if there are two of a kind and three of a kind in the throw. Please, find implementation details in the section below

Two lambda functions created to show event driven approach. To achieve this exercise is not necessary at all. It is not the best approach, we should avoid recursion in JS

Let's imagine a real application that is going to be used by millions of users, we might have the 'check' lambda function with a good performance algorithm to check if the payload contains the expected outcome. In this project I used brute force, just to compare the complexity and how important it can be when dealing with huge data sets

Please, have a look at this other repo below. Iteration instead of recursion and no implementation of synchronous invocation of a second lambda

[Broadbean Challenge](https://github.com/ialberdiuk/broadbean-challenge)

About this approach:

Use of recursion, it does not use recursion for calling AWS lambda function itself. however it uses recursion to call the invoke function, for long tasks better to use iteration instead of recursion (as I managed in the other repo)

Lambda invoke is only meant to show how to orchestrate/communicate different lambdas in the same stack

It invokes a second lambda to check the handful of dice but there is no need at all. It was meant to show how to invoke a lambda from another, the need to create policies and roles via CloudFormation

Invocation of lambda functions is a very handy approach if the process is not recursive and asynchronous. In a production/real environment I would not invoke a second lambda function to check the throw. It kills the performance, It is noticeable between this application and the other one (TimeEnd added, check the logs to see the execution time to find the expected outcome)

I strongly advise against to use recursion with lambdas, and in general when coding JS

Also, cold start is notorious, good food of discussion too

In the other hand, to check the expected outcome I used brute force, for arrays of a few elements the performance is good 

Again, in a prod environment if the array contains more than 5 elements obviously brute force should not be the option

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI).

Last to mention, I would love to add unit tests and a proper diagram but it would have been very time consuming

If you would like to deploy the stack in your own AWS account follow instructions below (just a couple of commands). If you don't modify anything you can skip sam build (it was not ignored intentionally)

## Try it out

[Play Game](https://01him1lbyi.execute-api.eu-west-1.amazonaws.com/Prod/start)

It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. (TODO) 
- `template.yaml` - A template that defines the application's AWS resources.

The application uses a few resources, including Lambda functions, an API Gateway API.
A specific role is created from the template and policies to write Cloudwatch logs as well as invoke other lambdas

## Deploy the sample application

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

The API Gateway endpoint API will be displayed in the outputs when the deployment is complete.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
my-application$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke CheckHandfulFunction --event events/events.json
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
my-application$ sam local start-api
my-application$ curl http://localhost:3000/
```

The AWS SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        Api:
          Type: Api
          Properties:
            Path: /
            Method: GET
```

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, the AWS SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs that are generated by your Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

**NOTE:** This command works for all Lambda functions, not just the ones you deploy using AWS SAM.

```bash
my-application$ sam logs -n putItemFunction --stack-name sam-app --tail
```

**NOTE:** This uses the logical name of the function within the stack. This is the correct name to use when searching logs inside an AWS Lambda function within a CloudFormation stack, even if the deployed function name varies due to CloudFormation's unique resource name generation.

You can find more information and examples about filtering Lambda function logs in the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name broadbean-test
```

## Resources

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Next, you can use the AWS Serverless Application Repository to deploy ready-to-use apps that go beyond Hello World samples and learn how authors developed their applications. For more information, see the [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/) and the [AWS Serverless Application Repository Developer Guide](https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html).
