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
    name: 'birthdate',

    /*
     * Generates random birthdate based on an age range.
     * @param {number} minAge - The minimum age for the
     * birthdate to represent. Defaults to 16.
     * @param {number} maxAge - The maximum age for the
     * birthdate to represent. Defaults to 65.
     * @returns {Date} The generated birthdate.
     */
    fn: function(minAge, maxAge) {
      var startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 
        (core.integer(minAge || 16, maxAge || 65) + 1));

      return helpers.datetime('1y', startDate);
    }
  },{
    name: 'social',

    /*
     * Generates a social security number. Format
     * constraints based on:
     * en.wikipedia.org/wiki/Social_Security_number#Historical_structure
     * @param {string} separator - The character
     * or string to put between the number sets.
     * Defaults to an empty string.
     * @returns {string} The generated social.
     */
    fn: function(separator) {
      var areaNumber;
      do {
        areaNumber = core.integer(1, 769);
      } while(areaNumber > 649 && areaNumber < 700);

      return [
        (zeroPad + areaNumber).slice((zeroPad.length - 2) * -1),
        (zeroPad + core.integer(1,99)).slice((zeroPad.length - 3) * -1),
        (zeroPad + core.integer(1,9999)).slice((zeroPad.length - 1) * -1)
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
      var state = core.choose(Object.keys(states)),
          zipFormat = core.choose(states[state]),
          zipFormatType = utility.type(zipFormat),
          zip;

      console.log(zipFormat);

      switch(zipFormatType) {
        case 'array':
          zip = core.integer(zipFormat[0], zipFormat[1]).toString();
          break;
        case 'string':
          zip = core.string(zipFormat);
          break;
        case 'number':
          zip = zipFormat.toString();
          break;
      }

      zip = (zeroPad + zip).slice(zeroPad.length * -1);

      if(plus4) {
        var plusCode = core.integer(9999);
        plusCode = (zeroPad + plusCode).slice((zeroPad.length - 1) * -1);
        zip += '-' + plusCode;
      }

      return {
        address: core.string('#### $c$v$c ') + core.choose(streetTypes),
        city: (state === 'DC' ? 'Washington' : core.string('$C$v$c$v')),
        state: state,
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
    'bridge','corn','train','kilt', 'worth'],
  lastNameStarts: ['glad','mad','broom','zoom','trans','moon','glow','awe',
    'fran', 'wool'],
  streetTypes: ['ave','blvd','cir','dr','hwy','jct',
    'loop','pike','rd','st','vis','way'],
  //Zip ranges based on
  //https://www.irs.gov/pub/irs-utl/zip%20code%20and%20state%20abbreviations.pdf
  //Not meant to be perfect but rather a close range of zips per state
  states: {
    AL: [[35000,35299],[35400,36999]],
    AK: [[99500,99999]],
    AZ: [[85000,85399],[85500,85799],[85900,86099],[86300,86599]],
    AR: [[71600,72999]],
    CA: [[90000,90899],[91000,92899],[93000,96199]],
    CO: [[80000,81699]],
    CT: [[6000,6389],[6391,6999]],
    DE: [[19700,19999]],
    DC: ['200##',[20200,20587],'569##',[20589,20597],20599],
    FL: ['339##','341##','342##','344##','346##','347##','349##'],
    GA: [[30000,31999],[39800,39999]],
    HI: [[96701,96798],'968##'],
    ID: [[83200,83413],[83415,83899]],
    IL: [[60000,62099],[62200,62999]],
    IN: [[46000,47999]],
    IA: [[50000,51699],[52000,52899]],
    KS: [[66000,66299],[66400,67999]],
    KY: [[40000,41899],[42000,42799]],
    LA: [[70000,70199],[70300,70899],[71000,71499]],
    ME: [[3900,4999]],
    MD: [20588,[20600,21299],[21400,21999]],
    MA: [[1000,2799],'055##'],
    MI: [[48000,49999]],
    MN: [[55000,55199],[55300,56799]],
    MS: [[38600,39799]],
    MO: [[63000,63199],[63300,64199],[64400,65899]],
    MT: [[59000,59999]],
    NE: [[68000,68199],[68300,69399]],
    NV: [[88900,89199],[89300,89599],[89700,89899]],
    NH: [[3000,3899]],
    NJ: [[7000,8999]],
    NM: [[87000,87199],[87300,88499]],
    NY: ['005##',6390,[10000,14999]],
    NC: [[27000,28999]],
    ND: [[58000,58899]],
    OH: [[43000,45999]],
    OK: [[73000,73199],[73400,73959],[73961,74199],[74300,74999]],
    OR: [[97000,97999]],
    PA: [[15000,19699]],
    RI: ['028##','029##'],
    SC: [[29000,29999]],
    SD: [[57000,57799]],
    TN: [[37000,38599]],
    TX: ['733##',73960,[75000,77099],[77200,79999],'885##'],
    UT: [[84000,84799]],
    VT: [[5000,5499],[5600,5999]],
    VA: ['201##',20598,[22000,24699]],
    WA: [[98000,98699],[98800,99499]],
    WV: [[24700,26899]],
    WI: [[53000,53299],[53400,53599],[53700,54999]],
    WY: [[82000,83199],83414]
  },
  zeroPad: '00000'
});