// menu
document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('change');
    const menuBox = document.getElementById('menuBox');
    if (menuBox.classList.contains('active')) {
        menuBox.classList.remove('active');
        setTimeout(() => menuBox.style.display = 'none', 500); // 애니메이션 시간과 일치
    } else {
        menuBox.style.display = 'block';
        setTimeout(() => menuBox.classList.add('active'), 10); // display가 block으로 바뀐 후 애니메이션 시작
    }
});

// hover 어둡게
document.addEventListener('DOMContentLoaded', function() {
    const img2 = document.querySelector('.museum-img2');
    const img3 = document.querySelector('.museum-img3');
    const img1 = document.querySelector('.museum-img1');

    function addDarkenClass() {
        img1.classList.add('darken');
    }

    function removeDarkenClass() {
        img1.classList.remove('darken');
    }

    img2.addEventListener('mouseenter', addDarkenClass);
    img2.addEventListener('mouseleave', removeDarkenClass);
    img3.addEventListener('mouseenter', addDarkenClass);
    img3.addEventListener('mouseleave', removeDarkenClass);
});