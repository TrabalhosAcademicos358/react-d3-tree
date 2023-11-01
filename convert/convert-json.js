import json from './results.json';

let jsonResult = {};

const createObj = (name, attributes) => {
  return { name, children: [], attributes };
};

const getValueFromObj = (value, obj) => {
    const 
}

const addChildrenObj = (key, obj) => {
  let objCurrent = jsonResult.root;
  let pathListObjInJson = ""
  let cont = 0
  const pathTestCase = key.split('->');
  pathTestCase.shift();

  pathTestCase.forEach(keyPath => {
    objCurrent = objCurrent.children.find(item => item.name === keyPath)
    if (objCurrent)
  })
};

const linksForNodesGroup = Object.keys(json)
  .map(key => {
    const pathTestCase = key.split('->');
    if (pathTestCase.length > 1) {
      pathTestCase.pop();
      const stringIdNodeSource = pathTestCase.join('->');

      return { source: stringIdNodeSource, target: key, value: 4 };
    } else {
      const newObj = createObj(key, json[key]);
      jsonResult = { ...jsonResult, newObj };
    }
    return null;
  })
  .filter(item => item !== null);
