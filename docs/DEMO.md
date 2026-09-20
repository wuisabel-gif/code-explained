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

> Alice looks in Bobo's box of numbers, and Bobo keeps the biggest one.

| Lines | Story |
| --- | --- |
| 1–2 | These two lines get Alice her tools: one to talk to the screen, and one for Bobo's box of numbers. |
| 4 | `findLargest` is the job name: take Bobo's box and give back the biggest number. |
| 5 | Bobo writes down the first number and calls it largest. |
| 7–8 | `for` means Alice looks at every number; `if` asks if this one is bigger. |
| 9, 13 | If yes, Bobo changes the sticky note, then `return` gives that number back. |

## Example 2

```python
def swap_values(alice, bobo):
    cup = alice
    alice = bobo
    bobo = cup
    return alice, bobo
```

> Alice and Bobo trade numbers, and they use a cup so nobody drops theirs.

## Example 3

```javascript
function winner(alice, bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}
```

> Alice and Bobo compare scores, and the bigger number wins.

## Example 4

```python
def high_fives(n):
    count = 0
    for i in range(n):
        count = count + 1
    return count
```

> Alice high-fives again and again, and Bobo counts how many times.

## Example 5

```javascript
function main() {
    console.log("Alice waves at Bobo.");
}
```

> Alice waves at Bobo, and the computer shows the wave on the screen.

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
