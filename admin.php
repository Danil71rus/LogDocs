<?php
include_once("sys.php");
session_start();

$_SESSION['tb']=new Table2();
$_SESSION['sql']=$_GET['sql'];


if (!isset($_SESSION['adm']))
{
	header('Location: /');
}
/*выход*/
if (isset($_POST['logout']))
{
	unset($_SESSION['adm']);
	echo '{"result": "ok"}';
	exit();
}
?>
<html lang="ru">
    <head>
        <title>LogDocs</title>
        <meta charset="UTF-8"/>
        <link rel="shortcut icon" href="img/4.ico" type="image/x-icon"/>
        
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">     
        <link href="bootstrap-3.3.2-dist/css/bootstrap.min.css" rel="Stylesheet" />
        <link href="bootstrap-3.3.2-dist/css/bootstrap-theme.min.css" rel="Stylesheet" /> 
        <script src="bootstrap-3.3.2-dist/jquery-3.0.0.min.js"></script>
        <script type='text/javascript' src="bootstrap-3.3.2-dist/js/bootstrap.min.js"></script> 
        
        <link rel="stylesheet" type="text/css" href="css/navigate.css"/> 
        <link rel="stylesheet" type="text/css" href="css/features_table.css"/> 
        
        
        	<!-- UniversalUploader css style file -->
            <link rel="stylesheet" href="upload/universal/style.css">
            <!-- Examples css file -->	

            <!-- UniversalUploader JavaScript code file -->
            <script type="text/javascript" src="upload/universal/universalUploader.js"></script>
       <script>
                  $(function () {
                    $('[data-toggle=\"tooltip\"]').tooltip({container: 'body'});
                  });             	  
        </script>
    </head>

    <style>
        <?
          $bg_one='#3AA6D0';  //
          $bg='#EDEDED';  //
          $color_one='#230000';  //
          $color_all='#000000';  //
          $size='18px';  //
          $bg_st='#C4EFFF';  //
          $hower='#FF9540';  //
          $sh='TimesNewRoman';  //
          $color_border='#230000';//
          $fon="gray"; //
          $bol=false;   //
             //   $_COOKIE[telephone]
          if(!empty($_COOKIE[bg_one])){$bg_one=$_COOKIE[bg_one];$bol=false;}
          if(!empty($_COOKIE[bg])){$bg=$_COOKIE[bg];$bol=false;}
          if(!empty($_COOKIE[color_one])){$color_one=$_COOKIE[color_one];$bol=false;}
          if(!empty($_COOKIE[color_all])){$color_all=$_COOKIE[color_all];$bol=false;}
          if(!empty($_COOKIE[select])){$size=$_COOKIE[select];}    
          if(!empty($_COOKIE[bg_st])){$bg_st=$_COOKIE[bg_st];$bol=false;}    
          if(!empty($_COOKIE[hower])){$hower=$_COOKIE[hower];$bol=false;}  
          if(!empty($_COOKIE[select1])){$sh=$_COOKIE[select1];$bol=false;}  
          if(!empty($_COOKIE[color_border])){$color_border=$_COOKIE[color_border];$bol=false;} 
          if(!empty($_COOKIE[fon])){$fon=$_COOKIE[fon];$bol=false;} 
        ?>
        body{
            background: <? echo $fon; ?>;
        }    
        .features-table { 
            font-size: <? echo $size; ?>;            
        }
        .features-table th {
            background: <? echo $bg_one; ?>;
            color: <? echo $color_one ?>;
            <? if($bol==true){ echo 'text-shadow: 0 1px 1px #2D2020;'; } ?>          
            font-family: <? echo $sh; ?>;
        }  
       .features-table td
        { 
            border-color: <? echo $color_border;?>;
        }
        .features-table td {
            color: <? echo $color_all; ?>;         
            background: <? echo $bg; ?>;           
        }        
       
        .features-table td:first-child
        {          
           background: <? echo $bg_st; ?>;
        } 
        .features-table tr:hover td{
           background: <? echo $hower; ?>;
        }
        .features-table th
        {  
            border-color: <? echo $color_border; ?>;
        } 
    </style>
    <body>
        <div class="btn-group" style="position: absolute;">
          <button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a href="index.php"  >Назад</a> </li>
            <li><a id="btnLogout" href="#" >Выход</a></li>
          </ul>
        </div> 
        <script>
           /*---------------Выход-------------*/
			  		$('#btnLogout').click(function() {                       
						$.post('admin.php', {"logout": "yes"}, function (data) {
							data = JSON.parse(data);
							if (data.result == "ok")
								window.location = "/";
							else alert("Произошла ошибка");
						});
					});/*-------Конец кода Выхоа-------------*/
        </script>
        <br/>
        <br/>
        <div class="container-fluid">
            <div class="row">
                <mycol1 class=" col-md-10 col-sm-12 col-xs-12">
                    <div id="content"></div>
                    <div class="btn-toolbar" role="toolbar" aria-label="...">
                        <ul class="pager">
                            <li id="start" class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Начало</a></li>
                            <obolochka>
                                <div id="btn_NumPage" class="btn-group" role="group" aria-label="...">
                                    <button name="num_page_l" type="button" class="btn btn-default"><span aria-hidden="true">&laquo;</span></button>
                                    <button id="num_page1" name="num_page" type="button" class="btn btn-default">1</button>
                                    <button id="num_page2" name="num_page" type="button" class="btn btn-default">2</button>
                                    <button id="num_page3" name="num_page" type="button" class="btn btn-default">3</button>
                                    <button id="num_page4" name="num_page" type="button" class="btn btn-default">4</button>
                                    <button id="num_page5" name="num_page" type="button" class="btn btn-default">5</button>
                                    <button name="num_page_r" type="button" class="btn btn-default"> <span aria-hidden="true">&raquo;</span></button>
                                </div>
                            </obolochka>
                            <li id="finish" class="next"><a href="#">Конец <span aria-hidden="true">&rarr;</span></a></li>
                        </ul>
                    </div>
                </mycol1>
                <mycol2 class=" col-md-2 col-sm-0 col-xs-0" style="padding-left: 0px;">
                    <!--=====================================================================-->
                    <div id="navigator">

                        <button type="button" style="width: 100%" class="btn btn-primary" data-toggle="modal" data-target="#add_entry" ><i class='glyphicon glyphicon-plus' aria-hidden='true'></i> Добавить запись</button>
                        <ul class="dropdown-menu " role="menu" aria-labelledby="dropdownMenu" style="   display: block; position: static;">
                            <li class="disabled"><a href="#">Сортировка по дате:</a></li>
                            <table width="90%" style="position: relative; left: 15px;">
                                <tr>
                                    <li>
                                        <td> По возрастанию</td>
                                        <td text-align='right'> <input id="sort_po" tabindex="-1" type="radio" name="sort_date" checked value="up" /> </td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td> По убыванию</td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="sort_date" value="down" /></td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td>По добавлению</td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="sort_date" value="id" /></td>
                                    </li>
                                </tr>
                            </table>
                            <li class="divider"></li>
                            <li class="disabled"><a href="#">Добавленные :</a></li>
                            <table width="90%" style="position: relative; left: 15px;">
                                <tr>
                                    <li>
                                        <td> За сегодня </td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="dat" value="`date`>= CURRENT_DATE()" /> </td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td> За вчера </td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="dat" value="`date`>=(CURRENT_DATE()-1) and date < CURRENT_DATE()" /></td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td> За месяц </td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="dat" value="`date`>=DATE_SUB(CURRENT_DATE,INTERVAL 1 MONTH)" /></td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td> Диапазон </td>
                                        <td text-align='right'> <input tabindex="-1" type="radio" name="dat" value="diapason" /></td>
                                    </li>
                                </tr>
                                <tr>
                                    <li>
                                        <td> Выкл. </td>
                                        <td text-align='right'> <input id="vikl" tabindex="-1" type="radio" name="dat" value="" /></td>
                                    </li>
                                </tr>
                            </table>
                            <li class="divider"></li>
                            <li class="disabled"><a href="#">Поиск</a></li>
                            <div class="input-group">
                                <input id='v_poisc' type="text" class="form-control">
                                <div class="input-group-btn">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-search" aria-hidden="true"></i> <span class="caret"></span></button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <table width="300px">
                                            <tr>
                                                <li>
                                                    <td> Исходящий № документа</td>
                                                    <td text-align='right'> <input type="radio" name="poisc" value="Исходящий № документа" /> </td>
                                                </li>
                                            </tr>
                                            <tr>
                                                <li>
                                                    <td> Дата отправки</td>
                                                    <td text-align='right'> <input data-toggle='tooltip' data-placement="left" title='Дату нужно вводить в след. формате: 2017-11-17' type="radio" name="poisc" value="Дата отправки" /></td>
                                                </li>
                                            </tr>
                                            <tr>
                                                <li>
                                                    <td>Кому</td>
                                                    <td text-align='right'> <input type="radio" name="poisc" value="Кому" /></td>
                                                </li>
                                            </tr>
                                            <tr>
                                                <li>
                                                    <td>От кого</td>
                                                    <td text-align='right'> <input type="radio" name="poisc" value="От кого" /></td>
                                                </li>
                                            </tr>
                                            <tr>
                                                <li>
                                                    <td>О чём</td>
                                                    <td text-align='right'> <input type="radio" name="poisc" value="О чем" /></td>
                                                </li>
                                            </tr>
                                            <tr>
                                                <li>
                                                    <td> № дела, в котором хранится копия</td>
                                                    <td text-align='right'> <input type="radio" name="poisc" value="№ дела, в котором хранится копия" /></td>
                                                </li>
                                            </tr>
                                        </table>

                                    </ul>
                                </div>
                            </div>
                            <li class="divider"></li>
                            <li class="disabled"><a href="#">Отображение строк</a></li>
                            <li style="position: relative; left: 15px;">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input type="radio" name="col" value="50"> 50
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="col" value="100"> 100
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="col" value="200"> 200
                                    </label>
                                </div>
                            </li>

                            <li class="divider"></li>
                            <li class="disabled"><a href="#">Таблица</a></li>
                            <li style="position: relative;left: 3px;right: 3px;">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active" style="padding-left: 7px; padding-right:7px;">
                                        <input type="radio" name="tab" value="Incoming">Входящие
                                    </label>
                                    <label class="btn btn-default" style="padding-left: 7px; padding-right: 7px;">
                                        <input type="radio" name="tab" value="Outgoing">Исходящие
                                    </label>
                                </div>
                            </li>
                            <li><br /></li>
                        </ul>                       
                        <div id="page_properties">
                            <page_properties>
                                <h4 style='color: #81F9A6; text-align: center;'>Данные страницы</h4>
                                <p>
                                    <?php count_users(); ?>
                                    Всего записей: <b id="max_str" style='color: #FFD98C;'></b><br />
                                    Всего страниц: <b id="max_pag" style='color: #FFD98C;'></b><br />
                                    <a href='settings.html' target='_blank' style='position: absolute;'><i class='glyphicon glyphicon-cog' aria-hidden='true'></i> Настройки</a><br />
                                </p>                                 
                            </page_properties>
                        </div>
                    </div>
                    <!--=====================================================================-->
                </mycol2>
            </div>
        </div>
        
        <!--========ЗАКЛАДКА ДЛЯ ОТКРЫТИЯ ПАНЕЛИ УПРАВЛЕНИЯ===========-->      
        <fon></fon>
        <bookmark> 
            <span id="arrow" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>           
        </bookmark>                          
        <!--==================================================-->  
         
   
        
        
        
        
      <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Укажите промежуток времени</h4>
              </div>
              <div class="modal-body">
                <table width="100%">
                   <tr>
                     <td width="50%">от  <input id="date_start" class="form-control" type="date" ></td>
                     <td width="50%"> до <input id="date_finish" class="form-control" type="date"></td> 
                    </tr>
                  </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button id="start_d" type="button" class="btn btn-primary">Искать</button>
              </div>
            </div>
          </div>
        </div>
       <!-- Modal ЗАГРУЗКА ДАННЫХ -->    
        <div class="modal fade bs-example-modal-lg" id="window_modal_dowland_file" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Загрузка файлов</h4>
                    </div>
                    <div class="modal-body">
                                    
                        
                     <!-- PlaceHolder for UniversalUploader User Interface. Existing content will not be removed. 
  UniversalUpload will append own content to the end of this div-->
