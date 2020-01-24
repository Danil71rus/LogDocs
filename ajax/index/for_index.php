<?php
include_once("../../sys.php");
session_start();


$tb=$_SESSION['tb'];
$get_sql=$_SESSION['sql'];
//$test->Sql->setSort("down");
//$test->Sql->setPage(2);
//$test->Show();
//print_r($tb->Sql->Query);


/*=============для функции create  создает таблицу и связывает данные===============*/
if(!empty($_REQUEST['create'])){     
    $tb->Sql->Count_lines_one_page=$_REQUEST['lines_one_page'];  //устанавливаем сколько строк на одной странице
    $tb->Sql->setTable($_REQUEST['name']);                       //создаем таблицу    
    $tb->Sql->setPage($_REQUEST['page']);                       // на какой странице мы находимся     
    
    $count_lines=$tb->Sql->Count_lines;
    $pages=$tb->Sql->Pages;     
    echo '{"count_lines":"'.$count_lines.'","pages":"'.$pages.'"}';
    exit();
    //$test->Show();
}
if(!empty($_REQUEST['show'])){
    if(!empty($get_sql)){
        $tb->Sql->Query=$get_sql;
    }
    $tb->Show();
    exit();
}
/*======================Отобразить страницу под номером========================================*/
if(!empty($_REQUEST['setPage_and_Show'])){
    $tb->Sql->setPage($_REQUEST['page']);
    $tb->Show();
    exit();
}
/*=================СОРТИРОВКА=======================*/
if(!empty($_REQUEST['setSort'])){ 
    $val=$_REQUEST['setSort_val'];
    if($val!='id')
    $tb->Sql->setSort($val);
    else if($val=='id'){
        $tb->Sql->setSort('up','id');
    }
    $tb->Show(); 
    exit();
}


/*===========Добавленные За сегодня, за вчера, за месяц==============*/
if(!empty($_REQUEST['setPoiscDiapason'])){    
    $tb->Sql->setPoisc("","",$_REQUEST['setPoiscDiapason_val']); 
    $tb->Show(); 
    exit();
}

if(!empty($_REQUEST['updata'])){    
    $count_lines=$tb->Sql->Count_lines;
    $pages=$tb->Sql->Pages;     
    echo '{"count_lines":"'.$count_lines.'","pages":"'.$pages.'"}';
    exit();    
}
/*==*********==Добавленные За сегодня, за вчера, за месяц===********==*/

if(!empty($_REQUEST['setPoisc'])){
    $tb->Sql->setPoisc($_REQUEST['poisc'],$_REQUEST['val_poisc']); 
    $tb->Show(); 
    exit(); 
}



?>