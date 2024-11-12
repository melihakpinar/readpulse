chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getSettings') {
        chrome.storage.sync.get(['wordsPerMinute', 'highlightColor'], function(result) {
            sendResponse({
                wordsPerMinute: result.wordsPerMinute || 200,
                highlightColor: result.highlightColor || '#ffc878'
            });
        });
        return true; // Will respond asynchronously
    }
});
