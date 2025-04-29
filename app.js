
document.addEventListener('DOMContentLoaded', function() {
    // Site name generation from predefined lists
    generateSiteName();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize countdown timers
    initCountdowns();
    
    // Initialize FAQ accordions
    initAccordions();
    
    // Initialize modals
    initModals();
    
    // Initialize Swiper sliders
    initSwipers();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize load more functionality
    initLoadMore();
});

// ============= Site Name & SEO Generation =============
function generateSiteName() {
    const adjectives = [
        "Elite", "Luxury", "Prestigious", "Exclusive", "Premium", 
        "Ultimate", "Grand", "Royal", "Imperial", "Opulent"
    ];
    
    const nouns = [
        "Casino", "Resort", "Destination", "Experience", "Retreat",
        "Haven", "Sanctuary", "Paradise", "Escape", "Getaway"
    ];
    
    // Generate random site name
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const siteName = `${adj} ${noun} - World's Best Hotel Casinos`;
    
    // Update document title
    document.title = siteName;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    // Generate a longer description with the site name
    const description = `Discover the world's most ${adj.toLowerCase()} casino resorts offering exquisite gaming experiences, lavish accommodations, and unrivaled entertainment. Our curated selection features the finest destinations for discerning travelers seeking extraordinary casino vacations.`;
    
    // Generate keywords
    const keywords = `${adj.toLowerCase()} casinos, ${noun.toLowerCase()} resorts, best casino hotels, high-end gaming, luxury accommodation, VIP casino experience, 5-star casino resorts, casino tourism, high roller destinations, exclusive gaming venues`;
    
    // Update header text with the new site name
    const headerLogo = document.querySelector('header .font-serif');
    if (headerLogo) {
        headerLogo.innerHTML = `<span class="text-casino-gold">${adj}</span> ${noun}`;
    }
    
    // Update meta content
    if (metaDescription) metaDescription.setAttribute('content', description);
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    if (ogTitle) ogTitle.setAttribute('content', siteName);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterTitle) twitterTitle.setAttribute('content', siteName);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    // Update dynamic headline with new name (optional)
    const dynamicHeadline = document.getElementById('dynamic-headline');
    if (dynamicHeadline) {
        const headlines = [
            `Experience the World's Most <span class="text-casino-gold">Prestigious Casinos</span>`,
            `Discover <span class="text-casino-gold">${adj}</span> Gaming Destinations Worldwide`,
            `The Ultimate Guide to <span class="text-casino-gold">${noun}</span> Excellence`
        ];
        dynamicHeadline.innerHTML = headlines[Math.floor(Math.random() * headlines.length)];
    }
}

// ============= Mobile Menu Toggle =============
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between hamburger and close
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ============= Smooth Scrolling =============
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Shrink header on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('py-2');
                header.classList.remove('py-4');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-2');
            }
        });
    }
}

// ============= Countdown Timers =============
function initCountdowns() {
    // Main countdown timer (summer VIP season)
    const summerVipDate = new Date('2025-06-15T00:00:00');
    
    // Update main countdown every second
    setInterval(function() {
        updateCountdown(summerVipDate, 'days', 'hours', 'minutes', 'seconds');
    }, 1000);
    
    // Event countdowns
    const eventCountdowns = document.querySelectorAll('.event-countdown');
    eventCountdowns.forEach(countdown => {
        const eventDate = new Date(countdown.getAttribute('data-date'));
        const daysElement = countdown.querySelector('.countdown-days');
        const hoursElement = countdown.querySelector('.countdown-hours');
        const minutesElement = countdown.querySelector('.countdown-minutes');
        
        // Initial update
        updateEventCountdown(eventDate, daysElement, hoursElement, minutesElement);
        
        // Update every minute (less resource intensive for multiple countdowns)
        setInterval(function() {
            updateEventCountdown(eventDate, daysElement, hoursElement, minutesElement);
        }, 60000);
    });
}

