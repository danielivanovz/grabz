window.onload = function () {
	chrome.runtime.onMessage.addListener(function (_, _, sendResponse) {
		const url = document.querySelector('app-root').querySelector('iframe').src
		if (!url) return true

		sendResponse({ url: url });
	});
	return true;
};	
