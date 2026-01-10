const fs = require("fs");


class DocumentElement {
    render() {
        throw new Error("Not Implemented");
    }
}

class TextElement extends DocumentElement {
    constructor(text) {
        super();
        this.text = text;
    }
    render() {
        return this.text;
    }
}

class ImageElement extends DocumentElement {
    constructor(imagePath) {
        super();
        this.imagePath = imagePath;
    }
    render() {
        return this.imagePath;
    }
}

class NewLineElement extends DocumentElement {
    render() {
        return "\n";
    }
}

class TabElement extends DocumentElement {
    render() {
        return "\t";
    }
}


class Document {

    #elements = [];

    addElement(element) {
        this.#elements.push(element);
    }

    render() {
        return this.#elements.map(e => e.render()).join("");
    }
}




class Persistence {
    save(_) {
        throw new Error("Not Implemented");
    }
}

class FileStorage extends Persistence {
    save(content) {
        fs.writeFileSync("saveDocElements.txt", content, "utf-8");
    }
}


class DocumentEditor {
    renderedDocument = "";

    constructor(document, persistence) {
        this.document = document;
        this.persistence = persistence;
    }

    addText(text) {
        this.document.addElement(new TextElement(text));
        return this;
    }

    addImage(path) {
        this.document.addElement(new ImageElement(path));
        return this;
    }

    addNewLine() {
        this.document.addElement(new NewLineElement());
        return this;
    }

    addTab() {
        this.document.addElement(new TabElement());
        return this;
    }

    render() {
        if (!this.renderedDocument) {
            this.renderedDocument = this.document.render();
        }
        return this.renderedDocument;
    }

    save() {
        this.persistence.save(this.render());
    }
}



const editor = new DocumentEditor(
    new Document(),
    new FileStorage()
);

editor
    .addText("Title")
    .addNewLine()
    .addTab()
    .addText("This is a document")
    .addNewLine()
    .addImage("image.png")
    .save();
