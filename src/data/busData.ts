// src/data/busData.ts

export const busStandData = {
  "Kollam": { lat: 8.8854, lng: 76.6085 },
  "Karunagappally": { lat: 9.0615, lng: 76.5357 },
  "Kayamkulam": { lat: 9.1815, lng: 76.5111 },
  "Chavara": { lat: 8.9754, lng: 76.5516 },
  "Oachira": { lat: 9.1330, lng: 76.5140 },
  "Paravur": { lat: 8.8152, lng: 76.6660 },
  "Punalur": { lat: 9.0185, lng: 76.9242 },
  "Kottarakkara": { lat: 8.9954, lng: 76.7725 },
  "Pathanapuram": { lat: 9.0863, lng: 76.8643 },
  "Sasthamkotta": { lat: 9.0396, lng: 76.6210 },
};

// Master schedule combining PDF data and generated times
export const allBusServices = [
  { from: "Kollam", to: "Karunagappally", departure: "08:00", arrival: "08:35" },
  { from: "Kollam", to: "Punalur", departure: "08:15", arrival: "09:30" },
  { from: "Kollam", to: "Kottarakkara", departure: "08:30", arrival: "09:15" },
  { from: "Kollam", to: "Kayamkulam", departure: "09:00", arrival: "10:05" },
  { from: "Karunagappally", to: "Kollam", departure: "09:10", arrival: "09:45" },
  { from: "Karunagappally", to: "Kayamkulam", departure: "09:30", arrival: "10:00" },
  { from: "Karunagappally", to: "Oachira", departure: "09:45", arrival: "10:05" },
  { from: "Kottarakkara", to: "Kollam", departure: "10:00", arrival: "10:45" },
  { from: "Kottarakkara", to: "Punalur", departure: "10:20", arrival: "10:55" },
  { from: "Kottarakkara", to: "Pathanapuram", departure: "10:45", arrival: "11:15" },
  { from: "Punalur", to: "Kollam", departure: "11:00", arrival: "12:15" },
  { from: "Punalur", to: "Kottarakkara", departure: "11:30", arrival: "12:05" },
  { from: "Oachira", to: "Kollam", departure: "08:45", arrival: "09:40" },
  { from: "Chavara", to: "Kayamkulam", departure: "13:00", arrival: "13:50" },
  { from: "Sasthamkotta", to: "Kollam", departure: "14:00", arrival: "14:45" },
  { from: "Paravur", to: "Kollam", departure: "15:10", arrival: "15:40" },
];

