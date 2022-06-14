<?php
/*
	* LDAP Class Set
	* @Version 1.0.0
	* Developed by: Ami (亜美) Denault
	* Coded on: 13th June 2022
*/

/*
	* Setup Ldap Class
	* @since 4.1.6
*/


class LDAP
{

/*
	* Private Static Variables
	* @since 4.1.6
*/
    private static  $_instance = null;

    private
        $_error = false,
		$_errormsg = '',
        $_results,
        $_count = 0,
        $ldap_connection = null;

/*
	* Construct Ldap
	* @since 4.0.0
*/
    private function __construct()
    {
        try {
            $this->ldap_connection = ldap_connect(Config::get('ldap/server'), Config::get('ldap/port'));
            ldap_set_option($this->ldap_connection, LDAP_OPT_PROTOCOL_VERSION, 3);
            ldap_set_option($this->ldap_connection, LDAP_OPT_REFERRALS, 0);
        } catch (PDOException $e) {
            $this->_errormsg = $e->getMessage();
        }
    }

/*
	* Get Instance of Ldap
	* @since 4.0.0
*/
    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new LDAP();
        }
        return self::$_instance;
    }

/*
	* LDAP Bind
	* @since 4.0.0
*/
    public function bind($username, $password)
    {
        if(ldap_bind($this->ldap_connection, $username . "@" . Config::get('ldap/basedn'), $password))
            return $this;

        return null;
    }

/*
	* LDAP Search
	* @since 4.0.0
    * @Param (String Filter, String Attributes)
*/
    public function search($filter, $attributes = array())
    {
        $sr = ldap_search($this->ldap_connection, Config::get('ldap/dn'), $filter, $attributes);

        if ($sr) {
            $this->_results = ldap_get_entries($this->ldap_connection, $sr);
            $this->_count = $this->_results["count"];
        } else {
            $this->_error = true;
        }
        return $this;
    }

/*
	* LDAP Add Record
	* @since 4.0.0
    * @Param (String Add, String Record)
*/
    public function addRecord($adddn, $record)
    {
        if (ldap_add($this->ldap_connection, $adddn, $record)) {
            return true;
        } 
        return false;
    }

/*
	* LDAP Modify Record
	* @since 4.0.0
    * @Param (String dn, String Record)
*/
    public function modifyRecord($modifydn, $record)
    {
        if (ldap_modify($this->ldap_connection, $modifydn, $record)) {
            return true;
        } 
        return false;
    }

/*
	* LDAP Delete Record
	* @since 4.0.0
    * @Param (String dn, String Recursive)
*/
    public function deleteRecord($dn, $recursive = false)
    {
        if ($recursive == false) {
            return (ldap_delete($this->ldap_connection, $dn));
        } else {
            $sr = ldap_list($this->ldap_connection, $dn, "ObjectClass=*", array(""));
            $info = ldap_get_entries($this->ldap_connection, $sr);

            for ($i = 0; $i < $info['count']; $i++) {
                $result = myldap_delete($this->ldap_connection, $info[$i]['dn'], $recursive);
                if (!$result) {
                    return ($result);
                }
            }
            return (ldap_delete($this->ldap_connection, $dn));
        }
    }

/*
	* LDAP Close Results
	* @since 4.0.0
*/
    public function close()
    {
        ldap_close($this->ldap_connection);
    }

/*
	* LDAP Get Results
	* @since 4.0.0
*/
    public function results()
    {
        return $this->_results;
    }

/*
	* Return Error Message
	* @Since 4.4.7
*/
	public function errorMsg(): object
	{
		$errorMsg = new StdClass();
		$errorMsg->message = (object) $this->_errormsg;
		return $errorMsg;
	}

/*
	* LDAP Error
	* @since 4.0.0
*/
    public function error()
    {
        return $this->_error;
    }

/*
	* LDAP Get Count
	* @since 4.0.0
*/
    public function count()
    {
        return $this->_count;
    }
}
