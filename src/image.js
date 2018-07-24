export default class CachedImage {
    constructor (url, scale = 1) {
        this.url = url;
        this.scale = scale;
    }

    init () {
        return this.setImg()
        .then(msg => {
            console.log(msg)

            this.setCacheImg();
            this.setImgData();
            
            return 'Created cached image and got its data';
        }).catch(errorMsg => console.log(errorMsg));
    }

    setImg () {
        return new Promise((resolve, reject) => {
            this.img = new Image();
            this.img.src = this.url;

            this.img.onload = _ => resolve(`"${this.img.src}" loaded`);
            this.img.onerror = _ => reject(`Error loading "${this.img.src}"`);
        });
    }

    setCacheImg () {
        // cached canvas width and height
        let width, height;
        const imgRatio = this.img.height / this.img.width;
        const browserRatio = window.innerHeight / window.innerWidth;

        if (browserRatio < imgRatio) {
            height = window.innerHeight;
            width = window.innerHeight / imgRatio;
        }
        else {
            width = window.innerWidth;
            height = window.innerWidth * imgRatio;
        }

        // fake canvas to load image
        this.cacheCtx = Object.assign(
            document.createElement('canvas'), {width: width, height: height}
        ).getContext('2d');
    }

    setImgData () {
        this.cacheCtx.drawImage(this.img, 0, 0, this.width, this.height);
        this.imgData = this.cacheCtx.getImageData(0, 0, this.width, this.height);
    }

    get width () {
        return this.cacheCtx.canvas.width;
    }

    get height () {
        return this.cacheCtx.canvas.height;
    }

    get pixelData () {
        return this.imgData.data;
    }
}
