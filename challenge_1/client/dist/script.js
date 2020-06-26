var winScroll = document.querySelector(".container");

winScroll.onscroll = function () {
  myFunction();
};

function myFunction() {
  var width = winScroll.scrollWidth - winScroll.clientWidth;

  var scrolled = (winScroll.scrollLeft / width) * 100;

  if (scrolled >= 100) {
    return (document.getElementById("myBar").style.width = "100%");
  }

  document.getElementById("myBar").style.width = scrolled + "%";
}
