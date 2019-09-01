import React from "react";
import ReactDom from "react-dom";
import "./search.less";
import logo from "./imags/timg.jpeg";

class Index extends React.Component{
    constructor() {
        super(...arguments);

        this.state = {
            text: ""
        }
    }

    loadComponent() {
        import("./text.js").then((text) => {
            this.setState({
                text: text.default
            })
        })
    }

 render() {
        const { text } = this.state;
     return (
         <div className="search-text">
             {text || ""}
             搜索文字内容
             <img src={logo} onClick={this.loadComponent.bind(this)} />
         </div>
     )
 }
}


ReactDom.render(<Index/>, document.getElementById("root"));