// =============================================
// DE ROADMAP TRACKER - Main Application
// =============================================

// State
let completedCourses = new Set(JSON.parse(localStorage.getItem('de_completed') || '[]'));

// DOM Elements (initialized after DOM ready)
let roadmapContainer, overallText, overallFill, resetBtn;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Get DOM elements
    roadmapContainer = document.getElementById('roadmap-container');
    overallText = document.getElementById('overall-text');
    overallFill = document.getElementById('overall-fill');
    resetBtn = document.getElementById('reset-btn');

    if (!roadmapContainer) {
      console.error('roadmap-container not found');
      return;
    }

    if (typeof roadmapData === 'undefined') {
      console.error('roadmapData not loaded');
      roadmapContainer.innerHTML = '<p style="color: red;">Error: Roadmap data not loaded</p>';
      return;
    }

    renderRoadmap();
    updateOverallProgress();
    attachEventListeners();
  } catch (err) {
    console.error('Init error:', err);
  }
});

// Render the roadmap
function renderRoadmap() {
  roadmapContainer.innerHTML = roadmapData.map(category => `
    <div class="category-card" data-category-id="${category.id}">
      <div class="category-header">
        <div class="category-info">
          <div class="category-icon ${category.iconClass}">${category.icon}</div>
          <div>
            <div class="category-title">${category.title}</div>
            <div class="category-subtitle">${category.subtitle}</div>
          </div>
        </div>
        <div class="category-progress">
          <span class="category-progress-text" id="progress-${category.id}">0%</span>
          <svg class="category-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="course-list">
        ${category.courses.map(course => `
          <div class="course-item ${completedCourses.has(course.id) ? 'completed' : ''}" data-course-id="${course.id}">
            <div class="course-checkbox ${completedCourses.has(course.id) ? 'checked' : ''}" role="checkbox" aria-checked="${completedCourses.has(course.id)}"></div>
            <div class="course-content">
              <div class="course-title">${course.title}</div>
              <div class="course-meta">
                <span class="course-provider">${course.provider}</span>
                <span class="course-type">${course.type}</span>
                <span>${course.duration}</span>
                <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-link">Open →</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Update category progress bars
  roadmapData.forEach(cat => updateCategoryProgress(cat.id));
}

// Update category progress
function updateCategoryProgress(categoryId) {
  const category = roadmapData.find(c => c.id === categoryId);
  if (!category) return;

  const total = category.courses.length;
  const completed = category.courses.filter(c => completedCourses.has(c.id)).length;
  const percent = Math.round((completed / total) * 100);

  const progressText = document.getElementById(`progress-${categoryId}`);
  if (progressText) {
    progressText.textContent = `${percent}%`;
    progressText.style.color = percent === 100 ? 'var(--accent-green)' : 'var(--primary-light)';
  }
}

// Update overall progress
function updateOverallProgress() {
  const totalCourses = roadmapData.reduce((sum, cat) => sum + cat.courses.length, 0);
  const percent = Math.round((completedCourses.size / totalCourses) * 100);

  overallText.textContent = `${percent}% Complete (${completedCourses.size}/${totalCourses})`;
  overallFill.style.width = `${percent}%`;
}

// Toggle course completion
function toggleCourse(courseId) {
  if (completedCourses.has(courseId)) {
    completedCourses.delete(courseId);
  } else {
    completedCourses.add(courseId);
  }

  // Save to localStorage
  localStorage.setItem('de_completed', JSON.stringify([...completedCourses]));

  // Update UI
  const courseItem = document.querySelector(`[data-course-id="${courseId}"]`);
  const checkbox = courseItem.querySelector('.course-checkbox');

  if (completedCourses.has(courseId)) {
    courseItem.classList.add('completed');
    checkbox.classList.add('checked');
    checkbox.setAttribute('aria-checked', 'true');
  } else {
    courseItem.classList.remove('completed');
    checkbox.classList.remove('checked');
    checkbox.setAttribute('aria-checked', 'false');
  }

  // Find which category this course belongs to
  const category = roadmapData.find(cat => cat.courses.some(c => c.id === courseId));
  if (category) {
    updateCategoryProgress(category.id);
  }

  updateOverallProgress();
}

// Attach event listeners
function attachEventListeners() {
  // Category header toggle
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', (e) => {
      // Don't toggle if clicking on a link
      if (e.target.tagName === 'A') return;

      const card = header.closest('.category-card');
      card.classList.toggle('collapsed');
    });
  });

  // Course checkbox toggle
  document.querySelectorAll('.course-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      const courseId = checkbox.closest('.course-item').dataset.courseId;
      toggleCourse(courseId);
    });
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem('de_completed');
      completedCourses.clear();
      renderRoadmap();
      updateOverallProgress();
    }
  });
}
