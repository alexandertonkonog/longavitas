(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{131:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var r,a,i=n(0),c=n.n(i),o=n(46),s=n.n(o),u=(n(131),n(17)),l=n(19),d=n.n(l),j=n(34),b=n(13),p=n(26),h=n(212),f=n(213),m=n(211),v=n(214),O=n(199),x=n(219),g=n(195),w=n(220),y=n(218),_=n(217),C=n(191),T=n(204),M=n(15),N=n(190),D=n(203),E=n(198),S=n(192),k=n(197),I=n(208),U=n(2),A=function(e){var t=e.resetHandle,n=e.resetDeps,r=e.list,a=e.name,i=e.title,c=e.validate,o=e.disabled,s=r||[];return Object(U.jsx)(p.a,{name:a,validate:c,children:function(e){var c=e.input,u=e.meta;return Object(U.jsx)(C.a,{title:o?"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u043f\u043e\u043b\u044f":"",children:Object(U.jsxs)(D.a,{children:[Object(U.jsx)(E.a,{className:!o&&u.touched&&u.error&&"UMC-widget-input-error",htmlFor:a,children:r?i:Object(U.jsx)(T.a,{})}),Object(U.jsx)(S.a,Object(M.a)(Object(M.a)({error:!(!u.touched||!u.error),disabled:o},c),{},{onChange:function(e){t&&t(n),c.onChange(e.target.value)},label:i,className:"UMC-widget-input UMC-widget-select",children:s.map((function(e){return Object(U.jsx)(k.a,{value:e.value,children:e.name},e.id)}))})),!o&&u.touched&&u.error&&Object(U.jsx)(I.a,{className:"UMC-widget-input-error",children:u.error})]})})}})};!function(e){e.SITE_MAIN="https://longavitas.ru",e.SITE_SECOND="https://longavita-ct.ru",e.SITE_DEV="http://localhost:3000"}(r||(r={})),function(e){e.SITE_MAIN="058826cf-b50f-11e9-a205-ac1f6b67f28a",e.SITE_SECOND="9d050044-1007-11ec-a220-ac1f6b67f28a"}(a||(a={}));var z=["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c","\u041e\u043a\u0442\u044f\u0431\u0440\u044c","\u041d\u043e\u044f\u0431\u0440\u044c","\u0414\u0435\u043a\u0430\u0431\u0440\u044c"],F=["\u0412\u0441","\u041f\u043d","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041f\u0442","\u0421\u0431"],W=function(e){return e?e.map((function(e){return{id:e.id,value:e.id,name:e.name}})):[]},P=function(e){return e<10?"0"+e:String(e)},H=function(e){return e.getFullYear()+"-"+P(e.getMonth()+1)+"-"+P(e.getDate())+"T"+P(e.getHours())+":"+P(e.getMinutes())+":00"},L=new Date,B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:L;return!(!e||!t)&&(e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear())},G=function(e){return e?P(e.getHours())+":"+P(e.getMinutes()):""},R=function(e){return e?function(e){return e?P(e.getDate())+"."+P(e.getMonth()+1)+"."+e.getFullYear():""}(e)+" "+G(e):""},V=function(e){return e?"".concat(F[e.getDay()],", ").concat(e.getDate()," ").concat(Y(e.getMonth())):""},Y=function(e){var t=z[e];if(2===e)return t+"\u0430";var n=t[t.length-1];return t.replace(n,"\u044f")},q=function(e,t){var n={sourceCode:t===r.SITE_MAIN?38:141};return Object.entries(e).forEach((function(t){var r=Object(b.a)(t,2),a=r[0],i=r[1];n[a]="string"===typeof i?i.trim():"object"===typeof i?H(e.date.date):i})),n},J=n(201),K=n(209),Q=n(186),X=n(187),Z=n(188),$=n(189),ee=new Date,te=new Date(ee);te.setMonth(te.getMonth()+1);var ne,re=function(e){var t=e.name,n=e.title,r=e.validate,a=e.disabled,c=e.state,o=e.values,s=Object(i.useState)(!1),u=Object(b.a)(s,2),l=u[0],d=u[1],j=Object(i.useState)(ee),O=Object(b.a)(j,2),x=O[0],g=O[1],w=Object(i.useMemo)((function(){return function(e,t,n){var r,a,i=n.doctor,c=n.specialization;if(!c)return null;for(var o=i?null===(r=t.schedule)||void 0===r?void 0:r.filter((function(e){return e.doctor===i})):null===(a=t.schedule)||void 0===a?void 0:a.filter((function(e){return e.specialization===c})),s=0,u=new Date(e),l=[],d=function(){var e={date:new Date(u),time:[]};o.forEach((function(n){var r=t.doctors.find((function(e){return e.id===n.doctor})),a=r.duration;n.time.forEach((function(t){var n=new Date(t.timeStart);if(B(n,u))for(var i=new Date(t.timeEnd),c=function(){var t=new Date(n),c=G(t);if(n.setMinutes(n.getMinutes()+a),n<=i){var o=e.time.findIndex((function(e){return e.time===c}));if(o>=0)e.time[o].doctors.push(r.id);else{var s={date:t,time:c,doctors:[r.id]};e.time.push(s)}}};n<i;)c()}))})),u.setDate(u.getDate()+1),l.push(e),s++};s<5;)d();return l}(x,c,o)}),[o.doctor,x,o.specialization]),y=Object(p.c)(),_=function(e){d(e)},T=function(e){g(e?function(e){var t=new Date(e);return t.setDate(e.getDate()+5),t}:function(e){var t=new Date(e);return t.setDate(e.getDate()-5),ee>t?ee:t})};return Object(U.jsx)(p.a,{name:t,validate:r,children:function(e){var t=e.input,r=e.meta,i=R(t.value.date),o="inherit";return r.touched&&r.error&&(o="error"),a&&(o="disabled"),Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(C.a,{title:a?"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0435 \u043f\u043e\u043b\u044f":"",children:Object(U.jsxs)(D.a,{variant:"outlined",children:[Object(U.jsx)(E.a,{className:!a&&r.touched&&r.error&&"UMC-widget-input-error",htmlFor:"date",children:n}),Object(U.jsx)(J.a,{error:!(!r.touched||!r.error),onFocus:function(){return _(!0)},id:"date",type:"text",value:i,onChange:function(){return console.log(t.value)},disabled:a,endAdornment:Object(U.jsx)(K.a,{position:"end",children:Object(U.jsx)(m.a,{disabled:a,onClick:function(){return _(!0)},edge:"end",children:Object(U.jsx)(Q.a,{color:o})})}),label:n}),!a&&r.touched&&r.error&&Object(U.jsx)(I.a,{className:"UMC-widget-input-error",children:r.error})]})}),Object(U.jsx)(h.a,{fullScreen:c.screenWidth<=768,PaperProps:{style:{maxWidth:c.screenWidth<=768?"100vw":"95vw"}},onClose:function(){return _(!1)},open:l,disableRestoreFocus:!0,children:Object(U.jsxs)("div",{className:"UMC-widget-calendar-wrapper",children:[Object(U.jsxs)(f.a,{children:[Object(U.jsxs)("div",{className:"UMC-widget-calendar-header",children:[Object(U.jsx)(m.a,{disabled:ee>=x,onClick:function(){return T(!1)},size:c.screenWidth<450?"small":"medium",children:Object(U.jsx)(X.a,{})}),Object(U.jsx)("div",{className:"UMC-widget-calendar-header__text UMC-widget-title",children:V(x)}),Object(U.jsx)(m.a,{disabled:x>=te,onClick:function(){return T(!0)},size:c.screenWidth<450?"small":"medium",children:Object(U.jsx)(Z.a,{})})]}),Object(U.jsx)(m.a,{className:"UMC-widget__btn-exit",onClick:function(){return _(!1)},children:Object(U.jsx)($.a,{})})]}),Object(U.jsx)(v.a,{children:Object(U.jsx)("div",{className:"UMC-widget-calendar-block",children:Object(U.jsx)("div",{className:"UMC-widget-calendar__grid",children:null===w||void 0===w?void 0:w.map((function(e){return Object(U.jsxs)("div",{className:"UMC-widget-calendar__column",children:[Object(U.jsx)("h3",{className:e.time.length?"UMC-widget-calendar__column-title":"UMC-widget-calendar__column-text_grey UMC-widget-calendar__column-title",children:V(e.date)}),Object(U.jsx)("div",{className:"UMC-widget-calendar__column-content",children:e.time.length?e.time.map((function(n,r){return Object(U.jsx)("p",{onClick:function(){return function(e){t.onChange(e),1===e.doctors.length&&y.change("doctor",e.doctors[0]),d(!1)}(n)},className:"UMC-widget-calendar__box UMC-widget-calendar__box_free",children:n.time},e.date.getTime()+r)})):Object(U.jsx)("p",{className:"UMC-widget-calendar__column-text UMC-widget-calendar__column-text_grey",children:"\u041d\u0435\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0434\u043b\u044f \u0437\u0430\u043f\u0438\u0441\u0438"})})]},e.date.getTime())}))})})})]})})]})}})},ae=function(e){if(!e)return"\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e"},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return function(n){return n?n.length<e?"\u0414\u043b\u0438\u043d\u0430 \u043f\u043e\u043b\u044f \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 ".concat(e," \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"):n.length>t?"\u0414\u043b\u0438\u043d\u0430 \u043f\u043e\u043b\u044f \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u043d\u0435 \u0431\u043e\u043b\u0435\u0435 ".concat(t," \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"):void 0:"\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e"}},ce=function(e){var t,n,r,i,c=e.resetHandle,o=e.state,s=Object(p.c)().getState().values,u=s.clinic===a.SITE_SECOND,l=[{list:W(o.clinics),name:"clinic",validate:ae,title:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0438\u043b\u0438\u0430\u043b",type:"select",resetDeps:["specialization","doctor","date"],order:1,id:1},{list:(i=null===(t=o.schedule)||void 0===t?void 0:t.filter((function(e){return e.clinic===s.clinic})),i?Array.from(new Set(i.filter((function(e){return e.specialization})).map((function(e){return e.specialization})))).map((function(e){return{id:e,value:e,name:e}})):[]),name:"specialization",title:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044e",validate:ae,type:"select",id:2,resetDeps:["doctor","date"],order:2,deps:["clinic"]},{list:W(u?null===(n=o.doctors)||void 0===n?void 0:n.filter((function(e){var t,n,r,a=null===(t=o.schedule)||void 0===t?void 0:t.find((function(t){return t.doctor===e.id}));return(null===(n=s.date)||void 0===n||null===(r=n.doctors)||void 0===r?void 0:r.includes(e.id))&&a})):null===(r=o.doctors)||void 0===r?void 0:r.filter((function(e){var t,n=null===(t=o.schedule)||void 0===t?void 0:t.find((function(t){return t.doctor===e.id}));return e.specialization===s.specialization&&n}))),name:"doctor",title:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0430\u0447\u0430",validate:ae,type:"select",id:3,resetDeps:u?[]:["date"],order:u?4:3,deps:u?["clinic","specialization","date"]:["clinic","specialization"]},{name:"date",title:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u043f\u0440\u0438\u0435\u043c\u0430",validate:ae,type:"date",id:4,values:s,order:u?3:4,state:o,deps:u?["clinic","specialization"]:["clinic","specialization","doctor"]}],d=l.sort((function(e,t){return(e.order||0)-(t.order||0)}));return Object(U.jsx)(N.a,{spacing:2,children:d.map((function(e){var t=!!e.deps&&function(e,t){return e.some((function(e){return!(e in t&&t[e])}))}(e.deps,s);return"select"===e.type?Object(U.jsx)(A,Object(M.a)(Object(M.a)({resetHandle:c},e),{},{disabled:t}),e.id):"date"===e.type?Object(U.jsx)(re,Object(M.a)({disabled:t},e),e.id):void 0}))})},oe=n(70),se=n(71),ue="https://longavitas.ru/lib/widget",le="admin",de="admin",je=function(){function e(){Object(oe.a)(this,e)}return Object(se.a)(e,[{key:"get",value:function(){var e=Object(j.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",params:t},e.abrupt("return",this.request(n));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=Object(j.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"POST",params:n},e.abrupt("return",this.request(r,t));case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"request",value:function(){var e=Object(j.a)(d.a.mark((function e(t){var n,r,a,i=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:void 0,e.prev=1,r=ue+(t.params?this.getParamsFromObject(t.params):""),e.next=5,fetch(r,{method:t.method,body:JSON.stringify(n),headers:{Authorization:"Basic "+btoa(le+":"+de)}});case 5:return a=e.sent,e.next=8,a.json();case 8:return e.abrupt("return",e.sent);case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}}),e,this,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getParamsFromObject",value:function(e){return"?"+Object.entries(e).map((function(e){return e.join("=")})).join("&")}}]),e}(),be=new je,pe=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n,r=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:void 0,n=H(t?new Date(t):new Date),e.abrupt("return",be.get({startDate:n}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),he=function(){var e=Object(j.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",!0);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();!function(e){e.SET_CLINICS="SET_CLINICS",e.SET_LOADING="SET_LOADING",e.SET_DATA="SET_DATA",e.SET_WIDTH="SET_WIDTH",e.SET_APPOINTMENT_DATA="SET_APPOINTMENT_DATA"}(ne||(ne={}));var fe=function(e){return{type:ne.SET_LOADING,payload:e}},me={clinics:null,schedule:null,loading:!1,doctors:null,specializations:null,screenWidth:document.documentElement.clientWidth,appointment:null},ve=function(e,t){switch(t.type){case ne.SET_LOADING:return Object(M.a)(Object(M.a)({},e),{},{loading:t.payload});case ne.SET_DATA:return Object(M.a)(Object(M.a)({},e),{},{clinics:t.payload.clinics,schedule:t.payload.schedule,doctors:t.payload.doctors,specializations:t.payload.specializations});case ne.SET_WIDTH:return Object(M.a)(Object(M.a)({},e),{},{screenWidth:t.payload});case ne.SET_APPOINTMENT_DATA:return Object(M.a)(Object(M.a)({},e),{},{appointment:t.payload});default:return e}},Oe=n(16),xe=n(215),ge=function(e){return Object(U.jsx)(p.a,{name:e.name,validate:e.validate,children:function(t){var n=t.input,r=t.meta;return Object(U.jsxs)("div",{children:[Object(U.jsx)(xe.a,Object(M.a)({style:{width:"100%"},error:!(!r.touched||!r.error),label:e.title},n)),r.touched&&r.error&&Object(U.jsx)(I.a,{className:"UMC-widget-input-error",children:r.error})]})}})},we=n(216),ye=n(194),_e=function(e){return Object(U.jsx)(p.a,{name:e.name,type:"checkbox",validate:e.validate,children:function(t){var n=t.input,r=t.meta;return Object(U.jsxs)("div",{children:[Object(U.jsx)(we.a,{control:Object(U.jsx)(ye.a,Object(M.a)(Object(M.a)({},n),{},{value:n.value||""})),label:e.title}),r.touched&&r.error&&Object(U.jsx)(I.a,{className:"UMC-widget-input-error",children:r.error})]})}})},Ce=n(106),Te=n(103),Me=["value","onChange"],Ne=c.a.forwardRef((function(e,t){var n=e.mask||"+7 (000) 00-00-000",r=(e.value,e.onChange,Object(Ce.a)(e,Me));return Object(U.jsx)(Te.a,Object(M.a)(Object(M.a)({},r),{},{onBlur:e.onBlur,onFocus:e.onFocus,onAccept:function(t){var n=t.replace(/\D+/g,"");console.log(n),e.onChange(n)},id:e.id,mask:n,inputRef:t,overwrite:!0}))})),De=function(e){return Object(U.jsx)(p.a,{name:e.name,validate:e.validate,children:function(t){var n=t.input,r=t.meta;return Object(U.jsxs)(D.a,{children:[Object(U.jsx)(E.a,{className:!e.disabled&&r.touched&&r.error&&"UMC-widget-input-error",htmlFor:"number",children:e.title}),Object(U.jsx)(J.a,Object(M.a)(Object(M.a)(Object(M.a)({},e),n),{},{label:e.title,id:"number",error:!(!r.touched||!r.error),inputComponent:Ne})),r.touched&&r.error&&Object(U.jsx)(I.a,{className:"UMC-widget-input-error",children:r.error})]})}})},Ee=function(){var e=Object(i.useState)([{name:"address",visible:!1},{name:"comment",visible:!1}]),t=Object(b.a)(e,2),n=t[0],r=t[1],a=[{name:"name",validate:ie(2,20),title:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",type:"input",id:1},{name:"surname",validate:ie(2,20),title:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0444\u0430\u043c\u0438\u043b\u0438\u044e",type:"input",id:2},{name:"number",validate:ie(11,11),title:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043b\u0435\u0444\u043e\u043d",mask:"+7 (000) 00-00-000",type:"input",id:3},{name:"address",title:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441",type:"input",visibleName:"\u0410\u0434\u0440\u0435\u0441",visibility:n[0].visible,id:5},{name:"comment",title:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",visibleName:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",visibility:n[1].visible,type:"input",id:6},{name:"confirm",validate:ae,title:"\u042f \u0441\u043e\u0433\u043b\u0430\u0441\u0435\u043d \u0441 \u041f\u043e\u043b\u0438\u0442\u0438\u043a\u043e\u0439 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438",type:"checkbox",id:4}];return Object(U.jsx)(N.a,{spacing:2,children:a.map((function(e){return"checkbox"===e.type?Object(U.jsx)(_e,Object(M.a)({},e),e.id):"visibility"in e&&!e.visibility?Object(U.jsx)(_.a,{className:"UMC-widget__personal-btn",onClick:function(){return t=e.name,void r((function(e){var n=Object(Oe.a)(e),r=e.findIndex((function(e){return e.name===t}));return r>=0?(n[r]={name:t,visible:!0},n):e}));var t},size:"small",children:e.visibleName},e.id):e.mask?Object(U.jsx)(De,Object(M.a)({},e),e.id):Object(U.jsx)(ge,Object(M.a)({},e),e.id)}))})},Se=n(102),ke=n.n(Se),Ie=n(202),Ue=n(210),Ae=n(101),ze=n.n(Ae),Fe=n(100),We=n.n(Fe),Pe=function(e){var t=Object(u.g)(),n=Object(u.f)(),r="error"===t.status,a=r?"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430!":"\u0417\u0430\u043f\u0438\u0441\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0430",i=r?"\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0440\u0430\u0431\u043e\u0442\u0435 \u0432\u0438\u0434\u0436\u0435\u0442\u0430 \u0437\u0430\u043f\u0438\u0441\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u0438\u043b\u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043f\u043e\u0437\u0434\u043d\u0435\u0435":function(e){if(!e.appointment||!e.doctors||!e.clinics)return"";var t=e.doctors.find((function(t){var n;return t.id===(null===e||void 0===e||null===(n=e.appointment)||void 0===n?void 0:n.doctor)})),n=e.clinics.find((function(t){var n;return t.id===(null===e||void 0===e||null===(n=e.appointment)||void 0===n?void 0:n.clinic)})),r=R(e.appointment.date.date);return"\u0412\u044b \u0437\u0430\u043f\u0438\u0441\u0430\u043d\u044b \u043d\u0430 \u043f\u0440\u0438\u0435\u043c \u043a \u0434\u043e\u043a\u0442\u043e\u0440\u0443 ".concat(null===t||void 0===t?void 0:t.name," \u043d\u0430 ").concat(r," \u0432 \u043a\u043b\u0438\u043d\u0438\u043a\u0443 ").concat(null===n||void 0===n?void 0:n.name)}(e.state),c=r?We.a:ze.a;return Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(v.a,{children:Object(U.jsxs)(Ie.a,{container:!0,style:{marginTop:40},children:[Object(U.jsx)(Ie.a,{item:!0,xs:2,children:Object(U.jsx)(c,{fontSize:"large",color:r?"error":"primary"})}),Object(U.jsxs)(Ie.a,{item:!0,xs:10,children:[Object(U.jsx)(Ue.a,{style:{marginBottom:20},variant:"h5",children:a}),Object(U.jsx)(Ue.a,{children:i})]})]})}),Object(U.jsx)(y.a,{children:r?Object(U.jsx)(_.a,{onClick:function(){return n.push("/appointment")},children:"\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437"}):Object(U.jsx)(_.a,{onClick:function(){return n.push("/")},children:"\u0425\u043e\u0440\u043e\u0448\u043e"})})]})},He=function(){var e=Object(i.useState)(!0),t=Object(b.a)(e,2),n=t[0],c=(t[1],Object(i.useState)(0)),o=Object(b.a)(c,2),s=o[0],l=o[1],M=Object(i.useReducer)(ve,me),N=Object(b.a)(M,2),D=N[0],E=N[1],S=Object(u.f)(),k=Object(i.useContext)(Be),I={clinic:k===r.SITE_DEV?a.SITE_MAIN:a.SITE_SECOND,confirm:!0},A=[{id:0,title:"\u0412\u044b\u0431\u043e\u0440 \u0432\u0440\u0430\u0447\u0430"},{id:1,title:"\u041b\u0438\u0447\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"}],z=[ce,Ee][s],F=function(){var e=Object(j.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=q(t,k),e.abrupt("return",he(n));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(j.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=7;break}return e.next=3,F(t);case 3:e.sent?(E((r=t,{type:ne.SET_APPOINTMENT_DATA,payload:r})),n.reset(),S.push("/appointment/success")):S.push("/appointment/error"),e.next=8;break;case 7:l(1);case 8:case"end":return e.stop()}var r}),e)})));return function(t,n){return e.apply(this,arguments)}}(),P=function(){var e=Object(j.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(fe(!0)),e.next=3,pe();case 3:t=e.sent,E((n=t,{type:ne.SET_DATA,payload:n})),E(fe(!1));case 6:case"end":return e.stop()}var n}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e;E((e=document.documentElement.clientWidth,{type:ne.SET_WIDTH,payload:e}))};return Object(i.useEffect)((function(){P()}),[]),Object(i.useEffect)((function(){return window.addEventListener("resize",H),function(){window.removeEventListener("resize",H)}}),[]),Object(U.jsxs)(h.a,{maxWidth:"xl",open:n,fullScreen:D.screenWidth<=450,children:[Object(U.jsxs)("div",{className:"UMC-widget-wrapper",children:[Object(U.jsxs)(f.a,{children:["\u0417\u0430\u043f\u0438\u0441\u044c \u043d\u0430 \u043f\u0440\u0438\u0435\u043c",Object(U.jsx)(m.a,{className:"UMC-widget__btn-exit",onClick:function(){return S.push("/")},children:Object(U.jsx)($.a,{})})]}),Object(U.jsx)(u.a,{path:"/appointment/:status",children:Object(U.jsx)(Pe,{state:D})}),Object(U.jsx)(u.a,{path:"/appointment",exact:!0,children:Object(U.jsx)(p.b,{onSubmit:W,initialValues:I,children:function(e){var t=e.handleSubmit,n=e.form,r=(e.values,e.touched),a=e.hasValidationErrors;return Object(U.jsxs)("form",{onSubmit:t,children:[Object(U.jsxs)(v.a,{children:[Object(U.jsx)(O.a,{orientation:D.screenWidth<450?"vertical":"horizontal",className:"UMC-widget-steps__header",activeStep:s,children:A.map((function(e){var t=e.id<=s;return Object(U.jsx)(x.a,{completed:t,children:Object(U.jsx)(g.a,{children:e.title})},e.id)}))}),Object(U.jsx)(w.a,{className:"UMC-widget-content",children:Object(U.jsx)(z,{resetHandle:function(e){e&&n.batch((function(){e.forEach((function(e){return n.change(e,"")}))}))},state:D})})]}),Object(U.jsxs)(y.a,{className:"UMC-widget-btn-area",children:[s?Object(U.jsx)(_.a,{onClick:function(){return l(0)},startIcon:Object(U.jsx)(ke.a,{}),type:"button",children:"\u041d\u0430\u0437\u0430\u0434"}):Object(U.jsx)(U.Fragment,{}),Object(U.jsx)(C.a,{placement:"top",title:r&&a?"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f":"",children:Object(U.jsx)(_.a,{type:"submit",children:s?"\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f":"\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0448\u0430\u0433"})})]})]})}})})]}),D.loading&&Object(U.jsx)(w.a,{className:"UMC-widget-loading-screen",sx:{display:"flex"},children:Object(U.jsx)(T.a,{})})]})},Le="/appointment",Be=c.a.createContext(window.location.origin),Ge=function(){return Object(U.jsx)(u.c,{children:Object(U.jsx)(u.a,{path:Le,children:Object(U.jsx)(He,{})})})},Re=n(58);s.a.render(Object(U.jsx)(Re.a,{hashType:"noslash",children:Object(U.jsx)(Ge,{})}),document.getElementById("root"))}},[[140,1,2]]]);
//# sourceMappingURL=main.73fe2841.chunk.js.map