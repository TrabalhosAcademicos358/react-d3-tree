import * as jsonFile from './results.json' assert { type: "json" };
import fs from 'fs';

const json = jsonFile.default;
let jsonResult = {};

const separatePath = '->';

const createObj = (name, attributes) => {
  return { name, children: [], attributes };
};

const addChildrenObj = (key, obj) => {
  let objCurrent = jsonResult;
  const pathTestCase = key.split(separatePath);
  pathTestCase.shift();
  pathTestCase.pop();

  pathTestCase.forEach(keyPath => {
    objCurrent = objCurrent.children.find(item => item.name.includes(keyPath))
  })

  const newObj = createObj(key, obj)
  objCurrent.children.push(newObj)
  return newObj
};

Object.keys(json)
  .forEach(key => {
    const pathTestCase = key.split(separatePath);
    if (pathTestCase.length > 1) {
      // pathTestCase.pop();
      // const stringIdNodeSource = pathTestCase.join(separatePath);
      addChildrenObj(key, json[key])
      // return { source: stringIdNodeSource, target: key, value: 4 };
    } else {
      const newObj = createObj(key, json[key]);
      jsonResult = { ...jsonResult, ...newObj };
    }
  })

fs.writeFileSync('/home/pedro/GitHub/outros/react-d3-tree/demo/src/examples/results.json', JSON.stringify(jsonResult))