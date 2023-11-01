# Example NodeJS App Automatically Deployed to EC2 with GitHub Actions

![](https://res.cloudinary.com/practicaldev/image/fetch/s--Dha6Orav--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/54j0kdubyd5mxsmec7ys.png)


## Solution Overview

The solution utilizes [GitHub Actions](https://docs.github.com/en/actions) to build and deploy the application to EC2 whenever a commit is pushed to **main** branch.

This example requires the necessary AWS resources already be deployed to your account, instructions for creating those resource with CDK can be found in [GithubDeployedEc2App-CDK](https://github.com/CharlesKozel/GithubDeployedEc2App-CDK).

Key files are:
* **./github/workflows/deploy.yml** - Defines the GitHub Actions workflow, including when to trigger it, how to build the code and upload the code to AWS.

* **/appspec.yml** - Used by AWS CodeDeploy to speecify how to deploy the application, including where to copy files to on the host and how to start the application.

* **/ecosystem.config.js** - Config file for PM2, the utility responsible for making sure the application is always running. This defines what command starts the application, in this example `node` is used to run **/app.js**

# Tutorial

## 1. Fork THIS Repo

You will need your own copy of this repository to edit the configuration variables that point GitHub to your AWS resources.

Open https://github.com/CharlesKozel/GithubCodedeployDemo then click **Fork** near the top of the page to create a copy.

## 2. Set GitHub Actions Variables

In the repo you cloned on GitHub, click **Settings**, then under **Secrets and variables** click **Actions**.

![](https://drive.google.com/uc?export=view&id=1Vjb4aM1i6pDjmwZ0D7qUIg-Cp1rhzDrg) 

The values are avaiable as CloudFormation outputs, which will be printed when you deploy the stack with `cdk deploy`. They are also viewable on the AWS Console, search for "CloudFormation" and click on it, then under **Stacks** chose **GithubCodedeployCdkStack** then click the **Outputs** tab.

### Create These Secrets:


* **IAMROLE_GITHUB** - arn:aws:iam::XXXXXXXXXXX:role/GithubCodedeployCdkStack-GithubActionsRoleXXXXXXXX-XXXXXXXXX

* **S3BUCKET** - arn:aws:s3:::githubcodedeploycdkstack-deploymentbucketXXXXXXXX-XXXXXXXX

### Create These Variables:

* **AWSREGION** - us-east-2

* **CODEDEPLOYAPPLICATION** - DemoApplication

* **DEPLOYMENTGROUP** - OneBoxDeploymentGroup

## 3. Test It Out!

The workflow will be run whenever a new commit is pushed, or can be manually triggered from the Actions tab, select the workflow, then click **Run workflow**.

![](https://drive.google.com/uc?export=view&id=1DNZqJijqn16CTOE0908l0Dw_UT2qU2kU)

If all is setup correctly, you will see a green checkmark after a couple minuets. This means the deployment started in AWS, however it does not mean the deployment was successful. Tracking deployments and doing rollbacks on failures is out of scope for this example.

Since this example app runs a localhost:3000 webserver, you will need to use the AWS console to logon to the EC2 host to verify the applicaiton started correctly. eg:

    curl localhost:3000
    > Hello World