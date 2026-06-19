document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scrolled Background Toggle
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // 3. Scroll Triggered Animations using Intersection Observer
    const scrollElements = document.querySelectorAll('.scroll-trigger');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Trigger once on load
    setTimeout(handleScrollAnimation, 150);

    // 4. Custom Interactive Calculator
    const daysInput = document.getElementById('days-input');
    const carSelect = document.getElementById('car-select');
    const calcTotal = document.getElementById('calc-total');

    function calculateTotal() {
        const days = parseInt(daysInput.value) || 0;
        const carType = carSelect.value;
        
        let ratePerDay = 500; // default standard sedan
        if (carType === 'suv') {
            ratePerDay = 750;
        }

        // Base calculations: standard fee per day + one time safety fee
        const baseCost = days * ratePerDay;
        const safetyFee = 500;
        const total = baseCost > 0 ? baseCost + safetyFee : 0;

        calcTotal.textContent = `৳${total.toLocaleString()}`;
    }

    daysInput.addEventListener('input', calculateTotal);
    carSelect.addEventListener('change', calculateTotal);
    calculateTotal(); // Run once initially

    // 5. Enroll Button Selector (binds package name to contact form selection)
    const selectButtons = document.querySelectorAll('.enroll-btn-select');
    const courseSelectForm = document.getElementById('course-select-form');

    selectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseName = btn.getAttribute('data-course');
            if (courseName && courseSelectForm) {
                courseSelectForm.value = courseName;
            }
        });
    });

    // 6. Form Submission Handling
    const enrollForm = document.getElementById('enroll-form');
    const formFeedback = document.getElementById('form-feedback');

    enrollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('full-name').value;
        const phone = document.getElementById('phone-number').value;
        const course = courseSelectForm.value;
        const submitBtn = enrollForm.querySelector('.submit-btn');

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Enrollment...';

        // Simulating API call/submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Enrollment';

            // Show success message
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<strong>Success!</strong> Thank you, ${name}. We've received your request for the <strong>${course}</strong>. Our representative will contact you at <strong>${phone}</strong> shortly.`;
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset form
            enrollForm.reset();
        }, 1500);
    });
});
