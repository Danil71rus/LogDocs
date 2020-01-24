<?php
include_once("../../sys.php");
session_start();

$tb=$_SESSION['tb'];


if(!empty($_REQUEST['input'])){
    $tb->Count_lines=$_REQUEST['id'];
    $_SESSION['dir']=$tb->Sql->Table."_id_".$tb->Count_lines;  //для создания папки при загрузки файлов
    $_SESSION['id']=$_REQUEST['id'];
    $tb->Show(); 
    
    $dir="../../Doc/".$_SESSION['dir'];
    if(!is_dir($dir)){
     mkdir($dir);
    }
    else {   
           $mas=Db::query("select file from ".$tb->Sql->Table." where id=".$tb->Count_lines);
            $mas='../../'.$mas['file'];
            
            
            if (file_exists($dir))
            foreach (glob($dir.'/*') as $file){ 
                if($file!=$mas)
                  unlink($file);
            }
    }
    exit();
}

if(!empty($_REQUEST['del'])){
    if(Db::query("DELETE FROM `".$_REQUEST['tab']."` WHERE `id` = ".$_REQUEST['id'],true)); 
    $tb->Show();    
    exit();
}


if(!empty($_REQUEST['updata_NumDoc'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `Исходящий № документа` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}
if(!empty($_REQUEST['updata_Date'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `Дата отправки` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}
if(!empty($_REQUEST['updata_Comu'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `Кому` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}
if(!empty($_REQUEST['updata_OtCogo'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `От кого` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}
if(!empty($_REQUEST['updata_Ochem'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `О чем` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}
if(!empty($_REQUEST['updata_NumCopy'])){
    if(Db::query("UPDATE `".$_REQUEST['tab']."` SET `№ дела, в котором хранится копия` = '".$_REQUEST['val']."' WHERE `id` = ".$_REQUEST['id'].";",true));    
     echo "ok";
    exit();
}

?>