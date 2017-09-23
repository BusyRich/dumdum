dumdum.addHelper('web', [{
    name: 'website',
    fn: function(domainOnly) {
      var domain = core.string('$c$v$c$$$v$c$v.') + core.choose(tlds);

      if(!domainOnly) {
        domain = 'http://www.' + domain;
      }

      return domain;
    }
}], {
  tlds: ['com','org','net','edu','biz','co','me']
});