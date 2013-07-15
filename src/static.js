  //-------------------------------------
  //Static data used in random generation
  //-------------------------------------
  
  //Millisecond representations of time intervals
  var intervals = {
    's': 1000,
    'm': 60 * 1000,
    'h': 60 * 60 * 1000,
    'd': 24 * 60 * 60 * 1000,
    'w': 7 * 24 * 60 * 60 * 1000,
    'M': 4 * 7 * 24 * 60 * 60 * 1000,
    'y': 52 * 7 * 24 * 60 * 60 * 1000
  };

  //Quotes for ipsum generation
  var quotes = [
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
  ];

  //Address data
  var streets = ['ave','blvd','cir','dr','hwy','jct','loop','pike','rd','st','vis','way'];
  var states = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ];

  //Roy G Biv Colors
  var colors = ['Black','White','Grey','Red','Orange','Yellow','Green','Blue','Indigo','Violet'];

  //Typical website TLDs
  var tlds = ['com','org','net','edu','biz','co','me'];