import { loading } from "./fetchingUtil";

const util = {
    setBreadCum: (items) => {
        const breadcrumbContainer = document.querySelector('[data-slot="breadcrumb"]');
        if (!breadcrumbContainer) return;

        const breadcrumbList = document.createElement("ol");
        breadcrumbList.setAttribute("data-slot", "breadcrumb-list");
        breadcrumbList.className = "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5";

        items.forEach((item, index) => {
            const breadcrumbItem = document.createElement("li");
            breadcrumbItem.setAttribute("data-slot", "breadcrumb-item");
            breadcrumbItem.className = "inline-flex items-center gap-1.5";

            if (item.to) {
                const breadcrumbLink = document.createElement("a");
                breadcrumbLink.setAttribute("data-slot", "breadcrumb-link");
                breadcrumbLink.className = "hover:text-foreground transition-colors";
                breadcrumbLink.textContent = item.text;

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
                breadcrumbPage.className = "text-foreground font-normal";
                breadcrumbPage.textContent = item.text;
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
