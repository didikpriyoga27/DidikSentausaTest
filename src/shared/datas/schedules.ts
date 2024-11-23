const schedules = [
  {
    id: 1,
    studio: 'Studio A',
    studio_schedules: [
      {
        id: 11,
        time: '09:00',
        end_time: '11:00',
        studio: 'Studio A',
      },
      {
        id: 12,
        time: '11:00',
        end_time: '13:00',
        studio: 'Studio A',
      },
      {
        id: 13,
        time: '14:00',
        end_time: '16:00',
        studio: 'Studio A',
      },
    ],
  },
  {
    id: 2,
    studio: 'Studio B',
    studio_schedules: [
      {
        id: 21,
        time: '10:00',
        end_time: '12:00',
        studio: 'Studio B',
      },
      {
        id: 22,
        time: '13:00',
        end_time: '15:00',
        studio: 'Studio B',
      },
      {
        id: 23,
        time: '15:00',
        end_time: '17:00',
        studio: 'Studio B',
      },
    ],
  },
];

export default schedules;
