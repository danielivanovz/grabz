storage = ({ method, key, cb }) => chrome.storage.sync[method](key, cb)
setValue = (value) => document.getElementById('output').value = value;
sanitizer = (url) => url.lastIndexOf('/client') > -1
  ? url = url.slice(url.lastIndexOf('/client'))
  : url = url;

grab = (tab) => {
  return chrome.tabs.sendMessage(tab.id, { command: "grab" }, (msg) => {
    if (!msg || !msg.url) return setValue('no valid url found')

    storage({
      method: 'get',
      key: 'iframeURL',
      cb: (storage) => {
        if (!msg.url.includes(storage.iframeURL)) return setValue('url does not match')

        setValue(sanitizer(msg.url))
        navigator.clipboard.writeText(sanitizer(msg.url))
        document.getElementById('notification').style.display = 'block'
      }
    })
  });
}

run = () => storage({
  method: 'get',
  key: 'baseURL',
  cb: (storage) => {
    return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].url.includes(storage.baseURL)) return setValue('url does not match')
      grab(tabs[0])
    });
  }
})

run()