(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(22)},16:function(e,t,a){},18:function(e,t,a){},20:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),s=a.n(l),o=(a(16),a(2)),i=a(3),c=a(6),u=a(4),m=a(5),d=(a(18),a(1)),p=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.children.map(function(t){return r.a.createElement("button",{onClick:function(){return e.props.changeTab(t.props.tabName)}},t.props.tabName)});return r.a.createElement("div",null,t)}}]),t}(n.Component),h=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.props.children.filter(function(t){return t.props.tabName===e.props.displayTab}))}}]),t}(n.Component),b=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={displayTab:""},a.changeTab=a.changeTab.bind(Object(d.a)(Object(d.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.defaultTab?this.setState({displayTab:this.props.defaultTab}):this.setState({displayTab:this.props.children[0].props.tabName})}},{key:"changeTab",value:function(e){this.setState({displayTab:e})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p,{changeTab:this.changeTab},this.props.children),r.a.createElement(h,{displayTab:this.state.displayTab},this.props.children))}}]),t}(n.Component),f=a(7),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={responseFeedback:"",stacksList:{},formData:{title:"",authorFirst:"",authorLast:"",publisher:"",publishedYear:"",upc:"",isbn:"",format:"",shelfLocation:"",state:"",genre:"",subjects:""}},a.formDataUpdater=a.formDataUpdater.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"stackReducer",value:function(e,t){return e["".concat(t.container,"-").concat(t.name)]=t.id,e}},{key:"getStacksList",value:function(){var e=this,t=new XMLHttpRequest;t.open("GET","/api/stacks",!0),t.onreadystatechange=function(){if(4===t.readyState){var a=JSON.parse(t.responseText).reduce(e.stackReducer,{}),n=Object.keys(a)[0];e.setState({stacksList:a}),e.setState({shelfLocation:n})}},t.send()}},{key:"formDataUpdater",value:function(e){var t=e.target.id,a=e.target.value,n=Object(f.a)({},this.state.formData);n[t]=a,this.setState({formData:n})}},{key:"handleResponse",value:function(){console.log("HTML Response: 724, This line should be unreachable.")}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=Object(f.a)({},this.state.formData);a.shelfLocation=a.shelfLocation?this.state.stacksList[a.shelfLocation]:this.state.stacksList[Object.keys(this.state.stacksList)[0]];var n=JSON.stringify(a),r=new XMLHttpRequest;r.onreadystatechange=function(){if(4===r.readyState)switch(r.status){case 200:t.setState({responseFeedback:"Successfully added ".concat(t.state.formData.title," to database.")});t.setState({formData:{title:"",authorFirst:"",authorLast:"",publisher:"",publishedYear:"",upc:"",isbn:"",format:"",state:"",genre:"",subjects:""}});break;case 500:t.setState({responseFeedback:"An error has occured ".concat(t.state.formData.title," not added to database")});break;default:t.setState({responseFeedback:"Something unexpected has occured. status was: ".concat(r.status)})}},r.open("POST","api/books",!0),r.setRequestHeader("Content-Type","application/json"),r.send(n)}},{key:"componentDidMount",value:function(){this.getStacksList()}},{key:"render",value:function(){var e=Object.keys(this.state.stacksList).map(function(e){return r.a.createElement("option",null," ",e," ")});return r.a.createElement("div",{id:"StackAdderContainer"},r.a.createElement("form",{id:"BookAdderForm"},r.a.createElement("label",null," title:         ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"title"}),"        "),r.a.createElement("br",null),r.a.createElement("label",null," authorFirst:   ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"authorFirst"}),"  "),r.a.createElement("br",null),r.a.createElement("label",null," authorLast:    ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"authorLast"}),"   "),r.a.createElement("br",null),r.a.createElement("label",null," genre:         ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"genre",placeholder:"Seperate, each, genre, with, a, comma"}),"    "),r.a.createElement("br",null),r.a.createElement("label",null," subjects:      ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"subjects",peholder:"Seperate, each, genre, with, a, comma"}),"    "),r.a.createElement("br",null),r.a.createElement("label",null," publisher:     ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"publisher"}),"    "),r.a.createElement("br",null),r.a.createElement("label",null," publishedYear: ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"publishedYear"})),r.a.createElement("br",null),r.a.createElement("label",null," upc:           ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"upc"}),"          "),r.a.createElement("br",null),r.a.createElement("label",null," isbn:          ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"isbn"}),"         "),r.a.createElement("br",null),r.a.createElement("label",null," format:        ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"format",list:"formatList"}),"       "),r.a.createElement("br",null),r.a.createElement("datalist",{id:"formatList"},r.a.createElement("option",null,"Paperback"),r.a.createElement("option",null,"Hardback"),r.a.createElement("option",null,"DVD")),r.a.createElement("label",null,"shelfLocation:",r.a.createElement("select",{onChange:this.formDataUpdater,type:"text",id:"shelfLocation"},e)),r.a.createElement("br",null),r.a.createElement("label",null," condition:     ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"state"}),"        "),r.a.createElement("br",null),r.a.createElement("datalist",{id:"conditionList"},r.a.createElement("option",null,"Perfect"),r.a.createElement("option",null,"Used"),r.a.createElement("option",null,"Damaged"),r.a.createElement("option",null,"Falling Apart")),r.a.createElement("button",{onClick:this.handleSubmit},"Submit"),r.a.createElement("div",{id:"serverResponse"},this.state.responseFeedback)))}}]),t}(r.a.Component);var v=function(){return r.a.createElement("div",{className:".compBorder"},r.a.createElement(E,null))},k=(a(20),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={serverResponse:"",formData:{name:"",building:"",floor:"",room:"",container:"",containerType:"",description:""},containerTypes:[]},a.formDataUpdater=a.formDataUpdater.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"formDataUpdater",value:function(e){var t=e.target.id,a=e.target.value,n=Object(f.a)({},this.state.formData);n[t]=a,this.setState({formData:n})}},{key:"handleResponse",value:function(){console.log("HTML Response: 724, This line should be unreachable.")}},{key:"handleSubmit",value:function(e){var t=this,a=JSON.stringify(this.state.formData),n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState)switch(n.status){case 200:t.setState({serverResponse:'New container "'.concat(t.state.formData.name,'" successfully added to the stacks.')});break;case 500:t.setState({serverResponse:"Error adding new container to stacks."});break;default:t.setState({serverResponse:"Something unexpected has occured. Server response code: ".concat(n.status)})}},n.open("POST","api/stacks",!0),n.setRequestHeader("Content-Type","application/json"),n.send(a)}},{key:"render",value:function(){return r.a.createElement("div",{id:"StackAdderContainer"},r.a.createElement("form",{id:"StackAdderForm"},r.a.createElement("label",null," name         : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"name"})),r.a.createElement("br",null),r.a.createElement("label",null," building     : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.building,type:"text",id:"building"})),r.a.createElement("br",null),r.a.createElement("label",null," floor        : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.floor,type:"text",id:"floor"})),r.a.createElement("br",null),r.a.createElement("label",null," room         : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.room,type:"text",id:"room"})),r.a.createElement("br",null),r.a.createElement("label",null," container    : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.container,type:"text",id:"container"})),r.a.createElement("br",null),r.a.createElement("label",null," containerType: ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.containerType,type:"text",id:"containerType"})),r.a.createElement("br",null),r.a.createElement("label",null," description  : ",r.a.createElement("textarea",{onChange:this.formDataUpdater,value:this.state.formData.description,id:"description"})),r.a.createElement("br",null),r.a.createElement("button",{type:"button",onClick:this.handleSubmit},"submit")),r.a.createElement("div",{id:"serverResponse"},this.state.serverResponse))}}]),t}(r.a.Component));var y=function(){return r.a.createElement("div",null,r.a.createElement(k,null))},g=a(10);var D=function(e){return r.a.createElement("tr",null,r.a.createElement("td",{className:"title"},e.book.title),r.a.createElement("td",{className:"author"},"".concat(e.book.authorFirst," ").concat(e.book.authorLast)),r.a.createElement("td",{className:"year"},e.book.publishedYear),r.a.createElement("td",{className:"genre"},e.book.genre))};var j=function(e){var t=e.booksList.map(function(e){return r.a.createElement(D,{book:e})});return r.a.createElement("table",{className:"bookListingTable"},r.a.createElement("tr",null,r.a.createElement("td",{className:"title tableHeading"},"Title"),r.a.createElement("td",{className:"author tableHeading"},"Author"),r.a.createElement("td",{className:"year tableHeading"},"Year"),r.a.createElement("td",{className:"genre tableHeading"},"Genre")),t)},O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={serverResponse:"",booksList:[]},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"getBookList",value:function(){var e=this,t=new XMLHttpRequest;t.open("GET","/api/books",!0),t.onreadystatechange=function(){if(4===t.readyState){var a=JSON.parse(t.responseText);e.setState({booksList:Object(g.a)(a)})}},t.send()}},{key:"componentDidMount",value:function(){this.getBookList()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(j,{booksList:this.state.booksList}),r.a.createElement("div",{id:"serverResponse"},this.state.serverResponse))}}]),t}(n.Component),S=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b,null,r.a.createElement(O,{tabName:"BookSearch"}),r.a.createElement(y,{tabName:"StackAdder"}),r.a.createElement(v,{tabName:"BookAdder"})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,2,1]]]);
//# sourceMappingURL=main.55f8405f.chunk.js.map