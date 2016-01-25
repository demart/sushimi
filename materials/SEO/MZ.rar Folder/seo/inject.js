var mzSeoFunction = (function () {
	var s = document.getElementsByTagName('body')[0];
	if (!s) {
		setTimeout('mzSeoFunction();', 20);
	} else {
		var articleMz = document.getElementById('seoUctBlock');
		if (!articleMz) {
			setTimeout('mzSeoFunction();', 20);
		} else {
			s.appendChild(articleMz);
		}
	}
	try
	{
		this.onload.prev();
	}
	catch (e) {

	}
});
setTimeout('mzSeoFunction();', 200);
mzSeoFunction.prev = window.onload;
window.onload = mzSeoFunction;

function followText() {
	var articleUctPverFlow = document.getElementById('seoUctForH1Article');
	var articleUctShow = document.getElementById('seoUctBlock');
	var textFollow = document.getElementById('articleDisplay');
	articleUctPverFlow.style.overflow = 'visible';
	articleUctPverFlow.style.color = 'black';
	articleUctShow.id = 'articleUctShow';
	textFollow.style.display = 'none';
}
