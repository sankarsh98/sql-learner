// =============================================
// PYTHON LEARNER - Main Application
// =============================================

let pyodide = null;
let currentLesson = null;
let completedLessons = new Set(JSON.parse(localStorage.getItem('py_completedLessons') || '[]'));

// DOM Elements
const codeEditor = document.getElementById('code-editor');
const lineNumbers = document.getElementById('line-numbers');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');
const checkBtn = document.getElementById('check-btn');
const hintBtn = document.getElementById('hint-btn');
const resultsContent = document.getElementById('results-content');
const feedbackContainer = document.getElementById('feedback-container');
const tutorialContent = document.getElementById('tutorial-content');
const lessonTitle = document.getElementById('lesson-title');
const lessonDesc = document.getElementById('lesson-desc');
const lessonCategory = document.getElementById('lesson-category');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize
async function init() {
  try {
    // Load Pyodide
    pyodide = await loadPyodide();

    // Load Packages
    await pyodide.loadPackage("pandas");
    await pyodide.loadPackage("numpy");

    // Set up output capture - this is critical for validation
    await pyodide.runPythonAsync(`
import sys
import io

# Create a custom stdout capture
class OutputCapture:
    def __init__(self):
        self.buffer = ""
    def write(self, text):
        self.buffer += text
        sys.__stdout__.write(text)
    def flush(self):
        pass
    def get_and_clear(self):
        result = self.buffer
        self.buffer = ""
        return result

_output_capture = OutputCapture()
sys.stdout = _output_capture
output_buffer = ""
`);

    // Hide loading
    loadingOverlay.style.opacity = '0';
    setTimeout(() => loadingOverlay.style.display = 'none', 500);

    renderLessonList();
    updateProgress();
    attachEventListeners();

    // Load first lesson
    if (curriculum.length > 0) {
      loadLesson(curriculum[0]);
    }

  } catch (error) {
    console.error('Failed to init Pyodide:', error);
    loadingOverlay.style.display = 'none';
    resultsContent.innerHTML = `<div class="console-output console-error">Failed to load Python environment: ${error.message}</div>`;
  }
}

// Render Sidebar
function renderLessonList() {
  const sections = {
    '1. Python Basics': document.getElementById('basics-list'),
    '2. NumPy Fundamentals': document.getElementById('numpy-list'),
    '3. Pandas Core': document.getElementById('pandas-core-list'),
    '4. Data Cleaning': document.getElementById('cleaning-list'),
    '5. Aggregation': document.getElementById('grouping-list'),
    '6. Merging': document.getElementById('merging-list'),
    '7. Time Series': document.getElementById('timeseries-list'),
    '8. Advanced Engineering': document.getElementById('advanced-list')
  };

  curriculum.forEach((lesson, index) => {
    const li = document.createElement('li');
    li.className = 'lesson-item';
    li.dataset.lessonId = lesson.id;
    if (completedLessons.has(lesson.id)) li.classList.add('completed');

    li.innerHTML = `
      <div class="lesson-status ${completedLessons.has(lesson.id) ? 'completed' : 'pending'}">${completedLessons.has(lesson.id) ? '✓' : index + 1}</div>
      <span class="lesson-title">${lesson.title}</span>
    `;

    li.addEventListener('click', () => loadLesson(lesson));

    // Fuzzy match category for robustness
    let targetList = null;
    for (const key in sections) {
      if (lesson.category.includes(key) || key.includes(lesson.category)) {
        targetList = sections[key];
        break;
      }
    }

    if (targetList) targetList.appendChild(li);
    else if (sections['8. Advanced Engineering']) sections['8. Advanced Engineering'].appendChild(li); // Fallback
  });
}

function loadLesson(lesson) {
  currentLesson = lesson;
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.lessonId === lesson.id) item.classList.add('active');
  });

  lessonCategory.textContent = lesson.category;
  lessonTitle.textContent = lesson.title;
  lessonDesc.textContent = lesson.description;
  tutorialContent.innerHTML = lesson.content;

  checkBtn.style.display = 'inline-flex';
  hintBtn.style.display = 'inline-block';

  // Set code
  codeEditor.value = lesson.startCode || '';
  updateLineNumbers();
  clearResults();
  clearFeedback();
}

function addToConsole(msg, type = '') {
  const div = document.createElement('div');
  div.className = `console-output ${type}`;
  div.textContent = msg;
  resultsContent.appendChild(div);
  resultsContent.scrollTop = resultsContent.scrollHeight;
}

function clearResults() {
  resultsContent.innerHTML = '';
}

function clearFeedback() {
  feedbackContainer.innerHTML = '';
}

