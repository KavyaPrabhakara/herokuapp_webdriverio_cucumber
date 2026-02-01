const files = [
  './features/step-definitions/steps.js',
  './features/step-definitions/saucelogin.steps.js',
  './features/step-definitions/fileupload.steps.js',
  './features/step-definitions/dynamiccontent.steps.js',
  './features/step-definitions/dropdown.steps.js',
  './features/step-definitions/alerts.steps.js'
];

files.forEach(f => {
  try {
    require(f);
    console.log('OK', f);
  } catch (err) {
    console.error('ERR', f, err && err.stack ? err.stack.split('\n')[0] : err);
  }
});