function updateCountdown(targetDate, daysElementId, hoursElementId, minutesElementId, secondsElementId) {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        document.getElementById(daysElementId).innerText = '00';
        document.getElementById(hoursElementId).innerText = '00';
        document.getElementById(minutesElementId).innerText = '00';
        document.getElementById(secondsElementId).innerText = '00';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById(daysElementId).innerText = days.toString().padStart(2, '0');
    document.getElementById(hoursElementId).innerText = hours.toString().padStart(2, '0');
    document.getElementById(minutesElementId).innerText = minutes.toString().padStart(2, '0');
    document.getElementById(secondsElementId).innerText = seconds.toString().padStart(2, '0');
}

function updateEventCountdown(targetDate, daysElement, hoursElement, minutesElement) {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        daysElement.innerText = '00';
        hoursElement.innerText = '00';
        minutesElement.innerText = '00';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    daysElement.innerText = days.toString().padStart(2, '0');
    hoursElement.innerText = hours.toString().padStart(2, '0');
    minutesElement.innerText = minutes.toString().padStart(2, '0');
}

// ============= FAQ Accordions =============
function initAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle current question
            this.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
            
            // Optional: Close other open questions
            if (!isExpanded) {
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherQuestion.nextElementSibling.classList.remove('active');
                    }
                });
            }
        });
    });
}

// ============= Modal Windows =============
function initModals() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.querySelector('.modal-content');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Casino detail buttons
    const casinoDetailButtons = document.querySelectorAll('.casino-detail-btn');
    casinoDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const casinoId = this.getAttribute('data-casino');
            showCasinoModal(casinoId);
        });
    });
    
    // Event detail buttons
    const eventDetailButtons = document.querySelectorAll('.event-details-btn');
    eventDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            showEventModal(eventId);
        });
    });
    
    // Close modal when clicking on backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Handle escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('flex')) {
            closeModal();
        }
    });
    
    // VIP form submission
    const vipForm = document.getElementById('vip-form');
    if (vipForm) {
        vipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('vip-submit');
            const spinner = submitBtn.querySelector('.spinner');
            
            // Show spinner
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                spinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Show success modal
                showSuccessModal('vip-success');
                
                // Reset form
                vipForm.reset();
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('newsletter-submit');
            const spinner = submitBtn.querySelector('.spinner');
            
            // Show spinner
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                spinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Show toast notification
                showToast('Thank you for subscribing to our newsletter!');
                
                // Reset form
                newsletterForm.reset();
            }, 1000);
        });
    }
}

