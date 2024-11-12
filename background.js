chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getSettings') {
        chrome.storage.sync.get(['wordsPerMinute', 'highlightColor', 'enabled'], function(result) {
            sendResponse({
                wordsPerMinute: result.wordsPerMinute || 200,
                highlightColor: result.highlightColor || '#ffc878',
                enabled: result.enabled !== false // Default to true
            });
        });
        return true; // Will respond asynchronously
    }
});
