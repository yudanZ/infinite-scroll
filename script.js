$(document).ready(function(){


    const accessKey = 'OALaqyGdsDxs2gPdnH0VzQTPBe3YsNWFIqlnQzmQUQw';
    let count = 5;
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;
    
    let imagesLoaded = 0;
    let totalImages = 0;
    let ready = false;
    let photosArr = [];
    function imageLoaded(){
        imagesLoaded ++;

        if(imagesLoaded === totalImages){
            //console.log( imagesLoaded);
            //console.log(totalImages);
            $(".loader").hide();
            ready = true;
            count = 30;
        }
        //console.log(imagesLoaded);
    }

    async function getPhotosFromUnsplash(){
        try{
            const response = await fetch(apiUrl);
            photosArr = await response.json();
            //console.log(photos);
            //localStorage.setItem('photos', JSON.stringify(photos));
            //console.log( photos)
            renderPhotos();
        }catch(error){
            console.log(error);
        }
        
    }

    function renderPhotos(){
        
        //const photosArr = JSON.parse(localStorage.getItem('photos'));
        //console.log(photosArr)
        imagesLoaded = 0;
        totalImages = photosArr.length;
        if(photosArr){
            $('.loader').hide();
            
            photosArr.forEach( photo => {
                const item = document.createElement('a');
                item.setAttribute('href', photo.links.html);
                item.setAttribute('target', '_blank');

                const img = document.createElement('img');
                img.setAttribute('src', photo.urls.regular);
                img.setAttribute('alt', photo.alt_description);

                img.addEventListener('load',imageLoaded);
                item.appendChild(img);
                $('.image-container').append(item);
            })
        }
        
    }
    
   

    window.addEventListener('scroll', () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && ready ){
            ready = false;
            getPhotosFromUnsplash();
        }
    })

    getPhotosFromUnsplash();
})