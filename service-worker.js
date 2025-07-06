const CACHE_NAME = 'quiz-app-cache-v5'; // Increment the version to force an update

// This is the list of all files your app needs to work offline.
const urlsToCache = [
  './',
  './index.html',
  './quiz.html',
  './how-to.html',
  './style.css',
  './hero-image.svg',
  './icon-512.png',
  './icon-192.png',
  // THIS IS THE NEW LINE FOR THE PDF "HELPER" FILE.
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js' 
];

// This part of the code cleans up old cache versions.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// This part saves all the files in urlsToCache when the app is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// This part serves files from the cache when the user is offline.
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) {
    // For external files (like Supabase, MathJax, etc.), just fetch from the network.
    // Do not try to cache them.
    return; 
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have it in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request);
      })
  );
});
