const classes = [
  {
    id: "c1",
    name: "HIIT Blast",
    description: "High intensity interval training to burn fat fast.",
    duration: "45 mins",
    level: "Intermediate"
  },
  {
    id: "c2",
    name: "Strength Foundations",
    description: "Build core strength using compound movements.",
    duration: "60 mins",
    level: "Beginner"
  },
  {
    id: "c3",
    name: "Yoga Flow",
    description: "Improve mobility and recovery with guided flow.",
    duration: "50 mins",
    level: "All Levels"
  }
];

const trainers = [
  { id: "t1", name: "Ava Mitchell", specialization: "Strength & Conditioning", experience: 8 },
  { id: "t2", name: "Noah Carter", specialization: "Body Recomposition", experience: 6 },
  { id: "t3", name: "Mia Johnson", specialization: "Mobility & Yoga", experience: 7 }
];

const memberships = [
  { id: "m1", name: "Starter", price: 29, benefits: ["Gym access", "1 group class/week"] },
  { id: "m2", name: "Pro", price: 59, benefits: ["24/7 access", "Unlimited classes", "2 trainer sessions/month"] },
  { id: "m3", name: "Elite", price: 99, benefits: ["Everything in Pro", "Weekly personal training", "Nutrition support"] }
];

module.exports = { classes, trainers, memberships };
