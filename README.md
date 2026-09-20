# Code, Explained.

[Open the site](https://wuisabel-gif.github.io/code-explained/)

Your code is already in your hands: lines you typed, syntax that is hard to remember without a plot. Turn your code into an interesting story, so learning it is easier.

Paste or upload any code you have: Alice is the action, Bobo is memory, and each sentence stays tied to the lines it explains.

**Why bother.** Syntax without a plot is hard to remember, and a scene you can follow makes the function easier to learn.

**Why upload.** It can be any code you have. Drop the file instead of retyping it.

**OpenAI, inside the page.** The site embeds the OpenAI API, so a live read sends your code through that API and maps each sentence back to the source. The code is never compiled and never run. C and C++ are syntax-checked first.

![Example 1: code on the left, the story on the right](docs/screenshots/record-hunt.png)

## The words it produces

**Example 1**

```cpp
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

A `for` loop sends Alice through every number, and the `if` asks whether this challenger is bigger than Bobo's sticky note.

**Example 2**

```python
def swap_values(alice, bobo):
    cup = alice
    alice = bobo
    bobo = cup
    return alice, bobo
```

> This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.

**Example 3**

```javascript
function winner(alice, bobo) {
    if (alice > bobo) {
        return alice;
    }
    return bobo;
}
```

> This is a fork in the plot: Alice and Bobo compare scores, and only the larger integer continues.

## License

© 2026 Isabel Wu. [MIT License](LICENSE).
