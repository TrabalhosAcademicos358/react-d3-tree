import * as jsonFile from './results.json' assert { type: "json" };
import fs from 'fs';

const json = jsonFile.default;
let jsonResult = {};

const separatePath = '->';

const modifyAtributesVisualization = (obj) => {
  let newObj = {};

  Object.keys(obj).forEach(key => {
    newObj[key] = obj[key].length;
  })

  return newObj;
}

const createObj = (name, objAttributes) => {
  const attributes = modifyAtributesVisualization(objAttributes);
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
      addChildrenObj(key, json[key])
    } else {
      const newObj = createObj(key, json[key]);
      jsonResult = { ...jsonResult, ...newObj };
    }
  })

fs.writeFileSync('/home/pedro/GitHub/outros/react-d3-tree/demo/src/examples/results.json', JSON.stringify(jsonResult))