// ============================================================
//  PERSONALISE EVERYTHING HERE  ·  edit, save, done.
// ============================================================

export const CONFIG = {
  name: 'Alex',          // shown big on the opening
  yourName: 'Pookie',    // your sign-off
  passenger: 'Pookie boy', // shown on the boarding pass
  dogName: '', // his dog's name (for the dog game). Leave '' to just say "he".

  // Scene "The lock": a 4-digit date that means something (format DDMM).
  // 2810 = 28 October. Change if you want a different meaningful date.
  lockCode: '2810',
  lockHint: 'The day this whole thing started. You KNOW this one. (day, then month)',

  destination: 'Dubrovnik',
  datesLabel: '8 – 13 July',
  tripStartISO: '2026-07-08', // used for the live countdown

  // For the map + boarding pass. Change the departure city if it's not Bucharest.
  fromCity: 'Bucharest',
  fromCode: 'OTP',   // departure airport code
  toCode: 'DBV',     // Dubrovnik
  flightTime: '~2 hrs',
  returnLabel: 'Sun 13 July',
  outboundLabel: 'Tue 8 July',
}

// The three choices. Only `dubrovnik` lets him through.
export const DESTINATIONS = [
  {
    id: 'skiathos',
    name: 'Skiathos',
    place: 'Greece',
    tag: 'Pine trees down to the sand.',
    correct: false,
    bounce: 'I know you wanted Greece 🇬🇷 It’s still a valid option — but maybe you’ll like my choice even more. 😏',
    tint: 'linear-gradient(160deg,#2f6b4e,#16352a)',
  },
  {
    id: 'dubrovnik',
    name: 'Dubrovnik',
    place: 'Croatia',
    tag: 'Old stone walls and the bluest Adriatic.',
    correct: true,
    win: 'It was always going to be this one. I already booked it — but it’s sweeter when you choose it.',
    tint: 'linear-gradient(160deg,#2E96D4,#0e3f63)',
  },
  {
    id: 'alghero',
    name: 'Alghero',
    place: 'Sardinia',
    tag: 'Coral coast, Italian-Catalan charm.',
    correct: false,
    bounce: 'Yes, I love it too. It’s possible if you want it more — but the flights are horrible. We’ll negotiate. 💸',
    tint: 'linear-gradient(160deg,#c8643a,#5a2a1c)',
  },
]

// Joke captcha: "select all the squares with Tuti".
// `tuti` = photos that ARE the cat (correct). Drop more in /public/tuti/ and add them here.
// `decoys` = NOT Tuti — selecting any of these fails the check. (🐶 = his dog, a cheeky red herring.)
// Paths are relative (no leading slash) so they work under the GitHub Pages sub-path.
export const CAPTCHA = {
  catName: 'Tuti',
  tuti: ['tuti/cat1.jpg', 'tuti/cat2.jpg', 'tuti/cat3.jpg', 'tuti/cat4.jpg', 'tuti/cat5.jpg'],
  // Decoys: NOT Tuti. The real dog photo is the sneaky one — don't pick the dog!
  decoys: [{ src: 'tuti/dog.jpg' }, { emoji: '🌭' }, { emoji: '🤖' }, { emoji: '🍕' }],
}
