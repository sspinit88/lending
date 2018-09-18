$(function() {
    let $header = $('.header');
    let $doc = $(document);
    let $win = $(window);
    let windowWidth;
    let timeOut = 100;

    let $btnPriceLeft = $('.price__leftBtn');
    let $btnPriceRight = $('.price__rightBtn');
    let $priceItems = $('.price .priceItem');
    let itemPrice = 0;

    let $btnAccord = $('.devItems__title');
    let $listAccord = $('.devItems__list');
    let $btnTab = $('.devTab__item');
    let $listTab = $('.devTabInfo__list');


    $btnPriceLeft.on('click', prevPrice);
    $btnPriceRight.on('click', nextPrice);
    $btnAccord.on('click', runtAccord);
    $btnTab.on('click', runTab);


    getViewportWidth();
    autoRunFirstTab();


    $doc.on('scroll', function () {
        delayer(function () {
            docScrolling();
            headerScroll();
        },timeOut);
    });

    $win.on('resize', function () {
        delayer(function () {
            setViewport();
            headerRunnerOff();
        },timeOut);
    });


    let delayer = delay();

    function delay() {
        let timer;
        return function (f, t) {
            clearTimeout(timer);
            timer = setTimeout(f, t);
        }
    }

    function docScrolling() {
       let scrollDoc = $('html, body').scrollTop();
       return scrollDoc;
    }

    function getViewportWidth() {
        let viewportWidth;

        if (typeof window.innerWidth != 'undefined') {
            viewportWidth = window.innerWidth;
        }

        else if (typeof document.documentElement != 'undefined'
           && typeof document.documentElement.clientWidth !=
           'undefined' && document.documentElement.clientWidth != 0) {

            viewportWidth = document.documentElement.clientWidth;
       }

        else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
       }

       return {
            width: viewportWidth,
        }
    }

    let setViewport = function () {
        windowWidth = getViewportWidth().width;
    };

    function headerScroll() {
        setViewport();

        if(
            windowWidth < 756 ||
            windowWidth >= 1170
        ){
            headerRunnerOn();
         }

    }

    function headerRunnerOn() {
        if(
            docScrolling() > 200
        ){
            $header.slideDown(200).addClass('active');
        }
        else if (
            docScrolling() <= 200
        ) {
            $header.slideUp().removeClass('active')
        }
    }

    /*проверка на наличие класса 'active'*/
    headerRunnerOff();
    function headerRunnerOff() {
        setViewport();

        if(
            windowWidth >= 756 &&
            windowWidth < 1170
        ){
            $header.slideDown(10).addClass('active');
        }
        else {
            $header.slideUp(10).removeClass('active');
        }
    }

    /*--------------------------------*/
    /*Слайдер тарифов Битрикс24*/
    $priceItems.eq(1).addClass('showThis');

    function nextPrice() {
        $priceItems.eq(itemPrice).removeClass('showThis');

        itemPrice++;

        if(itemPrice >= $priceItems.length){
            itemPrice = 0;
        }

        $priceItems.eq(itemPrice).addClass('showThis');
    }

    function prevPrice() {
        $priceItems.eq(itemPrice).removeClass('showThis');

        itemPrice--;

        if(itemPrice < 0){
            itemPrice = $priceItems.length - 1;
        }

        $priceItems.eq(itemPrice).addClass('showThis');
    }
    
    /*--------------------------------*/
    /*Аккордион и табы*/
    function autoRunFirstTab() {
        $listAccord.eq(0).show();
        $btnAccord.eq(0).addClass('active');
    }

    function runtAccord() {
        setViewport();

        if(windowWidth < 756){
            $(this).addClass('active').siblings().removeClass('active');
            let $tab = $(this).next($listAccord).stop(true).slideDown(400);
            $listAccord.not($tab).stop(true).slideUp(400);
        }
    }

    function runTab() {
        setViewport();

        if(windowWidth >= 756){
            $(this).addClass('active').siblings().removeClass('active');
            $listTab.hide().eq($(this).index()).fadeIn(300).show();
        }
    }

    /*--------------------------------*/
    /*Всплывающая форма*/
    $('.buyNowOv').click(function (e){
        e.preventDefault();
        $('.hideForm, .overlay').css({'opacity':'1', 'visibility':'visible'}).fadeIn(700);
        $('html, body').animate({
            scrollTop: $('.hideForm').offset().top - 50
        },1000);
    });
    $('.formBlock__close').click(function (){
        $('.hideForm, .overlay').fadeOut(300);
        $('html, body').animate({
            scrollTop: $('.topSection').offset().top - 50
        },1000);
    });
    $('.buyNow').click(function (e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.formSection .formBlock').offset().top - 59
        },1000);
    });


    /*--------------------------------*/
    /*--------------------------------*/
    /*Далее плагины*/
    /*--------------------------------*/
    /*Parallax*/
    let scene = document.getElementById('scene');
    let parallaxInstance = new Parallax(scene);

    let services = document.getElementById('services');
    let parallaxInstance2 = new Parallax(services);

    let formSection = document.getElementById('formParallax');
    let parallaxInstance3 = new Parallax(formSection);

    /*--------------------------------*/
    /*Слайдер*/
    $(document).ready(function () {
        $('.slider').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 755,
                    settings: {
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });

    /*--------------------------------*/
    /*Форма*/
    $(document).ready( function() {
        $(".formUpload__upload input[type=file]").change(function(){
            let filename = $(this).val().replace(/.*\\/, "");
            $(".formUpload__filename").val(filename);
        });
    });


}); // load