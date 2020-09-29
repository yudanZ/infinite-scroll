$(document).ready(function(){
  

    let ready = false;
    let imagesLoaded = 0;
    let totalImages = 0;

    //Unsplash API
    const apiKey = 'OALaqyGdsDxs2gPdnH0VzQTPBe3YsNWFIqlnQzmQUQw';
    let  count = 5;
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    //console.log(apiUrl);
    //console.log(photosArray);
    //let photosArray = [];
    renderPhotos();
    //getPhotos();
    function imageLoaded(){
        //console.log('image loaded');
        imagesLoaded++;
        //console.log(imagesLoaded);
        if(imagesLoaded === totalImages){
            ready = true;
            $(".loader").hide();
            count = 30;
            //console.log('ready='+ ready);
        }
    }
    //Get photos from Unsplash API
    async function getPhotos(){
        try{
            const response = await fetch(apiUrl);
            const photosArray = await response.json();
            console.log(photosArray);
            //renderPhotos();
        }catch(error){
            console.log(error);
        }
    }
    
    //Render images
    function renderPhotos() {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        //console.log(totalImages);
        photosArray.forEach( photo => {

            const item = document.createElement('a');
            item.setAttribute('href', photo.url);
            item.setAttribute('target', '_blank');

            const img = document.createElement('img');
            img.setAttribute('src', photo.url);
            img.setAttribute('alt', photo.alt);

            img.addEventListener('load',imageLoaded);
            item.appendChild(img);
            $('.image-container').append(item);
            
        })
        //$('.image-container').append(photoHtml);

       
       //
       
       //$('.image-container').children().load(imageLoaded);

    }


    //check to se if scrolling near bottom of page, Load More photos
    window.addEventListener('scroll', () => {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            renderPhotos();
            
        }
    })

})