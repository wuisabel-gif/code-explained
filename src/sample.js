export const examples = [
  {
    id: "largest",
    title: "The record hunt",
    filename: "findLargest.cpp",
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
    title: "The trade",
    filename: "swapValues.cpp",
    focusId: "group-2",
    code: `void swapValues(int& alice, int& bobo) {
    int cup = alice;
    alice = bobo;
    bobo = cup;
}`,
    explanation: {
      summary:
        "This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.",
      provider: "preview",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "swapValues is a void function, meaning it returns no souvenir, and the & marks mean Alice and Bobo are references to the original variables, not copies.",
        },
        {
          groupId: "group-2",
          lineNumbers: [2, 3],
          sentence:
            "First the spare cup stores Alice's number, then Alice's slot is overwritten with Bobo's number, the classic three-step swap from every intro class.",
        },
        {
          groupId: "group-3",
          lineNumbers: [4],
          sentence:
            "Finally Bobo receives the cup, so the two original variables have traded values without dropping either one.",
        },
      ],
    },
  },
  {
    id: "winner",
    title: "The fork",
    filename: "winner.cpp",
    focusId: "group-2",
    code: `int winner(int alice, int bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}`,
    explanation: {
      summary:
        "This is a fork in the plot: Alice and Bobo compare scores, and only the larger integer continues.",
      provider: "preview",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "winner is a function that takes two ints, Alice's score and Bobo's score, and will return exactly one of them.",
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
    title: "The counter",
    filename: "highFives.cpp",
    focusId: "group-3",
    code: `int highFives(int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        count = count + 1;
    }
    return count;
}`,
    explanation: {
      summary:
        "This chapter is a counter: Alice repeats a high-five n times while Bobo ticks a variable up from zero.",
      provider: "preview",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "highFives takes n, how many times the scene should repeat, and promises an int back: the total number of claps.",
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
            "The for loop is the repeating beat, i running from 0 until it hits n, and each pass adds 1 to count.",
        },
        {
          groupId: "group-4",
          lineNumbers: [6],
          sentence:
            "return count is the last line of the chapter, handing Bobo's tally back as the function's result.",
        },
      ],
    },
  },
  {
    id: "wave",
    title: "Opening scene",
    filename: "wave.cpp",
    focusId: "group-3",
    code: `#include <iostream>

int main() {
    std::cout << "Alice waves at Bobo.\\n";
    return 0;
}`,
    explanation: {
      summary:
        "This is the opening scene of a C++ program: main starts, Alice prints a wave, and the process exits cleanly.",
      provider: "preview",
      explanations: [
        {
          groupId: "group-1",
          lineNumbers: [1],
          sentence:
            "#include <iostream> loads the standard input-output library so Alice can write text to the console with std::cout.",
        },
        {
          groupId: "group-2",
          lineNumbers: [3],
          sentence:
            "int main() is the front door of every C++ story, the function the operating system calls first.",
        },
        {
          groupId: "group-3",
          lineNumbers: [4, 5],
          sentence:
            "std::cout prints Alice's wave onto the screen, then return 0 tells the system the program finished with no error.",
        },
      ],
    },
  },
];

export const sampleCode = examples[0].code;
export const sampleExplanation = examples[0].explanation;
