<?php
//include_once("../sys.php");

class Table{
      public $Sql;
      public function __construct($table=""){    
        $this->Sql=new Sql($table);     
    }       
    public function Show(){
         //для отображения подсказок
        echo "<script>
                  $(function () {
                    $('[data-toggle=\"tooltip\"]').tooltip({container: 'body'});
                  })
             </script>";
        
         echo "<table  class='features-table' width='100%'> ";
         $tab="Входящий";
         if($this->Sql->Table=="Outgoing"){
             $tab="Исходящий";
         }
         echo "
               <tr>
               <th >#</th>
               <th >$tab № документа</th>
               <th >Дата отправки</th>
               <th >Кому</th>
               <th>От кого</th>
               <th colspan='2'>О чём</th>              
               <th>№ дела, в котором хранится копия</th>
               </tr> 
              "; 
         $data=Db::query($this->Sql->Query);
         if(!empty($data['id'])) $data=array($data);  // если в БД будет одна строка, то будет одномерный массив, поэтому в этом случае одномерный массив переводим в двумерный         
       
         $i=$this->numericTable();  //Нумерация
        foreach($data as $d){
           
           
            
            echo "<tr>
                   <td width='1%' data-toggle='tooltip' data-placement='top'  title='id=".$d['id']."'>".$i."</td>
                   <td width='10%'>".$d['Исходящий № документа']."</td>
                   
                   <td  width='10%' data-toggle='tooltip' data-placement='top'  title='Время отправки: ".date('H:i',strtotime($d['Дата отправки']))."'>".date("d.m.Y",strtotime($d['Дата отправки']))."</td>                  
                   
                   <td width='10%'>".$d['Кому']."</td>                   
                   <td width='10%'>".$d['От кого']."</td>                   
                   <td width='30%'>".$d['О чем']."</td> 
                   
                   <td width='9%'>
                       <a href='".$d['file']."' target='_blank' data-toggle='tooltip' data-html='true' data-placement='top'  title='".$this->getDataFile("../../".$d['file'])."'>
                        <i class='glyphicon glyphicon-file' aria-hidden='true'></i> 
                       </a>
                   </td>  
                   
                   <td width='20'>".$d['№ дела, в котором хранится копия']."</td>                   
                 </tr> 
            ";
            /*===========НУМЕРАЦИЯ======*/
            if($this->boolSort_asc($this->Sql->Sort))
                $i++;
            else 
                $i--;
            }
            /*==========================*/
        echo "</table>";  
       
    }
    
    function boolSort_asc($sort){
        $res=explode(" ",$sort);
        if(empty($res[4])){
            return true;
        }
        else 
            return false;   
    }
    function numericTable(){
            if($this->boolSort_asc($this->Sql->Sort))     //если по возростанию 
            $i=$this->Sql->Range->start+1;
        else{                                  // если по убыванию
            if($this->Sql->Pages==$this->Sql->Page){                           //если последняя страница 
                $i=$this->Sql->Count_lines;
            }
            else
                $i=$this->Sql->Range->start+$this->Sql->Range->count_lines;    // любая другая страница
        }
        return $i;
    }
    
    /*===Для подсказки о ФАЙЛЕ. Проверяем существование файла и выводим данные о нем=======*/
    function getDataFile($path){
        if($path!="../../"){
        $stat="";
        $size;
        $name;
        $mtime;
        
            if(file_exists($path)){
                $stat=stat($path);           

                $size=$stat['size'];
                $size/=1000000;
                $size=round($size,3);         

                $mtime=$stat['mtime'];
                $mtime=date("d.m.Y",$mtime);

                $name=explode("/",$path);
                $name=$name[4];            
                return $name.",<br/> ".$size."МБ,<br/> ".$mtime;
            } 
        }
    }
}
?>