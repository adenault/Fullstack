/*
	* BBcode
	* @Version 1.0.0 2022-01-19
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/


/*jshint esversion: 6 */
(function (e) {
	var UPLOAD_LOC = '/content/uploads/';
	
	e.fn.BBCode = function (options) {
		var that = $(this);
		
		var that_class = that.attr('class');
		
		var that_id = that.attr('id');
		
		
		var content = that.html();
		
		var encodeContent = content;
		
		var decodeContent = decodeHtmlEntity(content);
		var parent = that.parent();
		var divSelection = { start:0,end:0,text:"",thatid:""};
		var rowCount	=	0;
		var default_url ="/content/tpl/bbcode";
		
		$.get(default_url + '/template.tpl', function(data) {
			that.remove();
			parent.append(data);
			
			$('.bb-source').attr('id',that_id);
			$('#' + that_id).html(encodeContent);
			$('#' + that_id).attr('class',that_class);
			//$('.bb-bounding-styles').html(decodeContent);
			divSelection = getSelectionRange();
		});
		
		var settings = $.extend(
			{
				"alignment":true,
				"style":true,
				"fontsize":true,
				"fontfamily":true,
				"fontcolor":true,
				"images":false,
				"files":false,
				"link":false,
				"table":false,
				"videos":false,
				"scripts":true,
				"list":true,
				"strike":true,
				"symbols":false
			}, options);
	
		
		$.each(settings, function( key, value ) {
			setTimeout(
				function(){
					if(value){
						$.get(default_url + '/toolbar-'+ key +'.tpl').done(function(data) {
							$('.bbcode-toolbar').append(data);
						});
					}
				},250);
		});
		
		
		$(document).on('keyup','.bb-bounding-styles',function(){
			if (content!=$(this).html()){
				var replace_html = $(this).html();
				content = replace_html;
				$('.'+ that_class).text(replace_html);
			}
		});
		
		$(document).on('mouseup keyup touchend','#content',function(){
			  divSelection = getSelectionRange();
		});

		
		$(document).on('click','.bb-button-icon',function(){
			var item = $(this).attr('aria-label').toLowerCase();	
			
			switch(item){
				case "center":
				case "left":
				case "right":
				case "bold":
				case "italic":
				case "underline":
				case "strike":
				case "sub":
				case "sup":
					wrapBBCode(item);
					break;
				case "image":
				case "file":
				case "link":
				case "video":
				case "table-panel":
				case "list-panel":
					modelLoad(item);
					break;	
			}
		});
	
		$(document).on('click','.bb-dropdown span, .bb-dropdown a',function(){
			
			var item = $(this).attr('data-rule');
			var rel = $(this).attr('rel');
			switch(item){
				case "color":
				case "highlight":
				case "font":
				case "size":
					wrapBBCode(item,rel);
					break;
				case "special":
					insertBBCode(item,rel);
					break;
			}
		});
		
		$(document).on('click','.bb-modal-tabs a',function(){
			var that = $(this);
			
			that.parent().find('a').each(function(index,element) {
				$(this).removeClass("active");
			});
			that.toggleClass("active");
			var item = that.attr('rel');	
			$('[data-model-toggle]').hide();
			$('[data-model-toggle*="' + item + '"]').toggle();
		});
	
		$(document).on('click','.bb-close',function(){
			$('#bb-overlay,#bb-modal').fadeOut(300, function() { $(this).remove(); });
		});
	
		$(document).on('click','#bb-modal', function(e) {
			  if (e.target !== this)
				return;
			$('.bb-close').click();
		});
	
		
		$(document).on('click','.btnColour',function(){
			$(this).addClass('active');
			$('.re-dropdown-box-textcolor').show();
			$('.btnHighlight').removeClass('active');
			$('.re-dropdown-box-backcolor').hide();
		});
		
		$(document).on('click','.btnHighlight',function(){
			$(this).addClass('active');
			$('.re-dropdown-box-backcolor').show();
			$('.btnColour').removeClass('active');
			$('.re-dropdown-box-textcolor').hide();
		});
		
		$(document).on('click','img[data-rule="image"]',function(){
			var item = $(this).attr('data-rule');
			var rel = $(this).attr('rel');
			wrapBBCode(item,rel);
			$('.bb-close').click();
		});
		
		$(document).on('click','button[data-rule="link"]',function(){
			
			var item = $(this).attr('data-rule');
			var url = $("#link-url").val();
			var text = $("#link-text").val();
			var isChecked = false;
			if ($('#link-tab').is(':checked')) 
				isChecked = true;
			
			
			if(url.length > 0 && validateURL(url)){
				wrapBBCode(item,url,text,isChecked);
				$('.bb-close').click();
			}
			else
				$('.link-error').css({'display':'block'});
		});
		
		$(document).on('click','button[data-rule="youtube"]',function(){
			var item = $(this).attr('data-rule');
			var url = $("#modal-video-input").val();
			
			
			if(url.length > 0 && ytVidId(url)){
				wrapBBCode(item,url);
				$('.bb-close').click();
			}
			else
				$('.link-error').css({'display':'block'});
		});
		
		$(document).on('click','button[data-rule="table-panel"]',function(){
			var rows = $('#cmbRows').val();
			var columns = $('#cmbColumns').val();
			//Remove Insert Table
			$('.bb-close').click();
			
			//Call New Table
			$.get(default_url + '/table-template.tpl', function(data) {
				html=data;
				$(html).appendTo("body").fadeIn(300);
				
				makeTable($('#tableobj'), rows,columns);
			});
			
			
		});
		$(document).on('click','button[data-rule="table"]',function(){
			var rows = $('#bbcode_table').attr('data-rows');
			
			var ins = '[table='+rows+']';
			var t = 1;
			$('#bbcode_table td textarea').each(function(){
				if(t < rows)
					ins += $(this).val() + '[c]';
				else
					ins += $(this).val();
				
				t++;
			});
			ins +='[/table]';
	
			focusOn();
			
			if (window.getSelection) {
				divSelection.thatid.value = divSelection.thatid.value.substring(0, divSelection.start) + ins + divSelection.thatid.value.substring(divSelection.start, divSelection.thatid.value.length);
				divSelection.thatid.setSelectionRange(divSelection.end + ins.length, divSelection.end  + ins.length);
			}
			else if (document.selection){
				var selectedRange = document.selection.createRange();
				selectedRange.moveStart ('character', - divSelection.thatid.value.length);
				sel.text = ins;
				sel.moveStart('character', selectedRange.text.length + ins.length - divSelection.thatid.length);
			}
			divSelection = getSelectionRange();
	
	
	
			$('.bb-close').click();

		});
		
		$(document).on('click','button[data-rule="list"]',function(){
			var style = $('#bbcode_list').attr('data-style');
			var ins = '[list=' +style + ']';
			$('#bbcode_list li textarea').each(function(){
				ins += '[*]' + $(this).val();
			});
			ins +='[/list]';
	
			focusOn();
			
			if (window.getSelection) {
				divSelection.thatid.value = divSelection.thatid.value.substring(0, divSelection.start) + ins + divSelection.thatid.value.substring(divSelection.start, divSelection.thatid.value.length);
				divSelection.thatid.setSelectionRange(divSelection.end + ins.length, divSelection.end  + ins.length);
			}
			else if (document.selection){
				var selectedRange = document.selection.createRange();
				selectedRange.moveStart ('character', - divSelection.thatid.value.length);
				sel.text = ins;
				sel.moveStart('character', selectedRange.text.length + ins.length - divSelection.thatid.length);
			}
			divSelection = getSelectionRange();
	
	
	
			$('.bb-close').click();

		});
		
		
		$(document).on('click','button[data-rule="list-panel"]',function(){
			var rows = $('#cmbRows').val();

			//Remove Insert Table
			$('.bb-close').click();
			
			//Call New Table
			$.get(default_url + '/themes/list-template.tpl', function(data) {
				html=data;
				$(html).appendTo("body").fadeIn(300);
				makeList($('#listobj'), $('#bbcode_list_option').val(),rows);
			});
			
			
		});
		$(document).on('click','a[data-rule="file"]',function(){
			var item = $(this).attr('data-rule');
			var rel = $(this).attr('rel');
			var inner = $(this).find(".modal-display-name").html();
			wrapBBCode(item,rel,inner);
			$('.bb-close').click();

		});
		
		$(document).on('click','button[data-command="cancel"]',function(){
			$('.bb-close').click();
		});
		
		$(document).on('keypress','#link-url',function(event){
			if($(this).val().length > - 1)
				$('.link-error').hide();
		});
		
		
		function makeList(container, style,row) {
			var type = (style =='bullet'?'u':'o');
			var list = $("<" + type + "l/>").addClass("insertUl").attr('id','bbcode_list').attr('data-style',style).css({'list-style-type':style});
			for(r = 0;r < row;r++){
				list.append($("<li><textarea></textarea></li>"));
			}
			return container.append(list);
		}
		
		function makeTable(container, row,column) {
			
			var table = $("<table/>").addClass("insertTable").attr('id','bbcode_table').attr('data-rows',row);
			
			
			for(r = 0;r < row;r++){
				var rowdata = $("<tr/>");
				for(c = 0;c < column ;c++){
					rowdata.append($("<td><textarea></textarea></td>"));
				}
				table.append(rowdata);
			}
			return container.append(table);
		}


		function ytVidId(url) {
		  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		  return (url.match(p)) ? RegExp.$1 : false;
		}
		function focusOn(){
			if (divSelection.thatid.length == 0) {

				$('#' + that_id).focus();
				var data = $('#' + that_id).val();
				
				$('#' + that_id).focus().val('').val(data);
				divSelection = getSelectionRange();
				
			}
		
		}
		function validateURL(textval) {
			var urlregex = new RegExp( "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
			return urlregex.test(textval);
		}
		
		function wrapBBCode(item,option=null,inner=null,isChecked=false){
			
			var ins = '[' + item + ']' + divSelection.text + '[/' + item +']';
			
			if(item =="link" || item == "url")
				ins = '[' + item + '=' + option +  (isChecked === true ? ' option=new_page' : '') +  ']' +(inner.length > 0 ? inner : option) + '[/' + item +']';
			else if(inner !== null)
				ins = '[' + item + '=' + option +']' +inner + '[/' + item +']';
			else{
				if (option !== undefined && option !== null) {
					if(item === "image" || item =="youtube")
						ins = '[' + item  +']' + option + '[/' + item +']';
					
					else
						ins = '[' + item + '=' + option +']' + divSelection.text + '[/' + item +']';
				}
			}
			
			focusOn();
			if (window.getSelection) {
				divSelection.thatid.value = divSelection.thatid.value.substring(0, divSelection.start) + ins + divSelection.thatid.value.substring(divSelection.end, divSelection.thatid.value.length);
				divSelection.thatid.setSelectionRange(divSelection.end + ins.length, divSelection.end + ins.length - divSelection.text.length);
			}
			else if (document.selection){
				var selectedRange = document.selection.createRange();
				selectedRange.moveStart ('character', - divSelection.thatid.value.length);
				sel.text = ins;
				sel.moveStart('character', selectedRange.text.length + ins.length - divSelection.thatid.length);
			}
			  divSelection = getSelectionRange();
		}
		
		function insertBBCode(item,option){
		
			var ins = "&" + option + ";";
			
			focusOn();
			
			if (window.getSelection) {
				divSelection.thatid.value = divSelection.thatid.value.substring(0, divSelection.start) + ins + divSelection.thatid.value.substring(divSelection.start, divSelection.thatid.value.length);
				divSelection.thatid.setSelectionRange(divSelection.end + ins.length, divSelection.end + ins.length);
			}
			else if (document.selection){
				var selectedRange = document.selection.createRange();
				selectedRange.moveStart ('character', - divSelection.thatid.value.length);
				sel.text = ins;
				sel.moveStart('character', selectedRange.text.length + ins.length - divSelection.thatid.length);
			}
			divSelection = getSelectionRange();
		}
		
		function trimcode(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		}

		function getSelectionRange() {
			var sel;
			var thatid = document.getElementById(that_id);
			
			if (window.getSelection) {
			
				sel = window.getSelection();
				return {
					text : trimcode(thatid.value.substring(thatid.selectionStart, thatid.selectionEnd)),
					start: thatid.selectionStart,
					end: thatid.selectionEnd,
					thatid:thatid
				};
			}
			else if (document.selection){
				return {
					text : trimcode(document.selection.createRange().text),
					start: 0,
					end: 0,
					thatid:thatid
				};
			}
			return null;
		}
		
		function encodeHtmlEntity(str) {
		  return str.replace(/[\u00A0-\u9999<>\&]/gim, function(c){
			return '&#' + c.charCodeAt(0) + ';' ;
		  });
		}
		
		function decodeHtmlEntity(str)
		{
			var map =
			{
				'&amp;': '&',
				'&lt;': '<',
				'&gt;': '>',
				'&quot;': '"',
				'&#039;': "'"
			};
			return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
		}
	
	
		function modelLoad(type){
			var html;
			var liHTML='';
			$.get(default_url + '/themes/'+ type +'-template.tpl', function(data) {
				html=data;
				$(html).appendTo("body").fadeIn(300);
				
				$.ajax({
				  type: "POST",
				  dataType: "json",
				  url: "/bbcode.jquery.php", 
				  data: {"action": type},
				  success: function(data) {
					switch(type){
						case "file":

							if(data.status == 'ok'){
								$.each(data.result, function(index, element) {
									liHTML += '<li><a href="#" data-rule="' + type + '" rel="' + UPLOAD_LOC + element.file_path + '"><span class="modal-display-name">' + element.name  + '</span><br/><span class="modal-file-name">'+ element.date_time + '</span></a></li>';
								});
							}
							$('#bb-file-list').html(liHTML);
							break;
						case "image":
							if(data.status == 'ok'){
								$.each(data.result, function(index, element) {
									liHTML += '<img data-rule="' + type + '" rel="' + UPLOAD_LOC + element.file_path + '" src="/content/uploads/' + element.file_path + '" alt="'+ element.name +'">';
								});
								$('.bb-modal-imagelist').html(liHTML);
							}
							break;
					}
				  }
				});
			}); 
		}
		
		
		
		
		var obj = $(".bb-drag-box,.bb-upload-label");
	
		$(document).on('dragenter',obj,function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).css('border', '2px dotted #0B85A1');
		});

		$(document).on('dragover',obj,function(e){
			 e.stopPropagation();
			 e.preventDefault();
		});

		$(document).on('drop',obj,function(e){
			 $(this).css('border', '2px dotted #0B85A1');
			 e.preventDefault();
			 var files = e.originalEvent.dataTransfer.files;
			 handleFileUpload(files,obj);
			
		});
		
		$(document).on('dragenter', function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
		});
		$(document).on('dragover', function (e) 
		{
		  e.stopPropagation();
		  e.preventDefault();
		});
		$(document).on('drop', function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
		});
		
		
		function sendFileToServer(formData,status)
		{
			formData.append('type', $('.bb-modal-type').attr('data-type'));
			formData.append('title', ($('#file-title').val()?$('#file-title').val():'null'));
			var extraData ={}; 
			var jqXHR=
				$.ajax({
					xhr: function() {
							var xhrobj = $.ajaxSettings.xhr();
							if (xhrobj.upload) {
									xhrobj.upload.addEventListener('progress', function(event) {
										var percent = 0;
										var position = event.loaded || event.position;
										var total = event.total;
										if (event.lengthComputable) {
											percent = Math.ceil(position / total * 100);
										}
										status.setProgress(percent);
									}, false);
								}
							return xhrobj;
						},
					url:  '/libs/bbcode.jquery.php',
					type: "POST",
					contentType:false,
					dataType: "json",
					processData: false,
					cache: false,
					data: formData,
					success: function(data){
						if(data.status == 'ok'){
							status.setProgress(100);
							wrapBBCode(
								$('.bb-modal-type').attr('data-type'),data.result,$('#file-title').val()?$('#file-title').val():null
							);
							$('.bb-close').click();
						}
						else{
						
						}
					}
			}); 
		 
			status.setAbort(jqXHR);
		}
		function createStatusbar(obj)
		{
			rowCount++;
			var row="odd";
			if(rowCount %2 ==0) row ="even";
			this.statusbar = $("<div class='statusbar "+row+"'></div>");
			this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
			this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
			this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
			this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
			obj.after(this.statusbar);
		 
			this.setFileNameSize = function(name,size)
			{
				var sizeStr="";
				var sizeKB = size/1024;
				if(parseInt(sizeKB) > 1024)
				{
					var sizeMB = sizeKB/1024;
					sizeStr = sizeMB.toFixed(2)+" MB";
				}
				else
				{
					sizeStr = sizeKB.toFixed(2)+" KB";
				}
		 
				this.filename.html(name);
				this.size.html(sizeStr);
			};
			
			this.setProgress = function(progress)
			{       
				var progressBarWidth =progress*this.progressBar.width()/ 100;  
				this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
				if(parseInt(progress) >= 100)
				{
					this.abort.hide();
				}
			};
			
			this.setAbort = function(jqxhr)
			{
				var sb = this.statusbar;
				this.abort.click(function()
				{
					jqxhr.abort();
					sb.hide();
				});
			};
		}
		
		function handleFileUpload(files,obj)
		{
		   for (var i = 0; i < files.length; i++) 
		   {
				var fd = new FormData();
				fd.append('file', files[i]);
				var status = new createStatusbar(obj);
				status.setFileNameSize(files[i].name,files[i].size);
				sendFileToServer(fd,status);
		   }
		}
		
		
	};
})(jQuery);