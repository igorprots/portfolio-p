$(function() {
    $(".gallery__photo").slice(0, 9).show();
    $("#loadMore").on('click', function(e) {
        e.preventDefault();
        $(".gallery__photo:hidden").slice(0, 3).slideDown();
        console.log("ok")
    })
})