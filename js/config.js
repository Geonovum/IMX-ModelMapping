// //-------------------------------------------------------------------------------------
// //-- File. . . :  config.js
// //-- Bevat . . :  Template voor de  configuratie voor respec
// //--              Gebaseerd op https://github.com/Geonovum/respec/wiki
// //--              Deze file moet worden neergezet in de root-directory van de
// //--              betreffende standaard.
// //-- Door. . . :  Jan van Gelder
// //-------------------------------------------------------------------------------------
// //-------------------------------------------------------------------------------------
// //-- Log . . . :  20181015 - JvG - Initiele versie
// //-- Log . . . :  20191022 - GRK - Handreiking Archiveren ruimtelijke plannen v2.0
// //-------------------------------------------------------------------------------------

// //-- Postprocessors -------------------------------------------------------------------

// //-- haalt gh-pages weg aan het eind van een URL
// //-- Stopt zodra de eerste is gevonden (want komt maar 1x voor)
// //-- JvG 2019-11-12
// function custGHPG(respecConfig)
// {
//   var tags = document.getElementsByTagName("a");
//   var srch = "gh-pages";
//   var slen = srch.length;
//   var i;

//   for (i = 0; i < tags.length; i++)
//   {
//     if(tags[i].href.indexOf(srch) > -1)
//     {
//       console.log(tags[i].href + " is gevonden");
//       tags[i].href = tags[i].href.substring(0, tags[i].href.length - slen);
//       console.log(tags[i].href + " is aangepast");
//       break;
//     }
//   }
// }

// //-------------------------------------------------------------------------------------
// var respecConfig =
// {
//   //-- specStatus is verplicht! (activeer 1 van de volgende) --------------------------
//   //specStatus: "GN-BASIS",             // Basis Document
//   //specStatus: "GN-WV",              // Werk Versie
//   //specStatus: "GN-CV",              // Consultatie Versie
//   //specStatus: "GN-VV",              // Vaststellings Versie
//   specStatus: "GN-WV",             // Definitieve Versie
//   //-- specType is verplicht bij alle andere dan BASIS ---------------------------------
//   //specType: "NO",                   // Norm
//   specType: "ST",                   // Standaard
//   // specType: "IM",                   // Informatie Model
//   //specType: "PR",                   // Praktijkrichtlijn
//   //specType: "HR",                   // HandReiking
//   //specType: "WA",                   // Werkafspraak
//   //specType: "BD",                   // Beheer Documentatie
//   //-- format is verplicht! -----------------------------------------------------------
//   // format: "markdown",                 // altijd "markdown" - JvG W3C aangepast, op 1 plek markdown aangeven
//   //-- publishDate is verplicht -------------------------------------------------------
//   //-- NB: in de werkversie uitzetten, want dan pakt Respec de pushdate ---------------
//   //publishDate: "2022-07-11",  	    // Format is "YYYY-MM-DD"
//   //-- Repositorynaam op GitHub -------------------------------------------------------
//   github: "https://github.com/geonovum/WaU-MAP",
//   //-- Repositorynaam/issues op GitHub ------------------------------------------------
//   issueBase: "https://github.com/geonovum/WaU-MAP/issues",
//   //-- edDraftURI: de URI van de werkversie van het document
//   edDraftURI: "https://geonovum.github.io/WaU-MAP",
//   //-- de namen van de Editor(s) ------------------------------------------------------
//   //-- vul in: per Editor: name:, company:, companyURL: -------------------------------


//   editors:
//  [
//     {
//       name:       "Paul Janssen",
//       company:    "Geonovum",
//       companyURL: "https://www.geonovum.nl"
//     }
//   ],
//   //-- de namen van de Author(s) ------------------------------------------------------
//   //-- vul in: per Author: name:, company:, companyURL: -------------------------------
//   authors:
//   [
//     {
//       name:       "Pano Maria",
//       company:    "Skemu",
//       companyURL: "https://www.skemu.com"
//     }
//   ],
//   //-- shortName is verplicht! (komt in de URL: kies logische naam) --------------------
//   shortName: "vsp",  	              // Wordt gebruikt in de document URL
//   //-- pubDomain is verplicht! (komt in de URL: Activeer 1 van de volgende) ------------
//   pubDomain: "wau", 	              // Werk aan Uitvoering
//   //pubDomain: "mim", 	            // Metamodel Informatie Modellering
//   //pubDomain: "bor", 	            // Beheer Openbare Ruimte
//   //pubDomain: "bro", 	            // Basisregistratie Ondergrond
//   //pubDomain: "imgeo", 	          // IMGeo / BGT
//   //pubDomain: "kl", 	              // Kabels en Leidingen
//   //pubDomain: "liv", 	            // Landelijke Informatievoorziening Vastgoedgebruik
//   //pubDomain: "md", 	              // Metadata
//   //pubDomain: "nen3610", 	        // Basismodel NEN3610
//   //pubDomain: "oov", 	            // Openbare Orde en Veiligheid
//   //pubDomain: "ro", 	              // Ruimtelijke Ordening
//   //pubDomain: "serv", 	            // Services
//   //pubDomain: "visu", 	            // Visualisatie
//   //pubDomain: "wp", 	              // White Paper
//   //-- license: voor de geldende gebruiksvoorwaarden
//   //licence: "cc-by-nd",            // bronvermelding, geen afgeleide werken (default)
//   //licence: "cc0",                 // Public Domain Dedication
//   licence: "cc-by",                 // Attribution, met bronvermelding

