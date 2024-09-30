document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('mouseover', function () {
        const mainImage = document.getElementById('mainImage');
        const newSrc = this.getAttribute('data-large');
        mainImage.src = newSrc;
    });
});
