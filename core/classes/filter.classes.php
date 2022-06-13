<?php
/*
	* Filter Class Set
	* @Version 1.0.0
	* Developed by: Ami (亜美) Denault
*/
/*
	* Filter
	* @Since 4.5.1
*/

declare(strict_types=1);

class filter
{

    /*
	* Filter Terms to Boolean
	* @Since 4.0.2
	* @Param (String Variable)
*/
    public static function bool(string $variable): bool
    {
        $yesList = ['ok', 'y', 'yes', 'true', 't', 'on', '1', '+'];

        $variable = str::_tolower($variable);

        if (arr::in($variable, $yesList))
            return true;

        return false;
    }
}
