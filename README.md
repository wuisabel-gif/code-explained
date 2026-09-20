# Code, Explained.

[Open the site](https://wuisabel-gif.github.io/code-explained/)

Turn your C++ into an interesting story, so learning it is easier.

Paste or upload a homework file. Alice is the action. Bobo is memory. Each sentence stays tied to the lines it explains.

**Why bother.** Syntax without a plot is hard to remember. A scene you can follow makes the function easier to learn.

**Why upload C++.** The file is already on disk. Drop a `.cpp` instead of retyping it.

**OpenAI, inside the page.** The site embeds the OpenAI API. A live read sends your code through that API and maps each sentence back to the source. The code is checked, never compiled, never run.

![Example 1: C++ on the left, the story on the right](docs/screenshots/record-hunt.png)

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

```cpp
void swapValues(int& alice, int& bobo) {
    int cup = alice;
    alice = bobo;
    bobo = cup;
}
```

> This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.

**Example 3**

```cpp
int main() {
    std::cout << "Alice waves at Bobo.\n";
    return 0;
}
```

> This is the opening scene of a C++ program: main starts, Alice prints a wave, and the process exits cleanly.

## License

© 2026 Isabel Wu. [MIT License](LICENSE).
