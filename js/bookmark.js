           var bookmark = true;
           $("bookmark").click(function () {
               if (bookmark) {
                   $("#navigator").fadeIn(500);
                   $("fon").css({
                       "height": $("body").height()
                   });
                   $("fon").fadeIn(500);
                   $("#arrow").css({
                       "transform": "rotate(180deg)"
                   });
                   $("body").css({
                       "overflow-y": "hidden"
                   });
                   bookmark = false;
               } else if (!bookmark) {
                   $("#navigator").fadeOut(500);
                   $("fon").fadeOut(500);
                   $("#arrow").css({
                       "transform": "rotate(0deg)"
                   });
                   $("body").css({
                       "overflow-y": "auto"
                   });
                   bookmark = true;
               }
           });
           $(window).resize(function () {
               if ($(window).width() > 1008) {
                   $("#navigator").fadeIn(100);
                   $("fon").fadeOut(100);
                   bookmark = false;
               } else {
                   $("#navigator").fadeOut(100);
                   $("#arrow").css({
                       "transform": "rotate(0deg)"
                   });
                   bookmark = true;
               }
           });

           /*====================ДЛЯ РАБОТЫ ПОДСКАЗОК=======================*/
           $(function () {
               $('[data-toggle="tooltip"]').tooltip();
           })
           /*=================================================================*/