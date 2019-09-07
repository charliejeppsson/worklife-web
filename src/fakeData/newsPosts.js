// Joint table between a user and either an event, a news post or collab
export default [
  {
    id: 8,
    title: 'Café Indigo just joined the club',
    description: "Unless you've been living in a cave for the past seven years, odds are you've already heard about these guys. They're the best...",
    content: "Unless you've been living in a cave for the past seven years, odds are you've already heard about these guys. They're the best in the biz, and they just decided to get even better - by deciding to join Wörklife! Their beautiful aok doors are open to you for your daily grind from 9-5, 7 days a week.",
    image: {
      url: 'https://images.pexels.com/photos/2159074/pexels-photo-2159074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      info: 'Photo by Quang Nguyen Vinh from Pexels'
    },
    userId: 1,
    eventId: null,
    collabId: null,
    createdAt: '2019-09-03T13:45:00',
    updatedAt: '2019-09-03T13:45:00'
  },
  {
    id: 7,
    title: 'Get inspired by the one and only Gavin Belson',
    description: 'Wörklife members have been blessed with an exclusive opportunity to learn all abo...',
    content: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together, basking in the bliss the is React. The speakers this time is.',
    image: {
      url: 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567856786/coderag_hooli_farnc5.jpg',
      info: null
    },
    userId: 9,
    eventId: 2,
    collabId: null,
    createdAt: '2019-09-06T12:55:00',
    updatedAt: '2019-09-06T12:55:00'
  },
  {
    id: 6,
    title: 'Epic designers wanted',
    description: "Our agency just caught a big fish and need experienced designers ASAP...",
    content: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together, basking in the bliss the is React. The speakers this time is.',
    image: {
      url: 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567873024/steve-johnson-IDmD4iw9XvE-unsplash_qesfzg.jpg',
      info: 'Photo by Steve Johnson on Unsplash'
    },
    userId: 8,
    eventId: null,
    collabId: 1,
    createdAt: '2019-09-06T18:55:00',
    updatedAt: '2019-09-06T18:55:00'
  },
  {
    id: 5,
    title: 'The React meetup of the year right here @ Wörklife',
    description: 'The time is once again upon us to share, learn, laugh and perhaps even cry...',
    content: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together, basking in the bliss the is React. The speakers this time is.',
    image: {
      url: 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567779514/react-logo_wgzm79.png',
      info: null
    },
    userId: 1,
    eventId: 1,
    collabId: null,
    createdAt: '2019-09-06T18:55:00',
    updatedAt: '2019-09-06T18:55:00'
  },
  {
    id: 4,
    title: 'Please give it up for restaurant Artsy',
    description: 'Describing article here, real good article.',
    content:
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor' +
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum' +
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum',
    image: {
      url: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      info: 'Photo by Tom Balabaud from Pexels'
    },
    userId: 1,
    eventId: null,
    collabId: null,
    createdAt: '2019-09-01T10:30:00',
    updatedAt: '2019-09-01T10:30:00'
  },
  {
    id: 3,
    title: 'Open-source maintainers needed',
    description: "Our agency just caught a big fintech fish for a large-scale project and...",
    content: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together, basking in the bliss the is React. The speakers this time is.',
    image: {
      url: 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567873809/photo-1498050108023-c5249f4df085_ge7dwt.jpg',
      info: 'Photo by Christopher Gower on Unsplash'
    },
    userId: 8,
    eventId: null,
    collabId: 2,
    createdAt: '2019-09-06T18:55:00',
    updatedAt: '2019-09-06T18:55:00'
  },
  {
    id: 2,
    title: 'Learn mandarin from a master',
    description: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together...',
    content: 'The time is once again upon us to share, learn, laugh and perhaps even cry a little together, basking in the bliss the is React. The speakers this time is.',
    image: {
      url: 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567875138/photo-1508804185872-d7badad00f7d_nl1haf.jpg',
      info: 'Photo by Hanson Lu on Unsplash'
    },
    userId: 10,
    eventId: 3,
    collabId: null,
    createdAt: '2019-09-06T12:55:00',
    updatedAt: '2019-09-06T12:55:00'
  },
  {
    id: 1,
    title: 'Octopus bar is open for business',
    description: 'Describing article here, real good article.',
    content:
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor' +
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum' +
      'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum',
    image: {
      url: 'https://images.pexels.com/photos/2067576/pexels-photo-2067576.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      info: 'Photo by Marta Dzedyshko from Pexels'
    },
    userId: 1,
    eventId: null,
    collabId: null,
    createdAt: '2019-08-21T20:10:00',
    updatedAt: '2019-08-21T20:10:00'
  }
]
