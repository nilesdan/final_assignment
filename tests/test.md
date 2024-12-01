# Simple Testing & Version Control Guide

## Folder Structure
Create a new folder on your computer called `wdi-project`:
```
wdi-project/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── wdi.json
    └── tests/
        └── test.js
```

## Basic Version Control (Using GitHub)

### First Time Setup:
1. Go to GitHub.com and create an account
2. Create a new repository called "wdi-project"
3. On your computer, open terminal/command prompt in your project folder
4. Type these commands:
```bash
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin [your-github-repo-url]
git push -u origin main
```

### Daily Usage:
When you make changes:
```bash
git add .
git commit -m "Describe what you changed"
git push
```

## Simple Tests
Create a new file `tests/test.js`:

```javascript
// Basic tests for your functions
function runTests() {
    // Test 1: Check if trend calculation works
    console.log("Running trend calculation test...");
    const testData = [100, 120, 140, 160];
    const trend = calculateTrend(testData);
    console.log(`Trend should be 'Consistently Increasing': ${trend}`);

    // Test 2: Check correlation calculation
    console.log("\nRunning correlation test...");
    const data1 = [1, 2, 3, 4];
    const data2 = [2, 4, 6, 8];
    const correlation = calculateCorrelation(data1, data2);
    console.log(`Correlation should be close to 1: ${correlation}`);

    // Test 3: Check error handling
    console.log("\nRunning error handling test...");
    try {
        calculateTrend([]);
        console.log("Empty array handled correctly");
    } catch (error) {
        console.log("Error handling needs improvement");
    }
}

// Add this to your HTML to run tests:
// <button onclick="runTests()">Run Tests</button>
```

## How to Use:

1. Save all files in your `wdi-project` folder

2. Add this button to your HTML to run tests:
```html
<button onclick="runTests()" style="position: fixed; bottom: 10px; right: 10px;">
    Run Tests
</button>
```

3. Link test file in your HTML:
```html
<script src="tests/test.js"></script>
```

## Testing Tips:
1. Test one thing at a time
2. Check if functions work with normal data
3. Check if functions handle errors (empty data, wrong data)
4. Test edge cases (very large numbers, zero, negative numbers)

## Version Control Tips:
1. Commit often (whenever you make something work)
2. Write clear commit messages
3. Always pull before starting work
4. Keep a backup of your code

Remember:
- Don't worry about making it perfect
- Test the most important functions first
- Commit your code at the end of each study session
- Ask for help when stuck!
