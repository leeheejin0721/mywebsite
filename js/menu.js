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

