document.getElementById('save').addEventListener('click', function() {
    const wordsPerMinute = parseInt(document.getElementById('wordsPerMinute').value) || 200;
    const highlightColor = document.getElementById('highlightColor').value;
    const enabled = document.getElementById('enabled').checked;
    
    chrome.storage.sync.set({ 
        wordsPerMinute: wordsPerMinute,
        highlightColor: highlightColor,
        enabled: enabled
    }).then((result) => {
        console.log(result);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['wordsPerMinute', 'highlightColor', 'enabled'], function(result) {
        document.getElementById('wordsPerMinute').value = result.wordsPerMinute || 200;
        document.getElementById('highlightColor').value = result.highlightColor || '#ffc878';
        document.getElementById('enabled').checked = result.enabled !== false; // Default to true
    });
});