<div id="universalUploader_holder" >
<noscript>Place standard form with file input here for users who have disabled JS in browser.<br/>
Form snippet:<br/>
<form id="myform" name="myform" action="url to file processing script"  method="post" enctype="multipart/form-data">
<input name="Filedata" type="file"><br>
<input type="submit" value="Upload" />
</form>
 </noscript>
</div>
<!-- Initialization of UniversalUploader object -->	
<script type="text/javascript">
universalUploader.init({
	//Your serialNumber
	serialNumber: "put your license key here",
	//List of uploaders to render
	uploaders: "drag-and-drop, flash, silverlight, java, classic",	
	//First of correctly initialized uploader will be rendered
	singleUploader : true,
	//determines whether tab header should be displayed. Only for singleUploader mode
	renderTabHeader: false,
	//Id of html element where universalUploader should be rendered
	//If not set, document body used  
	holder: "universalUploader_holder",
	//Url to the swf file
	flash_swfUrl : "upload/universal/uploaders/ElementITMultiPowUpload.swf",
	//Url to the xap file
	silverlight_xapUrl : "upload/universal/uploaders/UltimateUploader.xap",
	//url to folder with jar files
	java_libPath : "upload/universal/uploaders/java/",
	//Path to the folder with images (status icons, remove icon) By default images subfolder is used (relative to the html page base path)
	//In these examples we place icons inside universal/images subfolder. 
	imagesPath : "upload/universal/images/",	
	//Url to the file processing script 
	url: "upload/FileProcessingScripts/PHP/uploadfiles.php"
});

