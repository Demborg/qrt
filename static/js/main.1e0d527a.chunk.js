(this.webpackJsonpqrt=this.webpackJsonpqrt||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n(1),a=n.n(i),o=n(4),r=n.n(o),s=(n(14),n(5)),d=n(6),u=n(2),l=n(8),j=n(7),b=(n(15),function(e){Object(l.a)(n,e);var t=Object(j.a)(n);function n(e){var c;return Object(s.a)(this,n),(c=t.call(this,e)).streamCamVideo=c.streamCamVideo.bind(Object(u.a)(c)),c}return Object(d.a)(n,[{key:"streamCamVideo",value:function(){navigator.mediaDevices.getUserMedia({video:!0}).then((function(e){var t=document.querySelector("video");null!=t&&(t.srcObject=e,t.onloadedmetadata=function(e){null!=t&&t.play()})})).catch((function(e){console.log(e.name+": "+e.message)}))}},{key:"render",value:function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{id:"container",children:Object(c.jsx)("video",{autoPlay:!0,id:"videoElement",controls:!0})}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{onClick:this.streamCamVideo,children:"Start streaming"})]})}}]),n}(a.a.Component)),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),a(e),o(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(b,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.1e0d527a.chunk.js.map