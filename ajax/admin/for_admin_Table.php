<?php
//include_once("../sys.php");
session_start();

class Table2{
      public $Sql;
      public $Count_lines=-1;
      public function __construct($table=""){    
        $this->Sql=new Sql($table);     
    }       
    public function Show(){
         //для отображения подсказок
        echo "<script>
                  $(function () {
                    $('[data-toggle=\"tooltip\"]').tooltip({container: 'body'});
                  });
                  
                 $('div[name=select_red]').click(function(){
                    var id=Number($(this).text());
                         $.ajax({
                            type: 'POST',
                            url: 'ajax/admin/input.php',
                            cache: false,                           
                            data: {
                              input: true,
                              id: id
                            },
                            success: function(data) {                 
                               $('#content').html(data);    
                            }
                        });
                 });
                 
                 
                  $('div[name=select_del]').click(function(){
                  if(confirm('Подтвердите удаление.')){
                            var id=Number($(this).text());
                                 $.ajax({
                                    type: 'POST',
                                    url: 'ajax/admin/input.php',
                                    cache: false,                           
                                    data: {
                                      del: true,
                                      tab: '".$this->Sql->Table."',
                                      id: id
                                    },
                                    success: function(data) {                 
                                       $('#content').html(data);    
                                    }
                                }); 
                        }
                 });
                 
                 
                 
                 $('#inp_NumDoc').focus(function(){
                     $('#inp_NumDoc').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_NumDoc').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_NumDoc');
                    var datas={
                              updata_NumDoc: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                   $('#inp_Date').focus(function(){
                     $('#inp_Date').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_Date').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_Date');
                    var datas={
                              updata_Date: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                 
                 $('#inp_Comu').focus(function(){
                   $('#inp_Comu').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_Comu').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_Comu');
                    var datas={
                              updata_Comu: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                 
                 $('#inp_OtCogo').focus(function(){
                   $('#inp_OtCogo').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_OtCogo').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_OtCogo');
                    var datas={
                              updata_OtCogo: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                 
                 $('#inp_Ochem').focus(function(){
                   $('#inp_Ochem').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_Ochem').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_Ochem');
                    var datas={
                              updata_Ochem: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                 
                   $('#inp_NumCopy').focus(function(){
                   $('#inp_NumCopy').css({'border':'1px solid #66afe9'});
                 });
                 $('#inp_NumCopy').change(function(){
                    var val=$(this).val();
                    var elem=$('#inp_NumCopy');
                    var datas={
                              updata_NumCopy: true,
                              id: '".$this->Count_lines."',
                              tab: '".$this->Sql->Table."',
                              val: val
                             };
                          ajax(datas,function(data){
                               if(data=='ok'){
                                  elem.attr('placeholder',val);
                                  elem.val('');
                                  elem.css({'border':'2px solid green'});
                               }else{
                                  elem.css({'border':'2px solid red'});
                               } 
                          });  
                 });
                 
                 function ajax(datas,func){                   
                          $.ajax({
                            type: 'POST',
                            url: 'ajax/admin/input.php',
                            cache: false,                           
                            data: datas,
                            success: function(data) {
                               func(data);                                                        
                            }
                         });
                 }
             </script>";
        
         echo "<table  class='features-table' width='100%'> ";
         $tab="Входящий";
         if($this->Sql->Table=="Outgoing"){
             $tab="Исходящий";
         }
    
         echo "
               <tr>
               <th >id</th>
               <th >$tab № документа</th>
               <th >Дата отправки</th>
               <th >Кому</th>
               <th>От кого</th>
               <th colspan='2'>О чём</th>              
               <th>№ дела, в котором хранится копия</th>
               <th>Удалить</th>
               </tr> 
              "; 
         $data=Db::query($this->Sql->Query);
         if(!empty($data['id'])) $data=array($data);  // если в БД будет одна строка, то будет одномерный массив, поэтому в этом случае одномерный массив переводим в двумерный         
       
         $i=$this->numericTable();  //Нумерация
        foreach($data as $d){
           
         if($this->Count_lines==$d['id']){
              echo $this->tr_to_input($d);
           }
         else{            
            echo "<tr id='id_".$d['id']."'>
                   <td width='6%'>
                    <div class='container-fluid'>
                      <div class='row'> 
                          <div name='select_red' style='cursor: pointer;'> <div style='color: black; display: inline-block;'>".$d['id']."</div>  <i class='glyphicon glyphicon-ok' aria-hidden='true' style='color: #337ab7;'></i></div>
                      </div>
                    </div>
                   </td>
                   
                   <td width='10%'>".$d['Исходящий № документа']."</td>
                   
                   <td  width='10%' data-toggle='tooltip' data-placement='top'  title='Время отправки: ".date('H:i',strtotime($d['Дата отправки']))."'>".date("d.m.Y",strtotime($d['Дата отправки']))."</td>                  
                   
                   <td width='10%'>".$d['Кому']."</td>                   
                   <td width='10%'>".$d['От кого']."</td>                   
                   <td width='29%'>".$d['О чем']."</td> 
                   
                   <td width='5%'>
                       <a href='".$d['file']."' target='_blank' data-toggle='tooltip' data-html='true' data-placement='top'  title='".$this->getDataFile("../../".$d['file'])."'>
                        <i class='glyphicon glyphicon-file' aria-hidden='true'></i> 
                       </a>
                   </td>  
                   
                   <td width='20%'>".$d['№ дела, в котором хранится копия']."</td>
                   <td width='1%'>
                       <div class='container-fluid'>
                          <div class='row'> 
                              <div name='select_del' style='cursor: pointer;'><div style='display: none;'>".$d['id']."</div><i class='glyphicon glyphicon-remove' aria-hidden='true' style='color: red;'></i></div>
                          </div>
                        </div>
                   </td>
                 </tr> 
            ";
         }
            /*===========НУМЕРАЦИЯ======*/
            if($this->boolSort_asc($this->Sql->Sort))
                $i++;
            else 
                $i--;
            }
            /*==========================*/
        echo "</table>";  
       
    }
    /*==========ДЕЛАЕМ СТРОКУ РЕДАКТИРУЕМОЙ==========*/
    function tr_to_input($data){
        $d=$data;   
        
        $str="<tr id='id_".$d['id']."'>
                   <td width='6%'>
                    <div class='container-fluid'>
                      <div class='row'> 
                          <div name='select_red' style='cursor: pointer;'> <div style='color: black; display: inline-block;'>".$d['id']."</div>  <i class='glyphicon glyphicon-ok' aria-hidden='true' style='color: #337ab7;'></i></div>
                      <div>
                    <div>
                   </td>
                   
                   <td width='10%'><input id='inp_NumDoc' class='form-control' type='text' placeholder='".$d['Исходящий № документа']."'></td>   
                   <td  width='10%'><input id='inp_Date' class='form-control' type='date' value='".date("Y-m-d",strtotime($d['Дата отправки']))."'></td>
                   
                   <td width='10%'><input id='inp_Comu' class='form-control' type='text' placeholder='".$d['Кому']."'></td>                   
                   <td width='10%'><input id='inp_OtCogo' class='form-control' type='text' placeholder='".$d['От кого']."'></td>                   
                   <td width='28%'><input id='inp_Ochem' class='form-control' type='text' placeholder='".$d['О чем']."'></td> 
                   
                   <td width='5%'>
                       <a href='#'  data-toggle='modal' data-target='#window_modal_dowland_file'>
                        <i class='glyphicon glyphicon-paperclip' aria-hidden='true'></i> 
                       </a>
                   </td>  
                   
                   <td width='20%'><input id='inp_NumCopy' class='form-control' type='text' placeholder='".$d['№ дела, в котором хранится копия']."'></td>
                   <td width='1%'>
                        <div class='container-fluid'>
                          <div class='row'> 
                              <div name='select_del' style='cursor: pointer;'><div style='display: none;'>".$d['id']."</div><i class='glyphicon glyphicon-remove' aria-hidden='true' style='color: red;'></i></div>
                          </div>
                        </div>
                   </td>
                 </tr> 
            ";
        return $str;
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