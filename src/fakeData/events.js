// belongs to post
// has many attendances
export default [
  {
    id: 1,
    title: 'React meetup',
    description: 'Yada yada yada yada yada.',
    startTime: '2019-10-11T16:00:00',
    endTime: '2019-10-11T17:00:00',
    userId: 1, // host
    spaceId: 1, // location
    createdAt: '2019-09-06T15:20:00',
    updatedAt: '2019-09-06T15:20:00'
  },
  {
    id: 2,
    title: 'Fundraising lecture with Gavin Belson',
    description: 'Yada yada yada yada yada.',
    startTime: '2019-10-15T16:00:00',
    endTime: '2019-10-15T17:00:00',
    userId: 9, // host
    spaceId: 2, // location
    createdAt: '2019-09-07T13:34:00',
    updatedAt: '2019-09-07T13:34:00'
  },
  {
    id: 3,
    title: 'Mandarin 101',
    description: 'Yada yada yada yada yada.',
    startTime: '2019-10-11T16:00:00',
    endTime: '2019-10-11T17:00:00',
    userId: 9, // host
    spaceId: 3, // location
    createdAt: '2019-09-01T10:20:00',
    updatedAt: '2019-09-01T10:20:00'
  }
]
