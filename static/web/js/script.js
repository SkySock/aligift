$(document).ready(function() {
    $('#burg-button').click(function(event) {
        $('.categories, .background-menu').toggleClass('active');
    });
}); 

$(document).ready(function() {
    $(window).on('load resize', function() {
        if ($(window).width() <= '769'){
            $("#form_search").appendTo($(".search-menu"));
        }
        else   {
            $("#form_search").appendTo($(".header-main"));
        }
   });
});


$( document ).ready(function() {
    $( 'body' ).append( '<button id="toTop" title="Go to top"><img src="static/web/img/arrow.png" /></button>' );
     $("#toTop").css({"display": "none", "position": "fixed", "bottom": "20px", "right": "20px", "z-index": "1000", "border": "none", "outline": "none", "background": "none", "cursor": "pointer"});
     $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('#toTop').fadeIn();
        } else {
          $('#toTop').fadeOut();
       }
    });

    $('#toTop').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop : 0}, 800);
      return false;
    });
});

$(document).ready(function() {
    let page = 1;
    getProductsPage(page);
    $('#button_more').click(function(event){
        event.preventDefault();
        page++;
        getProductsPage(page);

    });
});

function getProductsPage(page) {
    let btn = $(this).serialize();
    $.ajax({
        method: "GET",
        url: "",
        dataType: "json",
        data: {'page': page},
        success: function(result){
            let response = result;
            $.each(response.products, function(index, value){
                $('.goods').append('<figure><a href="'+ value.url +'" target="_blank"><div class="item"><img src="' + value.img + '" alt="goods"><figcaption><h3>'+ value.name +'</h3><p>'+ value.description +'</p></figcaption></div></a></figure>');
                if(page >= response.pages) {
                    $('.more-button').css({"display": "none"});
                }
            });
        }
    });
}

// $(document).ready(function() {
//     let goods = [
//         { name: "Phone", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"},
//         { name: "Bike", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"},
//         { name: "Copter", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"},
//         { name: "Copter", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"},
//         { name: "Copter", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"},
//         { name: "Mouse", description: "спецификация, описание, характеристика, определение, технические условия, детализация", img: "img/домик.png", link: "https://vk.com/im?sel=124672106"}
//     ];
//     $.each(goods, function(index, value){
//         $('.goods').prepend('<figure><a href="'+ value.link +'" target="_blank"><div class="item"><img src="' + value.img + '" alt="goods"><figcaption><h3>'+ value.name +'</h3><p>'+ value.description +'</p></figcaption></div></a></figure>');
//         if(goods.length <= 18) {
//             $('.more-button').css({"display": "none"});
//         }
//     });
// }); 