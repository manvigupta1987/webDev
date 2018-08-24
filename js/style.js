$(function () {
var model = {
	isAdminModeEnabled : false,
	currentCatId: '0',
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
		catDisplayView.render();
		adminView.init();
	},
	getCats: function () {
		return model.cats;
	},
	incrementClickCount: function (elemId) {
		let id = model.currentCatId;
		model.cats[id].clicks++;
		catDisplayView.render();
	},
	findClickedCat: function (catName) {
		return model.cats.findIndex(function(cat){
			return cat.name === catName;
		});
	},
	getAdminMode: function() {
		return model.isAdminModeEnabled;
	},
	setAdminMode: function (val) {
		model.isAdminModeEnabled = val;
	},
	getCurrentCat: function () {
		return model.cats[model.currentCatId];
	},
	setCurrentCatId: function(id){
		model.currentCatId = id;
	},
	changeCatModel: function(name, imgUrl, clicks){
		model.cats[model.currentCatId].name = name;
		model.cats[model.currentCatId].img = imgUrl;
		model.cats[model.currentCatId].clicks = clicks;
		listView.render();
		catDisplayView.render();
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
			octopus.setCurrentCatId(id);
			catDisplayView.render();
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
			octopus.incrementClickCount();
		});
	},
	render: function () {
		let cat = octopus.getCurrentCat();
		//this.catDetail.attr("id", id);
		this.catName.html(cat.name);
		this.catImage.attr("src", cat.img);
		this.clickCount.html(cat.clicks);
	}
};

var adminView = {
	init: function () {
		this.formSubmit = $('#admin-form');
		this.reset = $('#resetBtn');
		this.adminBtn = $('#admin');
		this.formSubmit.addClass("hidden");

		this.adminBtn.click(function () {
			$('#admin-form').toggleClass("hidden");
			let adminMode = octopus.getAdminMode();
			octopus.setAdminMode(!adminMode);
		});
		this.formSubmit.submit(function () {
			var values = {};
			if($(this).val().length !== 0){
				$.each($(this).serializeArray(), function(i, field) {
    				values[field.name] = field.value;
				});
				octopus.changeCatModel(values.CatName, values.ImgUrl, values.Clicks);
			}
			return false;
		});
		this.reset.click(function () {
			document.getElementById('admin-form').reset();
		});
	}
}

octopus.init();

});