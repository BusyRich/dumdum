/*
 * Personal Library
 * Generates data such as names, emails, address, etc. 
 */
dumdum.addHelper('personal', [{
    name: 'name',

    /*
     * Generates first name and a last name, either male or female.
     * @param {string} gender - Specify either 'M' or 'F' to generate
     * names for a specific gender. By default there is a 50% chance
     * for either.
     * @returns {Object} An object with the name data, in the format:
     * {firstName, lastName, gender: 'M' or 'F'}
     */
    fn: function(gender) {
      var name = {
        firstName: null,
        lastName: null,
        gender: null
      };

      if(utility.type(gender, 'string')) {
        name.gender = gender;

        if(gender === 'M') {
          name.firstName = core.choose(maleFirstNames);
        } else if(gender === 'F') {
          name.firstName = core.choose(femaleFirstNames);
        }
      }

      if(!name.firstName) {
        if(core.integer(100) >= 50) {
          name.firstName = core.choose(maleFirstNames);
          name.gender = 'M';
        } else {
          name.firstName = core.choose(femaleFirstNames);
          name.gender = 'F';
        }
      }

      name.firstName = utility.capitalize(name.firstName);

      name.lastName = utility.capitalize(core.choose(lastNameStarts));

      if(core.integer(100) >= 20) {
        if(core.integer(100) >= 50) {
          name.lastName += core.string('$v');
        }

        name.lastName += core.choose(lastNameEnds);

        if(core.integer(100) >= 50) {
          name.lastName += core.string('$c$v');
        }
      } else {
        name.lastName = utility.capitalize(core.choose(lastNameEnds))
          + core.string('$v');
      }

      return name;
    }
  },{
    name: 'social',

    /*
     * Generates a social security number.
     * @param {string} separator - The character
     * or string to put between the number sets.
     * Defaults to an empty string.
     * @returns The generated social.
     */
    fn: function(separator) {
      return [
        core.string('###'),
        core.string('##'),
        core.string('####')
      ].join(separator || '');
    }
  },{
    name: 'email',

    /*
     * Generates a random email.
     * @returns The generated email.
     */
    fn: function() {
      return helpers.color.name() +
        core.choose(states) +
        core.integer(100,999) +
        '@' + helpers.web.website(true);
    } 
  },{
    name: 'creditCard',

    /*
     * Generates a random credit card number. Format is 
     * 4 sets of 4-digit numbers.
     * @param {string} separator - The character
     * or string to put between the number sets.
     * Defaults to an empty string.
     * @returns The generated card number.
     */
    fn: function(separator) {
      return [
        core.string('####'),
        core.string('####'),
        core.string('####'),
        core.string('####')
      ].join(separator || '');
    }
  },{
    name: 'address',

    /*
     * Generates a random address object.
     * @param {boolean} plus4 - When true, a random 
     * 4-digit number will be added to the zip (with a dash) 
     * simulating the zipcode +4 format.
     * @returns The address in the following format:
     * { address: street address, 
     *   city, 
     *   state: 2 letter abbreviation,
     *   zip }
     */
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
  //First name data from
  //https://www.ssa.gov/oact/babynames/decades/century.html
  maleFirstNames: ['james','john','robert','michael','william','david',
    'richard','joseph','thomas','charles','christopher','daniel','matthew',
    'anthony','donald','mark','paul','steven','andrew','kenneth','george',
    'joshua','kevin','brian','edward','ronald','timothy','jason','jeffrey',
    'ryan','gary','jacob','nicholas','eric','stephen','jonathan','larry',
    'justin','scott','frank','brandon','raymond','gregory','benjamin',
    'samuel','patrick','alexander','jack','dennis','jerry','tyler','aaron',
    'henry','douglas','jose','peter','adam','zachary','nathan','walter',
    'harold','kyle','carl','arthur','gerald','roger','keith','jeremy','terry',
    'lawrence','sean','christian','albert','joe','ethan','austin','jesse',
    'willie','billy','bryan','bruce','jordan','ralph','roy','noah','dylan',
    'eugene','wayne','alan','juan','louis','russell','gabriel','randy',
    'philip','harry','vincent','bobby','johnny','logan'],
  femaleFirstNames: ['mary','patricia','jennifer','elizabeth','linda',
    'barbara','susan','jessica','margaret','sarah','karen','nancy','betty',
    'lisa','dorothy','sandra','ashley','kimberly','donna','carol','michelle',
    'emily','amanda','helen','melissa','deborah','stephanie','laura','rebecca',
    'sharon','cynthia','kathleen','amy','shirley','anna','angela','ruth',
    'brenda','pamela','nicole','katherine','virginia','catherine','christine',
    'samantha','debra','janet','rachel','carolyn','emma','maria','heather',
    'diane','julie','joyce','evelyn','frances','joan','christina','kelly',
    'victoria','lauren','martha','judith','cheryl','megan','andrea','ann',
    'alice','jean','doris','jacqueline','kathryn','hannah','olivia','gloria',
    'marie','teresa','sara','janice','julia','grace','judy','theresa','rose',
    'beverly','denise','marilyn','amber','madison','danielle','brittany',
    'diana','abigail','jane','natalie','lori','tiffany','alexis','kayla'],
  lastNameEnds: ['key','wood','son','smith','fan','beard','fish','man',
    'hand','night','way','art','door','face','leg','war','sword','stone',
    'bridge','corn','train','kilt'],
  lastNameStarts: ['glad','mad','broom','zoom','trans','moon','glow','awe',
    'fran'],
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