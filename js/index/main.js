var sql = window.location.search.substr(1);
if (sql.length != 0) {
    $("body > div.btn-toolbar").css({
        "display": "none"
    });
    $("body > bookmark").css({
        "display": "none"
    });
    $("#navigator").css({
        "display": "none"
    });
}
//console.log(sql);




var tab = new Table('Incoming');
// console.log(tab);

/*===============ПО НОМЕРУ=============*/
$("button[name=num_page]").click(function () {
    tab.setPage_and_Show(Number($(this).text()));
});
/*===============ЛЕВО=============*/
$("button[name=num_page_l]").click(function () {
    tab.setPage_and_Show(tab.Page - 1);
});
/*===============ПРАВО=============*/
$("button[name=num_page_r]").click(function () {
    tab.setPage_and_Show(tab.Page + 1);
});
/*=================В НАЧАЛО=================*/
$("#start").click(function () {
    tab.setPage_and_Show(1);
});
/*=================В КОНЕЦ====================*/
$("#finish").click(function () {
    tab.setPage_and_Show(tab.pages);
});

/*===========Отображение количества сторок============*/
$("input[name=col]").change(function () {
    tab.Page = 1;
    tab.Lines_one_page = Number($(this).val());
    tab.create();
    tab.setPage_and_Show(tab.Page);

    $("#vikl").prop("checked", true);
    $("#sort_po").prop("checked", true);
    var data = {
        setSort: true,
        setSort_val: $("#sort_po").val()
    }
    tab.ajax(data);

    var data = {
        setPoiscDiapason: true,
        setPoiscDiapason_val: $("#vikl").val()
    }
    $.ajax({
        type: "POST",
        url: "ajax/index/for_index.php",
        cache: false,
        async: false,
        data: data,
        success: function (html) {
            $("#content").html(html);
        }
    });
    tab.updata();
    $("#max_str").text(tab.count_lines);
    $("#max_pag").text(tab.pages);
    tab.updataNumberPage(1);
});
/*=====================================СОРТИРОВКА=======================*/
$("input[name=sort_date]").change(function () {
    var data = {
        setSort: true,
        setSort_val: $(this).val()
    }
    tab.ajax(data);
});
/*================ВЫВОД ДАННЫХ ЗА СЕГОДНЯ,ВЧЕРА, ЗА ПРОШ. МЕСЯЦ, ПО ДИАПАЗОНУ=======*/
$("input[name=dat]").change(function () {
    if ($(this).val() == 'diapason') { //если выбран диапазон, открываем модальное окно
        $('#myModal').modal('show');
    } else {
        var data = {
            setPoiscDiapason: true,
            setPoiscDiapason_val: $(this).val()
        }
        $.ajax({
            type: "POST",
            url: "ajax/index/for_index.php",
            cache: false,
            async: false,
            data: data,
            success: function (html) {
                $("#content").html(html);
            }
        });
        tab.updata();
        $("#max_str").text(tab.count_lines);
        $("#max_pag").text(tab.pages);
        tab.updataNumberPage(1);
    }
});



/*====================================ПОИСК=====================================*/
$('#v_poisc').on('input', function () {
    poisc = $('input[name=poisc]:checked').val();
    val_poisc = $('#v_poisc').val();
    var data = {
        setPoisc: true,
        poisc: poisc,
        val_poisc: val_poisc
    }
    $.ajax({
        type: "POST",
        url: "ajax/index/for_index.php",
        cache: false,
        async: false,
        data: data,
        success: function (html) {
            $("#content").html(html);
        }
    });

    tab.updata();
    $("#max_str").text(tab.count_lines);
    $("#max_pag").text(tab.pages);
    tab.updataNumberPage(1);
});

/*===============================ПОИСК ПО ДИАПАЗОНУ===============================*/
$("#start_d").click(function () {
    var s = $("#date_start").val();
    var f = $("#date_finish").val();
    if (s.length <= 0 & f.length <= 0) {
        alert("Вы должны указать две даты!");
    } else {
        var zapros = "`Дата отправки`>='" + s + "' and `Дата отправки`<= '" + f + "' ";
        var data = {
            setPoiscDiapason: true,
            setPoiscDiapason_val: zapros
        }
        $.ajax({
            type: "POST",
            url: "ajax/index/for_index.php",
            cache: false,
            async: false,
            data: data,
            success: function (html) {
                $("#content").html(html);
            }
        });
        tab.updata();
        $("#max_str").text(tab.count_lines);
        $("#max_pag").text(tab.pages);
        tab.updataNumberPage(1);
    }
});

$("input[name=tab]").change(function () {
    tab = new Table($(this).val());
});



/*==================КЛАВИАТУРА================*/
$('html').keydown(function (e) {
    if (e.keyCode == 37) //стрелка влево
    {
        tab.setPage_and_Show(tab.Page - 1);

    }
});
$('html').keydown(function (e) {
    if (e.keyCode == 39) // стрелка вправо
    {
        tab.setPage_and_Show(tab.Page + 1);
    }
});