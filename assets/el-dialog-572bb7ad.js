import{o as W,ac as J,ar as Z,a6 as q,a as T,ae as G,a0 as H,aH as Q,c as $,f as k,s as X,j as A,q as h,n as m,k as e,t as x,y as I,w as b,g as U,m as ee,E as oe,p as j,l as O,_,C as se,bx as te,aL as K,Z as ae,r as N,$ as ne,h as le,by as re,aE as ie,aD as de,v as ce,z as ue,bz as me,a2 as fe}from"./index-537f057f.js";import{d as pe,a as ge,b as ve,c as be,u as he,E as ye,e as Ce}from"./el-overlay-80a7d957.js";import{c as Ee}from"./refs-044d52ff.js";const ke=(i,a,d)=>{let y={offsetX:0,offsetY:0};const n=s=>{const p=s.clientX,E=s.clientY,{offsetX:c,offsetY:g}=y,u=i.value.getBoundingClientRect(),t=u.left,v=u.top,D=u.width,S=u.height,F=document.documentElement.clientWidth,L=document.documentElement.clientHeight,B=-t+c,Y=-v+g,z=F-t-D+c,P=L-v-S+g,M=R=>{const o=Math.min(Math.max(c+R.clientX-p,B),z),r=Math.min(Math.max(g+R.clientY-E,Y),P);y={offsetX:o,offsetY:r},i.value.style.transform=`translate(${q(o)}, ${q(r)})`},l=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",M),document.addEventListener("mouseup",l)},f=()=>{a.value&&i.value&&a.value.addEventListener("mousedown",n)},C=()=>{a.value&&i.value&&a.value.removeEventListener("mousedown",n)};W(()=>{J(()=>{d.value?f():C()})}),Z(()=>{C()})},V=Symbol("dialogInjectionKey"),we=["aria-label"],$e=["id"],De=T({name:"ElDialogContent"}),Le=T({...De,props:pe,emits:ge,setup(i){const a=i,{t:d}=G(),{Close:y}=se,{dialogRef:n,headerRef:f,bodyId:C,ns:s,style:p}=H(V),{focusTrapRef:E}=H(Q),c=$(()=>[s.b(),s.is("fullscreen",a.fullscreen),s.is("draggable",a.draggable),s.is("align-center",a.alignCenter),{[s.m("center")]:a.center},a.customClass]),g=Ee(E,n),u=$(()=>a.draggable);return ke(n,f,u),(t,v)=>(k(),X("div",{ref:e(g),class:m(e(c)),style:O(e(p)),tabindex:"-1"},[A("header",{ref_key:"headerRef",ref:f,class:m(e(s).e("header"))},[h(t.$slots,"header",{},()=>[A("span",{role:"heading",class:m(e(s).e("title"))},x(t.title),3)]),t.showClose?(k(),X("button",{key:0,"aria-label":e(d)("el.dialog.close"),class:m(e(s).e("headerbtn")),type:"button",onClick:v[0]||(v[0]=D=>t.$emit("close"))},[I(e(oe),{class:m(e(s).e("close"))},{default:b(()=>[(k(),U(ee(t.closeIcon||e(y))))]),_:1},8,["class"])],10,we)):j("v-if",!0)],2),A("div",{id:e(C),class:m(e(s).e("body"))},[h(t.$slots,"default")],10,$e),t.$slots.footer?(k(),X("footer",{key:0,class:m(e(s).e("footer"))},[h(t.$slots,"footer")],2)):j("v-if",!0)],6))}});var Me=_(Le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const Re=["aria-label","aria-labelledby","aria-describedby"],Ae=T({name:"ElDialog",inheritAttrs:!1}),Ie=T({...Ae,props:ve,emits:be,setup(i,{expose:a}){const d=i,y=te();K({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},$(()=>!!y.title)),K({scope:"el-dialog",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/dialog.html#attributes",type:"Attribute"},$(()=>!!d.customClass));const n=ae("dialog"),f=N(),C=N(),s=N(),{visible:p,titleId:E,bodyId:c,style:g,overlayDialogStyle:u,rendered:t,zIndex:v,afterEnter:D,afterLeave:S,beforeLeave:F,handleClose:L,onModalClick:B,onOpenAutoFocus:Y,onCloseAutoFocus:z,onCloseRequested:P,onFocusoutPrevented:M}=he(d,f);ne(V,{dialogRef:f,headerRef:C,bodyId:c,ns:n,rendered:t,style:g});const l=Ce(B),R=$(()=>d.draggable&&!d.fullscreen);return a({visible:p,dialogContentRef:s}),(o,r)=>(k(),U(me,{to:"body",disabled:!o.appendToBody},[I(ue,{name:"dialog-fade",onAfterEnter:e(D),onAfterLeave:e(S),onBeforeLeave:e(F),persisted:""},{default:b(()=>[le(I(e(ye),{"custom-mask-event":"",mask:o.modal,"overlay-class":o.modalClass,"z-index":e(v)},{default:b(()=>[A("div",{role:"dialog","aria-modal":"true","aria-label":o.title||void 0,"aria-labelledby":o.title?void 0:e(E),"aria-describedby":e(c),class:m(`${e(n).namespace.value}-overlay-dialog`),style:O(e(u)),onClick:r[0]||(r[0]=(...w)=>e(l).onClick&&e(l).onClick(...w)),onMousedown:r[1]||(r[1]=(...w)=>e(l).onMousedown&&e(l).onMousedown(...w)),onMouseup:r[2]||(r[2]=(...w)=>e(l).onMouseup&&e(l).onMouseup(...w))},[I(e(re),{loop:"",trapped:e(p),"focus-start-el":"container",onFocusAfterTrapped:e(Y),onFocusAfterReleased:e(z),onFocusoutPrevented:e(M),onReleaseRequested:e(P)},{default:b(()=>[e(t)?(k(),U(Me,ie({key:0,ref_key:"dialogContentRef",ref:s},o.$attrs,{"custom-class":o.customClass,center:o.center,"align-center":o.alignCenter,"close-icon":o.closeIcon,draggable:e(R),fullscreen:o.fullscreen,"show-close":o.showClose,title:o.title,onClose:e(L)}),de({header:b(()=>[o.$slots.title?h(o.$slots,"title",{key:1}):h(o.$slots,"header",{key:0,close:e(L),titleId:e(E),titleClass:e(n).e("title")})]),default:b(()=>[h(o.$slots,"default")]),_:2},[o.$slots.footer?{name:"footer",fn:b(()=>[h(o.$slots,"footer")])}:void 0]),1040,["custom-class","center","align-center","close-icon","draggable","fullscreen","show-close","title","onClose"])):j("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Re)]),_:3},8,["mask","overlay-class","z-index"]),[[ce,e(p)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var Te=_(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const Ye=fe(Te);export{Ye as E};
