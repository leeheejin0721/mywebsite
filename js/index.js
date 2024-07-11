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
                let targetId = this.id.replace('Link', '');
                if (targetId === 'aboutMe') {
                    targetId = 'aboutme';
                }
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    menuBox.classList.remove('active');
                    menuBox.style.display = 'none';
                    menuToggle.classList.remove('change');
                } else {
                    console.error(`Element with id ${targetId} not found`);
                }
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
        let scrollPosition;

        const skillPercentages = {
            'html-box': 90, 'css-box': 85, 'sass-box': 85, 'javascript-box': 80,
            'jquery-box': 85, 'react-box': 80, 'git-box': 90, 'figma-box': 90,
            'ai-box': 85, 'photoshop-box': 90, 'ae-box': 75, 'boot-box': 80
        };

        skillBoxes.forEach(function(skillBox) {
            skillBox.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const description = this.querySelector('p').innerText;
                const skillClass = this.classList[1];
                const percentage = skillPercentages[skillClass];
                
                modalIcon.src = imgSrc;
                modalDescription.innerText = description;
                scrollPosition = window.pageYOffset;
                modal.style.display = 'block';
                document.body.classList.add('no-scroll');
                document.body.style.top = `-${scrollPosition}px`;
                
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
            document.getElementById('progress-circle').style.strokeDashoffset = 283; // 원래 값으로 복구
            document.body.classList.remove('no-scroll');
            document.body.style.top = ''; // 원래 상태로 복구
        }
    }
    function setupSkillBackground() {
        const skillBg = document.querySelector('.skill-bg img');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 애니메이션을 다시 실행
                    skillBg.style.animation = 'none';
                    skillBg.offsetHeight; // 트릭: 강제로 리페인트하여 애니메이션을 재시작하게 함
                    skillBg.style.animation = 'gradientFadein 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            });
        }, options);
    
        observer.observe(skillBg);
    }
    
    function setupSkillHover() {
        document.querySelectorAll('.skill-box').forEach(skill => {
            skill.addEventListener('mouseover', function() {
                const icon = skill.getAttribute('data-icon');
                const description = skill.getAttribute('data-description');
                const progress = skill.getAttribute('data-progress');
                const progressValue = parseInt(progress, 10);
                const circumference = 754; // 반지름 120에 맞춘 둘레 길이
                const offset = circumference - (progressValue / 100) * circumference;
    
                const hoverDisplay = document.querySelector('.hover-display');
                hoverDisplay.querySelector('.hover-icon').src = icon;
                hoverDisplay.querySelector('.hover-description').innerHTML = description;
                hoverDisplay.querySelector('.hover-progress').style.width = progress;
    
                const progressRing = hoverDisplay.querySelector('.progress-ring');
                progressRing.style.strokeDashoffset = circumference;
                progressRing.style.transition = 'none';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        progressRing.style.transition = 'stroke-dashoffset 1s linear';
                        progressRing.style.strokeDashoffset = offset;
                    });
                });
    
                hoverDisplay.style.display = 'block';
            });
    
            skill.addEventListener('mouseout', function() {
                document.querySelector('.hover-display').style.display = 'none';
            });
        });
    }
    
    function setupSkillProgress() {
        var skillSection = document.querySelector('#skill');
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var progressBars = document.querySelectorAll('.progress');
                if (entry.isIntersecting) {
                    skillSection.classList.add('skill-visible');
                    progressBars.forEach(function(progressBar) {
                        progressBar.style.animation = progressBar.classList.contains('html-progress') ? 'fill-html 2s forwards' :
                        progressBar.classList.contains('css-progress') ? 'fill-css 2s forwards' :
                        progressBar.classList.contains('sass-progress') ? 'fill-sass 2s forwards' :
                        progressBar.classList.contains('javascript-progress') ? 'fill-javascript 2s forwards' :
                        progressBar.classList.contains('jquery-progress') ? 'fill-jquery 2s forwards' :
                        progressBar.classList.contains('react-progress') ? 'fill-react 2s forwards' :
                        progressBar.classList.contains('git-progress') ? 'fill-git 2s forwards' :
                        progressBar.classList.contains('figma-progress') ? 'fill-figma 2s forwards' :
                        progressBar.classList.contains('ai-progress') ? 'fill-ai 2s forwards' :
                        progressBar.classList.contains('photoshop-progress') ? 'fill-photoshop 2s forwards' :
                        progressBar.classList.contains('ae-progress') ? 'fill-ae 2s forwards' :
                        progressBar.classList.contains('boot-progress') ? 'fill-boot 2s forwards' :
                        progressBar.style.animation;
                    });
                } else {
                    skillSection.classList.remove('skill-visible');
                    progressBars.forEach(function(progressBar) {
                        progressBar.style.animation = 'none';
                    });
                }
            });
        }, {
            threshold: 0.5
        });
    
        observer.observe(skillSection);
    }

    // 포트폴리오 섹션 관련 함수들
    function setupPortfolioAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('public-img1')) {
                        entry.target.classList.add('slide-in-left');
                    } else if (entry.target.classList.contains('public-img3')) {
                        entry.target.classList.add('slide-in-right');
                    }
                    entry.target.style.opacity = '1';  // 요소를 보이게 함
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

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();

        function setupLoyalBackground() {
            const loyalBg = document.querySelector('.loyal-bg img');
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 애니메이션을 다시 실행
                        loyalBg.style.animation = 'none';
                        loyalBg.offsetHeight; // 트릭: 강제로 리페인트하여 애니메이션을 재시작하게 함
                        loyalBg.style.animation = 'gradientFadein 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                    }
                });
            }, options);

            observer.observe(loyalBg);
        }

        // public 이미지 스크롤
        const publicImgBox = document.querySelector('.public-img-box');
        const publicImg2 = publicImgBox.querySelector('.public-img2');
        
        publicImgBox.addEventListener('mouseover', function(event) {
            if (event.target.closest('.public-img1') || event.target.closest('.public-img3')) {
                publicImg2.classList.add('darkened');
            }
        });
        
        publicImgBox.addEventListener('mouseout', function(event) {
            if (event.target.closest('.public-img1') || event.target.closest('.public-img3')) {
                publicImg2.classList.remove('darkened');
            }
        });
        
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
            let isDragging = false;
    
            const startDragging = (y) => {
                isDragging = true;
                startY = y - currentY;
                img.style.cursor = 'grabbing';
            };
    
            const stopDragging = () => {
                isDragging = false;
                img.style.cursor = 'grab';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', stopDragging);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', stopDragging);
            };
    
            const onMouseMove = (e) => {
                if (!isDragging) return;
                currentY = e.clientY - startY;
                updateImagePosition();
            };
    
            const onTouchMove = (e) => {
                if (!isDragging) return;
                e.preventDefault(); // 화면 스크롤 방지
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
                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', stopDragging);
            });
    
            // 전체 문서에 대한 터치 이벤트 처리
            document.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    e.preventDefault(); // 드래그 중일 때만 전체 스크롤 방지
                }
            }, { passive: false });
    
            img.style.cursor = 'grab';
        };
    
        setupDraggable('.museum-img1 img');
        setupDraggable('.festival-img2 img');
        setupDraggable('.public-img2 img');
    }
    const museumImg1 = document.querySelector('.museum-img1');
    const museumImg2 = document.querySelector('.museum-img2');
    const museumImg3 = document.querySelector('.museum-img3');

    function addDarkenEffect() {
        museumImg1.classList.add('active');
    }

    function removeDarkenEffect() {
        museumImg1.classList.remove('active');
    }

    museumImg2.addEventListener('mouseenter', addDarkenEffect);
    museumImg2.addEventListener('mouseleave', removeDarkenEffect);
    museumImg3.addEventListener('mouseenter', addDarkenEffect);
    museumImg3.addEventListener('mouseleave', removeDarkenEffect);

     // 디자인가이드 모달
     document.querySelectorAll('.design-guide').forEach(button => {
        var modalId = button.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        var span = modal.getElementsByClassName('close')[0];
    
        button.onclick = function(event) {
            event.preventDefault(); // 기본 동작 방지
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 스크롤 방지
            setTimeout(function() {
                modal.style.top = '0';
            }, 10);
        }
    
        span.onclick = function() {
            closeModal(modal);
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal(modal);
            }
        }
    });

    function closeModal(modal) {
        modal.style.top = '100%';
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 재개
        }, 500);
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

    // top menu 스크롤
    const topMenu = document.querySelector('.topmenu a');
    topMenu.addEventListener('click', function(e) {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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
        setupSkillSection();
        setupSkillModal();
        setupSkillBackground();
        setupSkillHover();
        setupSkillProgress();
        setupLoyalBackground();
    }

    // 모든 기능 초기화 실행
    initializeAllFunctions();
})