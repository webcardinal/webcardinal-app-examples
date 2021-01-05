function generateRoutes(src, pages) {
    function generateHomepage() {
        const routeElement = document.createElement('stencil-route');
        routeElement.exact = true;
        routeElement.url = '/';
        routeElement.component = 'c-app-loader';
        routeElement.componentProps = {
            src: '/index.html',
        }
        return routeElement;
    }

    function generateExamples() {
        let examples = [];
        for (const page of pages) {
            if (page === '/') {
                continue;
            }

            const routeElement = document.createElement('stencil-route');
            routeElement.url = page;
            routeElement.component = 'c-app-loader';
            routeElement.componentProps = {
                src: page !== '/' ? src + page + '/index.html' : '/index.html',
                type: 'object'
            }
            examples.push(routeElement);
        }
        return examples;
    }

    const routerElement = document.createElement('stencil-router');
    const switchElement = document.createElement('stencil-route-switch');
    switchElement.scrollTopOffset = '0';
    switchElement.appendChild(generateHomepage());
    switchElement.append(...generateExamples());
    routerElement.appendChild(switchElement);
    return routerElement
}

window.addEventListener('load', _ => {
    const navElement = document.querySelector('nav[data-applications]')
    let src = navElement.getAttribute('data-applications') || "";
    let pages = Array.from(navElement.children).map(route => route.url);
    console.log(pages);
    navElement.remove();
    document.body.appendChild(generateRoutes(src, pages));

    console.log(location);
});