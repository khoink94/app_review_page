$(document).ready(function(){
    var search_click = 0;
    $('.search-input').slideUp();
    $(".search-button").click(function(){
        if(search_click == 0){
            $('.search-input').slideDown();
            search_click = 1;
        }else{
            $('.search-input').slideUp();
            search_click = 0;
        }    
    });
    $('.am__elem--sub').hover(function(){
        $(this).find('.am__elem__sub').animate({
            top: '50px'
            ,opacity: '1'
        },'fast');
    },function(){
        $(this).find('.am__elem__sub').animate({
            top: '65px'
            ,opacity: '0'
        },'fast');
    });
});