const userData = [
  {
    name: "John Doe",
    studentId: "2023-58291-MN-0",
    section: "BSCPE 3-5",
    scores: {
      assessment1: {
        score: 8,
        answers: ["A", "B", "C", "D", "A", "B", "C", "D"],
      },
      assessment2: { score: 7, answers: ["D", "C", "B", "A", "D", "C", "B"] },
      assessment3: {
        score: 9,
        answers: ["B", "A", "D", "C", "B", "A", "D", "C", "B"],
      },
      assessment4: { score: 6, answers: ["C", "D", "A", "B", "C", "D"] },
      assessment5: {
        score: 8,
        answers: ["A", "B", "C", "D", "A", "B", "C", "D"],
      },
      lab1: {
        score: 9,
        answers: ["B", "C", "D", "A", "B", "C", "D", "A", "B"],
      },
      lab2: { score: 7, answers: ["C", "D", "A", "B", "C", "D", "A"] },
      lab3: { score: 8, answers: ["D", "A", "B", "C", "D", "A", "B", "C"] },
    },
  },
  {
    name: "Jane Smith",
    studentId: "2022-34982-MN-0",
    section: "BSCPE 1-4",
    scores: {
      assessment1: { score: 7, answers: ["C", "D", "B", "A", "C", "D", "B"] },
      assessment2: {
        score: 8,
        answers: ["A", "B", "C", "D", "A", "B", "C", "D"],
      },
      assessment3: { score: 6, answers: ["D", "C", "B", "A", "D", "C"] },
      assessment4: {
        score: 9,
        answers: ["B", "A", "D", "C", "B", "A", "D", "C", "B"],
      },
      assessment5: {
        score: 8,
        answers: ["A", "B", "C", "D", "A", "B", "C", "D"],
      },
      lab1: { score: 7, answers: ["C", "D", "A", "B", "C", "D", "A"] },
      lab2: {
        score: 9,
        answers: ["B", "C", "D", "A", "B", "C", "D", "A", "B"],
      },
      lab3: { score: 8, answers: ["D", "A", "B", "C", "D", "A", "B", "C"] },
    },
  },
];

export default userData;
