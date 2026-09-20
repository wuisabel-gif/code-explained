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
        "This is a record hunt: Alice walks Bobo's locker of numbers, and Bobo keeps only the champion score in memory.",
      provider: "preview",
      language: "cpp",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1, 2],
          sentence:
            "The #include lines open two toolkits Alice needs later: iostream for talking to the screen, and vector for Bobo's resizable locker of numbers.",
        },
        {
          groupId: "group-2",
          lineNumbers: [4],
          sentence:
            "findLargest is the chapter title, a function that takes Bobo's locker and promises to return one int, the biggest value inside.",
        },
        {
          groupId: "group-3",
          lineNumbers: [5],
          sentence:
            "Bobo writes the first locker number into a variable called largest, a sticky note that says this is the record until someone beats it.",
        },
        {
          groupId: "group-4",
          lineNumbers: [7, 8],
          sentence:
            "A for loop sends Alice through every number, and the if asks a yes-or-no question: is this challenger bigger than Bobo's sticky note?",
        },
        {
          groupId: "group-5",
          lineNumbers: [9, 13],
          sentence:
            "When the challenger wins, Bobo overwrites largest, and after the loop return hands that record back as the function's answer.",
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
        "This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.",
      provider: "preview",
      language: "python",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "def swap_values opens a Python function, a chapter that takes Alice and Bobo and will hand both values back as a pair.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2, 3],
          sentence:
            "First the spare cup stores Alice's number, then Alice's slot is overwritten with Bobo's number, the classic three-step swap.",
        },
        {
          groupId: "group-3",
          lineNumbers: [4, 5],
          sentence:
            "Bobo receives the cup, then return sends both names back so the two original values have traded places.",
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
        "This is a fork in the plot: Alice and Bobo compare scores, and only the larger integer continues.",
      provider: "preview",
      language: "javascript",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "function winner is a JavaScript chapter that takes two numbers, Alice's score and Bobo's score, and will return exactly one of them.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2, 3],
          sentence:
            "The if is a branch: when Alice's number is greater, the story ends early and return sends Alice's value back.",
        },
        {
          groupId: "group-3",
          lineNumbers: [5],
          sentence:
            "If that branch never fired, Bobo wins the tie-or-greater case and his number is the value the function gives back.",
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
        "This chapter is a counter: Alice repeats a high-five n times while Bobo ticks a variable up from zero.",
      provider: "preview",
      language: "python",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "def high_fives takes n, how many times the scene should repeat, and promises a number back: the total number of claps.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2],
          sentence:
            "count starts at 0 because Bobo has not tallied anything yet, the standard empty notebook before a loop.",
        },
        {
          groupId: "group-3",
          lineNumbers: [3, 4],
          sentence:
            "The for loop is the repeating beat, range(n) running Alice through n passes, and each pass adds 1 to count.",
        },
        {
          groupId: "group-4",
          lineNumbers: [5],
          sentence:
            "return count is the last line of the chapter, handing Bobo's tally back as the function's result.",
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
        "This is the opening scene of a program: main starts, Alice prints a wave, and the function ends.",
      provider: "preview",
      language: "javascript",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "function main is the front door of this JavaScript story, the function a learner would call first.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2],
          sentence:
            "console.log prints Alice's wave onto the screen, a single beat of output and then the scene is over.",
        },
      ],
    },
  },
];

export const sampleCode = examples[0].code;
export const sampleExplanation = examples[0].explanation;
