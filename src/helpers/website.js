function() {
  return 'http://www.' + random.string('CVCVCCVCV.') + tlds[random.int(tlds.length - 1)];
}