function showCasinoModal(casinoId) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.querySelector('.modal-content');
    
    // Casino data (could be fetched from API in a real implementation)
    const casinoData = {
        'marina-bay-sands': {
            name: 'Marina Bay Sands',
            location: 'Singapore',
            description: 'An iconic integrated resort featuring the world's largest rooftop infinity pool, luxury shopping, fine dining, and a world-class casino. The 15,000 square meter casino houses over 600 table games and 1,500 slot machines across four levels.',
            features: [
                'Exclusive Paiza Club for premium players',
                '600+ table games including baccarat and poker',
                '1,500+ slot machines and electronic games',
                'Private gaming salons with butler service',
                '24/7 gaming with minimum bets from $25 to $100,000+'
            ],
            image: 'https://images.unsplash.com/photo-1538970432553-acf6f2a106f8?q=80&w=1169&auto=format&fit=crop'
        },
        'bellagio-las-vegas': {
            name: 'Bellagio Las Vegas',
            location: 'Las Vegas, USA',
            description: 'An elegant resort known for its iconic dancing fountains, fine art gallery, and sophisticated casino. The 156,000 square foot gaming space includes the legendary Bobby's Room, a high-limit poker enclave where the world's top players compete.',
            features: [
                'High-limit Baccarat Salon and Club Privé',
                '2,300+ slot machines with stakes from $0.01 to $1,000',
                'World-famous poker room with 40 tables',
                'Bobby\'s Room for ultra-high-stakes poker games',
                'Sports and race betting at the BetMGM Sportsbook'
            ],
            image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=1312&auto=format&fit=crop'
        },
        'venetian-macao': {
            name: 'The Venetian Macao',
            location: 'Macau, China',
            description: 'One of the largest casinos in the world, The Venetian Macao spans an impressive 550,000 square feet of gaming space. The Venice-themed luxury resort features gondola rides, replica landmarks, and extraordinary shopping alongside its massive casino.',
            features: [
                'Over 3,400 slot machines and 800+ gaming tables',
                'Exclusive Paiza Club for VIP players',
                'Minimum bets ranging from HK$300 to HK$10,000+',
                'Four uniquely themed gaming areas',
                'High-limit private gaming rooms with personal hosts'
            ],
            image: 'https://images.unsplash.com/photo-1518261458575-7975f7885f03?q=80&w=1291&auto=format&fit=crop'
        },
        'sun-city': {
            name: 'Sun City Resort',
            location: 'Rustenburg, South Africa',
            description: 'An African paradise featuring luxury accommodations, the Valley of Waves waterpark, and a world-class casino. Set against the backdrop of the Pilanesberg mountains, the resort offers a unique blend of safari experiences and gaming entertainment.',
            features: [
                'Over 850 slot machines and 40 gaming tables',
                'African-themed high-limit gaming areas',
                'Exclusive Salon Privé for VIP guests',
                'Table games include blackjack, roulette, and punto banco',
                'Regular slot tournaments with substantial prizes'
            ],
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop'
        },
        'crown-melbourne': {
            name: 'Crown Melbourne',
            location: 'Melbourne, Australia',
            description: 'Australia\'s premier integrated resort features luxurious accommodations, award-winning dining, and the largest casino in the Southern Hemisphere. Located along the vibrant Southbank, Crown Melbourne offers round-the-clock entertainment and gaming.',
            features: [
                'Over 2,500 gaming machines and 540 table games',
                'Exclusive VIP "Black" and "Mahogany" gaming rooms',
                'Huge variety of games including baccarat, blackjack and roulette',
                'Australia\'s richest poker tournaments',
                'Minimum bets from AUD$5 to AUD$100,000+'
            ],
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop'
        },
        'caesars-palace': {
            name: 'Caesars Palace',
            location: 'Las Vegas, USA',
            description: 'An iconic Roman-themed resort on the Las Vegas Strip featuring opulent accommodations, celebrity chef restaurants, and a legendary casino. For over 50 years, Caesars Palace has defined luxury gaming with its elegant surroundings and world-class service.',
            features: [
                'Over 1,500 slot machines and 185 table games',
                'Exclusive Laurel Lounge for premium players',
                'Famous 4,500 sq ft poker room',
                'Race and sports book with 65-foot LED screens',
                'High-limit gaming areas with private atmosphere'
            ],
            image: 'https://images.unsplash.com/photo-1593988247737-45a1749a60db?q=80&w=1314&auto=format&fit=crop'
        }
    };
    
    const casino = casinoData[casinoId];
    if (!casino) return;
    
    // Create modal content
    let modalHtml = `
        <button class="modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="h-64 md:h-auto md:max-h-[600px] overflow-hidden">
                <img src="${casino.image}" alt="${casino.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 md:p-8 overflow-y-auto max-h-[600px]">
                <div class="mb-1 flex items-center">
                    <i class="fas fa-map-marker-alt text-casino-gold mr-2"></i>
                    <span class="text-gray-600">${casino.location}</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold mb-4">${casino.name}</h3>
                <p class="text-gray-700 mb-6">${casino.description}</p>
                <h4 class="text-xl font-semibold mb-3">Casino Features</h4>
                <ul class="space-y-2 mb-6">
                    ${casino.features.map(feature => `
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-casino-gold mt-1 mr-2"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <a href="#vip" class="btn-gold" onclick="closeModal()">Join VIP Program</a>
                    <button class="btn-outline modal-close">Close</button>
                </div>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = modalHtml;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex');
    
    // Set up close button functionality
    const closeButtons = modalContent.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
}

