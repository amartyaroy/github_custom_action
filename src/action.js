const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const fs = require("fs");

async function main() {
    // main function is called from the action.yml file
    try {
        //getting the inputs for the action 
        let file = core.getInput('file', {required: true});
        console.log('File',file)
        let field = core.getInput('field', {required: true});
        console.log('field',field)
        let value = core.getInput('value', {required: true});
        console.log('value',value)
        let parseJson = !!core.getInput('parse_json', {required: false});
        if (parseJson) {
            value = JSON.parse(value)
        }

        //creating instance of Ocktokit
        const octokit = new Octokit({ auth: `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` });
        const response = await octokit.request("GET /repos/{owner}/{repo}", {
          owner: "amartyaroy",
          repo: "github_custom_action",
        });
        console.log('response',response)

        
        let data = fs.readFileSync(file, 'utf8');
        let obj = JSON.parse(data);
        console.log('Data from file', obj)
        let root = obj;

        let parts = field.split(".");
        parts.forEach((part, index) => {
            let isLastItem = index === parts.length - 1;
            if (isLastItem) {
                obj[part] = value;
            } else {
                obj[part] = obj[part] || {}
                obj = obj[part];
            }
        });

        data = JSON.stringify(root, null, 2);
        fs.writeFileSync(file, data, 'utf8');

    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
}
