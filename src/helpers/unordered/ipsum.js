/*
 * Generates random paragraphs of movie quotes, IE an
 * ipsum generator.
 * @param {number} paragraphs - The number of paragraphs
 * to generate. Paragraphs are seperated by \n\n. Defaults
 * to 1.
 * @param {number} minSentences - The minimum number of
 * sentences per paragraph. The number of sentences
 * generated is between minSentences and minSentences * 2.
 * Defaults to 3.
 * @returns {string} The ipsum text generated.
 */
dumdum.addHelper('ipsum', function(paragraphs, minSentences) {
  if(!utility.type(paragraphs, 'number')) {
    paragraphs = 1;
  }

  if(!utility.type(minSentences, 'number')) {
    minSentences = 3;
  }

  var sents, ipsum = '';
  for(var p = 0; p < paragraphs; p++) {

    sents = core.integer(minSentences, minSentences * 2);
    for(var s = 0; s < sents; s++) {
      ipsum += core.choose(quotes);

      if(s < sents - 1) {
        ipsum += ' ';
      }
    }

    if(p < paragraphs - 1) {
      ipsum += '\n\n';
    }
  }

  return ipsum;
}, {
  quotes: [
    "I ain't got time to bleed.",
    "Hey, you wanna be a farmer? Here's a couple of achers!",
    "I think he got the point.",
    "I'm gonna take you to the bank, Senator Trent, to the blood bank.",
    "Go ahead, make my day.",
    "You're a disease… And I'm the cure.",
    "Consider that a divorce!",
    "I'm your huckleberry.",
    "Say hello to my little friend!",
    "Come back with your shield, or on it.",
    "Now I have a machine gun. Ho ho ho.",
    "Remember Sully when I promised to kill you last? I lied.",
    "Good? Bad? I'm the guy with the gun.",
    "No, Mr. Bond, I expect you to die!",
    "Let's get this moveable feast underway!",
    "Always bet on black.",
    "When you're pushed, killing's as easy as breathing.",
    "KHAAAN!",
    "God's going to sit this one out.",
    "Come with me if you want to live.",
    "I'll be back!",
    "Hasta la vista, baby!",
    "Are you not entertained?",
    "Sounds like you've had a hard life. Good thing it's over.",
    "Welcome to Earth!",
    "Dodge this.",
    "You're luggage.",
    "Let off some steam, Bennett!",
    "You're gonna regret this the rest of your life...both seconds of it.",
    "May the force be with you, always.",
    "Ice to see you!",
    "Game over man! Game over!",
    "Get to the choppa!",
    "The bullets and the fall killed him.",
    "Hello, cursed earth pizza.",
    "I love the smell of napalm in the morning.",
    "I am the law!",
    "Sad story. You got a smoke?",
    "Swear to God Snake, I thought you were dead..."
  ]
});