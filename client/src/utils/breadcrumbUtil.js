import { loading } from "./fetchingUtil";
import { HomeIcon, LeafIcon, Settings } from "lucide-react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const util = {
    setBreadCum: (items) => {
        const breadcrumbContainer = document.querySelector('[data-slot="breadcrumb"]');
        if (!breadcrumbContainer) return;

        const breadcrumbList = document.createElement("ol");
        breadcrumbList.setAttribute("data-slot", "breadcrumb-list");
        breadcrumbList.className = "text-muted-foreground flex flex-wrap items-center p-0 gap-1.5 text-sm break-words sm:gap-2.5";

        items.forEach((item, index) => {
            const breadcrumbItem = document.createElement("li");
            breadcrumbItem.setAttribute("data-slot", "breadcrumb-item");
            breadcrumbItem.className = `inline-flex items-center gap-1.5 border py-1 px-2 rounded-5 transition-colors duration-200 ease-in-out ${
                index === items.length - 1 ? "bg-orange-600 text-white" : ""
            }`;
            // Convert icon React component -> HTML string
            let iconHTML = "";
            if (item.icon) {
                const iconElement = createElement(item.icon, { size: 16 });
                iconHTML = renderToStaticMarkup(iconElement);
            }

            if (item.to) {
                const breadcrumbLink = document.createElement("a");
                breadcrumbLink.setAttribute("data-slot", "breadcrumb-link");
                breadcrumbLink.className = "hover:text-foreground transition-colors text-black font-normal no-underline flex items-center gap-1";
                breadcrumbLink.innerHTML = `${iconHTML}<span>${item.text}</span>`;
                breadcrumbLink.style.textDecoration = "none"
                index === items.length - 1 ? breadcrumbLink.classList.add("text-white") : breadcrumbLink.classList.remove("text-white");
                breadcrumbLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.location.href = item.to;
                });

                breadcrumbItem.appendChild(breadcrumbLink);
            } else {
                const breadcrumbPage = document.createElement("span");
                breadcrumbPage.setAttribute("data-slot", "breadcrumb-page");
                breadcrumbPage.setAttribute("role", "link");
                breadcrumbPage.setAttribute("aria-disabled", "true");
                breadcrumbPage.setAttribute("aria-current", "page");
                breadcrumbPage.className = "text-foreground font-normal flex items-center gap-1";
                breadcrumbPage.innerHTML = `${iconHTML}<span>${item.text}</span>`;
                breadcrumbItem.appendChild(breadcrumbPage);
            }

            breadcrumbList.appendChild(breadcrumbItem);

            if (index < items.length - 1) {
                const breadcrumbSeparator = document.createElement("li");
                breadcrumbSeparator.setAttribute("data-slot", "breadcrumb-separator");
                breadcrumbSeparator.setAttribute("role", "presentation");
                breadcrumbSeparator.setAttribute("aria-hidden", "true");
                breadcrumbSeparator.className = "[&>svg]:size-3.5";
                breadcrumbSeparator.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>`;
                breadcrumbList.appendChild(breadcrumbSeparator);
            }
        });

        breadcrumbContainer.innerHTML = "";
        breadcrumbContainer.appendChild(breadcrumbList);
    }
};

window.util = {
    ...util,
    loading
};
