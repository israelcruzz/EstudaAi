class Navbar {
    public pathname = window.location.pathname.split("/")[4].split(".")[0];
    public navItems = document.querySelectorAll(".nav-item");

    constructor() {
        this.init();
    }

    public init() {
        this.navItems.forEach((nav) => {
            nav.classList.remove("nav-item-active");
            console.log("pathname", this.pathname);
            console.log("atributos", nav.getAttribute("data-page"));
            
            if (nav.getAttribute("data-page") === this.pathname) {
                nav.classList.add("nav-item-area-active");
            }
        })
    }
}

window.document.addEventListener("DOMContentLoaded", () => {
    new Navbar();
})