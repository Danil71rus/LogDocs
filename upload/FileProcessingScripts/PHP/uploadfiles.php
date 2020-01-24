<?php
include_once("../../../sys.php");
session_start();
    

 

	$uploaddir = dirname($_SERVER['SCRIPT_FILENAME'])."../../../../Doc/".$_SESSION['dir']."/";


	// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
	// of $_FILES.

	//trying restore browser cookie
	if(isset($_POST['MultiPowUpload_browserCookie']))
	{
        
        
		$cookies = explode(";", $_POST['MultiPowUpload_browserCookie']);
		foreach($cookies as $value)
		{
			$namevalcookies = explode("=", $value);	
			$browsercookie[trim($namevalcookies[0])] =  trim($namevalcookies[1]);
		}
		$_COOKIE = $browsercookie;
	}
	//restore session if possible
	if(isset($browsercookie) && isset($browsercookie['PHPSESSID']))
	{	
		session_id($browsercookie['PHPSESSID']);
		session_start();          
	}
	//Flash send file name in UTF-8 encoding. And in most cases you need not any conversion.
	//But php for Windows have bug related to file name encoding in move_uploaded_file function.
	// http://bugs.php.net/bug.php?id=47096

	// If you use file names in national encodings, change the $uploadfile assignment consider
	// encoding conversion by functions 'iconv()' or 'mb_convert_encoding()' as shown below:
	//$target_encoding = "ISO-8859-1";
	// $uploadfile = $uploaddir . mb_convert_encoding(basename($arrfile['name']), $target_encoding , 'UTF-8');
	// $uploadfile = $uploaddir . iconv("UTF-8", $target_encoding,basename($arrfile['name']));
	
	if(count($_FILES) > 0)
	{   
		$arrfile = pos($_FILES);
		//$uploadfile = $uploaddir . basename($arrfile['name']);
        $uploadfile = $uploaddir . iconv("UTF-8", $target_encoding,basename(rus2translit($arrfile['name'])));
        
         Db::query("UPDATE `".$_SESSION['tb']->Sql->Table."` SET `file` = 'Doc/".$_SESSION['dir']."/".rus2translit($arrfile['name'])."' WHERE `id` = ".$_SESSION['id'].";",true);
        
        
		if (move_uploaded_file($arrfile['tmp_name'], $uploadfile))
		   echo "File " . basename($arrfile['name']) . " was successfully uploaded.";
	}
	echo '<br>'; // At least one symbol should be sent to response!!!




function rus2translit($string) {
    $converter = array(
        'а' => 'a',   'б' => 'b',   'в' => 'v',
        'г' => 'g',   'д' => 'd',   'е' => 'e',
        'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
        'и' => 'i',   'й' => 'y',   'к' => 'k',
        'л' => 'l',   'м' => 'm',   'н' => 'n',
        'о' => 'o',   'п' => 'p',   'р' => 'r',
        'с' => 's',   'т' => 't',   'у' => 'u',
        'ф' => 'f',   'х' => 'h',   'ц' => 'c',
        'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
        'ь' => '`',  'ы' => 'y',   'ъ' => '`',
        'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
        
        'А' => 'A',   'Б' => 'B',   'В' => 'V',
        'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
        'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
        'И' => 'I',   'Й' => 'Y',   'К' => 'K',
        'Л' => 'L',   'М' => 'M',   'Н' => 'N',
        'О' => 'O',   'П' => 'P',   'Р' => 'R',
        'С' => 'S',   'Т' => 'T',   'У' => 'U',
        'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
        'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
        'Ь' => '`',  'Ы' => 'Y',   'Ъ' => '`',
        'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
    );
    return strtr($string, $converter);
}

?> 