//File upload complete
universalUploader.bindEventListener("FileUploadComplete", function (uploaderId, file){	
	var responselable = document.getElementById("serverresponse");		
	if(file.serverResponse) responselable.innerHTML += "<strong>" + file.serverResponse + "</strong>";		
});
	
//File upload error handler
universalUploader.bindEventListener("FileUploadError", function (uploaderId, file, status, msg){
	var responselable = document.getElementById("serverresponse");		
	responselable.innerHTML += "File Upload error "+file.name+" status "+status+" message "+msg;
});

universalUploader.bindEventListener("Init", function (inited){
		if(!inited)			
			alert("UniversalUploader failed to init!");
});

</script> 
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
       
      <!-- Modal ДОБАВИТЬ ЗАПИСЬ В ТАБЛИЦУ-->     
<div class="modal fade" id="add_entry" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 id="title_modal_add" class="modal-title">Добавление записи</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div id="select_table" class="btn-group " data-toggle="buttons" style="margin-left: 30%; margin-right: 30%;">
                        <label class="btn btn-default">
                            <input type="radio" name="name_tbl" autocomplete="off" value="Incoming">Входящие
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="name_tbl" autocomplete="off" value="Outgoing">Исходящие
                        </label>
                    </div>
                    <div id="add_data" hidden="true">
                        <div class="form-group " id="add_numDoc_grp">
                            <label for="message-text" class="control-label">Входящий № документа</label>
                            <input class="form-control" type="number" id="add_numDoc" >
                        </div>
                        <div class="form-group" id="add_date_grp">
                            <label for="message-text" class="control-label">Дата отправки</label>
                            <input class="form-control" type="date" id="add_date" value="<? echo date('Y-m-d'); ?>">
                        </div>
                        <div class="form-group" id="add_comu_grp">
                            <label for="message-text" class="control-label">Кому</label>
                            <input class="form-control" type="text" id="add_comu">                            
                        </div>
                        <div class="form-group" id="add_otCogo_grp">
                            <label for="message-text" class="control-label">От кого</label>
                            <input class="form-control" type="text" id="add_otCogo">
                        </div>
                        <div class="form-group" id="add_chem_grp">
                            <label for="message-text" class="control-label">О чём</label>
                            <input class="form-control" type="text" id="add_chem">
                        </div>                 
                        <div class="form-group" id="add_numCopy_grp">
                            <label for="message-text" class="control-label">№ дела, в котором хранится копия</label>
                            <input class="form-control" type="text" id="add_numCopy">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" id="create_data" >Добавить</button>
            </div>
        </div>
    </div>
