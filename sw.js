'use strict';

var staticCacheName = 'restaurant_cache_1';
var cacheFiles = ['./',
                  'index.html',
                  'restaurant.html',
                  'css/styles.css',
                  'js/dbhelper.js',
                  'js/main.js',
                  'js/restaurant_info.js',
                  'data/restaurants.json',
                  'img/1.jpg',
                  'img/2.jpg',
                  'img/3.jpg',
                  'img/4.jpg',
                  'img/5.jpg',
                  'img/6.jpg',
                  'img/7.jpg',
                  'img/8.jpg',
                  'img/9.jpg',
                  'img/10.jpg'
                ];

self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    }).catch(function () {
        console.log('error while caching the files');
    }));
});

//delete the old caches when the new service worker is activated.
self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
               cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
        );
    })
  )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open(staticCacheName).then(function (cache) {
        return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
            });
        });
    }));
});