import{c as k,a as R,o as B,Y as Ee,G as H,H as u,I as Te,J as Fe,K as ke,L as Oe,af as Ae,aa as Re,aw as je,T as J,W as Be,a5 as Me,ao as He,X as Ze,N as d,Q as g,P as L,V as Q}from"./nYfpbOh9.js";import{r as I,$ as W,h as Y,d as _,F as N,C as Pe,s as O,z as a,K as ee,p as M,A as _e,l as te,m as Ke,q,B as Ne,T as qe,n as Ve,v as X,X as We}from"./R1HqGcmH.js";function ne(e=8){return Math.random().toString(16).slice(2,2+e)}function Xe(e){const t=I(!!e.value);if(t.value)return W(t);const o=Y(e,n=>{n&&(t.value=!0,o())});return W(t)}const wt=k("n-drawer-body"),Ct=k("n-drawer"),zt=k("n-modal-body"),$t=k("n-popover-body");function D(e,t,o="default"){const n=t[o];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);return n()}function K(e,t=!0,o=[]){return e.forEach(n=>{if(n!==null){if(typeof n!="object"){(typeof n=="string"||typeof n=="number")&&o.push(_(String(n)));return}if(Array.isArray(n)){K(n,t,o);return}if(n.type===N){if(n.children===null)return;Array.isArray(n.children)&&K(n.children,t,o)}else n.type!==Pe&&o.push(n)}}),o}function Lt(e,t,o="default"){const n=t[o];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);const i=K(n());if(i.length===1)return i[0];throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`)}const E="@@coContext",St={mounted(e,{value:t,modifiers:o}){e[E]={handler:void 0},typeof t=="function"&&(e[E].handler=t,B("clickoutside",e,t,{capture:o.capture}))},updated(e,{value:t,modifiers:o}){const n=e[E];typeof t=="function"?n.handler?n.handler!==t&&(R("clickoutside",e,n.handler,{capture:o.capture}),n.handler=t,B("clickoutside",e,t,{capture:o.capture})):(e[E].handler=t,B("clickoutside",e,t,{capture:o.capture})):n.handler&&(R("clickoutside",e,n.handler,{capture:o.capture}),n.handler=void 0)},unmounted(e,{modifiers:t}){const{handler:o}=e[E];o&&R("clickoutside",e,o,{capture:t.capture}),e[E].handler=void 0}};function De(e,t){console.error(`[vdirs/${e}]: ${t}`)}class Ue{constructor(){this.elementZIndex=new Map,this.nextZIndex=2e3}get elementCount(){return this.elementZIndex.size}ensureZIndex(t,o){const{elementZIndex:n}=this;if(o!==void 0){t.style.zIndex=`${o}`,n.delete(t);return}const{nextZIndex:i}=this;n.has(t)&&n.get(t)+1===this.nextZIndex||(t.style.zIndex=`${i}`,n.set(t,i),this.nextZIndex=i+1,this.squashState())}unregister(t,o){const{elementZIndex:n}=this;n.has(t)?n.delete(t):o===void 0&&De("z-index-manager/unregister-element","Element not found when unregistering."),this.squashState()}squashState(){const{elementCount:t}=this;t||(this.nextZIndex=2e3),this.nextZIndex-t>2500&&this.rearrange()}rearrange(){const t=Array.from(this.elementZIndex.entries());t.sort((o,n)=>o[1]-n[1]),this.nextZIndex=2e3,t.forEach(o=>{const n=o[0],i=this.nextZIndex++;`${i}`!==n.style.zIndex&&(n.style.zIndex=`${i}`)})}}const P=new Ue,T="@@ziContext",It={mounted(e,t){const{value:o={}}=t,{zIndex:n,enabled:i}=o;e[T]={enabled:!!i,initialized:!1},i&&(P.ensureZIndex(e,n),e[T].initialized=!0)},updated(e,t){const{value:o={}}=t,{zIndex:n,enabled:i}=o,c=e[T].enabled;i&&!c&&(P.ensureZIndex(e,n),e[T].initialized=!0),e[T].enabled=!!i},unmounted(e,t){if(!e[T].initialized)return;const{value:o={}}=t,{zIndex:n}=o;P.unregister(e,n)}};function U(e){return typeof e=="string"?document.querySelector(e):e()||null}const Et=O({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(e){return{showTeleport:Xe(_e(e,"show")),mergedTo:M(()=>{const{to:t}=e;return t??"body"})}},render(){return this.showTeleport?this.disabled?D("lazy-teleport",this.$slots):a(ee,{disabled:this.disabled,to:this.mergedTo},D("lazy-teleport",this.$slots)):null}});function oe(e){return e instanceof HTMLElement}function ie(e){for(let t=0;t<e.childNodes.length;t++){const o=e.childNodes[t];if(oe(o)&&(ae(o)||ie(o)))return!0}return!1}function re(e){for(let t=e.childNodes.length-1;t>=0;t--){const o=e.childNodes[t];if(oe(o)&&(ae(o)||re(o)))return!0}return!1}function ae(e){if(!Ge(e))return!1;try{e.focus({preventScroll:!0})}catch{}return document.activeElement===e}function Ge(e){if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.getAttribute("disabled"))return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return e.type!=="hidden"&&e.type!=="file";case"SELECT":case"TEXTAREA":return!0;default:return!1}}let A=[];const Tt=O({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:[String,Function],finalFocusTo:[String,Function],returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(e){const t=ne(),o=I(null),n=I(null);let i=!1,c=!1;const m=typeof document>"u"?null:document.activeElement;function v(){return A[A.length-1]===t}function h(s){var l;s.code==="Escape"&&v()&&((l=e.onEsc)===null||l===void 0||l.call(e,s))}te(()=>{Y(()=>e.active,s=>{s?(z(),B("keydown",document,h)):(R("keydown",document,h),i&&w())},{immediate:!0})}),Ke(()=>{R("keydown",document,h),i&&w()});function b(s){if(!c&&v()){const l=x();if(l===null||l.contains(Ee(s)))return;f("first")}}function x(){const s=o.value;if(s===null)return null;let l=s;for(;l=l.nextSibling,!(l===null||l instanceof Element&&l.tagName==="DIV"););return l}function z(){var s;if(!e.disabled){if(A.push(t),e.autoFocus){const{initialFocusTo:l}=e;l===void 0?f("first"):(s=U(l))===null||s===void 0||s.focus({preventScroll:!0})}i=!0,document.addEventListener("focus",b,!0)}}function w(){var s;if(e.disabled||(document.removeEventListener("focus",b,!0),A=A.filter(y=>y!==t),v()))return;const{finalFocusTo:l}=e;l!==void 0?(s=U(l))===null||s===void 0||s.focus({preventScroll:!0}):e.returnFocusOnDeactivated&&m instanceof HTMLElement&&(c=!0,m.focus({preventScroll:!0}),c=!1)}function f(s){if(v()&&e.active){const l=o.value,y=n.value;if(l!==null&&y!==null){const $=x();if($==null||$===y){c=!0,l.focus({preventScroll:!0}),c=!1;return}c=!0;const S=s==="first"?ie($):re($);c=!1,S||(c=!0,l.focus({preventScroll:!0}),c=!1)}}}function r(s){if(c)return;const l=x();l!==null&&(s.relatedTarget!==null&&l.contains(s.relatedTarget)?f("last"):f("first"))}function p(s){c||(s.relatedTarget!==null&&s.relatedTarget===o.value?f("last"):f("first"))}return{focusableStartRef:o,focusableEndRef:n,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:r,handleEndFocus:p}},render(){const{default:e}=this.$slots;if(e===void 0)return null;if(this.disabled)return e();const{active:t,focusableStyle:o}=this;return a(N,null,[a("div",{"aria-hidden":"true",tabindex:t?"0":"-1",ref:"focusableStartRef",style:o,onFocus:this.handleStartFocus}),e(),a("div",{"aria-hidden":"true",style:o,ref:"focusableEndRef",tabindex:t?"0":"-1",onFocus:this.handleEndFocus})])}}),Je=/^(\d|\.)+$/,G=/(\d|\.)+/;function Ft(e,{c:t=1,offset:o=0,attachPx:n=!0}={}){if(typeof e=="number"){const i=(e+o)*t;return i===0?"0":`${i}px`}else if(typeof e=="string")if(Je.test(e)){const i=(Number(e)+o)*t;return n?i===0?"0":`${i}px`:`${i}`}else{const i=G.exec(e);return i?e.replace(G,String((Number(i[0])+o)*t)):e}return e}function Qe(e,t=[],o){const n={};return t.forEach(i=>{n[i]=e[i]}),Object.assign(n,o)}function Ye(e){return Object.keys(e)}function et(e,t=[],o){const n={};return Object.getOwnPropertyNames(e).forEach(c=>{t.includes(c)||(n[c]=e[c])}),Object.assign(n,o)}function F(e,...t){return typeof e=="function"?e(...t):typeof e=="string"?_(e):typeof e=="number"?_(String(e)):null}const tt=H("error",()=>a("svg",{viewBox:"0 0 48 48",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},a("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},a("g",{"fill-rule":"nonzero"},a("path",{d:"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"}))))),nt=H("info",()=>a("svg",{viewBox:"0 0 28 28",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},a("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},a("g",{"fill-rule":"nonzero"},a("path",{d:"M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"}))))),ot=H("success",()=>a("svg",{viewBox:"0 0 48 48",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},a("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},a("g",{"fill-rule":"nonzero"},a("path",{d:"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"}))))),it=H("warning",()=>a("svg",{viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},a("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},a("g",{"fill-rule":"nonzero"},a("path",{d:"M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"}))))),{cubicBezierEaseInOut:C,cubicBezierEaseOut:rt,cubicBezierEaseIn:at}=Te;function kt({overflow:e="hidden",duration:t=".3s",originalTransition:o="",leavingDelay:n="0s",foldPadding:i=!1,enterToProps:c=void 0,leaveToProps:m=void 0,reverse:v=!1}={}){const h=v?"leave":"enter",b=v?"enter":"leave";return[u(`&.fade-in-height-expand-transition-${b}-from,
 &.fade-in-height-expand-transition-${h}-to`,Object.assign(Object.assign({},c),{opacity:1})),u(`&.fade-in-height-expand-transition-${b}-to,
 &.fade-in-height-expand-transition-${h}-from`,Object.assign(Object.assign({},m),{opacity:0,marginTop:"0 !important",marginBottom:"0 !important",paddingTop:i?"0 !important":void 0,paddingBottom:i?"0 !important":void 0})),u(`&.fade-in-height-expand-transition-${b}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${C} ${n},
 opacity ${t} ${rt} ${n},
 margin-top ${t} ${C} ${n},
 margin-bottom ${t} ${C} ${n},
 padding-top ${t} ${C} ${n},
 padding-bottom ${t} ${C} ${n}
 ${o?`,${o}`:""}
 `),u(`&.fade-in-height-expand-transition-${h}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${C},
 opacity ${t} ${at},
 margin-top ${t} ${C},
 margin-bottom ${t} ${C},
 padding-top ${t} ${C},
 padding-bottom ${t} ${C}
 ${o?`,${o}`:""}
 `)]}const st={closeMargin:"16px 12px",closeSize:"20px",closeIconSize:"16px",width:"365px",padding:"16px",titleFontSize:"16px",metaFontSize:"12px",descriptionFontSize:"12px"};function ct(e){const{textColor2:t,successColor:o,infoColor:n,warningColor:i,errorColor:c,popoverColor:m,closeIconColor:v,closeIconColorHover:h,closeIconColorPressed:b,closeColorHover:x,closeColorPressed:z,textColor1:w,textColor3:f,borderRadius:r,fontWeightStrong:p,boxShadow2:s,lineHeight:l,fontSize:y}=e;return Object.assign(Object.assign({},st),{borderRadius:r,lineHeight:l,fontSize:y,headerFontWeight:p,iconColor:t,iconColorSuccess:o,iconColorInfo:n,iconColorWarning:i,iconColorError:c,color:m,textColor:t,closeIconColor:v,closeIconColorHover:h,closeIconColorPressed:b,closeBorderRadius:r,closeColorHover:x,closeColorPressed:z,headerTextColor:w,descriptionTextColor:f,actionTextColor:t,boxShadow:s})}const lt=Fe({name:"Notification",common:Oe,peers:{Scrollbar:ke},self:ct}),Z=k("n-notification-provider"),dt=O({name:"NotificationContainer",props:{scrollable:{type:Boolean,required:!0},placement:{type:String,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:t,wipTransitionCountRef:o}=q(Z),n=I(null);return Ne(()=>{var i,c;o.value>0?(i=n?.value)===null||i===void 0||i.classList.add("transitioning"):(c=n?.value)===null||c===void 0||c.classList.remove("transitioning")}),{selfRef:n,mergedTheme:e,mergedClsPrefix:t,transitioning:o}},render(){const{$slots:e,scrollable:t,mergedClsPrefix:o,mergedTheme:n,placement:i}=this;return a("div",{ref:"selfRef",class:[`${o}-notification-container`,t&&`${o}-notification-container--scrollable`,`${o}-notification-container--${i}`]},t?a(Ae,{theme:n.peers.Scrollbar,themeOverrides:n.peerOverrides.Scrollbar,contentStyle:{overflow:"hidden"}},e):e)}}),ft={info:()=>a(nt,null),success:()=>a(ot,null),warning:()=>a(it,null),error:()=>a(tt,null),default:()=>null},V={closable:{type:Boolean,default:!0},type:{type:String,default:"default"},avatar:Function,title:[String,Function],description:[String,Function],content:[String,Function],meta:[String,Function],action:[String,Function],onClose:{type:Function,required:!0},keepAliveOnHover:Boolean,onMouseenter:Function,onMouseleave:Function},ut=Ye(V),ht=O({name:"Notification",props:V,setup(e){const{mergedClsPrefixRef:t,mergedThemeRef:o,props:n}=q(Z),{inlineThemeDisabled:i,mergedRtlRef:c}=J(),m=Be("Notification",c,t),v=M(()=>{const{type:b}=e,{self:{color:x,textColor:z,closeIconColor:w,closeIconColorHover:f,closeIconColorPressed:r,headerTextColor:p,descriptionTextColor:s,actionTextColor:l,borderRadius:y,headerFontWeight:$,boxShadow:S,lineHeight:se,fontSize:ce,closeMargin:le,closeSize:de,width:fe,padding:ue,closeIconSize:he,closeBorderRadius:pe,closeColorHover:me,closeColorPressed:ge,titleFontSize:ve,metaFontSize:be,descriptionFontSize:xe,[Me("iconColor",b)]:ye},common:{cubicBezierEaseOut:we,cubicBezierEaseIn:Ce,cubicBezierEaseInOut:ze}}=o.value,{left:$e,right:Le,top:Se,bottom:Ie}=He(ue);return{"--n-color":x,"--n-font-size":ce,"--n-text-color":z,"--n-description-text-color":s,"--n-action-text-color":l,"--n-title-text-color":p,"--n-title-font-weight":$,"--n-bezier":ze,"--n-bezier-ease-out":we,"--n-bezier-ease-in":Ce,"--n-border-radius":y,"--n-box-shadow":S,"--n-close-border-radius":pe,"--n-close-color-hover":me,"--n-close-color-pressed":ge,"--n-close-icon-color":w,"--n-close-icon-color-hover":f,"--n-close-icon-color-pressed":r,"--n-line-height":se,"--n-icon-color":ye,"--n-close-margin":le,"--n-close-size":de,"--n-close-icon-size":he,"--n-width":fe,"--n-padding-left":$e,"--n-padding-right":Le,"--n-padding-top":Se,"--n-padding-bottom":Ie,"--n-title-font-size":ve,"--n-meta-font-size":be,"--n-description-font-size":xe}}),h=i?Ze("notification",M(()=>e.type[0]),v,n):void 0;return{mergedClsPrefix:t,showAvatar:M(()=>e.avatar||e.type!=="default"),handleCloseClick(){e.onClose()},rtlEnabled:m,cssVars:i?void 0:v,themeClass:h?.themeClass,onRender:h?.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),a("div",{class:[`${t}-notification-wrapper`,this.themeClass],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:this.cssVars},a("div",{class:[`${t}-notification`,this.rtlEnabled&&`${t}-notification--rtl`,this.themeClass,{[`${t}-notification--closable`]:this.closable,[`${t}-notification--show-avatar`]:this.showAvatar}],style:this.cssVars},this.showAvatar?a("div",{class:`${t}-notification__avatar`},this.avatar?F(this.avatar):this.type!=="default"?a(Re,{clsPrefix:t},{default:()=>ft[this.type]()}):null):null,this.closable?a(je,{clsPrefix:t,class:`${t}-notification__close`,onClick:this.handleCloseClick}):null,a("div",{ref:"bodyRef",class:`${t}-notification-main`},this.title?a("div",{class:`${t}-notification-main__header`},F(this.title)):null,this.description?a("div",{class:`${t}-notification-main__description`},F(this.description)):null,this.content?a("pre",{class:`${t}-notification-main__content`},F(this.content)):null,this.meta||this.action?a("div",{class:`${t}-notification-main-footer`},this.meta?a("div",{class:`${t}-notification-main-footer__meta`},F(this.meta)):null,this.action?a("div",{class:`${t}-notification-main-footer__action`},F(this.action)):null):null)))}}),pt=Object.assign(Object.assign({},V),{duration:Number,onClose:Function,onLeave:Function,onAfterEnter:Function,onAfterLeave:Function,onHide:Function,onAfterShow:Function,onAfterHide:Function}),mt=O({name:"NotificationEnvironment",props:Object.assign(Object.assign({},pt),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const{wipTransitionCountRef:t}=q(Z),o=I(!0);let n=null;function i(){o.value=!1,n&&window.clearTimeout(n)}function c(r){t.value++,Ve(()=>{r.style.height=`${r.offsetHeight}px`,r.style.maxHeight="0",r.style.transition="none",r.offsetHeight,r.style.transition="",r.style.maxHeight=r.style.height})}function m(r){t.value--,r.style.height="",r.style.maxHeight="";const{onAfterEnter:p,onAfterShow:s}=e;p&&p(),s&&s()}function v(r){t.value++,r.style.maxHeight=`${r.offsetHeight}px`,r.style.height=`${r.offsetHeight}px`,r.offsetHeight}function h(r){const{onHide:p}=e;p&&p(),r.style.maxHeight="0",r.offsetHeight}function b(){t.value--;const{onAfterLeave:r,onInternalAfterLeave:p,onAfterHide:s,internalKey:l}=e;r&&r(),p(l),s&&s()}function x(){const{duration:r}=e;r&&(n=window.setTimeout(i,r))}function z(r){r.currentTarget===r.target&&n!==null&&(window.clearTimeout(n),n=null)}function w(r){r.currentTarget===r.target&&x()}function f(){const{onClose:r}=e;r?Promise.resolve(r()).then(p=>{p!==!1&&i()}):i()}return te(()=>{e.duration&&(n=window.setTimeout(i,e.duration))}),{show:o,hide:i,handleClose:f,handleAfterLeave:b,handleLeave:h,handleBeforeLeave:v,handleAfterEnter:m,handleBeforeEnter:c,handleMouseenter:z,handleMouseleave:w}},render(){return a(qe,{name:"notification-transition",appear:!0,onBeforeEnter:this.handleBeforeEnter,onAfterEnter:this.handleAfterEnter,onBeforeLeave:this.handleBeforeLeave,onLeave:this.handleLeave,onAfterLeave:this.handleAfterLeave},{default:()=>this.show?a(ht,Object.assign({},Qe(this.$props,ut),{onClose:this.handleClose,onMouseenter:this.duration&&this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.duration&&this.keepAliveOnHover?this.handleMouseleave:void 0})):null})}}),gt=u([d("notification-container",`
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `,[u(">",[d("scrollbar",`
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[u(">",[d("scrollbar-container",`
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[d("scrollbar-content",`
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]),g("top, top-right, top-left",`
 top: 12px;
 `,[u("&.transitioning >",[d("scrollbar",[u(">",[d("scrollbar-container",`
 min-height: 100vh !important;
 `)])])])]),g("bottom, bottom-right, bottom-left",`
 bottom: 12px;
 `,[u(">",[d("scrollbar",[u(">",[d("scrollbar-container",[d("scrollbar-content",`
 padding-bottom: 12px;
 `)])])])]),d("notification-wrapper",`
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]),g("top, bottom",`
 left: 50%;
 transform: translateX(-50%);
 `,[d("notification-wrapper",[u("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: scale(0.85);
 `),u("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: scale(1);
 `)])]),g("top",[d("notification-wrapper",`
 transform-origin: top center;
 `)]),g("bottom",[d("notification-wrapper",`
 transform-origin: bottom center;
 `)]),g("top-right, bottom-right",[d("notification",`
 margin-left: 28px;
 margin-right: 16px;
 `)]),g("top-left, bottom-left",[d("notification",`
 margin-left: 16px;
 margin-right: 28px;
 `)]),g("top-right",`
 right: 0;
 `,[j("top-right")]),g("top-left",`
 left: 0;
 `,[j("top-left")]),g("bottom-right",`
 right: 0;
 `,[j("bottom-right")]),g("bottom-left",`
 left: 0;
 `,[j("bottom-left")]),g("scrollable",[g("top-right",`
 top: 0;
 `),g("top-left",`
 top: 0;
 `),g("bottom-right",`
 bottom: 0;
 `),g("bottom-left",`
 bottom: 0;
 `)]),d("notification-wrapper",`
 margin-bottom: 12px;
 `,[u("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),u("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 opacity: 1;
 `),u("&.notification-transition-leave-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),u("&.notification-transition-enter-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]),d("notification",`
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `,[L("avatar",[d("icon",`
 color: var(--n-icon-color);
 `),d("base-icon",`
 color: var(--n-icon-color);
 `)]),g("show-avatar",[d("notification-main",`
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]),g("closable",[d("notification-main",[u("> *:first-child",`
 padding-right: 20px;
 `)]),L("close",`
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),L("avatar",`
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[d("icon","transition: color .3s var(--n-bezier);")]),d("notification-main",`
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `,[d("notification-main-footer",`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `,[L("meta",`
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),L("action",`
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]),L("header",`
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),L("description",`
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),L("content",`
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `,[u("&:first-child","margin: 0;")])])])])]);function j(e){const o=e.split("-")[1]==="left"?"calc(-100%)":"calc(100%)";return d("notification-wrapper",[u("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: translate(${o}, 0);
 `),u("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: translate(0, 0);
 `)])}const vt=k("n-notification-api"),bt=Object.assign(Object.assign({},Q.props),{containerClass:String,containerStyle:[String,Object],to:[String,Object],scrollable:{type:Boolean,default:!0},max:Number,placement:{type:String,default:"top-right"},keepAliveOnHover:Boolean}),Ot=O({name:"NotificationProvider",props:bt,setup(e){const{mergedClsPrefixRef:t}=J(e),o=I([]),n={},i=new Set;function c(f){const r=ne(),p=()=>{i.add(r),n[r]&&n[r].hide()},s=We(Object.assign(Object.assign({},f),{key:r,destroy:p,hide:p,deactivate:p})),{max:l}=e;if(l&&o.value.length-i.size>=l){let y=!1,$=0;for(const S of o.value){if(!i.has(S.key)){n[S.key]&&(S.destroy(),y=!0);break}$++}y||o.value.splice($,1)}return o.value.push(s),s}const m=["info","success","warning","error"].map(f=>r=>c(Object.assign(Object.assign({},r),{type:f})));function v(f){i.delete(f),o.value.splice(o.value.findIndex(r=>r.key===f),1)}const h=Q("Notification","-notification",gt,lt,e,t),b={create:c,info:m[0],success:m[1],warning:m[2],error:m[3],open:z,destroyAll:w},x=I(0);X(vt,b),X(Z,{props:e,mergedClsPrefixRef:t,mergedThemeRef:h,wipTransitionCountRef:x});function z(f){return c(f)}function w(){Object.values(o.value).forEach(f=>{f.hide()})}return Object.assign({mergedClsPrefix:t,notificationList:o,notificationRefs:n,handleAfterLeave:v},b)},render(){var e,t,o;const{placement:n}=this;return a(N,null,(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e),this.notificationList.length?a(ee,{to:(o=this.to)!==null&&o!==void 0?o:"body"},a(dt,{class:this.containerClass,style:this.containerStyle,scrollable:this.scrollable&&n!=="top"&&n!=="bottom",placement:n},{default:()=>this.notificationList.map(i=>a(mt,Object.assign({ref:c=>{const m=i.key;c===null?delete this.notificationRefs[m]:this.notificationRefs[m]=c}},et(i,["destroy","hide","deactivate"]),{internalKey:i.key,onInternalAfterLeave:this.handleAfterLeave,keepAliveOnHover:i.keepAliveOnHover===void 0?this.keepAliveOnHover:i.keepAliveOnHover})))})):null)}});export{tt as E,Tt as F,nt as I,Et as L,Ot as N,ot as S,it as W,Lt as a,ne as b,St as c,wt as d,kt as e,Ft as f,D as g,Ct as h,Qe as k,zt as m,vt as n,et as o,$t as p,F as r,It as z};
