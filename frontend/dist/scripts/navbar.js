"use strict";
class Navbar {
    constructor() {
        this.pathname = window.location.pathname.split("/")[4].split(".")[0];
        this.navItems = document.querySelectorAll(".nav-item");
        this.init();
    }
    init() {
        this.navItems.forEach((nav) => {
            nav.classList.remove("nav-item-active");
            console.log("pathname", this.pathname);
            console.log("atributos", nav.getAttribute("data-page"));
            if (nav.getAttribute("data-page") === this.pathname) {
                nav.classList.add("nav-item-area-active");
            }
        });
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Navbar();
});
