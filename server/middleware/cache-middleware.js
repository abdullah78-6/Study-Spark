import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 3 });

const cacheMiddleware=(duration)=>{
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const key = `__express__${req.originalUrl}`;
        const cachedResponse = cache.get(key);
        

        if (cachedResponse !== undefined) {
            res.set('X-Cache', 'HIT');
            return res.json(cachedResponse);
        }

        // Store original json method
        const originalJson = res.json.bind(res);

        res.json = (body) => {
            cache.set(key, body, duration);
            res.set('X-Cache', 'MISS');
            return originalJson(body);
        };

        next();
    };
}
export {cacheMiddleware}