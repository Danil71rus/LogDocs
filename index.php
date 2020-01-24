<?php
include_once("sys.php");
session_start();

$_SESSION['tb']=new Table();
$_SESSION['sql']=$_GET['sql'];


if (isset($_POST['cpassw']))
{
	$passw = trim($_POST['cpassw']);
	if ($passw == $PAS_ADMIN)
	{
		$_SESSION['adm'] = true;		
		echo '{"result": "ok"}';
		exit();
	}
	else
	{
		echo '{"result": "wrong"}';
		exit();
	}
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
        <?
           if (!isset($_SESSION['adm']))
            {
               echo '<a href="#" data-toggle="modal" data-target="#myModal1">
                        <i class="glyphicon glyphicon-user" aria-hidden="true"></i> Войти от админа
                    </a>';
            }
        else {
              echo '<a href="admin.php" >
                        <i class="glyphicon glyphicon-user" aria-hidden="true"></i> Войти от админа
                    </a>';
         }
        ?>

<!-- Modal -->
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Войти с правами администратора</h4>
            </div>
            <div class="modal-body" style="margin: center;">                
                    <div class="form-group">
                        <label for="formGroupExampleInput">Пароль для входа</label>
                        <div class="form-inline">
                            <input id="inpPasswAdm" class="form-control" type="password" name="pas" />
                            <input id="btnSignAdm" class="btn btn-primary" type="button"  value='go' />
                        </div>
                    </div>                
            </div>
        </div>
    </div>
</div>
        <script>
            $('#btnSignAdm').click(function () {
                $.post('/', {cpassw: $('#inpPasswAdm').val()}, function (data) {
                    data = JSON.parse(data);
                    //console.log(data);
                    if (data.result == 'ok')
                    window.location = '/admin.php';
                    else if (data.result == 'wrong')
                    alert('Неправильный пароль');
                });
            });
        </script>
        
        <br/>
        <br/>
        <div class="container-fluid">
            <div class="row">
                <mycol1 class=" col-md-10 col-sm-12 col-xs-12" >
                    <div id="content"></div>
                        <div  class="btn-toolbar" role="toolbar" aria-label="..." >
                           <ul class="pager">
                            <li id="start" class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Начало</a></li>
                              <obolochka>
                                   <div  id="btn_NumPage" class="btn-group" role="group" aria-label="..." >
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
                           
                              
                              <ul  class="dropdown-menu " role="menu" aria-labelledby="dropdownMenu" style="   display: block; position: static;">
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
                                            <td text-align='right'> <input tabindex="-1" type="radio" name="dat"  value="`date`>= CURRENT_DATE()" /> </td>
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
                                                        <td text-align='right'> <input data-toggle='tooltip' data-placement="left"  title='Дату нужно вводить в след. формате: 2017-11-17' type="radio" name="poisc" value="Дата отправки" /></td>
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
                                    <input type="radio" name="col" value="50" > 50
                                  </label>
                                        <label class="btn btn-default">
                                    <input type="radio" name="col" value="100" > 100
                                  </label>
                                        <label class="btn btn-default">
                                    <input type="radio"  name="col" value="200"> 200
                                  </label>
                                    </div>
                                </li>
                                 
                                <li class="divider"></li>
                                <li class="disabled"><a href="#">Таблица</a></li>
                                <li style="position: relative;left: 3px;right: 3px;">
                                    <div class="btn-group" data-toggle="buttons">
                                      <label class="btn btn-default active" style="padding-left: 7px; padding-right:7px;">
                                        <input type="radio" name="tab" value="Incoming" >Входящие
                                      </label>                                     
                                      <label class="btn btn-default" style="padding-left: 7px; padding-right: 7px;">
                                        <input type="radio"  name="tab" value="Outgoing">Исходящие
                                      </label>
                                    </div>
                                </li>
                                 <li><br/></li> 
                            </ul>
                            
                              <div id="page_properties">
                                 <page_properties >
                                      <h4 style='color: #81F9A6; text-align: center;'>Данные страницы</h4> 
                                      <p>
                                          <?php count_users(); ?>
                                          Всего записей: <b id="max_str" style='color: #FFD98C;' ></b><br/>
                                          Всего страниц: <b id="max_pag" style='color: #FFD98C;' ></b><br/>
                                          <a href='settings.html' target='_blank' style='position: absolute;' ><i class='glyphicon glyphicon-cog' aria-hidden='true'></i> Настройки</a><br/>
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
          <!--===========При узком экране, появляется ЗАКЛАДКА которая открывает панель управления======-->
         <script src="js/bookmark.js"></script>
          <!--===========КЛАСС javascript для взаимодействия с классом Table на php  ======-->
         <script src="js/index/class_table.js"></script>
          <!--===========Код в котором происходит обработка событий над ПАНЕЛЬЮ УПРАВЛЕНИЯ======-->
         <script src="js/index/main.js"></script>       
    </body>    
</html>