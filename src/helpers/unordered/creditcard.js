dumdum.addHelper('creditCard', function(separator) {
  return [
    core.string('####'),
    core.string('####'),
    core.string('####'),
    core.string('####')
  ].join(separator);
});