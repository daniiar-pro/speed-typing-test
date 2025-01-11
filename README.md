# Typing Test App

A simple and interactive **Typing Test App** prototype, inspired by popular typing platforms like [10fastfingers](https://10fastfingers.com/typing-test/english) and [MonkeyType](https://monkeytype.com/). This app allows users to test their typing speed, track progress, and view their results over time.

Try it live: [Typing Test App](https://daniiar-pro.github.io/speed-typing-test/)

---

## Features

1. **Typing Speed Test**
   - Fetches random text (in JSON format) and displays it for users to type.
   - Measures typing speed and accuracy based on user input within a set time frame.

2. **Test Results**
   - Displays typing test results in an intuitive chart on the user interface.
   - Stores previous test results using **localStorage** for progress tracking.

3. **Customizable Timer**
   - Default test duration is **10 seconds**, but users can adjust the timer in the `config.js` file.

4. **User-Friendly Interface**
   - Simple, responsive design for seamless interaction on both desktop and mobile.

---

## How It Works

1. **Typing Test**
   - The app fetches text from a JSON file and renders it on the screen.
   - Users type the displayed text, and the app calculates typing speed (words per minute), accuracy, and total characters typed.

2. **Results Display**
   - After the test, the results are displayed as a **chart** with detailed metrics.
   - Results are saved to **localStorage**, allowing users to view their progress over time.

3. **Custom Timer**
   - The default test duration is **10 seconds**.
   - To customize the timer, modify the `set_duration` value in the `config.js` file.

---

## How to Run

### Option 1: Try it Live
- Navigate to the live version: [Typing Test App](https://daniiar-pro.github.io/speed-typing-test/)

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/daniiar-pro/speed-typing-test.git


## Technologies Used

1. **HTML**:
   - Structuring the content and layout of the application.
2. **CSS**:
   - Custom styles and animations for a polished and visually appealing look.
   - Utilizes advanced features like **Flexbox** and **Grid Layout**.
3. **Bootstrap**:
   - Provides responsiveness and pre-built components like navigation bars, buttons, and modals.
4. **localStorage**:
   - Used to save and retrieve user test results for progress tracking.

---

## Contributions

Contributions are welcome! If you'd like to improve this project, feel free to:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

---
