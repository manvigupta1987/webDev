$(function () {
var catmodel = [
	{
		"name": "Cat1",
		"img": "https://s-media-cache-ak0.pinimg.com/736x/4c/a2/c1/4ca2c1d3ef5042461f5def25e68b2fa5.jpg",
		"clicks": 0
	},
	{
		"name": "Cat2",
		"img": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
		"clicks": 0
	},
	{
		"name": "Cat3",
		"img": "https://s-media-cache-ak0.pinimg.com/736x/4c/a2/c1/4ca2c1d3ef5042461f5def25e68b2fa5.jpg",
		"clicks": 0
	},
	{
		"name": "Cat4",
		"img": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
		"clicks": 0
	},
	{
		"name": "Cat5",
		"img": "https://s-media-cache-ak0.pinimg.com/736x/4c/a2/c1/4ca2c1d3ef5042461f5def25e68b2fa5.jpg",
		"clicks": 0
	},
	{
		"name": "Cat6",
		"img": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
		"clicks": 0
	}
];

var octopus = {
	init: function () {
		listView.init();
		catDisplayView.init();
	},
	getCatsInfo: function () {
		return catmodel;
	},
	getCatInfo: function (id) {
		return catmodel[id];
	},
	updateClickCount:function (elemId) {
		catmodel[elemId].clicks += 1;
		catDisplayView.render(elemId);
	},
	getClickInfo: function (elemId) {
		return catmodel[elemId].clicks;
	},
	findClickedCat: function (catName) {
		return catmodel.findIndex(function(cat){
			return cat.name === catName;
		});
	}
};

var listView = {
	init: function () {
		this.catList = $('.cat-list-group');
		listView.render();
	},
	render:function () {
		let toAppend = '';
		let catArray = octopus.getCatsInfo();
		$.each(catArray, function (index, cat) {
			toAppend += '<li class=cat-list-group-item>' + cat.name + '</li>';
		});
		this.catList.html(toAppend);
		$('.cat-list-group-item').click(function () {
			let id = octopus.findClickedCat(event.target.textContent);
			catDisplayView.render(id);
		});
	}
};

var catDisplayView = {
	init: function () {
		this.catDetail = $('.cat-detail');
		this.catName = $('#cat-name');
		this.catImage = $('#cat-image');
		this.clickCount = $('.count');
		this.catImage.click (function (event) {
			let elemId = event.target.parentElement.id;
			octopus.updateClickCount(elemId);
		});
		catDisplayView.render(0);
	},
	render: function (id) {
		let cat = octopus.getCatInfo(id);
		this.catDetail.attr("id", id);
		this.catName.html(cat.name);
		this.catImage.attr("src", cat.img);
		this.clickCount.html(cat.clicks);
	}
};

octopus.init();

});