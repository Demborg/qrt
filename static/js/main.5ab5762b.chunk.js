(this.webpackJsonpqrt=this.webpackJsonpqrt||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),a=n(4),o=n.n(a),r=(n(13),n(5)),s=n(6),d=n(2),u=n(8),l=n(7),j=(n(14),n(0)),b=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).streamCamVideo=c.streamCamVideo.bind(Object(d.a)(c)),c}return Object(s.a)(n,[{key:"streamCamVideo",value:function(){navigator.mediaDevices.getUserMedia({video:!0}).then((function(e){var t=document.querySelector("video");null!=t&&(t.srcObject=e,t.onloadedmetadata=function(e){null!=t&&t.play()})})).catch((function(e){console.log(e.name+": "+e.message)}))}},{key:"render",value:function(){return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{id:"container",children:Object(j.jsx)("video",{autoPlay:!0,id:"videoElement",controls:!0})}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:this.streamCamVideo,children:"Start streaming"})]})}}]),n}(i.a.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),a(e),o(e)}))};o.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.5ab5762b.chunk.js.map