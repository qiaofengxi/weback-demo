import React from 'react';
import ReactDom from 'react-dom';
import './search.less';
import simpleAddLibrary from "simple-add-library";
import logo from './imags/timg.jpeg';
import plane from "./imags/plane.jpg";

class Index extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      text: '',
    };
  }

  loadComponent() {
        import('./text.js').then((text) => {
          this.setState({
            text: text.default,
          });
        });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="search-text">
        {text || ''}
             搜索文字内容
        <img src={logo} onClick={this.loadComponent.bind(this)} alt="" />
        <img src={plane} alt="" width={200} height={200} />
        <div>
          999 + 1 =
          {simpleAddLibrary("999", "1")}
        </div>
      </div>
    );
  }
}


ReactDom.render(<Index />, document.getElementById('root'));
