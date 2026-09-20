# Demo

The app opens on a short scene and a story-mode explanation. Alice is the
action. Bobo is memory. Pick any example from the row above the editor. C++,
Python, and JavaScript are included. Paste any other language you have.

## Example 1

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

## Example 2

```python
def swap_values(alice, bobo):
    cup = alice
    alice = bobo
    bobo = cup
    return alice, bobo
```

> This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.

## Example 3

```javascript
function winner(alice, bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}
```

> This is a fork in the plot: Alice and Bobo compare scores, and only the larger integer continues.

## Example 4

```python
def high_fives(n):
    count = 0
    for i in range(n):
        count = count + 1
    return count
```

> This chapter is a counter: Alice repeats a high-five n times while Bobo ticks a variable up from zero.

## Example 5

```javascript
function main() {
    console.log("Alice waves at Bobo.");
}
```

> This is the opening scene of a program: main starts, Alice prints a wave, and the function ends.

The preview stories are local, so the interface works before an AI provider is
configured. A live explanation asks the model to write in the same story mode.
C and C++ are still syntax-checked with clang. Other languages are read as
written.

## Try the API directly

```bash
curl -X POST http://127.0.0.1:4173/api/explain \
  -H 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "language": "python",
  "code": "def add(a, b):\n    return a + b\n"
}
JSON
```
