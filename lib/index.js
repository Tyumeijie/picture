import readConfigFile from './readConfigs';
import actions from './actions';
import Octokit from '@octokit/rest';

const configs = readConfigFile().github;

const octokit = new Octokit({
  auth () {
    return `token ${configs.token}`;
  },
  baseUrl: 'https://api.github.com'
});

console.log(`${configs.token}--4`);
actions.createFiles(octokit, configs);
