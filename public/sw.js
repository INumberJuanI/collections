/// <reference lib="webworker" />
// Service Worker with intelligent caching strategies
const CACHE_VERSION = 'pwa-v1';
const CACHES_TO_DELETE = new RegExp(`^(?!${CACHE_VERSION})pwa-`);
// Cache strategies configuration
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    NETWORK_ONLY: 'network-only',
};
// Cache rule matching
const CACHE_RULES = [
    // Cache-first: Static assets
    {
        patterns: [/_next\/static\//, /\.woff2?$/, /\.ttf$/, /\/fonts\//, /\/images\//],
        strategy: CACHE_STRATEGIES.CACHE_FIRST,
    },
    // Stale-while-revalidate: Pages and public content
    {
        patterns: [
            /\.html$/,
            /\/$/, // Homepage
            /\/api\/items/,
            /\/api\/media\/?$/, // Only cache media list page, NOT uploads
        ],
        strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    },
    // Network-first: API with timeout fallback
    {
        patterns: [/\/api\//],
        strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    },
    // Network-only: Dashboard and auth (never cache)
    {
        patterns: [/\/dashboard\//, /\/auth\//, /\/api\/auth\//, /\/api\/users\//],
        strategy: CACHE_STRATEGIES.NETWORK_ONLY,
    },
];
// Determine cache strategy for a URL
function getCacheStrategy(url) {
    for (const rule of CACHE_RULES) {
        if (rule.patterns.some((pattern) => pattern.test(url))) {
            return rule.strategy;
        }
    }
    return CACHE_STRATEGIES.NETWORK_FIRST;
}
// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(request);
    if (cached) {
        return cached;
    }
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }
    catch {
        // Return offline page if available
        return (await cache.match('/offline')) || new Response('Offline', { status: 503 });
    }
}
// Network-first strategy with timeout
async function networkFirst(request) {
    const cache = await caches.open(CACHE_VERSION);
    const timeout = new Promise((resolve) => {
        setTimeout(async () => {
            const cached = await cache.match(request);
            resolve(cached || new Response('Network timeout and no cache available', { status: 503 }));
        }, 4000); // 4 second timeout
    });
    try {
        const response = await Promise.race([fetch(request), timeout]);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }
    catch {
        const cached = await cache.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}
// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    });
    return cached || fetchPromise;
}
// Network-only strategy
async function networkOnly(request) {
    try {
        return await fetch(request);
    }
    catch {
        return new Response('Offline - this page requires network access', { status: 503 });
    }
}
// Handle fetch events
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    // Only handle GET requests
    if (request.method !== 'GET') {
        return;
    }
    // Skip chrome extensions and other non-http(s) protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }
    const strategy = getCacheStrategy(url.pathname);
    switch (strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
            event.respondWith(cacheFirst(request));
            break;
        case CACHE_STRATEGIES.NETWORK_FIRST:
            event.respondWith(networkFirst(request));
            break;
        case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
            event.respondWith(staleWhileRevalidate(request));
            break;
        case CACHE_STRATEGIES.NETWORK_ONLY:
            event.respondWith(networkOnly(request));
            break;
    }
});
// Handle install event - precache important files
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_VERSION).then((cache) => {
        return cache.addAll(['/', '/offline']).catch(() => {
            // Silently fail if files don't exist
        });
    }));
    self.skipWaiting();
});
// Handle activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames
            .filter((cacheName) => CACHES_TO_DELETE.test(cacheName))
            .map((cacheName) => caches.delete(cacheName)));
    }));
    self.clients.claim();
});
