dumdum.addHelper('personal', [{
    name: 'email',
    fn: function() {
      return helpers.color.name() +
        core.choose(states) +
        core.integer(100,999) +
        '@' + helpers.web.website(true);
    } 
  },{
    name: 'creditCard',
    fn: function(separator) {
      return [
        core.string('####'),
        core.string('####'),
        core.string('####'),
        core.string('####')
      ].join(separator || '-');
    }
  },{
    name: 'address',
    fn: function(plus4) {
      var zip = core.integer(10000,99999);

      if(plus4) {
        var plusCode = core.integer(9999);
        plusCode = zip4Pad.slice(plusCode) + plusCode;
        zip += '-' + plusCode;
      }

      return {
        address: core.string('#### $c$v$c ') + core.choose(streetTypes),
        city: core.string('$C$v$c$v'),
        state: core.choose(states),
        zip: zip
      };
    }
  }
], {
  streetTypes: ['ave','blvd','cir','dr','hwy','jct',
    'loop','pike','rd','st','vis','way'],
  states: [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ],
  zip4Pad: '0000'
});