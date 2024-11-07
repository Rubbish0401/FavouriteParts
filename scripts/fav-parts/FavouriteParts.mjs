document.addEventListener("DOMContentLoaded", root_event => {
	let structureCss = document.createElement("link");
	let faceCss = document.createElement("link");

	structureCss.rel = "stylesheet";
	faceCss.rel = "stylesheet";
	structureCss.href = "styles/fav-parts/FavouriteParts-structure.css";
	faceCss.href = "styles/fav-parts/FavouriteParts-face.css";

	document.head.appendChild(structureCss);
	document.head.appendChild(faceCss);
});

export class FavouriteParts {

	#name;
	#contents = [];

	//

	#back;
	#nametag;
	#listpane;

	//
	
	constructor() {
		// Create Elements
		let back = document.createElement("div");
		let nametag = document.createElement("div");
		let listpane = document.createElement("div");

		let observer = new ResizeObserver(entries => {
			back.style.minHeight = back.offsetWidth;
		});

		// Classes
		back.classList.add("fav-parts", "back", "image");
		nametag.classList.add("fav-parts", "nametag", "font-color");
		listpane.classList.add("fav-parts", "list-pane");

		// Custom
		observer.observe(back);

		// EventListener

		// Append
		back.appendChild(nametag);
		back.appendChild(listpane);

		// Others
		this.#back = back;
		this.#nametag = nametag;
		this.#listpane = listpane;

		//
		this.setName("");
		this.setContents()
	}

	//

	get(){ return this.#back; }

	//

	getName(){ return this.#name; }
	setName(str){
		this.#name = String(str);
		this.syncNametag();
	}

	getContents(){ return Object.create(this.#contents); }
	addContents(...contents){ this.setContents(...this.#contents, ...contents) }
	setContents(...contents){
		this.#contents = [...contents];

		this.syncNametag();
		this.syncContents();
	}

	//
	syncNametag(){ this.#nametag.innerHTML = `${this.#name}のいいとこ<br>${this.#contents.length}つ言えるよ！`; }
	syncContents(){
		while(this.#listpane.children.length > 0) this.#listpane.children[0].remove();

		this.#nametag.innerHTML = `${this.#name}のいいとこ<br>${this.#contents.length}つ言えるよ！`;
		for(let i = 0; i < this.#contents.length; i++){
			let row = createRow(i + 1, this.#contents[i]);
			this.#listpane.appendChild(row);
		}
	}
}

function createRow(index, text){
	// Create Elements
	let back = document.createElement("div");
	let indexIcon = document.createElement("div");
	let indexFrame = document.createElement("div");
	let indexLabel = document.createElement("span");
	let label = document.createElement("div");

	// Classes
	back.classList.add("fav-parts", "row", "background", `row-${index}`);
	indexIcon.classList.add("fav-parts", "index", "number");
	indexFrame.classList.add("fav-parts", "index-frame");
	indexLabel.classList.add("fav-parts", "index-label", "number");
	label.classList.add("fav-parts", "label", `label-${index}`, "font-color");

	// Custom
	indexLabel.innerText = index;
	label.innerText = text;

	// EventListener

	// Append
	back.appendChild(indexIcon);
	back.appendChild(label);

	indexIcon.appendChild(indexFrame);
	indexIcon.appendChild(indexLabel);

	// Others
	return back;
}