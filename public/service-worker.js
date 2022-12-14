const APP_PREFIX = 'BudgetTracker-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png",
    "./js/idb.js",
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./manifest.json"
  ];

  self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
              console.log('responding with cache : ' + e.request.url)
              return request
            } else {
              console.log('file is not cached, fetching : ' + e.request.url)
              return fetch(e.request)
          }
        })
        )
      })

      self.addEventListener("install", function (e) {
        e.waitUntil(
         caches.open(CACHE_NAME).then((cache)=> {
            console.log("Your files were pre-cached sucessfully!" + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE);
         })   
        )
      })

      self.addEventListener("activate", function (e){
        e.waitUntil(
        caches.keys().then(function(keyList){
            const cacheKeepList = keyList.filter(function(key){
                return key.indexOf(APP_PREFIX);
            })
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i){
                    if (cacheKeepList.indexOf(key)=== -1){
                        return caches.delete(keyList[i]);
                    }
            })
            );
        })
        );
      });