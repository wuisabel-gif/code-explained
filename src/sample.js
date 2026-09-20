export const examples = [
  {
    id: "largest",
    title: "Example 1",
    language: "cpp",
    filename: "example-1.cpp",
    focusId: "group-4",
    code: `#include <iostream>
#include <vector>

int findLargest(const std::vector<int>& numbers) {
    int largest = numbers[0];

    for (int number : numbers) {
        if (number > largest) {
            largest = number;
        }
    }

    return largest;
}`,
    explanation: {
      summary:
        "Alice looks in Bobo's box of numbers, and Bobo keeps the biggest one.",
      provider: "preview",
      language: "cpp",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1, 2],
          sentence:
            "These two lines get Alice her tools: one to talk to the screen, and one for Bobo's box of numbers.",
        },
        {
          groupId: "group-2",
          lineNumbers: [4],
          sentence:
            "findLargest is the job name: take Bobo's box and give back the biggest number.",
        },
        {
          groupId: "group-3",
          lineNumbers: [5],
          sentence:
            "Bobo writes down the first number and calls it largest, like a sticky note that says this is the winner for now.",
        },
        {
          groupId: "group-4",
          lineNumbers: [7, 8],
          sentence:
            "for means Alice looks at every number, and if asks: is this one bigger than Bobo's sticky note?",
        },
        {
          groupId: "group-5",
          lineNumbers: [9, 13],
          sentence:
            "If yes, Bobo changes the sticky note, and return gives that biggest number back when Alice is done looking.",
        },
      ],
    },
  },
  {
    id: "swap",
    title: "Example 2",
    language: "python",
    filename: "example-2.py",
    focusId: "group-2",
    code: `def swap_values(alice, bobo):
    cup = alice
    alice = bobo
    bobo = cup
    return alice, bobo`,
    explanation: {
      summary:
        "Alice and Bobo trade numbers, and they use a cup so nobody drops theirs.",
      provider: "preview",
      language: "python",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "def swap_values starts a little job that takes Alice and Bobo and will give both numbers back.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2, 3],
          sentence:
            "First the cup holds Alice's number so it is safe, then Alice gets Bobo's number.",
        },
        {
          groupId: "group-3",
          lineNumbers: [4, 5],
          sentence:
            "Then Bobo gets the number from the cup, and return hands both numbers back.",
        },
      ],
    },
  },
  {
    id: "winner",
    title: "Example 3",
    language: "javascript",
    filename: "example-3.js",
    focusId: "group-2",
    code: `function winner(alice, bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}`,
    explanation: {
      summary:
        "Alice and Bobo compare scores, and the bigger number wins.",
      provider: "preview",
      language: "javascript",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "function winner starts a job that looks at Alice's number and Bobo's number and keeps only one.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2, 3],
          sentence:
            "if asks: is Alice's number bigger? If yes, we stop and give Alice's number back.",
        },
        {
          groupId: "group-3",
          lineNumbers: [5],
          sentence:
            "If Alice was not bigger, Bobo wins and we give Bobo's number back.",
        },
      ],
    },
  },
  {
    id: "highfives",
    title: "Example 4",
    language: "python",
    filename: "example-4.py",
    focusId: "group-3",
    code: `def high_fives(n):
    count = 0
    for i in range(n):
        count = count + 1
    return count`,
    explanation: {
      summary:
        "Alice high-fives again and again, and Bobo counts how many times.",
      provider: "preview",
      language: "python",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "def high_fives starts a job that will high-five n times and tell you the count.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2],
          sentence:
            "count starts at 0 because Bobo has not counted anything yet.",
        },
        {
          groupId: "group-3",
          lineNumbers: [3, 4],
          sentence:
            "for means Alice does it again and again, and each time Bobo adds 1 to count.",
        },
        {
          groupId: "group-4",
          lineNumbers: [5],
          sentence:
            "return gives Bobo's count back at the end.",
        },
      ],
    },
  },
  {
    id: "wave",
    title: "Example 5",
    language: "javascript",
    filename: "example-5.js",
    focusId: "group-2",
    code: `function main() {
    console.log("Alice waves at Bobo.");
}`,
    explanation: {
      summary:
        "Alice waves at Bobo, and the computer shows the wave on the screen.",
      provider: "preview",
      language: "javascript",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "function main is the start of this little story.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2],
          sentence:
            "console.log writes Alice's wave on the screen so you can see it.",
        },
      ],
    },
  },
];

export const sampleCode = examples[0].code;
export const sampleExplanation = examples[0].explanation;
