$(function () {
var model = {
	cats: [
	{
		"name": "Tabby",
		"img": "img/Cat1.jpg",
		"clicks": 0
	},
	{
		"name": "Tiger",
		"img": "img/Cat2.jpg",
		"clicks": 0
	},
	{
		"name": "Scaredy",
		"img": "img/Cat3.jpg",
		"clicks": 0
	},
	{
		"name": "Shadow",
		"img": "img/Cat4.jpg",
		"clicks": 0
	},
	{
		"name": "Sleepy",
		"img": "img/Cat5.jpg",
		"clicks": 0
	}
	]
};

var octopus = {
	init: function () {
		listView.init();
		catDisplayView.init();
	},
	getCats: function () {
		return model.cats;
	},
	getSelectedCat: function (id) {
		return model.cats[id];
	},
	incrementClickCount: function (elemId) {
		model.cats[elemId].clicks += 1;
		catDisplayView.render(elemId);
	},
	getClickInfo: function (elemId) {
		return model.cats[elemId].clicks;
	},
	findClickedCat: function (catName) {
		return model.cats.findIndex(function(cat){
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
		let catArray = octopus.getCats();
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
			octopus.incrementClickCount(elemId);
		});
		catDisplayView.render(0);
	},
	render: function (id) {
		let cat = octopus.getSelectedCat(id);
		this.catDetail.attr("id", id);
		this.catName.html(cat.name);
		this.catImage.attr("src", cat.img);
		this.clickCount.html(cat.clicks);
	}
};

octopus.init();

});