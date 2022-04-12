<?php
/*
	* Houston County Commission
	* @Version 1.0.0
	* Developed by: Ami (亜美) Denault
	* dynuploader
*/
require_once 'core/init.php';

class dynuploader
{
/*
	Dynamic Upload System
*/
	function __construct()
	{
		if (Input::get('ajaxClearFile'))
			$this->procAjaxClearFile();
		else if (Input::get('ajaxUploadFile'))
			$this->procAjaxUploadFile();
		else if (Input::get('ajaxMoveFile'))
			$this->procAjaxMoveFile();

		else
			echo "Unable to view page.";
	}



	/*
		Dynamic Upload System
	*/
	private function procAjaxClearFile()
	{
		Uploader::ajax_clear_file($_POST['file_name']);
	}

	private function procAjaxUploadFile()
	{
		Uploader::ajax_upload_file($_POST['file'], $_POST['file_data']);
	}

	private function procAjaxMoveFile()
	{
		$pre_file = time();
		if (isset($_POST['pre_file']) && !empty($_POST['pre_file']))
			$pre_file = $_POST['pre_file'];

		Uploader::ajax_move_file($_POST['file_name'], $pre_file);
	}

};
$dynuploader = new dynuploader;
