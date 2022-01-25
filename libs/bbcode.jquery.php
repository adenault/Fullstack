<?php

require_once 'core/init.php';
$output_dir = "/content/uploads/";

if(Input::get("action")) { 
	$action = Input::get("action");
	
	switch($action) { 
		case "file": 
		case "image": 
			get_files($action); 
			break;
	}
}
else if(isset($_FILES["file"]))
{
		
	if ($_FILES["file"]["error"] > 0)
		echo "Error: " . $_FILES["file"]["error"];
	else
	{

		$extension = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
		$file_name = pathinfo($_FILES['file']['name'], PATHINFO_FILENAME) . generateRandomString(0,10) .'.'.$extension;

		move_uploaded_file($_FILES["file"]["tmp_name"],$output_dir. $file_name);
		echo "Uploaded File :".$_FILES["file"]["name"];
	}
}

function generateRandomString(){
	$randstr = "";			
	for($i=0; $i<45; $i++){											
		$randnum = mt_rand(0,61);
		if($randnum < 10)	
			$randstr .= chr($randnum+48);
		else if($randnum < 36)			
			$randstr .= chr($randnum+55);	
		else								
			$randstr .= chr($randnum+61);
	}	
	return $randstr;
}

function get_files($type){
	
	$sql = "SELECT name,SUBSTRING_INDEX(file_path, '/', -1) as file_path,DATE_FORMAT(date, '%m/%d/%Y %h:%i:%s') as date_time FROM file WHERE type = '".$type ."' ORDER BY date DESC,name ASC;";
	$aryFiles = array();
	
	$files = Database::getInstance()->query($sql);
	
	if($files->count() > 0){
		
        $aryFiles['status'] = 'ok';
        $aryFiles['result'] = (array)$files->results();
    }else{
        $aryFiles['status'] = 'err';
        $aryFiles['result'] = '';
    }
  echo json_encode($aryFiles);
}
?>