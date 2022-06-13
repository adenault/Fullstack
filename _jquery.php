<?php

/*
	* Houston County Commission
	* @Version 4.0.0
	* Developed by: Ami Denault
*/
require_once 'core/init.php';
require_once 'libs/default.jquery.php';
require_once 'libs/dynuploader.jquery.php';
//Include Other Jquery Libraries

//******************************************************************//
//------------------------JQUERY ACTION-----------------------------//
//******************************************************************//
class Jquery
{
	function __construct()
	{

		dynuploader::dynuploader();
        //Call Other Jquery Functions
	}

};
$jquery = new Jquery();
