import React from "react";
import ReactDom from "react-dom";
import "./search.less";
import logo from "./imags/timg.jpeg";

class Search extends React.Component{
 render() {
     console.log(logo);
     return <div className="search-text">搜索文字内容<img src={logo}/></div>
 }
}


ReactDom.render(<Search/>, document.getElementById("root"))