function showEventModal(eventId) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.querySelector('.modal-content');
    
    // Event data (could be fetched from API in a real implementation)
    const eventData = {
        'poker-championship': {
            name: 'World Elite Poker Championship',
            date: 'July 18-25, 2025',
            location: 'Bellagio Las Vegas',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop',
            description: 'The most prestigious poker tournament of the year, featuring elite players from around the globe competing for a guaranteed prize pool of $10 million. The Main Event will be televised worldwide with comprehensive coverage across major sports networks.',
            details: [
                'Main Event buy-in: $250,000',
                'Satellite qualifiers available starting at $10,000',
                'Limited to 200 participants',
                'Multiple poker variants including No Limit Hold\'em, Pot Limit Omaha, and Mixed Games',
                'VIP hospitality package included for all participants'
            ]
        },
        'jazz-concert': {
            name: 'Legends of Jazz Live',
            date: 'September 5, 2025',
            location: 'Marina Bay Sands',
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1470&auto=format&fit=crop',
            description: 'An unforgettable evening of world-class jazz featuring Grammy-winning legends performing in the intimate setting of the Sands Theater. The event begins with a premium champagne reception and includes VIP after-party access.',
            details: [
                'Featuring performances by jazz legends and contemporary masters',
                'Premium seating with champagne service',
                'Pre-show gourmet dining experience',
                'Exclusive after-party with the artists',
                'Limited VIP packages available including accommodation'
            ]
        },
        'michelin-gala': {
            name: 'Michelin Masters Gala',
            date: 'October 12-14, 2025',
            location: 'The Venetian Macao',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1470&auto=format&fit=crop',
            description: 'A three-day culinary celebration featuring 12 Michelin-starred chefs from around the world. Each evening showcases extraordinary tasting menus paired with rare vintage wines and spirits, curated by master sommeliers.',
            details: [
                'Collaborative dinners with multiple Michelin-starred chefs',
                'Wine pairings featuring rare vintages and limited releases',
                'Masterclasses and cooking demonstrations',
                'Gala dinner with all 12 chefs creating signature dishes',
                'Take-home gift featuring premium ingredients and signed cookbook'
            ]
        },
        'nye-gala': {
            name: 'New Year\'s Eve Extravaganza',
            date: 'December 31, 2025',
            location: 'Crown Melbourne',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop',
            description: 'Ring in 2026 with Melbourne\'s most opulent celebration featuring international performers, gourmet dining, premium open bars, and spectacular fireworks over the Yarra River, all from Crown\'s exclusive rooftop venue.',
            details: [
                'Five-course gala dinner by award-winning chefs',
                'Premium open bar featuring vintage champagnes',
                'Live performances by international artists and DJs',
                'Prime viewing location for midnight fireworks',
                'Luxury accommodation packages available'
            ]
        }
    };
    
    const event = eventData[eventId];
    if (!event) return;
    
    // Create modal content
    let modalHtml = `
        <button class="modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="h-64 md:h-auto md:max-h-[600px] overflow-hidden">
                <img src="${event.image}" alt="${event.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 md:p-8 overflow-y-auto max-h-[600px]">
                <div class="mb-1 flex items-center">
                    <span class="text-casino-gold font-medium">${event.date}</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold mb-2">${event.name}</h3>
                <div class="mb-4 flex items-center">
                    <i class="fas fa-map-marker-alt text-casino-gold mr-2"></i>
                    <span class="text-gray-600">${event.location}</span>
                </div>
                <p class="text-gray-700 mb-6">${event.description}</p>
                <h4 class="text-xl font-semibold mb-3">Event Details</h4>
                <ul class="space-y-2 mb-6">
                    ${event.details.map(detail => `
                        <li class="flex items-start">
                            <i class="fas fa-circle text-casino-gold text-xs mt-1.5 mr-2"></i>
                            <span>${detail}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <button class="btn-gold">Reserve Now</button>
                    <button class="btn-outline modal-close">Close</button>
                </div>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = modalHtml;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex');
    
    // Set up close button functionality
    const closeButtons = modalContent.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
}

