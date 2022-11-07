function getPageList(allPages, page, maxLength){
    function range(start, end){
        return Array.from(Array(end-start + 1), (_, i) => i+start);
    }
    var sideWidth = maxLength < 9 ? 1: 2;
    var leftWidth = (maxLength-sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength-sideWidth * 2 - 3) >> 1;
    if(allPages <= maxLength){
        return range(1, allPages)
    }

    if(page <= maxLength - sideWidth - 1 - rightWidth){
        return range(1, maxLength-sideWidth-1).concat(0, range(allPages - sideWidth + 1, allPages));


    }
    if(page >= allPages - sideWidth - 1 - rightWidth){
        return range(1,sideWidth).concat(0,  range(allPages-sideWidth - 1 - rightWidth - leftWidth, allPages));
    }
    return range(1, sideWidth).concat(0,  range(page - leftWidth, page + rightWidth), 0 ,range(allPages - sideWidth + 1, allPages)); 
}

$(function(){
    var num = Number(prompt("Ekranda gosterilecek card sayisini teyin edin (max 15 sekil var)"))
    if(num == false){
        num = 3
    }
    var numberItems = $(".card-side .card-col").length;
    var limitPage = num; //   ekranda cardlarin ne qeder gosterdiyini gosterir. manual olaraq buradan card sayini teyin etmek olar
    var allPages = Math.ceil(numberItems / limitPage); 
    var paginationSize = 7;
    var currentPage;
5
    function showPage(whichPage){
        if(whichPage < 1 || whichPage > allPages) return false;

        currentPage = whichPage;
        $(".card-side .card-col").hide().slice((currentPage - 1) * limitPage, currentPage * limitPage).show();
        $(".pagination li").slice(1, -1).remove();
        getPageList(allPages, currentPage, paginationSize).forEach(i =>{
            $("<li>").addClass("item").addClass(i ? "current" : "dots").toggleClass("active", i == currentPage).append($("<a>").addClass("link").attr({href: "Javascript:void(0)"})
            .text(i || "...")).insertBefore("next")
        });

        $("prev").toggleClass("disable", currentPage === 1);
        $("next").toggleClass("disable", currentPage === allPages);
        return true;
    }
    $(".pagination").append(
       $("<li>").addClass("item").addClass("prev").append($("<a>").addClass("link").attr({href: "javascript:void(0)" }).text("Prev")),
       $("<li>").addClass("item").addClass("next").append($("<a>").addClass("link").attr({href: "javascript:void(0)" }).text("Next"))
    );

    $(".card-side").show();
    showPage(1)

    $("document").on("click", ".pagination li.current:not(.active)", function(){
        return showPage(+$(this).text());
    })
    $(".next").on("click", function(){
        return showPage(currentPage + 1);
    });
    $(".prev").on("click", function(){
        return showPage(currentPage - 1);
    });
})
