import{a as v,S as E,i as d}from"./assets/vendor-D5mnuR-h.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();v.defaults.baseURL="https://pixabay.com/api/";const c={key:"49331569-d75c2214014d7ff2c794993e6",image_type:"photo",orientation:"horizontal",safesearch:!0};function L(t,e=1,o=15){return c.q=t,c.page=e,c.per_page=o,v.get("",{params:c})}function b(t,e){const o=[];t.forEach(r=>{o.push(`<li>
                <a class="gallery-link" href="${r.largeImageURL}">
                    <img src="${r.previewURL}" alt="${r.tags}">
                    <ul>
                        <li>
                            <p>Likes: <span>${r.likes}</span></p>
                        </li>
                        <li>
                            <p>Views: <span>${r.views}</span></p>
                        </li>
                        <li>
                            <p>Comments: <span>${r.comments}</span></p>
                        </li>
                        <li>
                            <p>Downloads: <span>${r.downloads}</span></p>
                        </li>
                    </ul>
                </a>
            </li>`)}),e.gallery.insertAdjacentHTML("beforeend",o.join("")),e.lightbox.refresh(),e.isPaging&&x(e.gallery.querySelector(".gallery-link").getBoundingClientRect().height*2)}function x(t){window.scrollBy({top:t,left:0,behavior:"smooth"})}function k(t){t.innerHTML=""}const p=document.querySelector('input[name="search-text"]'),q=document.querySelector('button[type="submit"]'),w=document.querySelector(".gallery"),l=document.querySelector(".loading"),g=document.querySelector(".load-more-button"),f=document.querySelector(".end-of-search"),C=document.querySelector(".back-to-top"),D={theme:"dark",backgroundColor:"#EF4040",position:"topRight",messageColor:"#FAFAFB",message:"Please enter search terms",iconUrl:"./error-alert.svg",iconColor:"white",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B"},F={theme:"dark",backgroundColor:"#EF4040",position:"topRight",messageColor:"#FAFAFB",message:"No images found, try again",iconUrl:"./error-alert.svg",iconColor:"white",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B"},O={captionsData:"alt",captionDelay:250},T=new E(".gallery a",{...O}),u={gallery:w,lightbox:T,isPaging:!1};let n=1;const m=200;let S,i=p.value,y;function H(t){S=Math.floor(t/m)}function P(){n++}function M(){n=1}function B(){return S<n}q.addEventListener("click",async t=>{if(t.preventDefault(),k(w),M(),f.classList.add("visually-hidden"),g.classList.add("visually-hidden"),!i||i===""){d.show({...D});return}l.classList.remove("visually-hidden"),await L(i,n,m).then(e=>{console.log(e),l.classList.add("visually-hidden"),e.data.totalHits>0?(u.isPaging=!1,b(e.data.hits,u),H(e.data.totalHits),B()?f.classList.remove("visually-hidden"):(u.isPaging=!0,P(),g.classList.remove("visually-hidden"),y=i)):d.show({...F})}).catch(e=>{l.classList.add("visually-hidden"),console.error("Error:",e),d.error({title:"Error",message:"Error fetching results, try again later (check console for details)"})})});g.addEventListener("click",async t=>{t.preventDefault(),await L(y,n,m).then(e=>{l.classList.add("visually-hidden"),e.data.totalHits>0&&(b(e.data.hits,u),B()?(g.classList.add("visually-hidden"),f.classList.remove("visually-hidden")):(P(),y=i))}).catch(e=>{l.classList.add("visually-hidden"),d.error({title:"Error",message:"Error fetching results, try again later (check console for details)"})})});C.addEventListener("click",t=>{t.preventDefault(),window.scrollTo(0,0)});p.addEventListener("input",()=>i=p.value.trim());
//# sourceMappingURL=index.js.map
