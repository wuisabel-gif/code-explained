# Contributing

## Local setup

1. Install Node.js 20.19+ or 22.12+ (the versions supported by Vite 7).
2. Install the locked dependencies:

   ```sh
   npm ci
   ```

3. Start the development server and open <http://127.0.0.1:5173/>:

   ```sh
   npm run dev
   ```

4. Run the project checks before opening a pull request:

   ```sh
   npm run check
   ```

5. Clang is needed for live C/C++ code reads and to pass `npm run check`.
   JavaScript-only development can skip Clang and run:

   ```sh
   node --test tests/language.test.mjs tests/groups.test.mjs
   npm run build
   ```
6. Never commit API keys or other secrets. Keep them in your local `.env` file,
   which is ignored by Git.
