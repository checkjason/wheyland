// ============================================================
//  SITE SETTINGS — this is the only file you need to edit.
//  After saving, commit to GitHub and the site updates in ~1 min.
// ============================================================

window.SITE = {

  // ---- Her name and dates -----------------------------------
  name: "Vanessa Wheyland",
  dates: "",                       // e.g. "1985 – 2026" (leave "" to hide)
  tagline: "A truly amazing woman. Loved beyond measure.",

  // ---- Main photo -------------------------------------------
  // Put the family photo in the /photos folder and enter its file name here.
  // Leave "" to show a soft placeholder until the photo is ready.
  heroPhoto: "photos/vanessa-vigil.jpg",  // the family photo shown in the circle at the top

  // ---- Beach background ---------------------------------------
  // A photo of the Carlsbad coastline (Tamarack Beach, the bluffs, the pier at sunset...)
  // shown behind the top of the page with a soft, dreamy sunset wash over it.
  // Put the file in /photos and enter its name. Leave "" to use the illustrated beach scene.
  heroBackground: "",              // e.g. "photos/tamarack-sunset.jpg"

  // ---- GoFundMe ---------------------------------------------
  // Paste the full GoFundMe link. Leave "" to hide the section.
  gofundmeUrl: "https://www.gofundme.com/f/support-vanessas-family-after-tragic-loss-jt8fa",
  gofundmeBlurb: "Contributions help the family with immediate expenses during this difficult time. Every gift, of any size, is deeply appreciated.",

  // ---- Message board (Google Form + Google Sheet) -----------
  // See README.md, step 3. Both must be filled for the board to appear.
  messageFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc2nqAtBxQjV2k88_lX1uZFljZEat2uSEIDB6fpPQU0Js15dg/viewform",              // the Google Form "Send" link (https://docs.google.com/forms/d/e/.../viewform)
  messageSheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQUepdAHLyvhrk5yZZYBscVxYp_c48xvsvSXTRTH9phsEGlhdmN5qRUjju9B0NqApifLFilQjvQzOU0/pub?gid=1402229314&single=true&output=csv",          // the published-to-web CSV link of the responses sheet (…/pub?output=csv)

  // ---- Photo album ------------------------------------------
  // Google Photos shared album link (README step 4). Leave "" to hide the button.
  photoAlbumUrl: "https://photos.app.goo.gl/4WuMcfr7T3oaMacq6",

  // Photos shown in the gallery on this page. Add files to /photos and list them here.
  gallery: [
    { src: "photos/family.jpg", caption: "" },
    { src: "photos/vanessa-and-husband.jpg", caption: "" },
    // Add more: { src: "photos/file-name.jpg", caption: "Optional caption" },
  ],

  // ---- Events -----------------------------------------------
  events: [
    {
      title: "Candlelight Vigil",
      date: "Thursday, September 17, 2026",
      time: "At sunset (approx. 6:50 pm)",
      place: "South side of the bridge at Tamarack Beach",
      address: "Tamarack State Beach, Carlsbad, CA",
      mapUrl: "https://maps.google.com/?q=Tamarack+State+Beach+Carlsbad+CA",
      notes: "Please join as we gather to remember a truly amazing woman. Please bring LED candles or flashlights due to wind.",
      flyerImage: "assets/vigil-flyer.jpg",
      flyerPdf: "assets/vigil-flyer.pdf"
    }
    // Add more events (memorial service, celebration of life) by copying the block above.
  ],

  // ---- Updates from the family ------------------------------
  // Newest first. Add a new block at the top whenever there is news.
  updates: [
    {
      date: "September 16, 2026",
      title: "Candlelight vigil tomorrow at sunset",
      text: "Friends and family are invited to gather at Tamarack Beach on Thursday evening, September 17, at sunset. Meet on the south side of the bridge. Please bring LED candles or flashlights — real candles will not stay lit in the wind."
    }
  ],

  // ---- Contact ----------------------------------------------
  // Optional email for questions or to send photos directly. Leave "" to hide.
  contactEmail: "",

  // Optional obituary / life story shown in the "Her Life" section.
  // Use blank lines between paragraphs. Leave "" to hide the section for now.
  lifeStory: ""
};
