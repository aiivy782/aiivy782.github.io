let remainingTime = 0;
let animationFrameId = null;
let lastTickTime = null;
let isPaused = false;

self.onmessage = function(e) {
    const { action, duration } = e.data;
    
    if (action === 'start') {
        if (!isPaused) {
            remainingTime = duration;
        }
        isPaused = false;
        lastTickTime = performance.now();
        self.postMessage({ remainingTime });
        tick();
    } else if (action === 'pause') {
        isPaused = true;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    } else if (action === 'reset') {
        isPaused = false;
        remainingTime = duration;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        lastTickTime = null;
        self.postMessage({ remainingTime: duration });
    }
};

function tick() {
    if (isPaused) return;

    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTickTime;

    if (elapsedTime >= 1000) {
        lastTickTime = currentTime;
        remainingTime--;
        
        if (remainingTime < 0) {
            self.postMessage({ remainingTime: 0, completed: true });
            return;
        }

        self.postMessage({ remainingTime });
    }

    animationFrameId = requestAnimationFrame(tick);
}