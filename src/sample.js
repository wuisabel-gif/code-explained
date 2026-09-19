export const sampleCode = `#include <iostream>
#include <vector>

int findLargest(const std::vector<int>& numbers) {
    int largest = numbers[0];

    for (int number : numbers) {
        if (number > largest) {
            largest = number;
        }
    }

    return largest;
}`;

export const sampleExplanation = {
  summary:
    "This program looks through a group of numbers and finds the biggest one.",
  provider: "preview",
  explanations: [
    {
      groupId: "group-1",
      lineNumbers: [1, 2],
      sentence:
        "These lines bring in ready-made tools for showing messages and holding a group of numbers.",
    },
    {
      groupId: "group-2",
      lineNumbers: [4],
      sentence:
        "This line starts a set of instructions called findLargest that will give back a whole number.",
    },
    {
      groupId: "group-3",
      lineNumbers: [5],
      sentence:
        "This line keeps the first number as the biggest one found so far.",
    },
    {
      groupId: "group-4",
      lineNumbers: [7, 8],
      sentence:
        "These lines check each number one by one and ask whether it is bigger than the saved number.",
    },
    {
      groupId: "group-5",
      lineNumbers: [9],
      sentence:
        "This line remembers the new number when it is bigger.",
    },
    {
      groupId: "group-6",
      lineNumbers: [13],
      sentence:
        "This line gives back the biggest number after every number has been checked.",
    },
  ],
};
