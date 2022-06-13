<?php
/*
	* Houston County Commission
	* @Version 1.0.0
	* Developed by: Ami (亜美) Denault
	* dynuploader
*/

//require_once 'core/init.php';

class dynuploader{
/*
	Dynamic Upload System
*/
	public static function dynuploader()
	{
		if (Input::get('ajaxClearFile'))
			self::procAjaxClearFile();
		else if (Input::get('ajaxUploadFile'))
			self::procAjaxUploadFile();
		else if (Input::get('ajaxMoveFile'))
			self::procAjaxMoveFile();

		else
			echo "Unable to view page.";
	}



	/*
		Dynamic Upload System
	*/
	private static function procAjaxClearFile()
	{
		Uploader::ajax_clear_file($_POST['file_name']);
	}

	private static function procAjaxUploadFile()
	{
		Uploader::ajax_upload_file($_POST['file'], $_POST['file_data']);
	}

	private static function procAjaxMoveFile()
	{
		$pre_file = time();
		if (isset($_POST['pre_file']) && !empty($_POST['pre_file']))
			$pre_file = $_POST['pre_file'];

		Uploader::ajax_move_file($_POST['file_name'], $pre_file);
	}

};
$dynuploader = new dynuploader;
