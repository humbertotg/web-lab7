$(document).ready(function() {

var animals = ["dog", "cat", "rabbit","frog","chicken","bird","turtle"];

function populateButtons(arrayToUse,classToAdd,placeHolder){
    $(placeHolder).empty();

    for(var i= 0; i< arrayToUse.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type",arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(placeHolder).append(a);
    }
}

$("#animal-buttons").on("click",".animal-button", function(){
$("#animals").empty()
    var search = $(this).attr("data-type");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=qdvCiRX0OzHNcVyVCWtV1L2ULnfPU4ij&limit=10";

    $.ajax({url:queryUrl})
    .then(function(response) {

    var results = response.data

    for (var i = 0; i <results.length; i++) {


        var animalDiv = $("<div class=\"animal-item\">");
        var rating = results[i].rating
        var p = $("<p>").text("Rating: "+ rating)

        var animated = results[i].images.fixed_height.url
        var still = results[i].images.fixed_height_still.url

        var animalImage = $("<img>")
        animalImage.attr("src",still)
        animalImage.attr("data-still",still)
        animalImage.attr("data-animate",animated)
        animalImage.attr("data-isAnimated","false")
        animalImage.addClass("animal-image")

        animalDiv.append(p)
        animalDiv.append(animalImage)

        $("#animals").append(animalDiv)

    }


    });
});

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var inputText = $("#animal-input").val();
    animals.push(inputText)
    populateButtons(animals,"animal-button","#animal-buttons")
});

$("#animals").on("click", ".animal-item", function(){
    var img = $(this).children('img.animal-image');
    var state = img.attr('data-isAnimated')
    if(state == 'false'){
        img.attr("src", img.attr("data-animate"))
        img.attr("data-isAnimated","true");
    } else{
        img.attr("src", img.attr("data-still"))
        img.attr("data-isAnimated","false");
    }

});

populateButtons(animals,"animal-button","#animal-buttons")

});
