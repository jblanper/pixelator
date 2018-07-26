import ImageMatrix from './imageMatrix.js';
import Menu from './ui/menu.js';
import Slider from './ui/slider.js';
import FileButton from './ui/fileButton.js';
import DownloadButton from './ui/downloadButton.js';
import Description from './ui/description.js';

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
        this.menu = new Menu({scope: this});

        this.description = new Description(
            'Pixelator', [
            'This web turns any photo into a complex tessellations.',
            `Change the number of columns and rows of the tessellation \
            with the sliders. A new image from a local device can \ 
            be locally loaded. No data goes to no server. Enjoy!`
            ]
        );

        this.menu.addSeparator();

        this.columnSlider = new Slider ({
            prop: 'columns',
            scope: this.imageMatrix,
            max: this.imageMatrix.cachedImg.width / 7,
            min: 2,
        });

        this.rowSlider = new Slider ({
            prop: 'rows',
            scope: this.imageMatrix,
            max: this.imageMatrix.cachedImg.height / 7,
            min: 4,
        });

        this.menu.addSeparator();

        this.urlButton = new FileButton({
            prop: 'imageUrl',
            scope: this,
            text: 'change img',
        });

        this.getImgBtn = new DownloadButton({
            text: 'get IMG', scope: this, prop: 'png' 
        });

        this.menu.addSignature();
    }

    get png () {
        const cachedCanvasCtx = Object.assign(
            document.createElement('canvas'),
            {width: this._ctx.canvas.width, height: this._ctx.canvas.height}
        ).getContext('2d');

        cachedCanvasCtx.drawImage(this._ctx.canvas, 0, 0);

        return cachedCanvasCtx.canvas.toDataURL('image/png');
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
