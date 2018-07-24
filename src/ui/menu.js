// helper functions
function createSVGElement (tagName, attributes) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attributes).forEach(attrib => {
        elem.setAttribute(attrib[0], attrib[1]);
    });

    return elem
}

export default class Menu {
    constructor ({scope, shouldDraw = true, shouldUpdate = true, hasMenuBtn = true}) {
        this.reset();

        this.scope = scope;
        this.shouldUpdate = shouldUpdate;
        this.shouldDraw = shouldDraw;

        this.hasMenuBtn = hasMenuBtn;

        this.menu = Object.assign(
            document.createElement('div'),
            {id: 'ui'}
        );

        // close Btn
        this.closeBtn = Object.assign(
            document.createElement('button'),
            {textContent: '[ close ]', id: 'close'}
        );

        this.render();
        this.eventListener();
    }

    reset () {
        const previousMenu = document.querySelector('#ui')

        if (previousMenu) previousMenu.parentNode.removeChild(previousMenu);
    }

    addSeparator () {
        const hr = document.createElement('hr');
        this.menu.appendChild(hr);
    }

    addStyleLink () {
        const styleLink = Object.assign(
            document.createElement('link'),
            {rel: 'stylesheet', href: './ui/ui.css', type: 'text/css'}
        );

        document.head.appendChild(styleLink);
    }

    render () {
        if (this.hasMenuBtn) {
            this.svg = createSVGElement('svg', {width: 45, height: 45, id: 'menu'});

            const circle = createSVGElement('circle',
                {cx: 22.5, cy: 22.5, r: 22.5, fill: '#fff'}
            );
            this.svg.appendChild(circle);

            const rect1 = createSVGElement('rect',
                {x: 10, y: 10, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect1);

            const rect2 = createSVGElement('rect',
                {x: 10, y: 20, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect2);
        
            const rect3 = createSVGElement('rect',
                {x: 10, y: 30, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect3);

            document.body.appendChild(this.svg);
        }

        this.addStyleLink();
        this.menu.appendChild(this.closeBtn);
        document.body.appendChild(this.menu);

    }

    eventListener () {
        if (this.hasMenuBtn) {
            this.svg.addEventListener(
                'click', this.openEventHandler.bind(this), {once: true}
            );
        }

        this.menu.addEventListener('change', this.updateEventhandler.bind(this));
        this.menu.addEventListener('click', this.updateEventhandler.bind(this));
    }

    openEventHandler (event) {
        this.menu.classList.add('moverDer');

        this.closeBtn.addEventListener(
            'click', this.closeEventHandler.bind(this), {once: true}
        );
    }

    closeEventHandler (event) {
        this.menu.classList.remove('moverDer');
        event.stopPropagation();

        this.svg.addEventListener(
            'click', this.openEventHandler.bind(this), {once: true}
        );
    }

    updateEventhandler (event) {
        if (
            (event.type === 'change' && event.target.type === 'range') ||
            (event.type === 'click' && event.target.nodeName === 'BUTTON')
        ) {
            if (this.shouldUpdate) this.scope.update();
            if (this.shouldDraw) this.scope.draw();
       }
    }
}