(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(21)},15:function(e,t,a){},17:function(e,t,a){},19:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),i=(a(15),a(2)),c=a(3),u=a(6),s=a(4),m=a(5);a(17);var d=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"TODO: The Header!"))},h=a(7),p=a(1),f=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={nameIdRef:{},formData:{title:"",authorFirst:"",authorLast:"",publisher:"",publishedYear:"",upc:"",isbn:"",format:"",checkedOut:"",shelfLocation:"",state:""}},a.formDataUpdater=a.formDataUpdater.bind(Object(p.a)(Object(p.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(Object(p.a)(a))),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"nameIdRefReducer",value:function(e,t){return e["".concat(t.container,"-").concat(t.name)]=t.id,e}},{key:"fetchStacksList",value:function(){var e=this,t=new XMLHttpRequest;t.open("GET","/api/stacks",!0),t.onreadystatechange=function(){if(console.log(t.readyState),4===t.readyState){var a=JSON.parse(t.response).reduce(e.nameIdRefReducer,{});e.setState({nameIdRef:a})}},t.send()}},{key:"formDataUpdater",value:function(e){var t=e.target.id,a=e.target.value,n=Object(h.a)({},this.state.formData);n[t]=a,this.setState({formData:n})}},{key:"handleResponse",value:function(){console.log("HTML Response: 724, This line should be unreachable.")}},{key:"handleSubmit",value:function(e){var t=JSON.stringify(this.state.formData),a=new XMLHttpRequest;a.open("POST","api/books",!0),a.setRequestHeader("Content-Type","application/json"),a.send(t)}},{key:"componentDidMount",value:function(){this.fetchStacksList()}},{key:"render",value:function(){return r.a.createElement("div",{id:"StackAdderContainer"},r.a.createElement("p",null,this.state.nameIdRef.toString()),r.a.createElement("form",{id:"BookAdderForm"},r.a.createElement("label",null," title:         ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"title"}),"        "),r.a.createElement("br",null),r.a.createElement("label",null," authorFirst:   ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"authorFirst"}),"  "),r.a.createElement("br",null),r.a.createElement("label",null," authorLast:    ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"authorLast"}),"   "),r.a.createElement("br",null),r.a.createElement("label",null," publisher:     ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"publisher"}),"    "),r.a.createElement("br",null),r.a.createElement("label",null," publishedYear: ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"publishedYear"})),r.a.createElement("br",null),r.a.createElement("label",null," upc:           ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"upc"}),"          "),r.a.createElement("br",null),r.a.createElement("label",null," isbn:          ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"isbn"}),"         "),r.a.createElement("br",null),r.a.createElement("label",null," format:        ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"format"}),"       "),r.a.createElement("br",null),r.a.createElement("label",null," checkedOut:    ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"checkedOut"}),"   "),r.a.createElement("br",null),r.a.createElement("label",null," shelfLocation: ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"shelfLocation"})),r.a.createElement("br",null),r.a.createElement("label",null," condition:     ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"state"}),"        "),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.fetchStacksList},"Test it")),r.a.createElement("div",null))}}]),t}(r.a.Component),b=function(e){function t(e){return Object(i.a)(this,t),Object(u.a)(this,Object(s.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"adderFunction",value:function(e){console.log(e)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,{adderFunction:this.adderFunction}))}}]),t}(n.Component),E=(a(19),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={formData:{name:"Lower Shelf",building:"home",floor:"ground",room:"bedroom",container:"Black Bookshelf",containerType:"shelf",description:"Black bookshelf in closet, lower shelf."},containerTypes:[]},a.formDataUpdater=a.formDataUpdater.bind(Object(p.a)(Object(p.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(Object(p.a)(a))),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"formDataUpdater",value:function(e){var t=e.target.id,a=e.target.value,n=Object(h.a)({},this.state.formData);n[t]=a,this.setState({formData:n})}},{key:"handleResponse",value:function(){console.log("HTML Response: 724, This line should be unreachable.")}},{key:"handleSubmit",value:function(e){var t=JSON.stringify(this.state.formData),a=new XMLHttpRequest;a.open("POST","api/stacks",!0),a.setRequestHeader("Content-Type","application/json"),a.send(t)}},{key:"render",value:function(){return r.a.createElement("div",{id:"StackAdderContainer"},r.a.createElement("form",{id:"StackAdderForm"},r.a.createElement("label",null," name         : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.name,type:"text",id:"name"})),r.a.createElement("br",null),r.a.createElement("label",null," building     : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.building,type:"text",id:"building"})),r.a.createElement("br",null),r.a.createElement("label",null," floor        : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.floor,type:"text",id:"floor"})),r.a.createElement("br",null),r.a.createElement("label",null," room         : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.room,type:"text",id:"room"})),r.a.createElement("br",null),r.a.createElement("label",null," container    : ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.container,type:"text",id:"container"})),r.a.createElement("br",null),r.a.createElement("label",null," containerType: ",r.a.createElement("input",{onChange:this.formDataUpdater,value:this.state.formData.containerType,type:"text",id:"containerType"})),r.a.createElement("br",null),r.a.createElement("label",null," description  : ",r.a.createElement("textarea",{onChange:this.formDataUpdater,value:this.state.formData.description,id:"description"})),r.a.createElement("br",null),r.a.createElement("button",{type:"button",onClick:this.handleSubmit},"submit")),r.a.createElement("div",null))}}]),t}(r.a.Component));n.Component;var v=function(e){return r.a.createElement("div",null,"TODO: BookSearch Compononent")},D=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(d,null),r.a.createElement(b,null),r.a.createElement(v,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,2,1]]]);
//# sourceMappingURL=main.baa81e42.chunk.js.map