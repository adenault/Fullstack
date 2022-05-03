<?php
/*
	* Logger Class Set
	* @Version 4.0.0
	* Developed by: Ami (亜美) Denault
*/
/*
	* Setup Logger Class
	* @since 4.0.0
*/

declare(strict_types=1);

class Logger
{
    private static $log_file = '';

    public static function write($items = array(),$log_file = null){

        if(is_null($log_file))
            self::$log_file = $_SERVER['DOCUMENT_ROOT'] . '/'. date::_custom(null,"Ydm").'.log';

        file_put_contents(self::$log_file, implode(PHP_EOL,$items). PHP_EOL, FILE_APPEND);
    }

    public static function errors($log_file = null)
	{
        if(is_null($log_file))
            self::$log_file = $_SERVER['DOCUMENT_ROOT'] . '/'. date::_custom("Ydm").'.log';

        ini_set("log_errors", TRUE);
        ini_set('error_log', self::$log_file);
	}


}
