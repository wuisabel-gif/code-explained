# Code, Explained.

[Open the site](https://wuisabel-gif.github.io/code-explained/)

When I learn programming, I open this. I paste or upload a little C++ and try to get a coherent story back.

Alice is the action. Bobo is memory. Each sentence stays tied to the lines it explains.

**Why bother.** Syntax without a plot is a wall. I wanted the next page: what is this function actually doing.

**Why upload C++.** The homework file is already on disk. The site takes a `.cpp` upload so I do not have to retype it.

**OpenAI, inside the page.** I embedded the OpenAI API in the website. A live read sends the code through that API and maps each sentence back to the source. The code is checked, never compiled, never run.

![The record hunt: C++ on the left, the story on the right](docs/screenshots/record-hunt.png)

## The words it produces

**The record hunt**

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

**The trade**

```cpp
void swapValues(int& alice, int& bobo) {
    int cup = alice;
    alice = bobo;
    bobo = cup;
}
```

> This scene is a safe trade: Alice and Bobo swap the integers they hold, using a spare cup so neither value is lost.

**Opening scene**

```cpp
int main() {
    std::cout << "Alice waves at Bobo.\n";
    return 0;
}
```

> This is the opening scene of a C++ program: main starts, Alice prints a wave, and the process exits cleanly.

## License

© 2026 Isabel Wu. [MIT License](LICENSE).
