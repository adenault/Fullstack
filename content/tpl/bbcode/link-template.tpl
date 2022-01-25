<div id="bb-modal">
	<div class="bb-modal">
		<span class="bb-close"></span>
		<div class="bb-modal-header">
			Insert Table</div>
		<div class="bb-modal-body">
			<form action="">
		   <div class="form-item">
				<label for="modal-link-url">URL 
					<span class="bb-tooltip link-error" style="position: absolute;display: none;top:75px;">Please enter a url?</span>
					<span class="req">*</span>
				</label>
				<input type="text" id="link-url" name="url">
			</div>
			<div class="form-item">
				<label for="modal-link-text">Text</label>
				<input type="text" id="link-text" name="text"> 
			</div>
		  <div class="form-item form-item-target"> 
			<label class="checkbox"> 
				<input type="checkbox" name="target" id="link-tab" > Open link in new tab
			</label>
		</div>
		</form>
		</div>
		<div class="bb-modal-footer">
			<button data-rule="link">Insert</button>
			<button class="model-cancel" data-action="close" data-command="cancel">
			Cancel</button></div>
	</div>
</div>
<div id="bb-overlay">
</div>
