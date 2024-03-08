import{b as g,_ as S,a as z,by as R,E as $,ao as D,aL as w,c as n,r as y,Z as B,ae as I,a6 as L,av as i,f as o,g as A,y as r,w as d,h as T,j as h,aE as N,x as P,n as s,s as l,q as f,t as q,p as t,v as H,z as U,bz as V,a2 as F}from"./index-537f057f.js";import{b as M,c as O,E as j,u as Z}from"./el-overlay-80a7d957.js";const G=g({...M,direction:{type:String,default:"rtl",values:["ltr","rtl","ttb","btt"]},size:{type:[String,Number],default:"30%"},withHeader:{type:Boolean,default:!0},modalFade:{type:Boolean,default:!0}}),J=O,K=z({name:"ElDrawer",components:{ElOverlay:j,ElFocusTrap:R,ElIcon:$,Close:D},inheritAttrs:!1,props:G,emits:J,setup(e,{slots:a}){w({scope:"el-drawer",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/drawer.html#slots"},n(()=>!!a.title)),w({scope:"el-drawer",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/drawer.html#attributes",type:"Attribute"},n(()=>!!e.customClass));const u=y(),c=y(),b=B("drawer"),{t:v}=I(),p=n(()=>e.direction==="rtl"||e.direction==="ltr"),m=n(()=>L(e.size));return{...Z(e,u),drawerRef:u,focusStartRef:c,isHorizontal:p,drawerSize:m,ns:b,t:v}}}),Q=["aria-label","aria-labelledby","aria-describedby"],W=["id"],X=["aria-label"],Y=["id"];function _(e,a,u,c,b,v){const p=i("close"),m=i("el-icon"),C=i("el-focus-trap"),k=i("el-overlay");return o(),A(V,{to:"body",disabled:!e.appendToBody},[r(U,{name:e.ns.b("fade"),onAfterEnter:e.afterEnter,onAfterLeave:e.afterLeave,onBeforeLeave:e.beforeLeave,persisted:""},{default:d(()=>[T(r(k,{mask:e.modal,"overlay-class":e.modalClass,"z-index":e.zIndex,onClick:e.onModalClick},{default:d(()=>[r(C,{loop:"",trapped:e.visible,"focus-trap-el":e.drawerRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:d(()=>[h("div",N({ref:"drawerRef","aria-modal":"true","aria-label":e.title||void 0,"aria-labelledby":e.title?void 0:e.titleId,"aria-describedby":e.bodyId},e.$attrs,{class:[e.ns.b(),e.direction,e.visible&&"open",e.customClass],style:e.isHorizontal?"width: "+e.drawerSize:"height: "+e.drawerSize,role:"dialog",onClick:a[1]||(a[1]=P(()=>{},["stop"]))}),[h("span",{ref:"focusStartRef",class:s(e.ns.e("sr-focus")),tabindex:"-1"},null,2),e.withHeader?(o(),l("header",{key:0,class:s(e.ns.e("header"))},[e.$slots.title?f(e.$slots,"title",{key:1},()=>[t(" DEPRECATED SLOT ")]):f(e.$slots,"header",{key:0,close:e.handleClose,titleId:e.titleId,titleClass:e.ns.e("title")},()=>[e.$slots.title?t("v-if",!0):(o(),l("span",{key:0,id:e.titleId,role:"heading",class:s(e.ns.e("title"))},q(e.title),11,W))]),e.showClose?(o(),l("button",{key:2,"aria-label":e.t("el.drawer.close"),class:s(e.ns.e("close-btn")),type:"button",onClick:a[0]||(a[0]=(...E)=>e.handleClose&&e.handleClose(...E))},[r(m,{class:s(e.ns.e("close"))},{default:d(()=>[r(p)]),_:1},8,["class"])],10,X)):t("v-if",!0)],2)):t("v-if",!0),e.rendered?(o(),l("div",{key:1,id:e.bodyId,class:s(e.ns.e("body"))},[f(e.$slots,"default")],10,Y)):t("v-if",!0),e.$slots.footer?(o(),l("div",{key:2,class:s(e.ns.e("footer"))},[f(e.$slots,"footer")],2)):t("v-if",!0)],16,Q)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])]),_:3},8,["mask","overlay-class","z-index","onClick"]),[[H,e.visible]])]),_:3},8,["name","onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"])}var x=S(K,[["render",_],["__file","/home/runner/work/element-plus/element-plus/packages/components/drawer/src/drawer.vue"]]);const ae=F(x);export{ae as E};
