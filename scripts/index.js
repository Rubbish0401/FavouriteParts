import { FavouriteParts } from "./fav-parts/FavouriteParts.mjs";
import { StringProcess } from "https://rubbish0401.github.io/JavaScriptUtils/StringProcess.mjs";

var defAppe;

document.addEventListener("DOMContentLoaded", function(root_event){
	favParts = new FavouriteParts();

	// Get Elements
	filenameInput = document.getElementById("input-filename");
	widthInput = document.getElementById("input-width");

	appearanceInput = document.getElementById("input-appearance");
	nameInput = document.getElementById("input-name");
	contentsInput = document.getElementById("input-contents");

	preview = favParts.get();
	previewPane = document.getElementById("preview-pane");

	customStyle = document.createElement("style");

	saveBtn = document.getElementById("btn-save");

	// Classes

	// Custom
	
	// EventListener
	filenameInput.addEventListener("change", event => { imageFilename = String(event.target.value) });
	filenameInput.addEventListener("change", event => { if(event.key === "Enter") event.target.dispatchEvent(new InputEvent("change")) });

	widthInput.addEventListener("change", event => { imageWidth = Number(event.target.value) });
	widthInput.addEventListener("change", event => { if(event.key === "Enter") event.target.dispatchEvent(new InputEvent("change")) });

	appearanceInput.addEventListener("change", event => { customStyle.innerText = String(event.target.value).replace(/\r*\n/g, "").replace(/\s{2,}/g, " ") });
	appearanceInput.addEventListener("keydown", event => {
		if(event.key === "Enter" && !event.shiftKey){
			event.target.dispatchEvent(new InputEvent("change"));
			event.target.blur();
		}
	});

	nameInput.addEventListener("change", event => { favParts.setName(String(event.target.value)); });
	nameInput.addEventListener("change", event => { if(event.key === "Enter") event.target.dispatchEvent(new InputEvent("change")) });

	contentsInput.addEventListener("change", event => { 
		let lines = String(event.target.value).split(/\r*\n/);
		favParts.setContents(...lines); 
	});

	contentsInput.addEventListener("keydown", event => {
		if(event.key === "Enter" && !event.shiftKey){
			event.target.dispatchEvent(new InputEvent("change"));
			event.target.blur();
		}
	});

	saveBtn.addEventListener("click", event => {
		let options = {
			width: preview.offsetWidth,
			scale: 1,
			backgroundColor: null,
			proxy: "https://crossorigin.me/https://google.com",
			useCORS:true,
		};
		if(!isNaN(imageWidth)) options.scale = imageWidth / preview.offsetWidth;

		html2canvas(preview, options).then(canvas => {
			let anchor = document.createElement("a");
			anchor.href = canvas.toDataURL();
			if(typeof imageFilename === "string" && imageFilename.length > 0){
				anchor.download = `${imageFilename}.png`;
			}else{
				let now = new Date();
				anchor.download = "favparts_" + [
					StringProcess.fillChars(String(now.getFullYear()), 4, "0"),
					StringProcess.fillChars(String(now.getMonth() + 1), 2, "0"),
					StringProcess.fillChars(String(now.getDate()), 2, "0"),
					StringProcess.fillChars(String(now.getHours()), 2, "0"),
					StringProcess.fillChars(String(now.getMinutes()), 2, "0"),
					StringProcess.fillChars(String(now.getSeconds()), 2, "0"),
				].join("") + ".png";
			}

			anchor.click();
			anchor.remove();
		});
	});

	// Append
	document.body.appendChild(customStyle);
	previewPane.appendChild(preview);

	// Others
	fetch("./data/default-appearance.css").then(result => {
		result.text().then(text => {
			defAppe = text;

			appearanceInput.value = defAppe;
			appearanceInput.dispatchEvent(new InputEvent("change"));
		});
	});
});
