<?php
include_once("../../sys.php");
session_start();

$tb=$_SESSION['tb'];


if(!empty($_REQUEST['loading'])){
    echo get_lastId($_REQUEST['tab']);
    exit();
}
if(!empty($_REQUEST['create'])){   
    
    $dat=$_REQUEST['date'];
    if($dat==date('Y-m-d')){
        $dat=date('Y-m-d H:i:s');
    }
    
    Db::query("INSERT INTO `".$_REQUEST['table']."` (`id`, `Исходящий № документа`, `Дата отправки`, `Кому`, `От кого`, `О чем`, `file`, `№ дела, в котором хранится копия`, `date`) VALUES (NULL, '".$_REQUEST['numDoc']."', '".$dat."', '".$_REQUEST['comu']."', '".$_REQUEST['otCogo']."', '".$_REQUEST['chem']."', 'null_', '".$_REQUEST['numCopy']."', CURRENT_TIMESTAMP);",true);
    echo "ok";     
    exit();
}


function get_lastId($table){
    $last_id=Db::query("select MAX(`Исходящий № документа`) max from $table;");
    return $last_id['max']+1;
}
?>