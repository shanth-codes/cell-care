/**
 * CELL CARE - Professional Apple Studio Script
 * Controls Mobile Menu, FAQ Accordion, Real-Time Lab Status, WhatsApp Direct Inquiry, and Cookie Consent
 */

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Favicon Cache Refresh
    refreshFavicon();

    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Mobile Menu
    initMobileMenu();

    // 3. FAQ Accordion
    initFAQs();

    // 4. Real-Time Store Status Badge
    updateStoreStatusBadge();

    // 5. Cookie Consent
    initCookieConsent();
});

// Mobile Menu Handler
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

// FAQ Accordion Handler
function initFAQs() {
    const items = document.querySelectorAll('.faq-accordion-item, .editorial-faq-item');

    items.forEach(item => {
        const btn = item.querySelector('button');
        const content = item.querySelector('.faq-content, .editorial-faq-content');

        if (btn && content) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                items.forEach(other => {
                    other.classList.remove('active');
                    const otherContent = other.querySelector('.faq-content, .editorial-faq-content');
                    if (otherContent) otherContent.classList.add('hidden');
                    const otherIcon = other.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                });

                // Toggle selected item
                if (!isActive) {
                    item.classList.add('active');
                    content.classList.remove('hidden');
                    const icon = item.querySelector('.faq-icon');
                    if (icon) icon.style.transform = 'rotate(45deg)';
                }
            });
        }
    });
}

// Real-Time Store Working Hours Status Badge
function updateStoreStatusBadge() {
    const badge = document.getElementById('store-status-badge');
    if (!badge) return;

    const now = new Date();
    // Use Indian Standard Time
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));

    const day = ist.getDay(); // 0 = Sun, 1 = Mon, ... 5 = Fri, 6 = Sat
    const hours = ist.getHours();
    const minutes = ist.getMinutes();
    const timeInMins = hours * 60 + minutes;

    let isOpen = false;
    let statusText = 'Closed';

    if (day === 0) {
        // Sunday: Holiday
        statusText = 'Sunday: Holiday';
    } else if (day === 5) {
        // Friday: 9:30 AM - 12:00 PM (570 - 720) & 4:30 PM - 8:30 PM (990 - 1230)
        if (timeInMins >= 570 && timeInMins < 720) {
            isOpen = true;
            statusText = 'Open Now (Closes 12:00 PM)';
        } else if (timeInMins >= 720 && timeInMins < 990) {
            statusText = 'Mid-day Break (Reopens 4:30 PM)';
        } else if (timeInMins >= 990 && timeInMins < 1230) {
            isOpen = true;
            statusText = 'Open Now (Closes 8:30 PM)';
        } else {
            statusText = 'Closed for Today (Reopens Fri 9:30 AM)';
        }
    } else {
        // Mon-Thu & Sat: 9:30 AM - 1:00 PM (570 - 780) & 4:30 PM - 8:30 PM (990 - 1230)
        if (timeInMins >= 570 && timeInMins < 780) {
            isOpen = true;
            statusText = 'Open Now (Closes 1:00 PM)';
        } else if (timeInMins >= 780 && timeInMins < 990) {
            statusText = 'Afternoon Break (Reopens 4:30 PM)';
        } else if (timeInMins >= 990 && timeInMins < 1230) {
            isOpen = true;
            statusText = 'Open Now (Closes 8:30 PM)';
        } else {
            statusText = 'Closed for Today (Reopens Tomorrow 9:30 AM)';
        }
    }

    if (isOpen) {
        badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ${statusText}`;
    } else {
        badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200';
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-gray-400"></span> ${statusText}`;
    }

    // Highlight current day row in schedule
    const todayRow = document.getElementById(`day-row-${day}`);
    if (todayRow) {
        todayRow.classList.add('bg-[#f5f5f7]');
        const tag = todayRow.querySelector('.today-tag');
        if (tag) tag.classList.remove('hidden');
    }
}

// Form Handler with Consent Validation & WhatsApp Redirection
function handleInquirySubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const deviceInput = document.getElementById('device-model');
    const serviceInput = document.getElementById('service-type');
    const issueInput = document.getElementById('issue-desc');
    const consentInput = document.getElementById('legal-consent') || document.getElementById('form-consent');

    if (!consentInput || !consentInput.checked) {
        alert('Please tick the consent checkbox to agree with the privacy policy before sending your inquiry.');
        return;
    }

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const device = deviceInput ? deviceInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value.trim() : '';
    const issue = issueInput ? issueInput.value.trim() : '';

    if (!name || !phone || !device) {
        alert('Please fill out your name, phone number, and device model.');
        return;
    }

    // Format WhatsApp message
    const waText = encodeURIComponent(
        `Hello CELL CARE Studio,\n\nI would like to consult regarding an Apple repair:\n• Name: ${name}\n• Phone: ${phone}\n• Device: ${device}\n• Service: ${service || 'General Hardware Check'}\n• Problem: ${issue || 'Diagnostic required'}\n\nPlease advise on parts availability and bench timing.`
    );

    // Direct redirection to official WhatsApp number: +91 9715253113
    window.open(`https://wa.me/919715253113?text=${waText}`, '_blank');
}
window.handleInquirySubmit = handleInquirySubmit;

// Cookie Consent
function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const accepted = localStorage.getItem('cellcare_cookie_accepted');
    if (!accepted) {
        banner.classList.remove('hidden');
    }
}

function acceptCookies() {
    const banner = document.getElementById('cookie-banner');
    localStorage.setItem('cellcare_cookie_accepted', 'true');
    if (banner) {
        banner.classList.add('hidden');
    }
}
window.acceptCookies = acceptCookies;

// Force live favicon cache bust on DOM load
function refreshFavicon() {
    const icons = document.querySelectorAll("link[rel*='icon']");
    const ts = Date.now();
    icons.forEach(icon => {
        const href = icon.getAttribute('href');
        if (href && !href.startsWith('data:')) {
            const clean = href.split('?')[0];
            icon.href = clean + '?v=' + ts;
        }
    });
}
