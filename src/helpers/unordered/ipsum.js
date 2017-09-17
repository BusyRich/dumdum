dumdum.addHelper('ipsum', function(pars, minLength) {
  if(typeof pars !== 'number') {
    pars = 1;
  }

  if(typeof minLength !== 'number') {
    minLength = 6;
  }

  var sents, ipsum = '';
  for(var p = 0; p < pars; p++) {

    sents = core.integer(minLength, minLength * 2);
    for(var s = 0; s < sents; s++) {
      ipsum += core.choose(quotes);

      if(s < sents - 1) {
        ipsum += ' ';
      }
    }

    if(p < pars - 1) {
      ipsum += '\n\n';
    }
  }

  return ipsum;
}, {
  quotes: [
    'I ain\'t got time to bleed.',
    'Hey, you wanna be a farmer? Here\'s a couple of achers!',
    'I think he got the point.',
    'I\'m gonna take you to the bank, Senator Trent, to the blood bank.',
    'Go ahead, make my day.',
    'You\'re a disease… And I\'m the cure.',
    'Consider that a divorce!',
    'I\'m your huckleberry.',
    'Say hello to my little friend!',
    'Come back with your shield, or on it.',
    'Now I have a machine gun. Ho ho ho.',
    'Remember Sully when I promised to kill you last? I lied.',
    'Good? Bad? I\'m the guy with the gun.',
    'No, Mr. Bond, I expect you to die!',
    'Let\'s get this moveable feast underway!',
    'Always bet on black.',
    'When you\'re pushed, killing\'s as easy as breathing.',
    'KHAAAN!',
    'God\'s going to sit this one out.',
    'Come with me if you want to live.',
    'I\'ll be back!',
    'Hasta la vista, baby!',
    'Are you not entertained?',
    'Sounds like you\'ve had a hard life. Good thing it\'s over.',
    'Welcome to Earth!',
    'Dodge this.',
    'You\'re luggage.',
    'Let off some steam, Bennett!',
    'You\'re gonna regret this the rest of your life...both seconds of it.',
    'May the force be with you, always.',
    'Ice to see you!',
    'Game over man! Game over!',
    'Get to the choppa!',
    'The bullets and the fall killed him.',
    'Hello, cursed earth pizza.',
    'I love the smell of napalm in the morning.',
    'I am the law!',
    'Sad story. You got a smoke?',
    'Swear to God Snake, I thought you were dead...'
  ]
});