# Demo

This is the example shown when the app first opens. Paste the following C++
code into the editor and choose **Explain my code**:

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

## Example result

> This program looks through a group of numbers and finds the biggest one.

The explanation rail connects each sentence to the relevant lines:

| Lines | Explanation |
| --- | --- |
| 1–2 | These lines bring in ready-made tools for showing messages and holding a group of numbers. |
| 4 | This line starts a set of instructions called `findLargest` that will give back a whole number. |
| 5 | This line keeps the first number as the biggest one found so far. |
| 7–8 | These lines check each number one by one and ask whether it is bigger than the saved number. |
| 9 | This line remembers the new number when it is bigger. |
| 13 | This line gives back the biggest number after every number has been checked. |

The initial result is a local preview, so the interface is useful even before
an AI provider is configured. A live explanation validates the C++ with
`clang++`, then asks the configured provider for the same summary-and-mapping
format.

## Try the API directly

With the local server running, send a request like this:

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

The response contains a summary, the provider name, and line-number mappings
owned by the server.
