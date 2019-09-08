const React = require("react");
const simpleAddLibrary = require("simple-add-library");
const logo = require("./imags/timg.jpeg");
require("./search.less");

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
        <div>
          999 + 1 =
          {simpleAddLibrary("999", "1")}
        </div>
      </div>
    );
  }
}

module.exports = <Index />;
