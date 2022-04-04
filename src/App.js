import './App.css';

import jsonpath from 'jsonpath';
import ConditionsView from './conditions-view';
import {mockRule} from './mockData';

const getDataPaths = function(conditions, path = '$') {
  let nextPath;
  const paths = [];

  if(Array.isArray(conditions)){
    for(const [index, value] of conditions.entries()){
      nextPath = `${path}[${index}]`;
      paths.push(...getDataPaths(value, nextPath));
    }
  } else if(conditions.all || conditions.any) {
    if (conditions.all) {
      nextPath = `${path}.all`;
      paths.push(...getDataPaths(conditions.all, nextPath));
    }
    if (conditions.any) {
      nextPath = `${path}.any`;
      paths.push(...getDataPaths(conditions.any, nextPath));
    }
  } else {
    paths.push(path);
  }
  return paths;
}


const getRuleTree = function(rule) {
  const rootDoc = {items: []};
  const dataPaths = getDataPaths(rule.conditions);
  const regex = /[^A-Za-z.]/g;


  console.log('dataPaths=', dataPaths);

  for(const p of dataPaths) {
    const fact = jsonpath.query(rule.conditions, p)[0];
    const pieces = p.slice(1).replace(regex, '').split('.').filter(p => p.length);

    console.log('pieces=', pieces);

    /**
    for(const [i, v] of pieces.entries()){
      const existing = rootDoc.items.find(d => d.header === v.toUpperCase());
      if(!existing){
        rootDoc.items.push({
          key: `${v.toUpperCase()}-${i}`,
          header: v.toUpperCase()
        });
      }
    }
    **/
    /**
    if(!rootDoc.header){
      rootDoc.header = String(pieces[0]).toUpperCase();
    }

    if(pieces.length > 1){
      //TODO: need to handle depth better
      const existing = rootDoc.items.find(d => d.header === pieces[pieces.length-1].toUpperCase());
      if(!existing){
        rootDoc.items.push({
          key: p,
          header: pieces[pieces.length -1].toUpperCase(),
          items: [{
            key: `${fact.fact}`,
            fact
          }]
        });
      } else {
        existing.items.push({
          key: p,
          fact
        });
      }
    } else {
      rootDoc.items.push({
        key: p,
        fact
      });
    }
    **/
  }

  console.log(rootDoc);

  return rootDoc;
}

function App() {
  const data = getRuleTree(mockRule);

  return (
    <div className="App">
      <ConditionsView {...data} />
    </div>
  );
}

export default App;
