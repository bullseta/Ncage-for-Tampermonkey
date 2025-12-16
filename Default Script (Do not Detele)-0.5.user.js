// ==UserScript==
// @name         Default Script (Do not Detele)
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  start script
// @author       Tampermonkey
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const imageUrls = [
        "https://i.imgur.com/9uXv6li.jpg", "https://i.imgur.com/N0oMyrU.png",
        "https://i.imgur.com/qLE7JAn.jpg", "https://i.imgur.com/7jTzFHI.jpg",
        "https://i.imgur.com/XaY97wP.jpg", "https://i.imgur.com/xr2utlZ.jpg",
        "https://i.imgur.com/FEIzEZg.png", "https://i.imgur.com/30rlY9H.jpg",
        "https://i.imgur.com/bzEZobw.png", "https://i.imgur.com/lrtPZiM.png",
        "https://i.imgur.com/9hhIATP.jpg", "https://i.imgur.com/7FRrfqd.png",
        "https://i.imgur.com/AAXeJYQ.png", "https://i.imgur.com/yDLQXzL.png",
        "https://i.imgur.com/zu4qJkV.jpg", "https://i.imgur.com/MOQZVzd.jpg",
        "https://i.imgur.com/BiaW8e4.jpg", "https://i.imgur.com/Zl77xwA.png",
        "https://i.imgur.com/W7Uv2aX.png", "https://i.imgur.com/paaa4pf.jpg",
        "https://i.imgur.com/FokfpbG.jpg", "https://i.imgur.com/LTKvT5w.png",
        "https://i.imgur.com/Mqm8bXr.png", "https://i.imgur.com/0UTPjUP.jpg",
        "https://i.imgur.com/cN4iWnd.jpg", "https://i.imgur.com/LjhGLeH.jpg",
        "https://i.imgur.com/EVxrSUk.jpg", "https://i.imgur.com/yB74BmO.jpg",
        "https://i.imgur.com/NxNpD6s.jpg", "https://i.imgur.com/xKbUVEp.jpg",
        "https://i.imgur.com/E5bJW46.jpg", "https://i.imgur.com/2q2znyG.jpg",
        "https://i.imgur.com/xdTyOe3.png", "https://i.imgur.com/RL47Y4i.jpg",
        "https://i.imgur.com/DIjjS0L.jpg", "https://i.imgur.com/lAdstAQ.jpg",
        "https://i.imgur.com/HTljWKs.jpg", "https://i.imgur.com/uHHtzuz.jpg",
        "https://i.imgur.com/QmsaANf.jpg", "https://i.imgur.com/ISOhnRT.jpg",
        "https://i.imgur.com/a29WFQz.jpg", "https://i.imgur.com/J3l800U.jpg",
        "https://i.imgur.com/ixCmrS9.jpg", "https://i.imgur.com/fkcITz0.jpg",
        "https://i.imgur.com/Kz5yQhK.jpg"
    ];

    function randomImg() {
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }

    function mark(el, prop) {
        try { el[prop] = true; } catch(e) {}
    }

    function substituteImg(el) {
        if (!el || el.__replaced) return;
        try {
            el.removeAttribute('srcset');
            el.removeAttribute('sizes');
            el.src = randomImg();
            mark(el, '__replaced');
        } catch(e) {}
    }

    function substituteBackground(el) {
        if (!el || el.__bgReplaced) return;
        try {
            let st = getComputedStyle(el);
            let bg = st.getPropertyValue('background-image');
            if (bg && bg !== 'none' && bg.indexOf('gradient') === -1) {
                el.style.backgroundImage = `url("${randomImg()}")`;
                el.style.backgroundSize = "cover";
                el.style.backgroundRepeat = "no-repeat";
                mark(el, '__bgReplaced');
            }
        } catch(e) {}
    }

    function handleLazyAttrs(el) {
        if (el.dataset) {
            if (el.dataset.src) el.dataset.src = randomImg();
            if (el.dataset.srcset) el.dataset.srcset = '';
        }
    }

    function replaceAll() {
        document.querySelectorAll('img').forEach(substituteImg);
        document.querySelectorAll('*').forEach(substituteBackground);
        document.querySelectorAll('[data-src]').forEach(handleLazyAttrs);
        document.querySelectorAll('[data-srcset]').forEach(handleLazyAttrs);
    }

    // roda imediatamente
    window.addEventListener('load', () => {
        replaceAll();

        // observer para nodes novos
        const obs = new MutationObserver(muts => {
            muts.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    if (node.tagName === 'IMG') substituteImg(node);
                    substituteBackground(node);
                    handleLazyAttrs(node);
                    node.querySelectorAll && node.querySelectorAll('img').forEach(substituteImg);
                    node.querySelectorAll && node.querySelectorAll('*').forEach(substituteBackground);
                    node.querySelectorAll && node.querySelectorAll('[data-src]').forEach(handleLazyAttrs);
                });
            });
        });

        obs.observe(document.body, { childList:true, subtree:true });

        // passa extra com delay pra páginas que carregam devagar
        setTimeout(replaceAll, 3000);

        // revarredura continua
        setInterval(replaceAll, 2000);
    });

    // pegar lazyload que entra na tela (Intersection)
    const io = new IntersectionObserver(entries => {
        entries.forEach(ent => {
            if (ent.isIntersecting) {
                substituteImg(ent.target);
                substituteBackground(ent.target);
                io.unobserve(ent.target);
            }
        });
    });

    // observa imagens e elementos com CSS background
    document.querySelectorAll('img, *').forEach(el => io.observe(el));

})();
