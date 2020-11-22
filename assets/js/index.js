$(document).ready(handle)

/*Accordion*/
function handle() {
    $(`.chevron-c>.fa-chevron-down`).click(function () {
        $(this).parent().siblings('.card-collapsible').removeClass('hide');
        $(this).parent().addClass('hide');
        $(this).parent().siblings('.chevron-c').removeClass('hide')
    })
    $(`.chevron-c>.fa-chevron-up`).click(function () {
        $(this).parent().siblings('.card-collapsible').addClass('hide');
        $(this).parent().addClass('hide');
        $(this).parent().siblings('.chevron-c').removeClass('hide')
    })
    $('.scroll-top').click(function(){
        $(window).scrollTop(0); 
    })
}
/**/
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
  
    if(scroll > 100){
        $('.scroll-top').removeClass('hide')
     
    }
    else{
        $('.scroll-top').addClass('hide') 
    }
});
