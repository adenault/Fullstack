<script type="text/javascript">
	$(function(){
		$('#file-title').focus();
	});
</script>
<div id="bb-modal">
    <div class="bb-modal open">
	<span class="bb-close"></span>
        <div class="bb-modal-header">File Manager</div>
        <div class="bb-modal-body">
			<div style="display:none;" class="bb-modal-type" data-type="file"></div>
            <div class="bb-modal-tabs">
				<a href="javascript:void(0)" rel="Upload" class="active">Upload</a>
				<a href="javascript:void(0)" rel="Choose">Choose</a>
			</div>
            
			<div class="bb-modal-tab" data-model-toggle="Upload">
                <form action="">
                    <div class="form-item">
                        <label for="file-title"> Name <span class="modal-desc">(optional)</span></label>
                        <input type="text" id="file-title" name="title"> </div>
                    <input type="file" name="file" multiple="multiple" style="display: none;">
                    <div class="bb-drag-box">
                        <div class="bb-upload-label">Drop files here or click to upload</div>
                    </div>
                </form>
            </div>
			
            <div data-model-toggle="Choose" class="bb-modal-tab" style="display: none;">
                <ul id="bb-file-list">
                    <li><a href="javascript:void(0)" data-params="file"><span class="modal-display-name">File 1</span><span class="modal-file-name">1.jpg</span><span class="modal-file-size">(301Kb)</span></a></li>
				</ul>
            </div>
        </div>
        <div class="bb-modal-footer"></div>
    </div>
</div>
<div id="bb-overlay"></div>
