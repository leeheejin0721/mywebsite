document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 관련 함수들
    function setupScrollToContact() {
        document.getElementById("scrollToContact").addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        });
    }

    function setupMenuToggle() {
        document.getElementById('menuToggle').addEventListener('click', function() {
            this.classList.toggle('change');
            const menuBox = document.getElementById('menuBox');
            if (menuBox.classList.contains('active')) {
                menuBox.classList.remove('active');
                setTimeout(() => menuBox.style.display = 'none', 500);
            } else {
                menuBox.style.display = 'block';
                setTimeout(() => menuBox.classList.add('active'), 10);
            }
        });

        ['aboutMeLink', 'skillLink', 'portfolioLink', 'contactLink'].forEach(id => {
            document.getElementById(id).addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.id.replace('Link', '');
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                document.getElementById('menuBox').style.display = 'none';
                document.getElementById('menuToggle').classList.remove('open');
            });
        });
    }

    function setupCircleNavigation() {
        ['aboutme', 'portfolio', 'contact', 'skill'].forEach(id => {
            document.getElementById(`${id}-circle`).addEventListener('click', function() {
                document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // 애니메이션 관련 함수들
    function setupIntroAnimation() {
        const introSection = document.querySelector('#intro');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circles = document.querySelectorAll('.contact-circle, .portfolio-circle, .aboutme-circle, .skill-circle');
                    const gradients = document.querySelectorAll('.blue_gradient img, .gradient-red, .gradient-orange, .gradient-yellow, .intro-txt h1, #resume');
                    
                    [...circles, ...gradients].forEach(element => {
                        element.style.animation = 'none';
                        element.offsetHeight;
                        element.style.animation = '';
                    });
                }
            });
        }, options);

        observer.observe(introSection);
    }

    function setupGradientAnimations() {
        const gradientOrange = document.querySelector('.gradient_orange');
        const skillBg = document.querySelector('.skill-bg img');
        const loyalBg = document.querySelector('.loyal-bg img');
        const publicBg = document.querySelector('.public-bg img');

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'none';
                    entry.target.offsetHeight;
                    entry.target.style.animation = 'gradientFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            });
        }, options);

        [gradientOrange, skillBg, loyalBg, publicBg].forEach(element => observer.observe(element));
    }

    // About Me 섹션 관련 함수
    function setupAboutMeSection() {
        const aboutMeSection = document.getElementById("aboutme");
        const elementsToAnimate = document.querySelectorAll(".animate");
        const picElement = document.querySelector(".pic");
        const h2Element = document.querySelector(".estrellas");
        const sumElement = document.querySelector(".about-txt .sum");
        const sumParagraphs = document.querySelectorAll(".about-txt .sum p");
        const profButton = document.getElementById('prof');
        const suitButton = document.getElementById('suit');
        const suitSection = document.querySelector('.suit');

        let activeSection = 'prof';

        window.addEventListener("scroll", function() {
            const sectionPosition = aboutMeSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.5;

            if (sectionPosition < screenPosition) {
                aboutMeSection.style.backgroundPosition = "bottom 100px";
                elementsToAnimate.forEach(element => element.classList.add("active"));
                picElement.classList.add("active");
                h2Element.classList.add("active");
                
                if (activeSection === 'prof') {
                    sumElement.classList.add("active");
                    sumParagraphs.forEach((p, index) => {
                        setTimeout(() => p.classList.add("active"), index * 100);
                    });
                }
            }
        });

        profButton.addEventListener('click', function() {
            activeSection = 'prof';
            profButton.classList.add('active');
            suitButton.classList.remove('active');
            sumElement.classList.add('active');
            suitSection.classList.remove('active');
            sumParagraphs.forEach(p => p.classList.add('active'));
        });

        suitButton.addEventListener('click', function() {
            activeSection = 'suit';
            suitButton.classList.add('active');
            profButton.classList.remove('active');
            sumElement.classList.remove('active');
            suitSection.classList.add('active');
            sumParagraphs.forEach(p => p.classList.remove('active'));
        });
    }

    // 스킬 섹션 관련 함수들
    function setupSkillSection() {
        const skillSection = document.querySelector('.skills-circle');
        const skillBoxes = document.querySelectorAll('.skill-box');

        const checkVisibility = () => {
            const sectionTop = skillSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                skillBoxes.forEach(box => box.classList.add('visible'));
                document.removeEventListener('scroll', checkVisibility);
            }
        };

        document.addEventListener('scroll', checkVisibility);
        checkVisibility();

        const skillsCircle = document.querySelector('.skills-circle');
        const imgBars = document.querySelectorAll('.img-bar');

        [skillsCircle, ...skillBoxes].forEach(element => {
            element.addEventListener('mouseenter', () => {
                skillsCircle.style.animationPlayState = 'paused';
                imgBars.forEach(bar => bar.style.animationPlayState = 'paused');
            });

            element.addEventListener('mouseleave', () => {
                skillsCircle.style.animationPlayState = 'running';
                imgBars.forEach(bar => bar.style.animationPlayState = 'running');
            });
        });
    }

    function setupSkillModal() {
        const modal = document.getElementById('skill-modal');
        const modalIcon = modal.querySelector('.modal-icon');
        const modalDescription = modal.querySelector('.modal-description');
        const closeBtn = modal.querySelector('.close');
        const skillBoxes = document.querySelectorAll('.mo-skill-box div');

        const skillPercentages = {
            'html-box': 90, 'css-box': 85, 'sass-box': 85, 'javascript-box': 80,
            'jquery-box': 85, 'react-box': 80, 'git-box': 90, 'figma-box': 90,
            'ai-box': 85, 'photoshop-box': 90, 'ae-box': 75, 'pre-box': 80
        };

        skillBoxes.forEach(function(skillBox) {
            skillBox.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const description = this.querySelector('p').innerText;
                const skillClass = this.classList[1];
                const percentage = skillPercentages[skillClass];
                
                modalIcon.src = imgSrc;
                modalDescription.innerText = description;
                modal.style.display = 'block';
                
                const progressCircle = document.getElementById('progress-circle');
                const radius = progressCircle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                const offset = circumference - (percentage / 100 * circumference);

                progressCircle.style.strokeDashoffset = circumference;
                modal.style.display = 'block';
                
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 0);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.display = 'none';
            document.getElementById('progress').style.strokeDashoffset = 879;
        }
    }

    // 포트폴리오 섹션 관련 함수들
    function setupPortfolioAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('public-img1')) {
                        entry.target.classList.add('slide-in-left');
                    } else if (entry.target.classList.contains('public-img3')) {
                        entry.target.classList.add('slide-in-right');
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const targets = document.querySelectorAll('.public-img1, .public-img3');
        targets.forEach(target => observer.observe(target));

        // Festival images animation
        const festivalImages = document.querySelectorAll('.festival-img1, .festival-img2, .festival-img3, .festival-img4');

        function checkScroll() {
            festivalImages.forEach(image => {
                if (isElementInViewport(image)) {
                    image.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();

        // Museum images animation
        let alreadyAnimated = false;

        window.addEventListener('scroll', function() {
            if (alreadyAnimated) return;

            const museumImg1 = document.querySelector('.museum-img1');
            if (isElementInViewport(museumImg1)) {
                museumImg1.classList.add('active');
                alreadyAnimated = true;
            } else {
                museumImg1.classList.remove('active');
            }
        });

        const museumSection = document.querySelector('.art-museum');
        const img2 = document.querySelector('.museum-img2');
        const img3 = document.querySelector('.museum-img3');

        function animateImages() {
            if (isElementInViewport(museumSection)) {
                img2.classList.add('animate');
                img3.classList.add('animate');
            } else {
                img2.classList.remove('animate');
                img3.classList.remove('animate');
            }
        }

        window.addEventListener('scroll', animateImages);
        window.addEventListener('resize', animateImages);
        animateImages();
    }

    function setupDraggableImages() {
        const setupDraggable = (imgSelector) => {
            const img = document.querySelector(imgSelector);
            let startY = 0;
            let currentY = 0;

            const startDragging = (y) => {
                startY = y - currentY;
                img.style.cursor = 'grabbing';
            };

            const stopDragging = () => {
                img.style.cursor = 'grab';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', stopDragging);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', stopDragging);
            };

            const onMouseMove = (e) => {
                currentY = e.clientY - startY;
                updateImagePosition();
            };

            const onTouchMove = (e) => {
                currentY = e.touches[0].clientY - startY;
                updateImagePosition();
            };

            const updateImagePosition = () => {
                const containerHeight = img.parentElement.clientHeight;
                const imgHeight = img.clientHeight;
                if (currentY > 0) currentY = 0;
                if (currentY < -(imgHeight - containerHeight)) currentY = -(imgHeight - containerHeight);
                img.style.transform = `translateY(${currentY}px)`;
            };

            img.addEventListener('mousedown', (e) => {
                startDragging(e.clientY);
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', stopDragging);
            });

            img.addEventListener('touchstart', (e) => {
                startDragging(e.touches[0].clientY);
                document.addEventListener('touchmove', onTouchMove);
                document.addEventListener('touchend', stopDragging);
            });

            img.style.cursor = 'grab';
        };

        setupDraggable('.museum-img1 img');
        setupDraggable('.festival-img2 img');
    }

    // Contact 섹션 애니메이션
    function setupContactAnimation() {
        const contactSection = document.querySelector('#contact');
        const contactImg = document.querySelector('.contact-img');
        const contactTxt = document.querySelector('.contact-txt');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactImg.style.opacity = '1';
                    contactImg.style.transform = 'translateY(0)';
                    contactTxt.style.opacity = '1';
                    contactTxt.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.5
        });
        observer.observe(contactSection);
    }

    // 유틸리티 함수
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // 모든 기능 초기화
    function initializeAllFunctions() {
        setupScrollToContact();
        setupMenuToggle();
        setupCircleNavigation();
        setupIntroAnimation();
        setupGradientAnimations();
        setupAboutMeSection();
        setupSkillSection();
        setupSkillModal();
        setupPortfolioAnimations();
        setupDraggableImages();
        setupContactAnimation();
    }

    // 모든 기능 초기화 실행
    initializeAllFunctions();
})