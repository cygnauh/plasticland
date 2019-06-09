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
      'startAt': 0.1,
      'endAt': 0.2
    },
    {
      'id': 22,
      'name': 'carrefour',
      'src': './sounds/carrefour.mp3',
      'startAt': 0.21,
      'endAt': 0.49
    },
    {
      'id': 23,
      'name': 'cocacola',
      'src': './sounds/cocacola.mp3',
      'startAt': 0.50,
      'endAt': 0.60
    },
    {
      'id': 24,
      'name': 'gestespropres',
      'src': './sounds/lobbies.mp3',
      'startAt': 0.66,
      'endAt': 0.89
    },
    {
      'id': 25,
      'name': 'nestle',
      'src': './sounds/carrefour.mp3',
      'startAt': 0.90,
      'endAt': 1
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
        starbucks: [23000, 6000], // 23s - 29s
        carrefour: [30000, 8000], // 30s - 38s
        cocacola: [39000, 6500], // 39s -45.5s
        gestespropres: [48000, 14000], // 48s - 56.11s
        nestle: [76000, 12000],
        final: [88000, 8000],
        interaction1: [88000, 8000], // INTERATIONS : Starbuck Look at that / ooh it’s starbucks cup / What was that doing there?
        interaction2: [88000, 8000], // INTERATIONS : Carrefour Check this out! What the hell is that?
        interaction3: [88000, 8000], // INTERATIONS : Do you know this?
        interaction4: [88000, 8000], // INTERATIONS : What was that doing there?
        interaction5: [88000, 8000], // INTERATIONS : What the hell is that?
        interaction6: [88000, 8000], // INTERATIONS : Why is this object here?
        interaction7: [88000, 8000], // INTERATIONS : What is it?
        reaction1: [88000, 8000], // REACTIONS : It looks big here.
        reaction2: [88000, 8000], // REACTIONS : It's a huge mountain.
        reaction3: [88000, 8000], // REACTIONS : Oooooh, that smell, it's awful.
        reaction4: [88000, 8000] // REACTIONS : I can't believe it.
      }
    ],
    'interval': [
      {
        'name': 'intro1',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'intro2',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'starbucks',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'carrefour',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'cocacola',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'gestespropres',
        'startAt': 0.9,
        'endAt': 1
      },
      {
        'name': 'nestle',
        'startAt': 0.9,
        'endAt': 1
      }
    ]
  }
}
