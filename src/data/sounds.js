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
  'climax': {
    'id': 2000,
    'name': 'climax',
    'src': './sounds/nestle2.mp3'
  },
  'clock': {
    'id': 20000,
    'name': 'clock',
    'src': './sounds/clock.mp3'
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
      'src': './sounds/nestle1.mp3',
      'startAt': 0.80,
      'endAt': 0.89
    },
    {
      'id': 26,
      'name': 'final',
      'src': './sounds/nestle1.mp3',
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
        intro1: [0, 14000],
        intro2: [16140, 12860],
        starbucks: [30000, 5160],
        carrefour: [36000, 8600],
        cocacola: [45180, 6860],
        gestespropres: [54140, 8900],
        nestle: [65000, 7060],
        final: [74050, 8980],
        interactionSt: [90000, 6170],
        interactionCr: [99190, 5030],
        interactionCc: [105150, 6840],
        interactionLb: [112180, 4930],
        interactionNe: [117230, 5010],
        reaction1: [124240, 1890],
        reaction2: [127090, 2004],
        reaction3: [88000, 2008]
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
      },
      {
        'name': 'final',
        'startAt': 0.98,
        'played': false
      }
    ]
  }
}
