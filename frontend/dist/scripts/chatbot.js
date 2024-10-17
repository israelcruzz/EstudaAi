"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Chatbot {
    constructor() {
        this.inputUser = document.getElementById("inpt-chat");
        this.sendButton = document.querySelector(".send-button");
        this.messagesArea = document.querySelector(".messages-area");
        this.helpArea = document.querySelector(".help-area");
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.sendButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                if (((_a = this.inputUser) === null || _a === void 0 ? void 0 : _a.value) === "") {
                    ToastService.showToastAlert("Por favor, digite sua pergunta!");
                    return;
                }
                if (((_b = this.inputUser) === null || _b === void 0 ? void 0 : _b.value.length) < 3) {
                    ToastService.showToastAlert("Sua pergunta tem que ter pelo menos 3 caracteres");
                    return;
                }
                this.helpArea.classList.add("hidden");
                this.addStudentMessage();
                const messageElementLoading = this.generateLoadingMessage();
                try {
                    const request = yield fetch("http://localhost:3000/chatbot", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            prompt: (_c = this.inputUser) === null || _c === void 0 ? void 0 : _c.value
                        })
                    });
                    this.cleanInput();
                    const response = yield request.json();
                    messageElementLoading.remove();
                    this.addBotMessage(response.message);
                }
                catch (error) {
                    if (error instanceof TypeError) {
                        console.error("Erro interno ao fazer requisição", error);
                        this.cleanInput();
                        messageElementLoading.remove();
                        ToastService.showToastAlert("Erro interno");
                    }
                    console.log(error);
                }
            }));
        });
    }
    addStudentMessage() {
        var _a;
        const div = document.createElement("div");
        div.classList.add("client-message");
        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = (_a = this.inputUser) === null || _a === void 0 ? void 0 : _a.value;
        div.appendChild(span);
        this.messagesArea.appendChild(div);
    }
    addBotMessage(message) {
        const div = document.createElement("div");
        div.classList.add("bot-message");
        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = message;
        div.appendChild(span);
        this.messagesArea.appendChild(div);
    }
    cleanInput() {
        this.inputUser.value = "";
    }
    generateLoadingMessage() {
        const div = document.createElement("div");
        div.classList.add("bot-message");
        div.classList.add("animate-pulse");
        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = "Gerando resposta...";
        div.appendChild(span);
        this.messagesArea.appendChild(div);
        return div;
    }
}
class ToastService {
    static showToastAlert(message) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("shadow-lg");
        toast.classList.add("border");
        toast.classList.add("border-[#080808]");
        const i = document.createElement("i");
        i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
        i.classList.add("text-red-600");
        toast.appendChild(i);
        const span = document.createElement("span");
        span.classList.add("text-red-600");
        span.textContent = message;
        toast.appendChild(span);
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Chatbot();
});
