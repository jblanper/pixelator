import CachedImage from './image.js';

export default class ImageMatrix {
    constructor ({url, scale = 1, columns, rows}) {
        this.columns = columns;
        this.rows = rows;
        this.cachedImg = new CachedImage(url, scale);
    }

    init () {
        return this.cachedImg.init()
        .then(msg => {
            console.log(msg);

            this.setCellDimensions();
            this.setMatrix();

            return 'Created matrix image';
        });
    }

    setCellDimensions () {
        this.cellWidth = Math.ceil(this.cachedImg.width / this.columns);
        this.cellHeight = Math.ceil(this.cachedImg.height / this.rows);
    }

    setMatrix () {
        this.matrix = Array.from({length: this.rows}, (_, y) =>
            Array.from({length: this.columns}, (_, x) => {
                return {
                    color: this.getPixelRGB(this.getPixel(y, x)),
                    origin: {x: x * this.cellWidth, y: y * this.cellHeight}
                };
            })
        );
    }

    getPixel (y, x) {
        const i = ((x*this.cellWidth) + (y*this.cellHeight) * this.cachedImg.width) * 4;
        return this.cachedImg.pixelData.slice(i, i + 4);
    }
    getPixelRGB (pixel) {
        return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    }

    update (columns = undefined, rows = undefined) {
        if (columns) this.columns = columns;
        if (rows) this.rows = rows;

        this.setCellDimensions();
        this.setMatrix();
    }
}
