function trimPath(path) {
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (path.startsWith('/')) {
        path = path.slice(1);
    }
    return path;
}

function getBaseHref() {
    const baseElement = document.querySelector('base')
    if (!baseElement) return '';
    if (!baseElement.href) return '';
    return '/' + trimPath(new URL(baseElement.href).pathname);
}

function generateRoutes(src, pages) {
    function generateHomepage() {
        console.log(location)

        const routeElement = document.createElement('stencil-route');
        routeElement.exact = true;
        // routeElement.url = '/';
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
            routeElement.setAttribute('data-url', routeElement.url);
            routeElement.component = 'c-app-loader';
            routeElement.componentProps = {
                src: src + page + '/index.html',
                type: 'object'
            }
            routeElement.setAttribute('data-src', routeElement.componentProps.src);
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
    return routerElement;
}

window.addEventListener('load', _ => {
    const navElement = document.querySelector('nav[data-applications]')
    let examples = navElement.getAttribute('data-applications') || ''
    let src = getBaseHref() + examples;
    let pages = Array.from(navElement.children).map(route => route.url);
    navElement.remove();
    document.body.appendChild(generateRoutes(src, pages));
});

// <nav data-applications="/examples">
//     <stencil-route-link url="/">Examples</stencil-route-link>
//     <stencil-route-link url="/ionic">Ionic</stencil-route-link>
// </nav>