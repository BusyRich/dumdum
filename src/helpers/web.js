/*
 * Web Library
 * Used to generate websites and other internet-related data.
 */
dumdum.addHelper('web', [{
    name: 'website',

    /*
     * Generates a random URL.
     * @param {boolean} domainOnly - When true
     * only the domain and tld are returned. By
     * default "http://www." is added to make a
     * full URL.  
     */
    fn: function(domainOnly) {
      var domain = core.string('$c$v$c$$$v$c$v.') + core.choose(tlds);

      if(domainOnly !== true) {
        domain = 'http://www.' + domain;
      }

      return domain;
    }
}], {
  tlds: ['com','org','net','edu','biz','co','me']
});