import{i as c,S as v}from"./assets/vendor-gW1vCI4F.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const g=document.querySelector(".search-form"),d=document.querySelector(".gallery"),u=document.getElementById("loader"),h="51299963-3036a1369e15ef6a0c013ee56",p="https://pixabay.com/api/";let y,n="",l=!1;g.addEventListener("submit",async a=>{a.preventDefault();const s=a.target.elements.searchQuery.value.trim();if(!(!s||s===n||l)){n=s,l=!0,d.innerHTML="",w();try{const r=await b(s);r.length===0?c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(L(r),y=new v(".gallery a").refresh())}catch(r){c.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}finally{$(),l=!1,n=""}}});async function b(a){const s=`${p}?key=${h}&q=${encodeURIComponent(a)}&image_type=photo&orientation=horizontal&safesearch=true`;return(await(await fetch(s)).json()).hits}function L(a){const s=a.map(({webformatURL:r,largeImageURL:o,tags:e,likes:t,views:i,comments:f,downloads:m})=>`
      <div class="photo-card">
        <a href="${o}" class="image-link">
          <img src="${r}" alt="${e}" loading="lazy" />
        </a>
        <div class="stats">
          <div class="stat-block">
            <div class="stat-label">Likes</div>
            <div class="stat-value">${t}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Views</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Comments</div>
            <div class="stat-value">${f}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Downloads</div>
            <div class="stat-value">${m}</div>
          </div>
        </div>
      </div>`).join("");d.insertAdjacentHTML("beforeend",s)}function w(){u.classList.remove("hidden")}function $(){u.classList.add("hidden")}
//# sourceMappingURL=index.js.map
