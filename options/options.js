byId = (e) => document.getElementById(e);
valueOf = (e) => e.value;
logSaved = (e) => console.log('saved', Object.keys(e).reduce((acc, key) => ({ ...acc, [key]: e[key].value }), {}));
storage = ({ method, key, cb }) => chrome.storage.sync[method](key, cb)

const refs = {
  inputs: {
    baseURL: byId('baseURL'),
    iframeURL: byId('iframeURL'),
  },
  button: byId('button'),
}

refs.button.addEventListener("click", onSave);

onSave = () => storage(
  {
    method: set,
    key: Object.keys(refs.inputs).reduce((acc, key) => ({ ...acc, [key]: valueOf(refs.inputs[key]) }), {}),
    cb: logSaved(refs.inputs)
  }
);

onLoad = () => storage({
  method: get,
  key: Object.keys(refs.inputs),
  cb: (result) => {
    console.log("loaded", result);
    Object.keys(result).forEach(key => refs.inputs[key].value = result[key]);
  }
});

onLoad();