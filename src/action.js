const core = require('@actions/core');
const github = require('@actions/github');
async function run(){
    const githubToken = core.getInput('GITHUB_TOKEN')

    const ocktokit = github.getOctokit(githubToken)

    const { context = {} } = github
    const {pull_request} = context.payload

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body:'Thank you for submitting a pull request!We will try to review it ASAP',
      });

    console.log("Hello world")
}

run()