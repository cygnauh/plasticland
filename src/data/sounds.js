export default {
  'ambiant': {
    'id': 20,
    'name': 'ocean',
    'src': './sounds/sound_ambiant_xp.mp3'
  },
  'melody': {
    'id': 200,
    'name': 'melody',
    'src': './sounds/melodie.mp3'
  },
  'place': [
    {
      'id': 21,
      'name': 'starbucks',
      'src': './sounds/starbucks.mp3',
      'startAt': 0.22,
      'endAt': 0.34
    },
    {
      'id': 22,
      'name': 'carrefour',
      'src': './sounds/carrefour.mp3',
      'startAt': 0.35,
      'endAt': 0.49
    },
    {
      'id': 23,
      'name': 'cocacola',
      'src': './sounds/cocacola.mp3',
      'startAt': 0.5,
      'endAt': 0.65
    },
    {
      'id': 24,
      'name': 'gestespropres',
      'src': './sounds/lobbies.mp3',
      'startAt': 0.66,
      'endAt': 0.7
    },
    {
      'id': 25,
      'name': 'nestle',
      'src': './sounds/carrefour.mp3',
      'startAt': 0.80,
      'endAt': 0.89
    },
    {
      'id': 26,
      'name': 'final',
      'src': './sounds/carrefour.mp3',
      'startAt': 0.9,
      'endAt': 1
    }
  ],
  'voice': {
    'id': 30,
    'name': 'voice',
    'src': '../../sounds/voice_over.mp3',
    'sprites': [
      {
        intro1: [0, 14000], // 0 - 26s charles, yes, tell me about one of your expedition,
        intro2: [16140, 12860], // 16.14s - 29.0s I was traveling the ocean, watching the endless horizon.
        starbucks: [30000, 5160], // 30s - 35.16s
        carrefour: [36000, 8600], // 36s - 44.6s
        cocacola: [45180, 6860], // 45.18s -52.04s
        gestespropres: [54140, 8900], // 54.14s - 63.04s
        nestle: [65000, 7060], // 65.1s -72.16
        final: [74050, 8980], // 74.05s - 83.03s
        interactionSt: [90000, 6170], // 1min30s 90s- 96.17s INTERATION : Starbuck Look at that / ooh it’s starbucks cup / What was that doing there?
        interactionCr: [99190, 5030], // 99.19s - 104.20s  INTERATION : Carrefour Check this out! What the hell is that?
        interactionCc: [105150, 6840], // 105.18s - 112.02s INTERATION : cocacola Do you know this ? Is it a Coca Cola ? What was that doing there?
        interactionLb: [112180, 4930], // 112.18s - 117.11s INTERATION : Lobbies Look at that What the hell is that?
        interactionNe: [117230, 5010], // 117.23s - 122.24s INTERATION : Nestle Check this out! I seem to know this brand?
        reaction1: [124240, 1890], // 124.24s - 126.13s REACTION : It looks big here.
        reaction2: [127090, 2004], // 127.09s - 129.13s  REACTION : It's a huge mountain.
        reaction3: [88000, 2008] // 130.07s - 132.15s REACTIONS : Oooooh, that smell, it's awful.
      }
    ],
    'interval': [ // play voiceOver according to Spline position
      {
        'name': 'intro2',
        'startAt': 0.02,
        'played': false
      },
      {
        'name': 'starbucks',
        'startAt': 0.22,
        'played': false
      },
      {
        'name': 'carrefour',
        'startAt': 0.35,
        'played': false
      },
      {
        'name': 'cocacola',
        'startAt': 0.5,
        'played': false
      },
      {
        'name': 'gestespropres',
        'startAt': 0.66,
        'played': false
      },
      {
        'name': 'nestle',
        'startAt': 0.9,
        'played': false
      }
    ]
  }
}