</div>
        <script>
            var table_;
            
            $("#navigator > button").click(function(){
                $("#select_table").show(); 
                $("#select_table > label:nth-child(1)").removeClass("active"); 
                $("#select_table > label:nth-child(2)").removeClass("active"); 
                $("#add_data").hide();
                $("#title_modal_add").text("Добавление записи");   
            });
            
            $("input[name=name_tbl]").change(function(){
                var tab_val=$(this).val();
                table_=tab_val;
                var title="Добавление записи в таблицу: '"+tab_val+"'";
                $("#title_modal_add").text(title);   
                $("#select_table").hide();
                
                var data_load={loading: true,tab: tab_val};
                     $.ajax({
                            type: "POST",
                            url: "ajax/admin/add_data.php",
                            cache: false,                           
                            data: data_load,
                            success: function(html) {                            
                                $("#add_numDoc").val(Number(html)); 
                                test("#add_numDoc","#add_numDoc_grp");
                            }
                     });  
                $("#add_data").fadeIn();
            });
            
            
           
            
            /*=========ПРОВЕРКА ПРАВИЛЬНОСТИ ВВОДА ДАННЫХ========*/
            
            
            
            var numDoc;    
            var date;
            var comu;
            var otCogo;
            var chem;
            var numCopy;
           
            $("#add_numDoc").on('input',function(){test("#add_numDoc","#add_numDoc_grp");});
            
            $("#add_date").ready(function(){test("#add_date","#add_date_grp");});
            $("#add_date").change(function(){test("#add_date","#add_date_grp");});
            
             $("#add_comu").on('input',function(){test("#add_comu","#add_comu_grp");});
             $("#add_otCogo").on('input',function(){test("#add_otCogo","#add_otCogo_grp");});
             $("#add_chem").on('input',function(){test("#add_chem","#add_chem_grp");});
             $("#add_numCopy").on('input',function(){test("#add_numCopy","#add_numCopy_grp");});
            
            function test(input,grp){
                var val=$(input).val();
                if(val.length<1){
                    $(grp).addClass("has-error");
                    $(grp).removeClass("has-success");
                }else{
                    $(grp).removeClass("has-error");
                    $(grp).addClass("has-success");
                    
                    numDoc=Number($("#add_numDoc").val());
                    date= $("#add_date").val();
                    comu=$.trim($("#add_comu").val());
                    otCogo=$.trim($("#add_otCogo").val());
                    chem=$.trim($("#add_chem").val());
                    numCopy=$.trim($("#add_numCopy").val());
                }
            }
          
            
             $("#create_data").click(function(){
                 
                 if(numDoc>0 & date.length>0 & comu.length>0 & otCogo.length>0 & chem.length>0 & numCopy.length>0){
                    
                     var send_data={create: true,table: table_,numDoc: numDoc,date:date,comu:comu,otCogo:otCogo,chem:chem,numCopy:numCopy}
                      $.ajax({
                            type: "POST",
                            url: "ajax/admin/add_data.php",
                            cache: false,                           
                            data: send_data,
                            success: function(html) {                            
                               alert(html);
                                tab.setPage_and_Show(tab.Page);
                                $("#add_entry").modal('hide');
                            }
                     });               
                 }
                 else{
                     alert("Не все поля заполнены!");
                 }
                 //var str___=numDoc.length+" "+date.length+" "+comu.length+" "+otCogo.length+" "+chem.length+" "+numCopy.length;
                 // alert(str___);
            });
        </script>
          <!--===========При узком экране, появляется ЗАКЛАДКА которая открывает панель управления======-->
         <script src="js/bookmark.js"></script>
          <!--===========КЛАСС javascript для взаимодействия с классом Table на php  ======-->
         <script src="js/admin/class_table.js"></script>
          <!--===========Код в котором происходит обработка событий над ПАНЕЛЬЮ УПРАВЛЕНИЯ======-->
         <script src="js/admin/main.js"></script>   
        
            
    </body>    
</html>