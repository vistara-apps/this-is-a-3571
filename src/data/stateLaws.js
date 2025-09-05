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