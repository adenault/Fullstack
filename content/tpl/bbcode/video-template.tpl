<div id="bb-modal">
    <div class="bb-modal">
		<span class="bb-close"></span>
        <div class="bb-modal-header">Video</div>
        <div class="bb-modal-body">
            <form action="">
                <div class="form-item">
                    <label for="modal-video-input">Youtube Link</label>
					<span class="bb-tooltip youtube-error" style="position: absolute;display: none;top:75px;">Please enter a url?</span>

                    <textarea id="modal-video-input" name="video" style="height: 130px;resize: none;padding:5px;"></textarea>
                </div>
            </form>
        </div>
        <div class="bb-modal-footer">
            <button data-rule="youtube">Insert</button>
            <button data-command="cancel" data-action="close" class="model-cancel">Cancel</button>
        </div>
    </div>
</div>
<div id="bb-overlay"></div>
