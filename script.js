const chatBox = document.getElementById("chatBox");

let knowledgeBase = JSON.parse(localStorage.getItem("knowledgeBase")) || {
    "javascript": "JavaScript es un lenguaje de programación usado principalmente en la web.",
    "html": "HTML es el lenguaje de marcado para estructurar páginas web.",
    "css": "CSS se usa para dar estilo a las páginas web.",
    "api": "Una API permite la comunicación entre diferentes sistemas.",
    "ia": "La inteligencia artificial simula procesos de inteligencia humana."
};

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = (sender === "user" ? "👤 " : "🤖 ") + text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const question = input.value.toLowerCase().trim();

    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    setTimeout(() => {
        const response = getResponse(question);
        addMessage(response, "bot");
    }, 600);
}

function getResponse(question) {
    for (let key in knowledgeBase) {
        if (question.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // Aprendizaje básico
    knowledgeBase[question] = 
        "Aún estoy aprendiendo sobre eso. ¿Puedes reformular la pregunta?";
    localStorage.setItem("knowledgeBase", JSON.stringify(knowledgeBase));

    return "No tengo una respuesta exacta todavía 🤔, pero aprenderé con el tiempo.";
}

