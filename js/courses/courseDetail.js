/**
 * js/courses/courseDetail.js
 * Dynamically binds course data to course-details.html based on URL ?id= parameter.
 * Injects interactive syllabus accordion and countdown widget.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const CourseDetail = {
    async init() {
      // Check if we are on course-details page
      const hero = document.querySelector('.course-hero');
      if (!hero) return;

      const courseId = app.Helpers ? app.Helpers.getQueryParam('id') : null;
      let course = null;

      if (courseId && app.ApiBridge) {
        course = await app.ApiBridge.getCourseById(courseId);
      }

      // If no ID or not found, fallback to flagship "Applied Data Analysis"
      if (!course && app.CoursesData) {
        course =
          app.CoursesData.find((c) => c.id === 'applied-data-analysis') || app.CoursesData[0];
      }

      if (course) {
        this.renderCourse(course);
      }
    },

    renderCourse(course) {
      const format = (amt) => (app.Helpers ? app.Helpers.formatCurrency(amt) : '₹' + amt);

      // 1. Update Document Title
      document.title = `${course.title} — Ciranta`;

      // 2. Update Tag & Hero Info
      const tagEl = document.querySelector('.course-hero .tag');
      if (tagEl) {
        tagEl.innerHTML = `<i></i>${course.categoryLabel || 'Cohort Track'}`;
      }

      const h1El = document.querySelector('.course-hero h1');
      if (h1El) {
        h1El.textContent = course.title;
      }

      const leadEl = document.querySelector('.course-hero p.lead');
      if (leadEl) {
        leadEl.textContent = course.fullDescription || course.shortDescription;
      }

      // 3. Update Meta Strip
      const metaStrip = document.querySelector('.meta-strip');
      if (metaStrip) {
        metaStrip.innerHTML = `
          <div><span>Duration</span><strong>${course.duration}</strong></div>
          <div><span>Format</span><strong>${course.format}</strong></div>
          <div><span>Level</span><strong>${course.level}</strong></div>
          <div><span>Instructor</span><strong>${course.instructor ? course.instructor.name : 'Mentor'}</strong></div>
        `;
      }

      // 4. Update Enroll Card
      const priceEl = document.querySelector('.enroll-card .price');
      if (priceEl) {
        priceEl.innerHTML = `${format(course.price)} <span style="font-size:0.85rem;color:var(--muted);font-weight:400;">(${course.duration})</span>`;
      }

      const noteEl = document.querySelector('.enroll-card .note');
      if (noteEl) {
        noteEl.textContent = `Next cohort ${course.nextCohort.toLowerCase()}. Only 18 seats per cohort.`;
      }

      // Inject Countdown Widget into Enroll Card
      const existingCountdown = document.querySelector('.countdown-timer-box');
      if (!existingCountdown) {
        const countdownBox = document.createElement('div');
        countdownBox.className = 'countdown-timer-box';
        const days = course.cohortDaysRemaining || 7;
        countdownBox.innerHTML = `
          <div class="countdown-title">Cohort Closes In</div>
          <div class="countdown-digits">
            <div class="digit-col"><div class="digit-val" id="timer-days">${days}</div><div class="digit-label">Days</div></div>
            <div class="digit-col"><div class="digit-val" id="timer-hours">14</div><div class="digit-label">Hours</div></div>
            <div class="digit-col"><div class="digit-val" id="timer-mins">36</div><div class="digit-label">Mins</div></div>
            <div class="digit-col"><div class="digit-val" id="timer-secs">45</div><div class="digit-label">Secs</div></div>
          </div>
        `;
        const enrollCard = document.querySelector('.enroll-card');
        const enrollBtn = enrollCard ? enrollCard.querySelector('.btn') : null;
        if (enrollBtn) {
          enrollCard.insertBefore(countdownBox, enrollBtn);
        }
        this.startCountdownTimer();
      }

      // Enhance Enroll Button to add to cart & open drawer
      const enrollBtn = document.querySelector('.enroll-card .btn');
      if (enrollBtn) {
        enrollBtn.textContent = 'Enroll now';
        enrollBtn.removeAttribute('href');
        enrollBtn.style.cursor = 'pointer';
        enrollBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (app.CartManager) {
            app.CartManager.addItem(course);
            if (app.CartDrawer) app.CartDrawer.open();
          }
        });
      }

      // 5. Update What You'll Learn
      if (course.whatYouLearn && course.whatYouLearn.length) {
        const learnList = document.querySelector('.body-grid ul');
        if (learnList) {
          learnList.innerHTML = course.whatYouLearn.map((item) => `<li>${item}</li>`).join('');
        }
      }

      // 6. Update Mentor section
      if (course.instructor) {
        const mentorHead = Array.from(document.querySelectorAll('.body-grid h2')).find(
          (h) => h.textContent.trim().toLowerCase() === 'mentor'
        );
        if (mentorHead && mentorHead.nextElementSibling) {
          mentorHead.nextElementSibling.innerHTML = `
            <strong>${course.instructor.name}</strong> &mdash; ${course.instructor.role}
            <br><span style="margin-top:6px;display:inline-block;">${course.instructor.bio}</span>
          `;
        }
      }

      // 7. Inject Interactive Syllabus Accordion
      if (course.syllabus && course.syllabus.length && app.Accordion) {
        const bodyCol = document.querySelector('.body-grid > div:first-child');
        if (bodyCol && !bodyCol.querySelector('.syllabus-accordion')) {
          const syllabusTitle = document.createElement('h2');
          syllabusTitle.style.marginTop = '32px';
          syllabusTitle.textContent = 'Curriculum & Modules';
          bodyCol.appendChild(syllabusTitle);

          const syllabusWrapper = document.createElement('div');
          syllabusWrapper.innerHTML = app.Accordion.renderSyllabusHTML(course.syllabus);
          bodyCol.appendChild(syllabusWrapper);

          app.Accordion.init(syllabusWrapper);
        }
      }
    },

    /**
     * Live animated countdown seconds tick
     */
    startCountdownTimer() {
      let secs = 45;
      let mins = 36;
      setInterval(() => {
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
        }
        const sEl = document.getElementById('timer-secs');
        const mEl = document.getElementById('timer-mins');
        if (sEl) sEl.textContent = secs < 10 ? '0' + secs : secs;
        if (mEl) mEl.textContent = mins < 10 ? '0' + mins : mins;
      }, 1000);
    }
  };

  app.CourseDetail = CourseDetail;
})(window.Ciranta);
