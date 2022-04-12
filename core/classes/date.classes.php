<?php
/*
	* Setup Date Class
	* @Version 1.2.1
	* Developed by: Ami (亜美) Denault
*/

declare(strict_types=1);
class Date
{

    public const SQL_FORMAT = 'Y-m-d H:i:s';
    public const ZOOM_FORMAT = 'm/d/Y h:i A';
    public const HUMAN_FORMAT = 'm-d-Y H:i:s';


    /*
	* Date To Custom Format
	* @Since 1.0.0
	* @Param (String Date,String TimeZone)
*/
    public static function setup(string $time = null,string $timeZone = null): DateTime
    {
        $timeZone = self::timezone($timeZone);

        if ($time instanceof DateTime)
            return $time->setTimezone($timeZone);


        $dateTime = new DateTime('@' . self::_toTimeStamp($time));
        $dateTime->setTimezone($timeZone);

        return $dateTime;
    }

    /*
	* Date To Human Format
	* @Since 1.0.0
	* @Param (String Date)
*/
    public static function _human(mixed $date): string
    {
        return self::setup($date)->format(self::HUMAN_FORMAT);
    }

    /*
	* Date To Formal Human Format
	* @Since 1.0.0
	* @Param (String Date)
*/
    public static function _formal(mixed $date): string
    {
        return self::setup($date)->format('jS \of F Y');
    }

    /*
	* Date To SQL Format
	* @Since 1.0.0
	* @Param (String Date)
*/
    public static function _sql(mixed $date): string
    {
        return self::setup($date)->format(self::SQL_FORMAT);
    }

    /*
	* Date To Custom Format
	* @Since 1.0.0
	* @Param (Date,String format)
*/
    public static function _custom(mixed $date,string $format = 'm-d-Y H:i:s'): string
    {
        return self::setup($date)->format($format);
    }

    /* 
	* Date To Zoom Format
	* @Since 1.0.0
	* @Param (String Date)
*/
    public static function _Zoom(mixed $date): string
    {
        return self::setup($date)->format(self::ZOOM_FORMAT);
    }

    /*
	* Date To Custom Format
	* @Since 1.0.0
	* @Param (String Date,Bool DefaultFormat)
*/
    public static function _toTimeStamp(string $time = null, bool $currentIsDefault = true): int
    {
        if ($time instanceof DateTime)
            return cast::_int($time->format('U'));

        if (null !== $time)
            $time = is_numeric($time) ? cast::_int($time) : cast::_int(strtotime($time));

        if (!$time)
            $time = $currentIsDefault ? time() : 0;

        return $time;
    }

    /*
	* TimeZone Set
	* @Since 1.0.0
	* @Param (String TimeZone)
*/
    public static function timezone(string $timezone = null): DateTimeZone
    {
        if ($timezone instanceof DateTimeZone) {
            return $timezone;
        }

        $timezone = $timezone ?: date_default_timezone_get();

        return new DateTimeZone($timezone);
    }

    /*
	* Is TimeStamp
	* @Since 1.0.0
	* @Param (?String TimeZone)
*/
    public static function is(?string $date): bool
    {
        return strtotime(cast::_string($date)) > 0;
    }

    /*
	* Convert Numerical to Month
	* @Since 1.2.2
	* @Param (String)
*/
    public static function toMonthName(int $intMonth): string
    {
        return self::setup('2020-' . $intMonth . -'01')->format('n');
    }

/*
	* Check if Date is in Given Rage
	* @Since 1.2.1
	* @Param (String Date,String EndDate, String Given Date)
*/
    public static function inRange (string $start_date, string $end_date, string $date_from_user):bool {
        $start_ts = strtotime(self::_sql($start_date));
        $end_ts = strtotime(self::_sql($end_date));
        $user_ts = strtotime(self::_sql($date_from_user));
        return (($user_ts >= $start_ts) && ($user_ts <= $end_ts));
    }

/*
	* Get Date/Time Difference
	* @Since 1.2.1
	* @Param (String)
*/
    public static function getDatesTimeDiff (string $from, string $to):string {
        $from_t = strtotime(self::_sql($from));
        $to_t = strtotime(self::_sql($to));
        $diff = $to_t - $from_t;
        return cast::_string(floor($diff/(60*60*24)));
    }
}
