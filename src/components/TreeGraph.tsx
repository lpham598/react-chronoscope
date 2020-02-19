import * as React from "react";
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'App',
    attributes: {
      keyApp: 'val A',
    },
    children: [
      {
        name: 'A1',
        attributes: {
          keyA: 'val A',
        },
      },
      {
        name: 'A2',
      },
    ],
  },
];

const myTreeData2 = [
  {
    name: 'App',
    children: [
      {
        name: 'Table',
        children: []
      }
    ]
  }
]

let treeGraphData = myTreeData2;

interface Props {};
interface State {
  data: object;
}

class TreeGraph extends React.PureComponent <Props, State> {

  state: State = {
    data : treeGraphData
  };

  componentDidMount() {
    setTimeout(() => {
      console.log('TreeGraph mounted');
      // open connection with background script
      const port = chrome.runtime.connect();
      // listen for a message containing snapshots from the background script
      port.onMessage.addListener(message => {
        console.log('This is message from TreeGraph componentDidMount - port message: ', message);
        treeGraphData = [message.payload.payload];

        this.setState({
          data: treeGraphData
        });

        console.log('Formatted: ', treeGraphData);
        console.log('myTreeData2: ', myTreeData2);
      })
    }, 2000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log('TreeGraph mounted');
      // open connection with background script
      const port = chrome.runtime.connect();
      // listen for a message containing snapshots from the background script
      port.onMessage.addListener(message => {
        console.log('UPDATE- port message: ', message);
        treeGraphData = [message.payload.payload];

        this.setState({
          data: treeGraphData
        });

        console.log('Formatted: ', treeGraphData);
        console.log('myTreeData2: ', myTreeData2);
      })
    }, 2000);
  }

  render() {

    return (
      // <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
      <div id='treeGraph' style={{'height': '500px'}}>

      <Tree data={this.state.data} orientation="vertical" translate={{ x: 100, y: 20}}/>

      </div>
    );
  }
}

export default TreeGraph;