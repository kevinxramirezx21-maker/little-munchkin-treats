window.LMT_IMAGES = window.LMT_IMAGES || {};
(function () {
  function card(bg1, bg2, dots, label) {
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0%' stop-color='" + bg1 + "'/>" +
      "<stop offset='100%' stop-color='" + bg2 + "'/></linearGradient></defs>" +
      "<rect width='800' height='500' rx='36' fill='url(#g)'/>" +
      "<circle cx='170' cy='210' r='78' fill='" + dots[0] + "'/>" +
      "<circle cx='400' cy='170' r='90' fill='" + dots[1] + "'/>" +
      "<circle cx='630' cy='220' r='78' fill='" + dots[2] + "'/>" +
      "<circle cx='170' cy='210' r='12' fill='#3b241c'/>" +
      "<circle cx='400' cy='170' r='12' fill='#3b241c'/>" +
      "<circle cx='630' cy='220' r='12' fill='#3b241c'/>" +
      "<text x='400' y='430' text-anchor='middle' font-family='Georgia,serif' font-size='34' fill='#6b3e2a'>" +
      label +
      "</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }
  const pack = window.LMT_IMAGES;
  pack.box = pack.box || card("#fff7f2", "#f7c5d1", ["#f4d7c8", "#e37a96", "#c9e7b6"], "Classic dozen");
  pack.chocolate = pack.chocolate || card("#f8eee6", "#d7b299", ["#6b3e2a", "#c75d7a", "#8a5a3b"], "Chocolate treats");
  pack.birthday = pack.birthday || card("#fff4f8", "#f3d39a", ["#e37a96", "#fff7ae", "#f7c5d1"], "Birthday bows");
  pack.flavors = pack.flavors || card("#f3fff4", "#ffe4ec", ["#c9e7b6", "#e37a96", "#fff4c2"], "Key lime + strawberry");
  pack.thankyou = pack.thankyou || pack.logo || card("#ffffff", "#fdecef", ["#e37a96", "#c9e7b6", "#f3d39a"], "thank you");
  pack.favicon = pack.favicon || pack.logo;
})();
