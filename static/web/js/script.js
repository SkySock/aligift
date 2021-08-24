$(document).ready(function() {
    $('#burg-button').click(function(event) {
        $('.categories').toggleClass('active');
        $('body').toggleClass('lock');
    });
}); 

$(document).ready(function() {
    $(window).on('load resize', function() {
        if ($(window).width() <= '769'){
            $("#form_search").appendTo($(".search-menu"));
            $('#form_search').css({"display": "flex"});
        }
        else   {
            $("#form_search").appendTo($(".header-main"));
            $('#form_search').css({"display": "flex"});
        }
   });
});


$( document ).ready(function() {
     $("#toTop").css({"display": "none", "position": "fixed", "bottom": "20px", "right": "20px", "z-index": "98", "border": "none", "outline": "none", "background": "none", "cursor": "pointer"});
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