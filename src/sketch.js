import ImageMatrix from './imageMatrix.js';
import Menu from './ui/menu.js';

export default class Sketch {
    constructor (ctx, options) {
        this._ctx = ctx;
        this.options = options;
    }

    init ({
        imageUrl = this.options.imageUrl, scale = this.options.scale,
        columns = this.options.columns, rows = this.options.rows
    } = {}) {
        this.imageMatrix = new ImageMatrix({
            url: imageUrl, scale: scale, columns: columns, rows: rows
        });

        return this.imageMatrix.init()
        .then(msg => {
            console.log(msg);

            this._ctx.canvas.height = this.imageMatrix.cachedImg.height;
            this._ctx.canvas.width = this.imageMatrix.cachedImg.width;

            this.setBindings();

            // initial draw
            this.draw()

            return 'Sketch initialized';
        });
    }

    setBindings () {
        const menu = new Menu({
            showOnLoad: true,
            updateFn: _ => {
                this.update();
                this.draw();
            },
            scope: this
        });

        menu.createComponent('description', {
            title: 'Pixelator', 
            content: [
                'This web turns any photo into a complex tessellations.',
                `Change the number of columns and rows of the tessellation \
                with the sliders. A new image from a local device can \ 
                be locally loaded. No data goes to no server. Enjoy!`
            ]
        });

        menu.addSeparator();

        const columnSlider = menu.createComponent('slider', {
            prop: 'columns',
            label: 'columns',
            scope: this.imageMatrix,
            max: this.imageMatrix.cachedImg.width / 7,
            min: 2,
            value: this.imageMatrix.columns
        });

        const rowSlider = menu.createComponent('slider', {
            prop: 'rows',
            label: 'rows',
            scope: this.imageMatrix,
            max: this.imageMatrix.cachedImg.height / 7,
            min: 4,
            value: this.imageMatrix.rows
        });

        menu.addSeparator();

        menu.createComponent('fileButton', {
            scopeOptions: 'imageUrl',
            updateFn: this.init.bind(this),
            label: 'upload IMG'
        });

        menu.createComponent('downloadButton', {
            fn: this.setPng.bind(this),
            label: 'download IMG'
        });


        menu.addSignature();
    }

    setPng () {
        const cachedCanvasCtx = Object.assign(
            document.createElement('canvas'),
            {width: this._ctx.canvas.width, height: this._ctx.canvas.height}
        ).getContext('2d');

        cachedCanvasCtx.drawImage(this._ctx.canvas, 0, 0);

        const data =  cachedCanvasCtx.canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.style = 'display: none;';
        link.download = 'img.png';
        link.href = data;

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    draw () {
        this.imageMatrix.matrix.forEach(row => row.forEach(cell => {
            this._ctx.fillStyle = cell.color;
            this._ctx.fillRect(
                cell.origin.x, cell.origin.y,
                this.imageMatrix.cellWidth, this.imageMatrix.cellHeight
            );
        }));
    }

    update () {
        this.imageMatrix.update();
    }
};
