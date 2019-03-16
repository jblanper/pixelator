!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class n{constructor(t,e=1){this.url=t,this.scale=e}init(){return this.setImg().then(t=>(console.log(t),this.setCacheImg(),this.setImgData(),"Created cached image and got its data")).catch(t=>console.log(t))}setImg(){return new Promise((t,e)=>{this.img=new Image,this.img.src=this.url,this.img.onload=(e=>t(`"${this.img.src}" loaded`)),this.img.onerror=(t=>e(`Error loading "${this.img.src}"`))})}setCacheImg(){let t,e;const i=this.img.height/this.img.width;window.innerHeight/window.innerWidth<i?(e=window.innerHeight,t=window.innerHeight/i):(t=window.innerWidth,e=window.innerWidth*i),this.cacheCtx=Object.assign(document.createElement("canvas"),{width:t,height:e}).getContext("2d")}setImgData(){this.cacheCtx.drawImage(this.img,0,0,this.width,this.height),this.imgData=this.cacheCtx.getImageData(0,0,this.width,this.height)}get width(){return this.cacheCtx.canvas.width}get height(){return this.cacheCtx.canvas.height}get pixelData(){return this.imgData.data}}class s{constructor({url:t,scale:e=1,columns:i,rows:s}){this.columns=i,this.rows=s,this.cachedImg=new n(t,e)}init(){return this.cachedImg.init().then(t=>(console.log(t),this.setCellDimensions(),this.setMatrix(),"Created matrix image"))}setCellDimensions(){this.cellWidth=Math.ceil(this.cachedImg.width/this.columns),this.cellHeight=Math.ceil(this.cachedImg.height/this.rows)}setMatrix(){this.matrix=Array.from({length:this.rows},(t,e)=>Array.from({length:this.columns},(t,i)=>({color:this.getPixelRGB(this.getPixel(e,i)),origin:{x:i*this.cellWidth,y:e*this.cellHeight}})))}getPixel(t,e){const i=4*(e*this.cellWidth+t*this.cellHeight*this.cachedImg.width);return this.cachedImg.pixelData.slice(i,i+4)}getPixelRGB(t){return`rgb(${t[0]}, ${t[1]}, ${t[2]})`}update(t,e){t&&(this.columns=t),e&&(this.rows=e),this.setCellDimensions(),this.setMatrix()}}function a(t,e=null,i=null){const n=document.createElement(t);return e&&o(n,e),i&&l(n,i),n}function h(t,e=null,i=null){const n=document.createElementNS("http://www.w3.org/2000/svg",t);return e&&o(n,e),i&&l(n,i),n}function o(t,e){Object.keys(e).forEach(i=>{switch(i){case"classes":e[i].forEach(e=>t.classList.add(e));break;case"textContent":t.textContent=e[i];break;case"selected":t.selected=e[i];default:t.setAttribute(i,e[i])}})}function l(t,e){e.forEach(e=>t.appendChild(e))}class r{constructor({parent:t,title:e,content:i}){this.title=e,this.content=i,this.node=null,this.parent=t,this.render()}render(){this.node=a("div",{id:"description"},[a("h1",{textContent:this.title},null)]),this.content.forEach(t=>{const e=a("p",{textContent:t},null);this.node.appendChild(e)}),this.parent.node.appendChild(this.node)}}class d{constructor({parent:t,prop:e,scope:i=null,updateFn:n=null,label:s,options:a,value:h}){this.prop=e,this.scope=i,this.updateFn=n,this.label=s,this.options=a,this.value=h,this.parent=t,this.node=null,this.input=null,this.render(),this.eventListener()}render(){const t=this.options.map(t=>a("option",{value:t,textContent:t,selected:t===this.value}));this.input=a("select",{id:this.prop},t),this.node=a("div",{classes:["select"]},[a("label",{textContent:this.label,for:this.prop},null),a("br"),this.input]),this.parent.node.appendChild(this.node)}eventListener(){this.input.addEventListener("change",this.eventHandler.bind(this))}eventHandler(t){this.value=this.input.value,this.scope?this.scope[this.prop]=this.value:this.parent.scope[this.prop]=this.value,this.updateFn?this.updateFn():this.parent.updateFn()}}class c{constructor({parent:t,label:e,scopeOptions:i,updateFn:n=null,type:s="image"}){this.scopeOptions=i,this.updateFn=n,this.type=s,this.label=e,this.parent=t,this.node=null,this.input=null,this.render(),this.eventListener()}render(){this.input=a("input",{type:"file"},null),this.node=a("label",{textContent:this.label,id:this.label.replace(/\s/g,"-"),classes:["file-btn"]},[this.input]),this.parent.node.appendChild(this.node)}eventListener(){this.input.addEventListener("change",this.eventHandler.bind(this))}eventHandler(t){const e=new FileReader;e.onload=(t=>{const e="json"===this.type?JSON.parse(t.target.result):t.target.result,i=this.scopeOptions?{[this.scopeOptions]:e}:e;this.updateFn?this.updateFn(i):this.parent.updateFn(i)}),"image"===this.type&&e.readAsDataURL(t.target.files[0]),"json"===this.type&&e.readAsText(t.target.files[0])}}class p{constructor({parent:t,label:e,fn:i}){this.fn=i,this.label=e,this.parent=t,this.node=null,this.render(),this.eventListener()}render(){this.node=a("button",{textContent:this.label,id:this.label.replace(/\s/g,"-")},null),this.parent.node.appendChild(this.node)}eventListener(){this.node.addEventListener("click",this.eventHandler.bind(this))}eventHandler(t){this.fn()}}class u{constructor({parent:t,max:e,min:i,step:n=1,value:s,prop:a,scope:h=null,updateFn:o=null,label:l}){this.prop=a,this.scope=h,this.updateFn=o,this.label=l,this.max=e,this.min=i,this.step=n,this.value=s,this.parent=t,this.node=null,this.input=null,this.output=null,this.render(),this.eventListener()}render(){this.input=a("input",{type:"range",id:this.prop,max:this.max,min:this.min,step:this.step,value:this.value}),this.output=a("output",{textContent:this.value}),this.node=a("div",{classes:["slider"]},[a("label",{for:this.prop,textContent:`${this.label} — `}),this.output,a("br"),this.input]),this.parent.node.appendChild(this.node)}eventListener(){this.input.addEventListener("change",this.eventHandler.bind(this))}eventHandler(t){const e=this.input.valueAsNumber;this.output.textContent=e,this.scope?this.scope[this.prop]=e:this.parent.scope[this.prop]=e,this.updateFn?this.updateFn():this.parent.updateFn()}}class g{constructor({parent:t,prop:e,scope:i=null,updateFn:n=null,value:s,label:a}){this.prop=e,this.scope=i,this.updateFn=n,this.label=a,this.value=s,this.node=null,this.parent=t,this.render(),this.eventListener()}render(){this.node=a("button",{textContent:this.label,id:this.prop,classes:["toggle"]},null),this.value||this.node.classList.add("deactivated"),this.parent.node.appendChild(this.node)}eventListener(){this.node.addEventListener("click",this.eventHandler.bind(this))}eventHandler(t){this.node.classList.toggle("deactivated"),this.value=!this.value,this.scope?this.scope[this.prop]=this.value:this.parent.scope[this.prop]=this.value,this.updateFn?this.updateFn():this.parent.updateFn()}}class m{constructor({parent:t,fn:e,updateFn:i=null,label:n}){this.fn=e,this.updateFn=i,this.label=n,this.node=null,this.parent=t,this.render(),this.eventListener()}render(){this.node=a("button",{textContent:this.label,id:this.label.replace(/\s/g,"-")},null),this.parent.node.appendChild(this.node)}eventListener(){this.node.addEventListener("click",this.eventHandler.bind(this))}eventHandler(t){this.fn(),this.updateFn?this.updateFn():this.parent.updateFn()}}class v{constructor({parent:t,select:e,emptyMessage:i="No options"}){this.emptyMessage=i,this.select=e.input,this.selectValue=this.select.value,this.parent=t,this.node=null,this.updateFn=this.parent.updateFn,this.scope=this.parent.scope,this.groups={},this.render(),this.eventListener()}createGroup({name:t,nodes:e}){const i=a("div",{id:`section-${t}`},e.map(t=>t.node));this.groups[t]=i,this.render()}render(){this.groups[this.selectValue]||(this.groups[this.selectValue]=a("div",{classes:["section-empty"]},[a("p",{textContent:this.emptyMessage})])),this.node?this.node.replaceChild(this.groups[this.selectValue],this.node.firstElementChild):(this.node=a("div",{classes:["section-container"]},[this.groups[this.selectValue]]),this.parent.node.appendChild(this.node))}eventListener(){this.select.addEventListener("change",this.eventHandler.bind(this))}eventHandler(t){this.selectValue=this.select.value,this.render()}}class x{constructor({showOnLoad:t=!0,updateFn:e,scope:i,githubUrl:n}){this.showOnLoad=t,this.updateFn=e,this.scope=i,this.githubUrl=n,this.componentTypes={description:r,select:d,toggleButton:g,slider:u,fileButton:c,downloadButton:p,section:v,button:m},this.node=null,this.menuBtn=null,this.closeBtn=null,this.reset(),this.render(),this.eventListener()}reset(){const t=document.querySelector("#ui"),e=document.querySelector("#menu");t&&t.parentNode.removeChild(t),e&&e.parentNode.removeChild(e)}createComponent(t,e=null){return e.parent||(e=Object.assign({},{parent:this},e)),new this.componentTypes[t](e)}render(){this.menuBtn=h("svg",{width:45,height:45,id:"menu"},[h("rect",{x:10,y:10,width:25,height:5,fill:"#000"}),h("rect",{x:10,y:20,width:25,height:5,fill:"#000"}),h("rect",{x:10,y:30,width:25,height:5,fill:"#000"})]),this.closeBtn=a("button",{textContent:"[ close ]",id:"close"},null),this.node=a("div",{id:"ui"},[this.closeBtn]),this.showOnLoad||this.node.classList.add("moverIzq"),document.body.appendChild(this.menuBtn),document.body.appendChild(this.node)}addSeparator(){const t=document.createElement("hr");this.node.appendChild(t)}eventListener(){this.menuBtn.addEventListener("click",this.openEventHandler.bind(this)),this.closeBtn.addEventListener("click",this.closeEventHandler.bind(this))}openEventHandler(t){this.node.classList.remove("moverIzq")}closeEventHandler(t){this.node.classList.add("moverIzq")}addSignature(){const t=h("svg",{width:50,height:50,viewBox:"0 0 13.229166 13.229167"},[h("g",{fill:"#800000"},[h("path",{d:"m6.6152 0.023438c-3.6369 0-6.5918 2.9548-6.5918 6.5918 0 3.6369 2.9548 6.5898 6.5918 6.5898 3.6369 0 6.5898-2.9529 6.5898-6.5898 0-3.6369-2.9529-6.5918-6.5898-6.5918zm0 0.50781c3.363 0 6.084 2.721 6.084 6.084s-2.721 6.084-6.084 6.084-6.084-2.721-6.084-6.084 2.721-6.084 6.084-6.084z",color:"#000000",style:"font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"},null),h("g",{transform:"translate(-.19844 .19844)"},[h("path",{d:"m8.1166 5.4546v5.6823c1.5655-0.0045 2.8332-1.2747 2.8332-2.8411 0-1.5665-1.2678-2.8369-2.8332-2.8411z"},null),h("path",{d:"m8.1204 1.6954v3.2544c0.89579-0.00377 1.6209-0.7306 1.6209-1.6272 0-0.89658-0.72514-1.6238-1.6209-1.6272z"},null),h("path",{d:"m5.8204 1.6958v6.996a0.81365 0.81365 0 0 1 -0.8137 0.8137 0.81365 0.81365 0 0 1 -0.8137 -0.8137l-1.5168 0.72437a2.4409 2.4409 0 0 0 2.3305 1.7167 2.4409 2.4409 0 0 0 2.4411 -2.4411v-6.996z"},null)])])]),e=a("a",{href:"//joseblancoperales.com",target:"_blank",id:"signature"},[a("span",{textContent:"by"}),t]),i=a("a",{href:this.githubUrl,target:"_blank",id:"github-link",textContent:"github"},null);this.node.appendChild(e),this.node.appendChild(i)}}class b{constructor(t,e){this._ctx=t,this.options=e}init({imageUrl:t=this.options.imageUrl,scale:e=this.options.scale,columns:i=this.options.columns,rows:n=this.options.rows}={}){return this.imageMatrix=new s({url:t,scale:e,columns:i,rows:n}),this.imageMatrix.init().then(t=>(console.log(t),this._ctx.canvas.height=this.imageMatrix.cachedImg.height,this._ctx.canvas.width=this.imageMatrix.cachedImg.width,this.setBindings(),this.draw(),"Sketch initialized"))}setBindings(){const t=new x({showOnLoad:!0,updateFn:t=>{this.update(),this.draw()},scope:this});t.createComponent("description",{title:"Pixelator",content:["This web turns any photo into a complex tessellations.","Change the number of columns and rows of the tessellation                 with the sliders. A new image from a local device can  \n                be locally loaded. No data goes to no server. Enjoy!"]}),t.addSeparator();t.createComponent("slider",{prop:"columns",label:"columns",scope:this.imageMatrix,max:this.imageMatrix.cachedImg.width/7,min:2,value:this.imageMatrix.columns}),t.createComponent("slider",{prop:"rows",label:"rows",scope:this.imageMatrix,max:this.imageMatrix.cachedImg.height/7,min:4,value:this.imageMatrix.rows});t.addSeparator(),t.createComponent("fileButton",{scopeOptions:"imageUrl",updateFn:this.init.bind(this),label:"upload IMG"}),t.createComponent("downloadButton",{fn:this.setPng.bind(this),label:"download IMG"}),t.addSignature()}setPng(){const t=Object.assign(document.createElement("canvas"),{width:this._ctx.canvas.width,height:this._ctx.canvas.height}).getContext("2d");t.drawImage(this._ctx.canvas,0,0);const e=t.canvas.toDataURL("image/png"),i=document.createElement("a");i.style="display: none;",i.download="img.png",i.href=e,document.body.appendChild(i),i.click(),i.parentNode.removeChild(i)}draw(){this.imageMatrix.matrix.forEach(t=>t.forEach(t=>{this._ctx.fillStyle=t.color,this._ctx.fillRect(t.origin.x,t.origin.y,this.imageMatrix.cellWidth,this.imageMatrix.cellHeight)}))}update(){this.imageMatrix.update()}}const f={canvas:{},sketch:{backgroundColor:"white",imageUrl:"./photo.jpg",scale:1,columns:5,rows:15}};!function(){const t=document.querySelector("canvas").getContext("2d");new b(t,f.sketch).init().then(t=>console.log(t)).catch(t=>console.log(t))}()}]);