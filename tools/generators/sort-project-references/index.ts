import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { updateJson } from '@nrwl/devkit';

export default async function (host: Tree, schema: any) {
  //incrementVersion(host);
  sortKeys(host, 'workspace.json');
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
export function incrementVersion(host: Tree) {
  updateJson(host, 'workspace.json', (wsjson) => {
    wsjson.version++;
    return wsjson;
  })
}

function sortKeys(host: Tree, file: string) {
  updateJson(host, file, (json) => {
    json.projects = sortObjectKeys(json.projects);
    return json;
  });
}
function sortObjectKeys(obj: any) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}
