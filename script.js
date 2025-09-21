const bookDiv = document.getElementById('flipbook');

// CHANGE THIS: scale of PDF pages
const PDF_SCALE = 1.5;

pdfjsLib.getDocument(bookDiv.dataset.pdf).promise.then(async pdf => {
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: PDF_SCALE });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        const pageDiv = document.createElement('div');
        pageDiv.classList.add('flip-page');
        pageDiv.appendChild(canvas);
        bookDiv.appendChild(pageDiv);
    }

    $('#flipbook').turn({
        width: bookDiv.offsetWidth,
        height: bookDiv.offsetHeight,
        autoCenter: true
    });

    document.addEventListener('keydown', e => {
        if(e.key === 'ArrowRight') $('#flipbook').turn('next');
        if(e.key === 'ArrowLeft') $('#flipbook').turn('previous');
    });
});
