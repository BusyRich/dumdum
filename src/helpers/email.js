function() {
  return colors[random.int(colors.length - 1)] +
    streets[random.int(streets.length - 1)] +
    random.int(100,999) +
    '@' + random.string('cvccvcvccv') + '.' +
    tlds[random.int(tlds.length - 1)];
}