// Define a version for your cache
const CACHE_NAME = 'tourboats-v1';

// List all the assets you want to cache
const urlsToCache = [
  '/',
  '/about',
  '/contact',
  '/yachts/private',
  '/yachts/sharing',
  '/manifest.json',
  '/favicon.ico',
  // Note: Add paths to your key static assets here.
  // Be careful not to cache everything, especially large images that are not critical.
  // The service worker will automatically cache assets as the user navigates.
];

// Install event: triggered when the service worker is first installed.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Pre-cache the essential assets.
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: triggered when the service worker is activated.
// This is a good place to clean up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});


// Fetch event: triggered for every network request made by the page.
// This is where you can intercept requests and serve from cache if available.
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Try to find the response in the cache.
      const cachedResponse = await cache.match(event.request);

      // A 'network-first' strategy for navigation and data.
      // For other assets, 'cache-first' might be better.
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // If we get a valid response, we update the cache.
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // If the network fails, and we have a cached response, return it.
        if (cachedResponse) {
          return cachedResponse;
        }
        // If there's no network and no cache, you could return a custom offline page.
        // For now, we just let the browser handle the error.
      });

      // Return the cached response immediately if available, otherwise wait for the network.
      return cachedResponse || fetchPromise;
    })
  );
});
