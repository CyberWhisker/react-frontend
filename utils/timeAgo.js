// src/utils/timeAgo.js
export function timeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - new Date(date)) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const delta = Math.floor(secondsAgo / secondsInUnit);
        if (delta > 0) {
            return rtf.format(-delta, unit);
        }
    }

    return 'just now';
}
