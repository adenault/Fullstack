/*
	* Validation
	* @Version 1.0.0 2013-05-30
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	var iSize;
	/*
		Validate Regex Input
	*/
	$.validate = function(input,type){

		var reg = {
				'email': /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
				'ip':/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
				'number':/\d+/,
				'phone':/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
				'zip':/^\d{5}$|^\d{5}-\d{4}$/,
				'url':/^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{3,6}$/i,
				'youtube':/((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9\-\.]+)\/?/,
				'weakpass': /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
				'strongpass':/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
		};
		
		var re;	
		switch (type) {
			case "email":
				re = reg.email;
				break;
			case "ip":
				re = reg.ip;
				break;
			case "number":
				re = reg.number;
				break;
			case "phone":
				re = reg.phone;
				break;
			case "zip":
				re = reg.zip;
				break;
			case "url":
				re = reg.url;
				break;
			case "youtube":
				re = reg.youtube;
				break;	
			case "weakpass":
				re = reg.weakpass;
				break;	
			case "strongpass":
				re = reg.strongpass;
				break;
			case "filesize":
				if($.browser.msie)
				{
					var objFSO = new ActiveXObject("Scripting.FileSystemObject");
					var sPath = $("#"+ input)[0].value;
					var objFile = objFSO.getFile(sPath);
					iSize = objFile.size;
					iSize = iSize/ 1024;
				}
				else
					iSize = ($("#"+ input)[0].files[0].size / 1024);

					
				iSize = Math.round((iSize / 1024) * 100) / 100;
				return iSize;

		}
		return re.test(input);
	};

	
	
}(jQuery));
