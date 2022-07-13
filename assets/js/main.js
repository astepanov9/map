(function () {
    'use strict';

    // Preloader
    window.onload = function() {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 1000);
    }

    // Back to top button
    let goTopBtn = document.querySelector('.back_to_top');
    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);

    function trackScroll() {
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
        } else if (scrolled < coords) {
            goTopBtn.classList.remove('back_to_top-show');
        }
    }

    function backToTop() {
        window.scrollTo(0, 0);
    }

    // Изменение цвета звезд, в зависимости от их количества (0 - gray, 1-3 - purple, 4-5 - green)
    let reviewsNumb = document.querySelectorAll('.reviews__number');
    let reviewsBox = document.querySelectorAll('.listings__item-reviews-box');
    for (let i = 0, length = reviewsBox.length; i < length; i++) {
        for (let i = 0, length = reviewsNumb.length; i < length; i++) {
            let reviewResult = reviewsNumb[i].textContent;
            if (reviewResult >= 4) {
                reviewsBox[i].classList.add('bg-green');
            } else if ((reviewResult < 4 && reviewResult > 0)) {
                reviewsBox[i].classList.add('bg-purple');
            } else if (reviewResult == 0) {
                reviewsBox[i].classList.add('bg-gray');
            } else {
                reviewsBox[i].classList.add('bg-gray');
            }
        }
    }

    // Сортировка товаров list/grid
    let sortList = document.querySelector('.listings__sort-list');
    let sortGrid = document.querySelector('.listings__sort-grid');
    let listingsItems = document.querySelector('.listing__items');
    let listingsItem = document.querySelectorAll('.listings__item');
    if (document.querySelector('.listings__sort')) {
        sortList.addEventListener('click', list);
        sortGrid.addEventListener('click', grid);
        localStorageSort();
    }

    function list() {
        sortList.classList.add('color-purple');
        sortGrid.classList.remove('color-purple');
        listingsItems.classList.add('list');
        listingsItems.classList.remove('grid');
        for (let i = 0, length = listingsItem.length; i < length; i++) {
            listingsItem[i].classList.remove('col-md-6', 'col-12');
            listingsItem[i].classList.add('col-12');
        }
        localStorage.setItem('sort', 'list');
    }

    function grid() {
        sortGrid.classList.add('color-purple');
        sortList.classList.remove('color-purple');
        listingsItems.classList.add('grid');
        listingsItems.classList.remove('list');
        for (let i = 0, length = listingsItem.length; i < length; i++) {
            listingsItem[i].classList.remove('col-12');
            listingsItem[i].classList.add('col-md-6', 'col-12');
        }
        localStorage.setItem('sort', 'grid');
    }

    function localStorageSort() {
        let localSort = localStorage.getItem('sort');
        switch (localSort) {
            case 'list':
                list();
                break;
            case 'grid':
                grid();
                break;
        }
    }

})();

