
<div id="bb-modal">
    <div class="bb-modal open">
	<span class="bb-close"></span>
        <div class="bb-modal-header">Image Manager</div>
        <div class="bb-modal-body">
            <div class="bb-modal-tabs">
				<a href="javascript:void(0)" rel="Upload" class="active">Upload</a>
				<a href="javascript:void(0)" rel="Choose">Choose</a>
			</div>
            <div style="display:none;" class="bb-modal-type" data-type="image"></div>
			<div class="bb-modal-tab" data-model-toggle="Upload">
                <form action="">

                    <input type="file" name="file" multiple="multiple" style="display: none;">
                    <div class="bb-drag-box">
                        <div class="bb-upload-label">Drop files here or click to upload</div>
                    </div>
					<div id="status1"></div>
                </form>
            </div>
			
            <div data-model-toggle="Choose" class="bb-modal-tab bb-modal-imagelist" style="overflow-y: scroll; max-height: 400px;display: none;">
                <img src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg">
			
			</div>
        </div>
        <div class="bb-modal-footer"></div>
    </div>
</div>
<div id="bb-overlay"></div>