//   //-- localBiblio: lokale bibliografie, voor verwijzigingen
//   //-- NB: kijk eesrt naar de beschikbare www.specref.org voor verwijziging
//   localBiblio:
//   {
//     //  "CITAAT": {
//     //     title:      "Titel van het Citaat",
//     //     href:       "http://url van de publicatie",
//     //     status:     "versie van de publicatie",
//     //     publisher:  "naam van de publiceerder",
//     //     company:    "eventueel naam van bedrijf",
//     // },
//     MIM11: {
//       id:         "mim11",
//       title:      "MIM - Metamodel Informatie Modellering",
//       href:       "https://docs.geostandaarden.nl/mim/mim/",
//       status:     "Definitief",
//       publisher:  "Geonovum",
//       date:       "2022-02-17"
//     },
//     // YAML12: {
//     //   id:         "yaml12",
//     //   title:      "YAML Ain’t Markup Language (YAML™) version 1.2",
//     //   href:       "https://yaml.org/spec/1.2.2/",
//     //   status:     "Revision 1.2.2",
//     //   publisher:  "YAML Language Development Team",
//     //   date:       "2021-10-01"
//     // }
//   },
//   postProcess:[custGHPG],   //-- Optioneel voor een multi document repository

//   //-- Voor dit blok geldt: alleen als er eerdere versies zijn en altijd beiden aan/uit!
//  //previousPublishDate: "2022-06-28",  	    // Format is "YYY-MM-DD"
//   //previousMaturity: "VV",                   // kies 1 van deze 2 regels
//   //previousMaturity: "VV",  	                // kies 1 van deze 2 regels

//   //-- Optionele parameters:
//   //emailComments: "mim@geonovum.nl",         // reactie mailadres, alleen bij CV!
//   //subtitle: "",                         // Subtitel van het document
//   maxTocLevel: 4,                           // Aantal niveau's ToC, default is 0
//   //-- LOGO: Hier kan je een ander logo opgeven indien nodig
//   //logos: [{
//   //  src: "https://tools.geostandaarden.nl/respec/style/logos/OmgevingswetLogo.svg",
//   //  alt: "Standaarden Omgevingswet",
//   //  id: "TopLogo",
//   //  height: 67,
//   //  width: 300,
//   //  url: "https://www.geonovum.nl/geo-standaarden/omgevingswet/STOPTPOD"
//   // }],
// };


let respecConfig = {
  useLogo: true,
  useLabel: true,
  //default voor Geonovum is cc-by, eventueel is het mogelijk een andere licentie (cc0 of cc-by-nd) hier te kiezen voor het document.
  // license: "cc-by",
  specStatus: "WV",
  specType: "ST",
  pubDomain: "wau",
  shortName: "NL-ReSpec-GN-template",
  publishDate: "2023-04-03",
  //eventueel is het mogelijk een versienummer mee te geven, maar bij Geonovum werken we standaard alleen met datum als onderdeel van de permanente URI.
  //publishVersion: "0.0.2",
  //previousVersion: "0.0.1",
  // previousPublishDate: "2014-05-01",
  previousMaturity: "EO",
  title: "WaU IMX Model Mapping",
  editors:
    [
      {
        name: "Paul Janssen",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      }
    ],
  authors:
    [
      {
        name: "Pano Maria",
        company: "Skemu",
        companyURL: "https://www.skemu.com",
      }
    ],
  //neem hier de URL van de github repository op waar het respec document in staat
  github: "https://github.com/geonovum/NL-ReSpec-GN-template",


  // Create PDF and link to file in header (optional):
  alternateFormats: [
      {
          label: "pdf",
          uri: "template.pdf",
      },
  ],
  
  // preProcess: [loadYamlLang],
};