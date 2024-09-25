import { v4 as uuidv4 } from "uuid";
  
  export const dataUser = [
    {
      _id: uuidv4(),
      name: "fv1",
      email: "kranstead0@narod.ru",
      password: "12345678",
      city: "Nurabelen",
      state: "active",
      country: "ID",
      occupation: "Computer Systems Analyst I",
      phoneNumber: "8346315874",
      role: "superadmin",
      events: [
        {
          _id: uuidv4(),
          title: "Mazda",
          start: "2022-01-01T00:00:00.000Z",
          end: "2022-01-02T00:00:00.000Z",
          allDay: true,
          location: "China",
          rrule: {
            freq: "daily",
            until: "2022-01-02T00:00:00.000Z",
          },
        },
      ],
      notes: "In hac habitasse platea dictumst.",
    },
    {
      _id: uuidv4(),
      name: "fv2",
      email: "fv2@narod.ru",
      password: "12345678",
      city: "Nurabelen",
      state: "active",
      country: "ID",
      occupation: "Computer Systems Analyst I",
      phoneNumber: "8346315874",
      role: "superadmin",
      events: [
        {
          _id: uuidv4(),
          title: "Mazda",
          start: "2022-01-01T00:00:00.000Z",
          end: "2022-01-02T00:00:00.000Z",
          allDay: true,
          location: "China",
          rrule: {
            freq: "daily",
            until: "2022-01-02T00:00:00.000Z",
          },
        },
      ],
      notes: "In hac habitasse platea dictumst.",
    },
    {
      _id: uuidv4(),
      name: "fv3",
      email: "fv3@email.it",
      password: "12345678",
      city: "Nurabelen",
      state: "active",
      country: "ID",
      occupation: "Computer Systems Analyst I",
      phoneNumber: "8346315874",
      role: "superadmin",
      events: [
        {
          _id: uuidv4(),
          title: "Mazda",
          start: "2022-01-01T00:00:00.000Z",
          end: "2022-01-02T00:00:00.000Z",
          allDay: true,
          location: "China",
          rrule: {
            freq: "daily",
            until: "2022-01-02T00:00:00.000Z",
          },
        },
      ],
      notes: "In hac habitasse platea dictumst.",
    },
    {
      _id: uuidv4(),
    name: "fvPM",
    email: "fvPM@email.it",
    password: "12345678",
    birthdate: "1998-01-10",
    city: "Nurabelen",
    state: "active",
    country: "ID",
    occupation: "Computer Systems Analyst I",
    phoneNumber: "8346315874",
    notes: "notes",
    role: "admin",
    events: [
      {
        title: "Evento giornaliero",
        start: "2024-09-15T00:00:00.000Z",
        end: "2024-09-16T00:00:00.000Z",
        allDay: true,
        location: "Office",
        rrule: {
          freq: "DAILY",
          until: "2024-09-20T00:00:00.000Z"
        }
      },
      {
        title: "Meeting mensile",
        start: "2024-09-30T00:00:00.000Z",
        end: "2024-09-30T00:00:00.000Z",
        allDay: false,
        location: "Online",
        rrule: {
          freq: "MONTHLY",
          until: "2025-09-30T00:00:00.000Z"
        }
      }
    ],
      notes: "In hac habitasse platea dictumst.",
    },
  ];

