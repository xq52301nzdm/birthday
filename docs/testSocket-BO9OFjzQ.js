import{d as w,r as l,A as N,B as g,l as b,C as y,o as C,b as k,e as G,f as v,i as S,p as r,D as U,G as V,j as B,n as E,a as p}from"./index-BtXGn2g7.js";const T={class:"root-element"},q=r("div",{class:"root-box"},null,-1),M={class:"bottom"},A=["rows"],D={class:"send-btn-container"},J=w({__name:"testSocket",setup(H){console.log(1);const u=l(!1),s=l(""),f=l(1),n=N({userName:""}),i=l([]);let t=l(null);const h=g(()=>s.value?"send-btn":"send-btn-disabled");function d(){return new Promise(e=>{try{const c="10.10.116.62"+":"+"4000";t.value=window.io.connect(c),t.value.emit("JoinGroup",{userName:n.userName}),e()}catch{console.error("Can not connect to server")}})}const _=async()=>{await d(),t.value.on("JoinGroup",e=>{e[e.length-1].userName+""}),t.value.on("UpdateList",e=>{console.log(e,"data"),i.value=[...i.value,e],E(()=>{if(e.userName===n.userName){const o=document.querySelector(".root-box");o==null||o.scrollTo(0,o.offsetHeight)}})}),t.value.on("SendAll",e=>{e.msg})};b(()=>{u.value=!0,d();const e=document.querySelector(".textarea-box");e.addEventListener("input",function(){e.style.height="auto",e.style.height=e.scrollHeight+"px"})});const x=()=>{if(!s.value)return showToast({message:"不能发送空消息",type:"fail"});t.value.emit("UpdateGroup",{userName:n.userName,msg:s.value}),s.value=""};return y(s,e=>{if(e===""){const o=document.querySelector(".textarea-box");o.style.height="auto"}}),C(()=>{t.value.emit("ExitGroup",{userName:n.userName}),t.value.on("ExitGroup",e=>{e.userName+""})}),(e,o)=>{const m=p("van-field"),c=p("van-dialog");return k(),G("div",T,[v(c,{show:u.value,"onUpdate:show":o[1]||(o[1]=a=>u.value=a),title:"标题","show-cancel-button":"",onConfirm:_},{default:S(()=>[v(m,{modelValue:n.userName,"onUpdate:modelValue":o[0]||(o[0]=a=>n.userName=a),label:"",placeholder:"在此输入您的姓名"},null,8,["modelValue"])]),_:1},8,["show"]),q,r("div",M,[U(r("textarea",{"onUpdate:modelValue":o[2]||(o[2]=a=>s.value=a),rows:f.value,class:"textarea-box"},null,8,A),[[V,s.value]]),r("div",D,[r("div",{class:B(h.value),onClick:x},"发送",2)])])])}}});export{J as default};
