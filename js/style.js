var cats = [
	{
		"name": "Cat1",
		"img": "https://s-media-cache-ak0.pinimg.com/736x/4c/a2/c1/4ca2c1d3ef5042461f5def25e68b2fa5.jpg",
		"clicks": 0
	},
	{
		"name": "Cat2",
		"img": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
		"clicks": 0
	}
];


function createCatList(){
	let toAppend = "";
	$.each(cats, function(index, cat){
		toAppend += "<li class=cat-list-group-item>" + cat.name + "</li>";
	})
	$('#cat-list').append("<ul class='cat-group'>" + toAppend + "</ul>");
}

function displayCat(id){
	$('.cat-detail').empty();
	cat = cats[id];
	let toAppend = "<h2 id='cat-name'>" + cat.name +"</h2>" +
                "<img class='clickable' id='cat-image' alt='cat image' src="+ cat.img + ">" +
                '<div class="score-class" id="'+ id + '"> Clicks: <span id="count">' + cat.clicks + '</span></div>';
	$('.cat-detail').append(toAppend);
	$(".clickable").click(function(event) {
		let elemId = event.target.parentElement.childNodes[2].id;
		cats[elemId].clicks += 1;
		$('#count').html(cats[elemId].clicks);
	});
}

$(document).ready(function(){
	createCatList();
	displayCat(0);
	$('.cat-list-group-item').click(function(event){
		let id = cats.findIndex(function(cat){
					return cat.name === event.target.textContent;
				 });
		displayCat(id);
	})
})