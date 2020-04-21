(this["webpackJsonpignore-compare-context"]=this["webpackJsonpignore-compare-context"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(5),o=n.n(l),c=(n(14),n(1)),u=(n(15),n(4)),i=n(6),s={}.hasOwnProperty;function m(e,t){if(e===t)return!0;if(!e||!t)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(var r=n.length;r--;){var l=n[r];if(!s.call(t,l)||e[l]!==t[l]){if("function"===typeof e[l]&&"function"===typeof t[l])continue;return!1}}return!0}var f=1,d=new Map;function w(e,t){var n=r.a.useRef(f++),a=r.a.useContext(e),l=r.a.useState(t(a)),o=Object(c.a)(l,2),u=o[0],i=o[1];r.a.useEffect((function(){return function(){var t=d.get(e);t&&(t.delete(n.current),0===t.size&&d.delete(e))}}),[]);var s=d.get(e);s||(s=new Map,d.set(e,s));var m=s.get(n.current);return m||(m={getterFn:t,forceUpdate:i},s.set(n.current,m)),u}function h(e){return function(t){var n=t.children,a=t.numOfRows,l=r.a.useReducer((function(e,t){var n=t.type,a=t.payload,r=void 0===a?{}:a;switch(n){case"INCREMENT":var l=e.rows.slice(0);return l[r.index]=r.value,Object(u.a)({},e,{rows:l});case"SET_ROW_NUMBER":return Object(u.a)({},e,{rows:new Array(r.numOfRows).fill(0).map((function(){return Date.now()}))});default:return e}}),{rows:[]}),o=Object(c.a)(l,2),i=o[0],s=o[1];r.a.useEffect((function(){s({type:"SET_ROW_NUMBER",payload:{numOfRows:a}})}),[a]);var m={rows:i.rows,setRowValue:function(e,t){s({type:"INCREMENT",payload:{index:e,value:t}})}};return r.a.createElement(e.Provider,{value:m},n)}}var p=r.a.createContext({}),v=h(p),E=function(e){var t=r.a.createContext(e,(function(e,n){var a=d.get(t);if(!a)return 0;var r,l=Object(i.a)(a);try{for(l.s();!(r=l.n()).done;){var o=Object(c.a)(r.value,2)[1],u=o.getterFn(n);m(u,o.getterFn(e))||o.forceUpdate(u)}}catch(s){l.e(s)}finally{l.f()}return 0}));return t.Consumer=function(e){return function(t){var n=t.children,a=t.selector;return n(w(e,void 0===a?function(e){return e}:a))}}(t),t}({}),b=h(E),y=n(3),g=n.n(y),x=function(e){var t=e.value,n=e.setValue,a=e.name;return r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("strong",{style:{whiteSpace:"nowrap"}},a)),r.a.createElement("td",null,r.a.createElement("strong",null,"Rendered:"),r.a.createElement("p",null,g()().format("hh:mm:ss.SSS"))),r.a.createElement("td",null,r.a.createElement("strong",null,"Updated:"),r.a.createElement("p",null,g()(t).format("hh:mm:ss.SSS"))),r.a.createElement("td",null,r.a.createElement("button",{style:{whiteSpace:"nowrap"},className:"btn btn-primary btn-sm",onClick:function(){n(Date.now())}},"Update value")))},R=r.a.memo((function(e){var t=e.name,n=e.index,a=r.a.useContext(p),l=a.rows,o=a.setRowValue,c=r.a.useCallback((function(e){return o(n,e)}),[n]);return r.a.createElement(x,{value:l[n],setValue:c,name:t})})),k=r.a.memo((function(e){var t=e.name,n=e.index,a=w(E,(function(e){return{rowValue:e.rows[n],setRowValue:e.setRowValue}})),l=a.rowValue,o=a.setRowValue,c=r.a.useCallback((function(e){return o(n,e)}),[n]);return r.a.createElement(x,{value:l,setValue:c,name:t})}));function C(e,t){var n=document.querySelectorAll(".table.".concat(e," .btn")),a=Date.now();t(!0),function e(t,n,a,r){if(n===t.length)return r(),void alert("Render finished: ".concat(Date.now()-a,"ms"));t[n].click(),window.requestAnimationFrame((function(){e(t,n+1,a,r)}))}(n,0,a,(function(){return t(!1)}))}var O=function(){var e=r.a.useState(200),t=Object(c.a)(e,2),n=t[0],a=t[1],l=r.a.useState(!1),o=Object(c.a)(l,2),u=o[0],i=o[1];return r.a.createElement("div",{className:"App container container-xl ".concat(u?"buttons-disabled":"")},r.a.createElement("div",{className:"pb-5"},r.a.createElement("h1",null,"Performance comparison"),r.a.createElement("p",null,"Enter the number of rows you want to render"),r.a.createElement("div",null,r.a.createElement("input",{type:"number",className:"form-control input-number",value:n,onChange:function(e){return a(parseInt(e.target.value||0))}})),r.a.createElement("p",null,"On the left side, each value is read directly from Context. On the right side, values are read from Context using use-context-selection."),r.a.createElement("p",null,"For each row we render we are displaying the rendered time and a the last time that cell was updated."),r.a.createElement("p",null,"When you click a button its updated-time value is updated and a re-render is triggered. Note that for regular Context that means re-rendering all the rows even though its cell-value didn't change."),r.a.createElement("p",null,"With use-context-selection you can retrieve chunks from your Context and your components will update only when that value is updated, which improves the performance significantly."),r.a.createElement("br",null),r.a.createElement("p",{className:"alert alert-info"},'The "Simulate Click All" button will "click", one by one, on every row-button.',r.a.createElement("br",null),"After clicking on every button an alert message will be displayed showing the amount of time it took to render every row.",r.a.createElement("br",null),r.a.createElement("strong",null,"To experience a real difference in performance enter more than 150 rows; on the left example the time complexity increases exponentially, while on the right example it increases linearly."))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col-6"},r.a.createElement("h2",null,"Regular Context",r.a.createElement("button",{disabled:u,className:"btn btn-success btn-sm float-right",onClick:function(){return C("context",i)}},u?"Processing...":"Simulate Click All")),r.a.createElement(v,{numOfRows:n},r.a.createElement("table",{className:"table context"},r.a.createElement("tbody",null,new Array(n).fill(0).map((function(e,t){return r.a.createElement(R,{key:"row-".concat(t),name:"Row ".concat(t+1,"A"),index:t})})))))),r.a.createElement("div",{className:"col col-6"},r.a.createElement("h2",null,"useContextSelection",r.a.createElement("button",{disabled:u,className:"btn btn-success btn-sm float-right",onClick:function(){return C("use-context-selection",i)}},u?"Processing...":"Simulate Click All")),r.a.createElement(b,{numOfRows:n},r.a.createElement("table",{className:"table use-context-selection"},r.a.createElement("tbody",null,new Array(n).fill(0).map((function(e,t){return r.a.createElement(k,{key:"row-".concat(t),name:"Row ".concat(t+1,"B"),index:t})}))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports=n(17)}},[[7,1,2]]]);
//# sourceMappingURL=main.607da28e.chunk.js.map