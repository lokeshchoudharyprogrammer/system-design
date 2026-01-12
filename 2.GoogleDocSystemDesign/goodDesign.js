const fs = require("fs");

/* =======================
   Core Element Abstraction
   ======================= */

class DocumentElement {
    accept(renderer) {
        throw new Error("accept() not implemented");
    }
}

/* =======================
   Elements (Pure Data)
   ======================= */

class TextElement extends DocumentElement {
    constructor(text, options = {}) {
        super();
        this.text = text;
        this.options = {
            bold: false,
            italic: false,
            underline: false,
            maxWidth: 80,
            preserveNewLines: true,
            ...options
        };
    }

    accept(renderer) {
        return renderer.renderText(this);
    }
}

class ImageElement extends DocumentElement {
    constructor(path) {
        super();
        this.path = path;
    }

    accept(renderer) {
        return renderer.renderImage(this);
    }
}

/* =======================
   Renderer (STRONG LOGIC)
   ======================= */

class Renderer {
    renderText(_) { throw new Error("renderText not implemented"); }
    renderImage(_) { throw new Error("renderImage not implemented"); }
}

class PlainTextRenderer extends Renderer {

    renderText(el) {
        let text = el.text;

        // Normalize newlines
        if (el.options.preserveNewLines) {
            text = text.replace(/\r\n/g, "\n");
        }

        // Word wrapping
        if (el.options.maxWidth) {
            text = this.wrap(text, el.options.maxWidth);
        }

        // Styling (order matters)
        if (el.options.bold) text = `**${text}**`;
        if (el.options.italic) text = `_${text}_`;
        if (el.options.underline) text = `__${text}__`;

        return text;
    }

    renderImage(el) {
        return `[IMAGE: ${el.path}]`;
    }

    wrap(text, width) {
        const lines = text.split("\n");
        const wrapped = [];

        for (const line of lines) {
            let current = "";
            for (const word of line.split(" ")) {
                if ((current + word).length > width) {
                    wrapped.push(current.trim());
                    current = word + " ";
                } else {
                    current += word + " ";
                }
            }
            wrapped.push(current.trim());
        }

        return wrapped.join("\n");
    }
}

/* =======================
   Document (Structure Only)
   ======================= */

class Document {
    #elements = [];

    add(element) {
        this.#elements.push(element);
    }

    render(renderer) {
        return this.#elements
            .map(el => el.accept(renderer))
            .join("\n");
    }
}

/* =======================
   Persistence
   ======================= */

class FileStorage {
    save(content) {
        fs.writeFileSync("saveDocElements.txt", content, "utf-8");
    }
}

/* =======================
   Editor (Fluent API)
   ======================= */

class DocumentEditor {
    constructor(document, renderer, storage) {
        this.document = document;
        this.renderer = renderer;
        this.storage = storage;
    }

    addText(text, options) {
        this.document.add(new TextElement(text, options));
        return this;
    }

    addImage(path) {
        this.document.add(new ImageElement(path));
        return this;
    }

    save() {
        const output = this.document.render(this.renderer);
        this.storage.save(output);
    }

    render() {
        return this.document.render(this.renderer);
    }
}

/* =======================
   Usage
   ======================= */

const editor = new DocumentEditor(
    new Document(),
    new PlainTextRenderer(),
    new FileStorage()
);

editor
    .addText("DOCUMENT TITLE", { bold: true })
    .addText(
        "This is a very long paragraph that will automatically wrap into multiple lines based on width. The rendering logic is strong and isolated.",
        { maxWidth: 50 }
    )
    .addImage("architecture.png")
    .save()


console.log(editor.render())
