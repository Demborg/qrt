(this.webpackJsonpqrt=this.webpackJsonpqrt||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var i=t(1),o=t.n(i),I=t(3),c=t.n(I),Q=(t(12),t(4)),g=t(5),C=t(7),a=t(6),l=(t(13),t(0)),A=function(e){Object(C.a)(t,e);var n=Object(a.a)(t);function t(){var e;Object(Q.a)(this,t);for(var i=arguments.length,I=new Array(i),c=0;c<i;c++)I[c]=arguments[c];return(e=n.call.apply(n,[this].concat(I))).videoRef=o.a.createRef(),e}return Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this.videoRef.current;navigator.mediaDevices.getUserMedia({video:!0}).then((function(n){e&&(e.srcObject=n,e.onloadedmetadata=function(n){e&&e.play()})})).catch((function(e){console.log(e.name+": "+e.message)}))}},{key:"render",value:function(){return Object(l.jsxs)("div",{className:"videoWrapper",children:[Object(l.jsx)("video",{autoPlay:!0,ref:this.videoRef,playsInline:!0,className:"video"}),Object(l.jsx)("img",{src:"data:image/png;base64,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",alt:"",className:"art"})]})}}]),t}(o.a.Component);var r=function(){return Object(l.jsx)("div",{children:Object(l.jsx)(A,{})})},p=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,16)).then((function(n){var t=n.getCLS,i=n.getFID,o=n.getFCP,I=n.getLCP,c=n.getTTFB;t(e),i(e),o(e),I(e),c(e)}))};c.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(r,{})}),document.getElementById("root")),p()}},[[15,1,2]]]);
//# sourceMappingURL=main.18023d33.chunk.js.map