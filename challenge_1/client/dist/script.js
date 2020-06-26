var winScroll = document.querySelector(".container");

winScroll.onscroll = function () {
  myFunction();
};

function myFunction() {
  var width = winScroll.clientWidth - winScroll.scrollLeft;

  var scrolled =
    ((winScroll.clientWidth - width) * 100) / winScroll.clientWidth;

  if (scrolled >= 100) {
    return (document.getElementById("myBar").style.width = "100%");
  }

  document.getElementById("myBar").style.width = scrolled + "%";
}
