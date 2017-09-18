dumdum.addHelper('web', [{
    name: 'website',
    fn: function(domainOnly) {
      var domain = core.string('$C$V$C$V$C$C$V$C$V.') + core.choose(tlds);

      if(!domainOnly) {
        domain = 'http://www.' + domain;
      }

      return domain;
    }
  },{
    name: 'email',
    fn: function() {
      return helpers.color.name() +
        helpers.address.state() +
        core.integer(100,999) +
        '@' + helpers.web.website(true);
    } 
}], {
  tlds: ['com','org','net','edu','biz','co','me']
});