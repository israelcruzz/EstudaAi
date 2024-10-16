interface HttpResponse {
    message: string,
    prompt: string
}

class Chatbot {
    public inputUser = document.getElementById("inpt-chat") as HTMLInputElement;
    public sendButton = document.querySelector(".send-button") as HTMLButtonElement;
    public messagesArea = document.querySelector(".messages-area") as HTMLDivElement;

    constructor() {
        this.init();
    }

    public async init() {
        this.sendButton?.addEventListener("click", async () => {
            if(this.inputUser?.value === "") {
                ToastService.showToastAlert("Por favor, digite sua pergunta!");
                return;
            }

            if(this.inputUser?.value.length < 3) {
                ToastService.showToastAlert("Sua pergunta tem que ter pelo menos 3 caracteres");
                return;
            }
            
            this.addStudentMessage();

            const messageElementLoading = this.generateLoadingMessage();
            
            try {
                const request = await fetch("http://localhost:3000/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prompt: this.inputUser?.value
                    })
                })

                this.cleanInput();
                
                const response = await request.json() as HttpResponse;

                messageElementLoading.remove();
                this.addBotMessage(response.message);
            } catch (error) {
                console.log(error)
            }
        })
    }

    public addStudentMessage() {
        const div = document.createElement("div");
        div.classList.add("client-message");

        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = this.inputUser?.value;

        div.appendChild(span);

        this.messagesArea.appendChild(div);
    }

    public addBotMessage(message: string) {
        const div = document.createElement("div");
        div.classList.add("bot-message");

        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = message;

        div.appendChild(span);

        this.messagesArea.appendChild(div);
    }

    public cleanInput() {
        this.inputUser.value = "";
    }

    public generateLoadingMessage() {
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
    public static showToastAlert(message: string) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("shadow-lg");
        toast.classList.add("border");
        toast.classList.add("border-[#080808]");
        document.body.appendChild(toast);

        const i = document.createElement("i");
        i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
        i.classList.add("text-red-600");
        toast.appendChild(i);

        const span = document.createElement("span");
        span.classList.add("text-red-600");
        span.textContent = message;
        toast.appendChild(span);

        setTimeout(() => {
            toast.remove();
        }, 3000)
    }
}

window.document.addEventListener("DOMContentLoaded", () => {
    new Chatbot();
})