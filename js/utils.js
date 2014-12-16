function Add() {
	var inpElem = document.getElementById('input');
	if (inpElem.value != '') {
		$.ajax({
			url : '/redis/insert',
			data : {
				data : inpElem.value
			},
		}).done(function (data) {
			var keyvalue = data.split(':');
			AddElem(keyvalue[0], keyvalue[1])
		});
	}
}
function AddElem(id, value) {
	var divElem = document.createElement('div');
	var doneElem = document.createElement('div');
	$(divElem).addClass('alert').attr('id', id).html(value).fadeIn(300).appendTo($('body'));
	$(doneElem).addClass('doneBtn').html('Done').click(function () {
		var elem = $(this).parent();
		var id = elem.attr('id');
		DeleteElem(id, function () {
			elem.remove();
		});
	}).appendTo($(divElem));
	$('.inputCls').val('');
}
function ListAndBuildDivs() {
	$.ajax({
		url : '/redis/getall',
	}).done(function (dataList) {
		var keyvalue;
		for (var item in dataList) {
			keyvalue = dataList[item].split(':');
			AddElem(keyvalue[0], keyvalue[1])
		}
	});
}
function DeleteElem(id, callback) {
	$.get('/redis/del', {
		id : id
	}).done(function (data) {
		if (data == 1)
			callback();
		else
			alert('oops some error debug maadi');
	}).fail(function (data) {
		alert('oops some error debug maadi');
	});
}
