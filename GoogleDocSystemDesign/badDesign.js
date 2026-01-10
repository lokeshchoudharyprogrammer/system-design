const fs = require("fs");

class DocumentEditor {
    #documentElements = [];
    renderedDoc = "";

    addText(text) {
        this.#documentElements.push(text);
        return this;
    }

    addImage(path) {
        this.#documentElements.push(path);
        return this;
    }

    renderDocument() {
        if (this.renderedDoc.length === 0) {
            let result = "";

            for (let doc of this.#documentElements) {
                if (doc.includes(".jpg") || doc.includes(".png")) {
                    result += doc;
                } else {
                    result += doc + "\n";
                }
            }

            this.renderedDoc = result;
        }

        return this.renderedDoc;
    }

    saveToDb() {
        fs.writeFileSync("saveDocElements.txt", this.renderedDoc, "utf-8");
    }
}


const doc = new DocumentEditor()
    .addText("DOCUMENT TITLE: Software Engineering Notes")
    .addText("")
    .addText("Author: Lokesh Choudhary")
    .addText("Created On: 10 Jan 2026")
    .addText("")
    .addText("--------------------------------------------------")
    .addText("INTRODUCTION")
    .addText("")
    .addText(
        "Software engineering is the systematic application of engineering " +
        "approaches to the development, operation, and maintenance of software. " +
        "It focuses on building reliable, scalable, and maintainable systems."
    )
    .addText("")
    .addText(
        "Modern software systems are expected to handle millions of users, " +
        "operate in distributed environments, and remain fault tolerant under failures."
    )
    .addText("")
    .addText("--------------------------------------------------")
    .addText("CORE PRINCIPLES")
    .addText("")
    .addText("1. Separation of Concerns")
    .addText(
        "   Each module in a system should focus on a single responsibility. " +
        "   This improves readability, testability, and long-term maintainability."
    )
    .addText("")
    .addText("2. Scalability")
    .addText(
        "   Systems must be designed to scale horizontally and vertically. " +
        "   Stateless services, caching, and load balancing are key strategies."
    )
    .addText("")
    .addText("3. Performance")
    .addText(
        "   Performance optimization should be data-driven. " +
        "   Premature optimization often leads to complex and fragile code."
    )
    .addText("")
    .addText("--------------------------------------------------")
    .addText("ARCHITECTURE OVERVIEW")
    .addText("")
    .addText(
        "A typical modern application consists of a frontend, backend services, " +
        "databases, caching layers, and external integrations."
    )
    .addText("")
    .addText("Example Stack:")
    .addText("- Frontend: React / React Native")
    .addText("- Backend: Node.js / Express / Hono")
    .addText("- Database: PostgreSQL / MongoDB")
    .addText("- Cache: Redis")
    .addText("- Infrastructure: Docker, Kubernetes, Cloudflare")
    .addText("")
    .addText("--------------------------------------------------")
    .addText("DIAGRAMS")
    .addText("")
    .addImage("system-architecture.png")
    .addText("")
    .addText("--------------------------------------------------")
    .addText("CONCLUSION")
    .addText("")
    .addText(
        "Great software is not written by accident. It is the result of " +
        "careful planning, clean abstractions, continuous learning, and discipline."
    )
    .addText("")
    .addText(
        "Engineers should focus on fundamentals, write readable code, " +
        "and design systems that are easy to evolve over time."
    );


doc.renderDocument();
doc.saveToDb();
