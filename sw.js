const cacheName = 'v1';

const cacheAssets = [
	'index.html',
	'style.css',
	'main.js'
];
//Call install event
self.addEventListener('install', e => {
	console.log('Service Worker: Installed');
	
	e.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			console.log('Service Worker: Caching files');
			cache.addAll(cacheAssets);
		})
		.then(() => self.skipWaiting())
	);
});
//Call activate event
self.addEventListener('activate', e => {
	console.log('Service Worker: Activated');
	//Remove unwanted caches
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName){
						console.log('Service Worker: Clearing old cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
//Call fetch event
self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		fetch(e.request).catch(() => caches.match(e.request))
	)
});