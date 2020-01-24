<?php
include_once("ajax/index/for_index_Table.php");
include_once("ajax/admin/for_admin_Table.php");

$PAS_ADMIN='qwe';



class Db {	
	public static $host = 'localhost';
	public static $user = 'root';
	public static $pass = '';
	public static $dbname = 'LogDocs';
	public static $db = null;
	public static function query($query, $void = false)
	{
		if (Db::$db == null)
		{
			Db::$db = new mysqli(
				Db::$host,
				Db::$user,
				Db::$pass,
				Db::$dbname
			);
			
			Db::$db->set_charset('UTF8');
		}
		
		$res = Db::$db->query($query) or die(Db::$db->error);
		
		if (!$void)
		{
			//$res = $res->fetch_all(MYSQLI_ASSOC);
			
			$r = [];
			
			while ( $row = $res->fetch_assoc() )
				$r[] = $row;
			
			if (count($r) == 1)
				return $r[0];
			else return $r;
		}
		
	}
}



/*============================================ВСЕ ДЛЯ LogDocs====================================*/






class Sql{
     public $Table;       // таблица
     public $Query;       // Результирующий запрос    
 
     public $Count_lines; // число строк в таблице
     public $Count_lines_one_page; //число строк отображаемых на одной странице
     public $Pages;       //всего страниц
     public $Page;        // текущая страница
    
     public $Sort;        //  Сортировка
     public $Poisc;       // Where (где)  
     public $Range;       // диапазон (от __ и до __ )
    
     public function __construct($tablee=""){ 
        
            $this->Table="";
            $this->Query="";
            $this->Sort ="";
            $this->Poisc="";
            $this->Range=new Range();
            $this->Count_lines=0;
            $this->Count_lines_one_page=50;
            $this->Pages=1;
            $this->Page=1;
         
         if(!empty($tablee)){
              $this->setTable($tablee);      
         }
    }
  
   /*============Метод инициализирует запрос, если был использован пустой конструктор===========*/
    public function setTable($table){
        $this->Table=$table;  
        $count=Db::query("SELECT COUNT(*) count FROM `".$this->Table."`");
        $this->Count_lines=$count['count'];                     //сколь строк в данной таблице
      
        $pages=$this->Count_lines/$this->Count_lines_one_page;  
        $this->Pages=ceil($pages);                              //округляем в большую сторону          
        
        $this->setPage($this->Page,false);                      //устанавливаем страницу   
        $this->setSort("up",'Дата отправки',false);
        $this->UpdateRequest();                                   //обновляем запрос
    }
    public function setPage($page,$update=true){
        $this->Page=$page;
        if( $this->Page<=$this->Pages &  $this->Page>0){
            $temp_page=( $this->Page-1)*$this->Count_lines_one_page;
            $this->Range->set($temp_page,$this->Count_lines_one_page);     //отображение по стандарту 
        }
        else 
            echo "Такой странице нет! Вышли за предел";//иначе ошибка вышли за предел        
        if($update){
            $this->UpdateRequest();   
        }
    }
    public function UpdateRequest(){        
        $this->Query="SELECT * FROM (SELECT * FROM `".$this->Table."` ".$this->Sort.") e ".$this->Poisc. " ".$this->Range->get();
    }
    
    /*=====По стандарту сортируется по "Дата отправки" и по стандарту обновляет запрос=======*/
    public function setSort($napravl,$column_name='Дата отправки',$update=true){
        if($napravl=="up"){
          $this->Sort="ORDER BY `".$column_name."`";   
        }else  if($napravl=="down"){
          $this->Sort="ORDER BY `".$column_name."` DESC ";   
        }    
        if($update){
            $this->UpdateRequest();   
        } 
    }
    
    public function setPoisc($colum_name,$val,$DIAPASON_TIME=""){  
        if(empty($DIAPASON_TIME)){
            if(!empty($colum_name) & !empty($val)){
            $this->Poisc="where `".$colum_name."` LIKE '%".$val."%'";
            }
            else {
                $this->Poisc="";
            }
        }
        else {
           $this->Poisc="where ".$DIAPASON_TIME." "; 
        }
         $row=Db::query("SELECT COUNT(*) count FROM (SELECT * FROM `".$this->Table."` ".$this->Sort.") e ".$this->Poisc. " ".$this->Range->get());
         $row=$row['count'];
        
         $this->Count_lines=$row;
         $pages=$this->Count_lines/$this->Count_lines_one_page;  
         $this->Pages=ceil($pages);                              //округляем в большую сторону          
         
         $this->setPage($this->Page,false);                      //устанавливаем страницу   
         //$this->setSort("up",'Дата отправки',false);
        
        $this->UpdateRequest();
    }
}

class Range{
    public $start;
    public $count_lines;
    public function __construct(){
        $this->start=0;
        $this->count_lines=0;
    }
    public function set($start,$count_lines){
        $this->start=$start;
        $this->count_lines=$count_lines;
    }
    public function get(){
        return "LIMIT ".$this->start.",".$this->count_lines;
    }
}
/*============================================The End============================================================*/





function count_users()
{
    $id = session_id();
if ($id!="")
{
 $CurrentTime = time();
 $LastTime = time() - 200;
 $base = "session.txt";

 $file = file($base);
 $k = 0;

 for ($i = 0; $i < sizeof($file); $i++) {
  $line = explode("|", $file[$i]);
   if ($line[1] > $LastTime) {
   $ResFile[$k] = $file[$i];
   $k++;
  }
 }
 for ($i = 0; $i<sizeof($ResFile); $i++) {
  $line = explode("|", $ResFile[$i]);
  if ($line[0]==$id) {
      $line[1] = trim($CurrentTime)."\n";
      $is_sid_in_file = 1;
  }
  $line = implode("|", $line); $ResFile[$i] = $line;
 }
 $fp = fopen($base, "w");
 for ($i = 0; $i<sizeof($ResFile); $i++) { fputs($fp, $ResFile[$i]); }
 fclose($fp);
 if (!$is_sid_in_file) {
  $fp = fopen($base, "a-");
  $line = $id."|".$CurrentTime."\n";
  fputs($fp, $line);
  fclose($fp);
 }
}
     echo "Онлайн: <b style='color: #FFD98C;' >".sizeof(file($base))."</b><br/>";
}
?>