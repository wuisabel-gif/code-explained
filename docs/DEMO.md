# Demo

The app opens on a short C++ scene and a story-mode explanation. Alice is the
action. Bobo is memory. Pick any scene from the row above the editor.

## The record hunt

```cpp
#include <iostream>
#include <vector>

int findLargest(const std::vector<int>& numbers) {
    int largest = numbers[0];

    for (int number : numbers) {
        if (number > largest) {
            largest = number;
        }
    }

    return largest;
}
```

> This is a record hunt: Alice walks Bobo's locker of numbers, and Bobo keeps only the champion score in memory.

| Lines | Story |
| --- | --- |
| 1–2 | `#include` opens iostream and vector, Alice's console toolkit and Bobo's locker. |
| 4 | `findLargest` is the chapter title: take a locker, return one `int`. |
| 5 | Bobo writes the first number onto a sticky note called `largest`. |
| 7–8 | The `for` loop walks every value; the `if` asks whether a challenger beats the note. |
| 9, 13 | A yes overwrites `largest`, then `return` hands that record back. |

## The trade

```cpp
void swapValues(int& alice, int& bobo) {
    int cup = alice;
    alice = bobo;
    bobo = cup;
}
```

> This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.

The `&` marks are references, so the function edits the original variables, not copies.

## The fork

```cpp
int winner(int alice, int bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}
```

> This is a fork in the plot: Alice and Bobo compare scores, and only the larger integer continues.

## The counter

```cpp
int highFives(int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        count = count + 1;
    }
    return count;
}
```

> This chapter is a counter: Alice repeats a high-five n times while Bobo ticks a variable up from zero.

## Opening scene

```cpp
#include <iostream>

int main() {
    std::cout << "Alice waves at Bobo.\n";
    return 0;
}
```

> This is the opening scene of a C++ program: main starts, Alice prints a wave, and the process exits cleanly.

The preview stories are local, so the interface works before an AI provider is
configured. A live explanation still validates with `clang++`, then asks the
model to write in the same story mode.

## Try the API directly

```bash
curl -X POST http://127.0.0.1:4173/api/explain \
  -H 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "language": "cpp",
  "code": "int add(int a, int b) {\n    return a + b;\n}"
}
JSON
```
