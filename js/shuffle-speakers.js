(function () {
  function shuffleSpeakers() {
    var grid = document.getElementById("speakers-list");
    if (!grid) return;

    var items = Array.prototype.slice.call(grid.children);
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }
    items.forEach(function (item) {
      grid.appendChild(item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", shuffleSpeakers);
  } else {
    shuffleSpeakers();
  }
})();
