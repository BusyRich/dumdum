dumdum.addHelper('address', [{ 
    name: 'street',
    fn: function() {
      return core.string('#### cvc') + ' ' + core.choose(streetTypes);
    }
  }, {
    name: 'state',
    fn: function() {
      return core.choose(states);
    }
  }, {
    name: 'zip',
    fn: function(plus4) {
      var zip = core.integer(10000,99999);

      if(plus4) {
        var plusCode = core.integer(9999);
        plusCode = zip4Pad.slice(plusCode) + plusCode;
        zip += '-' + plusCode;
      }

      return zip;
    }
  }, {
    name: 'full',
    fn: function() {
      return {
        address: helpers.address.street(),
        city: core.string('Cvcvv'),
        state: helpers.address.state(),
        zip: helpers.address.zip(true)
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