function updateLineNumbers() {
  const lines = codeEditor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function attachEventListeners() {
  // Sidebar collapsers
  document.querySelectorAll('.sidebar-title').forEach(function (title) {
    title.addEventListener('click', function (e) {
      e.currentTarget.parentElement.classList.toggle('collapsed');
    });
  });

  codeEditor.addEventListener('input', updateLineNumbers);

  // Tab support
  codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
    }
  });

  runBtn.addEventListener('click', async () => {
    clearResults();
    clearFeedback();
    const code = codeEditor.value;
    try {
      // Clear output buffer before running
      await pyodide.runPythonAsync('_output_capture.buffer = ""');
      // Run user code
      await pyodide.runPythonAsync(code);
      // Get output and display it
      const output = pyodide.runPython('_output_capture.buffer');
      if (output && output.trim()) {
        addToConsole(output, 'console-success');
      } else {
        addToConsole('Code executed successfully (no output)', '');
      }
    } catch (err) {
      addToConsole(String(err), 'console-error');
    }
  });

  resetBtn.addEventListener('click', () => {
    codeEditor.value = currentLesson.startCode;
    updateLineNumbers();
    clearResults();
  });

  checkBtn.addEventListener('click', async () => {
    if (!currentLesson) return;
    clearFeedback();
    clearResults();
    const code = codeEditor.value;

    try {
      // 1. Reset state: Clear output capture and output_buffer
      await pyodide.runPythonAsync(`
_output_capture.buffer = ""
output_buffer = ""
      `);

      // 2. Run user code (this might fail if code has syntax errors)
      await pyodide.runPythonAsync(code);

      // 3. Capture output
      const output = pyodide.runPython('_output_capture.buffer');
      if (output && output.trim()) {
        addToConsole(output, 'console-success');
      }

      // Store into output_buffer for validation checks (e.g. print "Hello")
      // We use repr() to ensure safe string passing
      await pyodide.runPythonAsync(`output_buffer = _output_capture.buffer`);

      // 4. Validate
      const pyHelper = {
        run: (expr) => {
          try {
            // Force boolean result
            return pyodide.runPython(`bool(${expr})`);
          } catch (e) {
            console.warn('Validation condition failed:', expr, e);
            return false;
          }
        }
      };

      // Wrap validation in try-catch to avoid app crash on lesson definition error
      let isCorrect = false;
      try {
        isCorrect = currentLesson.validate(pyHelper);
      } catch (e) {
        console.error("Lesson validation function error:", e);
      }

      if (isCorrect) {
        showSuccess();
        markLessonComplete(currentLesson.id);
      } else {
        showIncorrect();
      }

    } catch (err) {
      // User code error
      addToConsole(String(err), 'console-error');
      showIncorrect();
    }
  });

  hintBtn.addEventListener('click', () => {
    feedbackContainer.innerHTML = `<div class="feedback feedback-hint"><div class="feedback-message">Hint: ${currentLesson.hint}</div></div>`;
  });

  // Reset Progress Button
  const resetProgressBtn = document.getElementById('reset-progress-btn');
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('py_completedLessons');
        completedLessons.clear();

        // Remove ticks from DOM
        document.querySelectorAll('.lesson-status').forEach(el => {
          el.classList.remove('completed');
          el.classList.add('pending');
          // Restore number if it has textContent that was changed to a tick, 
          // although our render function handles this on redraw. 
          // Simplest is to re-render lesson list.
        });

        // Improve: Re-render the whole list to restore numbers
        const listContainers = document.querySelectorAll('.lesson-list');
        listContainers.forEach(ul => ul.innerHTML = ''); // clear lists
        renderLessonList(); // re-populate

        // Load first lesson
        if (curriculum.length > 0) {
          loadLesson(curriculum[0]);
        }
      }
    });
  }
}

function markLessonComplete(id) {
  if (!completedLessons.has(id)) {
    completedLessons.add(id);
    localStorage.setItem('py_completedLessons', JSON.stringify([...completedLessons]));
    const li = document.querySelector(`[data-lesson-id="${id}"]`);
    if (li) { li.classList.add('completed'); li.querySelector('.lesson-status').textContent = '✓'; li.querySelector('.lesson-status').classList.add('completed'); }
    updateProgress();
    showConfetti();
  }
}

function updateProgress() {
  const complete = completedLessons.size;
  const total = curriculum.length;
  progressFill.style.width = `${(complete / total) * 100}%`;
  progressText.textContent = `${complete} / ${total} levels`;
}

function showSuccess() {
  feedbackContainer.innerHTML = `<div class="feedback feedback-success"><div class="feedback-title">Correct! 🎉</div><div class="feedback-message">Great job! Proceed to the next level.</div></div>`;
}

function showIncorrect() {
  feedbackContainer.innerHTML = `<div class="feedback feedback-error"><div class="feedback-title">Incorrect</div><div class="feedback-message">Output didn't match requirements. Check your code.</div></div>`;
}

function showConfetti() {
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = ['#f7d794', '#778beb', '#e77f67'][Math.floor(Math.random() * 3)]; // Python colors
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

document.addEventListener('DOMContentLoaded', init);