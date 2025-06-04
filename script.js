function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

document.addEventListener('click', function (event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#003366';
        header.style.backdropFilter = 'none';
    }
});
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

async function sendContactForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            return { success: true, message: 'Mensagem enviada com sucesso!' };
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        return { success: false, message: 'Erro ao enviar mensagem. Tente novamente.' };
    }
}

function showLoading(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(function () {
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);