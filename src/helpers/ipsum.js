function(pars, length) {
  if(typeof pars !== 'number') {
    pars = 1;
  }

  if(typeof length !== 'number') {
    length = 6;
  }

  var sents, ipsum = '';
  for(var p = 0; p < pars; p++) {

    sents = random.int(length, length + 2);
    for(var s = 0; s < sents; s++) {
      ipsum += quotes[random.int(quotes.length - 1)];

      if(s < sents - 1) {
        ipsum += ' ';
      }
    }

    if(p < pars - 1) {
      ipsum += '\n\n';
    }
  }

  return ipsum;
}