function showSuccessModal(type) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.querySelector('.modal-content');
    
    let title = '';
    let message = '';
    
    if (type === 'vip-success') {
        title = 'Application Received';
        message = 'Thank you for your interest in our VIP program. A dedicated host will contact you within 24 hours to discuss your membership details and exclusive benefits.';
    } else {
        title = 'Success';
        message = 'Your submission has been received successfully.';
    }
    
    // Create success modal content
    let modalHtml = `
        <div class="p-8 text-center">
            <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i class="fas fa-check text-3xl text-green-500"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">${title}</h3>
            <p class="text-gray-600 mb-8">${message}</p>
            <button class="btn-primary modal-close">Close</button>
        </div>
    `;
    
    modalContent.innerHTML = modalHtml;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex');
    
    // Set up close button functionality
    const closeButton = modalContent.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('hidden');
    modalContainer.classList.remove('flex');
}

// ============= Toast Notifications =============
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastClose = document.getElementById('toast-close');
    
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-28');
    
    // Auto hide after 5 seconds
    const toastTimeout = setTimeout(function() {
        hideToast();
    }, 5000);
    
    // Close button
    toastClose.addEventListener('click', function() {
        clearTimeout(toastTimeout);
        hideToast();
    });
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('translate-y-28');
}

// ============= Swiper Sliders =============
function initSwipers() {
    // Gallery Swiper
    new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        lazy: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.gallery-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    
    // Events Swiper
    new Swiper('.events-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.events-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.events-swiper .swiper-button-next',
            prevEl: '.events-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1280: {
                slidesPerView: 3,
            },
        },
    });
    
    // Testimonial Swiper
    new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1280: {
                slidesPerView: 3,
            },
        },
    });
    
    // Room Swiper
    new Swiper('.room-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.room-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.room-swiper .swiper-button-next',
            prevEl: '.room-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
}

// ============= Form Validation =============
function initFormValidation() {
    const vipForm = document.getElementById('vip-form');
    
    if (vipForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const countrySelect = document.getElementById('country');
        const casinoSelect = document.getElementById('favorite-casino');
        
        vipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name (at least 3 characters)
            if (!nameInput.value || nameInput.value.trim().length < 3) {
                showError(nameInput, 'Please enter your full name (at least 3 characters)');
                isValid = false;
            } else {
                hideError(nameInput);
            }
            
            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value || !emailPattern.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(emailInput);
            }
            
            // Validate country selection
            if (!countrySelect.value) {
                showError(countrySelect, 'Please select your country');
                isValid = false;
            } else {
                hideError(countrySelect);
            }
            
            // Validate casino selection
            if (!casinoSelect.value) {
                showError(casinoSelect, 'Please select your preferred casino resort');
                isValid = false;
            } else {
                hideError(casinoSelect);
            }
            
            // If form is valid, proceed with submission
            if (isValid) {
                const submitBtn = document.getElementById('vip-submit');
                const spinner = submitBtn.querySelector('.spinner');
                
                // Show spinner
                spinner.classList.remove('hidden');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(function() {
                    spinner.classList.add('hidden');
                    submitBtn.disabled = false;
                    
                    // Show success modal
                    showSuccessModal('vip-success');
                    
                    // Reset form
                    vipForm.reset();
                }, 1500);
            }
        });
        
        // Real-time validation for better UX
        nameInput.addEventListener('blur', function() {
            if (!this.value || this.value.trim().length < 3) {
                showError(this, 'Please enter your full name (at least 3 characters)');
            } else {
                hideError(this);
            }
        });
        
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.value || !emailPattern.test(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                hideError(this);
            }
        });
    }
}

function showError(inputElement, message) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500');
    }
}

function hideError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.classList.add('hidden');
        inputElement.classList.remove('border-red-500');
    }
}

// ============= Load More Functionality =============
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const spinner = loadMoreBtn.querySelector('.spinner');
            const btnText = loadMoreBtn.querySelector('span');
            
            // Show spinner
            spinner.classList.remove('hidden');
            btnText.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
            
            // Simulate loading more casinos
            setTimeout(function() {
                spinner.classList.add('hidden');
                btnText.textContent = 'No More Casinos Available';
                loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
                loadMoreBtn.disabled = true;
            }, 1500);
        });
    }
}
