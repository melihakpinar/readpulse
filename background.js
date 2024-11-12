chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getWordsPerMinute') {
        chrome.storage.sync.get(['wordsPerMinute'], function(result) {
            sendResponse({wordsPerMinute: result.wordsPerMinute || 200});
        });
        return true; // Will respond asynchronously
    }
});
