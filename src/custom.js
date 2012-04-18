define (function () {
    console.log("custom.js");
    $(document).ready(function() {
        // SITE MODE 1 - please refer to docummentation

        var oldPage = "stack";
        $('#top-menu').find('li a').bind('click', function(e){
            console.log("#top-menu li a click");
            e.preventDefault();

            var href = $(this).attr("href");
            page = href.substr(0,href.length-5);
            page_id = '#'+page;
            console.log("page_id: ", page_id);

            var page = $(this).attr("page");

            $("#"+oldPage).hide();
            $("#"+page).show();
            oldPage = page

        });


        /*-----------------------------------------------------------------------------------*/
        /*  MENU ON CLICK / MENU ACTIE
        /*-----------------------------------------------------------------------------------*/

        $("#top-menu").on("click", "li a", function(event){
            var element_width = $(this).width();
            //element width divided by 2 minus 20px (margin of li element in top menu)
            var elwi = (element_width/2)-20;
            var postition_left = $(this).position().left;

            $('#top-menu').find('li a').removeClass('current-pos')
            $(this).addClass('current-pos');
            //animation for hover
            $('div.current').animate(
                {left : postition_left+elwi+'px'},
                {
                    duration: 'fast',
                    // you can change this to any type of easing animation you like
                    // please refer to http://gsgd.co.uk/sandbox/jquery/easing/
                    easing: 'easeInOutExpo'
                },
                700
            );
        });
    });

    $(window).load(function() {
        //we need to calculate position of hover arrow
        var current_pos = $('a.current-pos').position().left;
        var current_element_width = $('a.current-pos').width();
        var elwi_c = (current_element_width/2)-20;

    }); // end of jQuery load


})
