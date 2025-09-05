export const stateLaws = {
  "CA": {
    name: "California",
    rights: [
      "You have the right to remain silent during any police encounter",
      "You are not required to consent to vehicle searches without a warrant",
      "You can ask if you are free to leave",
      "You have the right to record police interactions in public",
      "You must provide ID only if lawfully detained or arrested"
    ],
    laws: [
      {
        id: "ca-1",
        topic: "Vehicle Searches",
        description: "Police need probable cause or a warrant to search your vehicle, unless you consent.",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=PEN&division=&title=3.&part=2.&chapter=3.&article="
      },
      {
        id: "ca-2", 
        topic: "Recording Police",
        description: "California is a two-party consent state, but recording police in public is generally protected.",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=632"
      },
      {
        id: "ca-3",
        topic: "Miranda Rights",
        description: "You must be read your Miranda rights before custodial interrogation.",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=834"
      }
    ]
  },
  "NY": {
    name: "New York",
    rights: [
      "You have the right to remain silent",
      "You can refuse consent to search your person or belongings",
      "You have the right to ask for a lawyer",
      "You can record police interactions in public spaces",
      "Stop and frisk requires reasonable suspicion of criminal activity"
    ],
    laws: [
      {
        id: "ny-1",
        topic: "Stop and Frisk",
        description: "Police can stop and frisk only with reasonable suspicion of criminal activity.",
        url: "https://www.nysenate.gov/legislation/laws/CPL/140.50"
      },
      {
        id: "ny-2",
        topic: "Right to Record",
        description: "New York is a one-party consent state for recording conversations.",
        url: "https://www.nysenate.gov/legislation/laws/PEN/250.00"
      }
    ]
  },
  "TX": {
    name: "Texas", 
    rights: [
      "You have the right to remain silent",
      "You must identify yourself if lawfully detained",
      "You can refuse consent to search",
      "You have the right to record police in public",
      "Open carry is legal with proper licensing"
    ],
    laws: [
      {
        id: "tx-1",
        topic: "Failure to Identify",
        description: "You must provide your name, residence address, and date of birth if lawfully arrested.",
        url: "https://statutes.capitol.texas.gov/Docs/PE/htm/PE.38.htm"
      },
      {
        id: "tx-2",
        topic: "Open Carry",
        description: "Licensed individuals may openly carry handguns in most public places.",
        url: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.411.htm"
      }
    ]
  },
  "FL": {
    name: "Florida",
    rights: [
      "You have the right to remain silent",
      "You can refuse consent to search your vehicle",
      "You must provide ID if lawfully detained",
      "You can record police in public spaces",
      "Stand Your Ground law applies in self-defense situations"
    ],
    laws: [
      {
        id: "fl-1",
        topic: "Stop and Identify",
        description: "You must provide identification if lawfully detained by police.",
        url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0900-0999/0901/0901.html"
      },
      {
        id: "fl-2",
        topic: "Stand Your Ground",
        description: "No duty to retreat before using force in self-defense if you reasonably believe it's necessary.",
        url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0776/0776.html"
      }
    ]
  },
  "IL": {
    name: "Illinois",
    rights: [
      "You have the right to remain silent",
      "You can refuse consent to searches",
      "You have the right to record police in public",
      "You must provide ID only if arrested",
      "Concealed carry requires a license"
    ],
    laws: [
      {
        id: "il-1",
        topic: "Recording Police",
        description: "Illinois allows recording of police officers performing their duties in public.",
        url: "http://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2353&ChapterID=53"
      },
      {
        id: "il-2",
        topic: "Concealed Carry",
        description: "Concealed carry of firearms requires a valid license.",
        url: "http://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3497&ChapterID=39"
      }
    ]
  },
  "WA": {
    name: "Washington",
    rights: [
      "You have the right to remain silent",
      "You can refuse consent to searches",
      "You can record police interactions in public",
      "No stop and identify law - ID not required unless arrested",
      "Marijuana possession under 1 oz is legal for adults"
    ],
    laws: [
      {
        id: "wa-1",
        topic: "Search and Seizure",
        description: "Washington has strong protections against unreasonable searches under state constitution.",
        url: "https://app.leg.wa.gov/RCW/default.aspx?cite=10.79"
      },
      {
        id: "wa-2",
        topic: "Marijuana Laws",
        description: "Adults 21+ may possess up to 1 ounce of marijuana legally.",
        url: "https://app.leg.wa.gov/RCW/default.aspx?cite=69.50"
      }
    ]
  }
};

export const scripts = {
  consent: {
    title: "Refusing Consent to Search",
    english: [
      "I do not consent to any searches.",
      "Am I free to leave?",
      "I am exercising my right to remain silent.",
      "I would like to speak to a lawyer."
    ],
    spanish: [
      "No doy mi consentimiento para ninguna búsqueda.",
      "¿Soy libre de irme?", 
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "Me gustaría hablar con un abogado."
    ]
  },
  traffic: {
    title: "Traffic Stop",
    english: [
      "Here is my license and registration.",
      "Why was I pulled over?",
      "I do not consent to a search of my vehicle.",
      "Am I being detained or am I free to go?"
    ],
    spanish: [
      "Aquí está mi licencia y registro.",
      "¿Por qué me detuvieron?",
      "No consiento a que registren mi vehículo.",
      "¿Me están deteniendo o soy libre de irme?"
    ]
  },
  detention: {
    title: "Being Detained",
    english: [
      "I am exercising my right to remain silent.",
      "I do not consent to any searches.",
      "I want to speak to a lawyer.",
      "I am not resisting, but I do not consent."
    ],
    spanish: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ninguna búsqueda.",
      "Quiero hablar con un abogado.",
      "No me estoy resistiendo, pero no doy mi consentimiento."
    ]
  }
};
