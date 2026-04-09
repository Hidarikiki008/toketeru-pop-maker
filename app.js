// 置き場所と役割を先に決めると、迷いにくく売り場でも使いやすいよ。
var ROLE_MAP = {
  attention: {
    template: "template-a",
    label: "遠くで見せる",
    kicker: "入口・台の前で止める",
    guideTitle: "遠くで足を止めるPOP",
    guidePlacement: "入口・台の前・コーナー先頭に置くと向いているよ。",
    guideCopyRule: "見出しは大きく、文字は少なくすると伝わりやすいよ。",
    guideToneRule: "情報POP向けだよ。価格より、まず見てほしい理由を出すと強いよ。",
    helperText: "遠く用はタイトルを短く大きくすると見つけやすいよ。",
    titleLabel: "大きく見せる言葉",
    commentLabel: "短いひとこと",
    priceLabel: "短い補足",
    titlePlaceholder: "例：春のおすすめ",
    commentPlaceholder: "例：まず見てほしい人気品です",
    pricePlaceholder: "例：手作りです",
    presets: [
      { title: "おすすめ", comment: "まず見てほしい人気品です" },
      { title: "新作", comment: "できたてを並べています" },
      { title: "春限定", comment: "今だけの味です" }
    ]
  },
  beside: {
    template: "template-b",
    label: "商品の横",
    kicker: "選ぶ理由をひとこと",
    guideTitle: "商品横で選ばせるPOP",
    guidePlacement: "商品のすぐ横や棚前に置くと向いているよ。",
    guideCopyRule: "商品名より、選ぶ理由を一つだけ書くと伝わりやすいよ。",
    guideToneRule: "情報POPと商品トーンをそろえると自然だよ。",
    helperText: "商品横用は『どう良いか』を一言で出すと効きやすいよ。",
    titleLabel: "商品名 / 目立つ言葉",
    commentLabel: "選ぶ理由のひとこと",
    priceLabel: "価格 / 短い補足",
    titlePlaceholder: "例：手作りクッキー",
    commentPlaceholder: "例：バター香る人気味です",
    pricePlaceholder: "例：1袋 300円",
    presets: [
      { title: "人気商品", comment: "迷ったらこれが人気です" },
      { title: "手作りです", comment: "やさしい味わいです" },
      { title: "売れています", comment: "よく選ばれています" }
    ]
  },
  sale: {
    template: "template-c",
    label: "セール",
    kicker: "数字を大きく見せる",
    guideTitle: "セールで押すPOP",
    guidePlacement: "値札の近くや山積み前に置くと向いているよ。",
    guideCopyRule: "数字と限定感を強くして、他の文字は減らすと見やすいよ。",
    guideToneRule: "価格POP向けだよ。お得と期限をはっきり見せると強いよ。",
    helperText: "セール用は価格か限定感を主役にすると伝わりやすいよ。",
    titleLabel: "強く見せる言葉",
    commentLabel: "限定・お得のひとこと",
    priceLabel: "価格 / お得情報",
    titlePlaceholder: "例：数量限定",
    commentPlaceholder: "例：本日だけのお得です",
    pricePlaceholder: "例：2つで 500円",
    presets: [
      { title: "SALE", comment: "本日だけのお得です" },
      { title: "数量限定", comment: "なくなり次第終了です" },
      { title: "お買い得", comment: "今だけこの価格です" }
    ]
  }
};

var COLOR_HINT_MAP = {
  pink: "ピンク：やさしい、かわいい、お菓子向けだよ。",
  orange: "オレンジ：元気、人気、おすすめ感が出しやすいよ。",
  yellow: "黄色：お得、限定、セール感が伝わりやすいよ。",
  blue: "水色：さわやか、軽い、すっきり見せたいとき向けだよ。",
  green: "黄緑：手作り、安心、やさしい素材感と合わせやすいよ。"
};

var DEFAULT_FORM = {
  title: "おすすめ",
  comment: "やさしい甘さで人気です",
  price: "1つ 300円",
  role: "beside",
  color: "orange",
  copies: "4",
  orientation: "landscape"
};

var PREVIEW_MODE = "display";
var CURRENT_ROLE = DEFAULT_FORM.role;

var form = document.getElementById("popForm");
var titleInput = document.getElementById("titleInput");
var commentInput = document.getElementById("commentInput");
var priceInput = document.getElementById("priceInput");
var colorSelect = document.getElementById("colorSelect");
var colorButtons = document.querySelectorAll("[data-color]");
var copiesSelect = document.getElementById("copiesSelect");
var updateButton = document.getElementById("updateButton");
var openDisplayButton = document.getElementById("openDisplayButton");
var printButton = document.getElementById("printButton");
var resetButton = document.getElementById("resetButton");
var roleButtons = document.querySelectorAll("[data-role]");
var orientationButtons = document.querySelectorAll("[data-orientation]");
var previewButtons = document.querySelectorAll("[data-preview]");
var titleLabel = document.getElementById("titleLabel");
var commentLabel = document.getElementById("commentLabel");
var priceLabel = document.getElementById("priceLabel");
var presetRow = document.getElementById("presetRow");
var guideTitle = document.getElementById("guideTitle");
var guidePlacement = document.getElementById("guidePlacement");
var guideCopyRule = document.getElementById("guideCopyRule");
var guideToneRule = document.getElementById("guideToneRule");
var helperText = document.getElementById("helperText");
var toneHint = document.getElementById("toneHint");
var displayPreviewPanel = document.getElementById("displayPreviewPanel");
var printPreviewPanel = document.getElementById("printPreviewPanel");
var deviceStage = document.getElementById("deviceStage");
var deviceShell = document.getElementById("deviceShell");
var devicePreview = document.getElementById("devicePreview");
var printSheet = document.getElementById("printSheet");
var displayMode = document.getElementById("displayMode");
var displayStage = document.getElementsByClassName("display-stage")[0];
var closeDisplayButton = document.getElementById("closeDisplayButton");
var displayFlipButton = document.getElementById("displayFlipButton");
var displayPrintButton = document.getElementById("displayPrintButton");
var fullDisplayWrap = document.getElementById("fullDisplayWrap");

function trimText(value) {
  return String(value || "").replace(/^\s+|\s+$/g, "");
}

function createElement(tagName, className, text) {
  var element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (typeof text !== "undefined" && text !== null) {
    element.textContent = text;
  }

  return element;
}

function setDefaults() {
  titleInput.value = DEFAULT_FORM.title;
  commentInput.value = DEFAULT_FORM.comment;
  priceInput.value = DEFAULT_FORM.price;
  setColor(DEFAULT_FORM.color);
  copiesSelect.value = DEFAULT_FORM.copies;
  setRole(DEFAULT_FORM.role);
  setOrientation(DEFAULT_FORM.orientation);
  setPreviewMode("display");
}

function getRole() {
  return CURRENT_ROLE;
}

function setRole(roleName) {
  var i;

  CURRENT_ROLE = roleName;

  for (i = 0; i < roleButtons.length; i += 1) {
    if (roleButtons[i].getAttribute("data-role") === roleName) {
      roleButtons[i].className = "role-card is-active";
      roleButtons[i].setAttribute("aria-pressed", "true");
    } else {
      roleButtons[i].className = "role-card";
      roleButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  syncRoleGuide();
  renderPresetButtons();
}

function syncRoleGuide() {
  var role = ROLE_MAP[getRole()];

  titleLabel.textContent = role.titleLabel;
  commentLabel.textContent = role.commentLabel;
  priceLabel.textContent = role.priceLabel;
  titleInput.setAttribute("placeholder", role.titlePlaceholder);
  commentInput.setAttribute("placeholder", role.commentPlaceholder);
  priceInput.setAttribute("placeholder", role.pricePlaceholder);
  guideTitle.textContent = role.guideTitle;
  guidePlacement.textContent = role.guidePlacement;
  guideCopyRule.textContent = role.guideCopyRule;
  guideToneRule.textContent = role.guideToneRule;
  helperText.textContent = role.helperText;
}

function syncColorHint() {
  toneHint.textContent = COLOR_HINT_MAP[colorSelect.value] || "";
}

function setColor(colorName) {
  var i;

  colorSelect.value = colorName;

  for (i = 0; i < colorButtons.length; i += 1) {
    if (colorButtons[i].getAttribute("data-color") === colorName) {
      colorButtons[i].className = "color-card is-active";
      colorButtons[i].setAttribute("aria-pressed", "true");
    } else {
      colorButtons[i].className = "color-card";
      colorButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  syncColorHint();
}

function applyPreset(index) {
  var preset = ROLE_MAP[getRole()].presets[index];

  if (!preset) {
    return;
  }

  titleInput.value = preset.title || "";
  commentInput.value = preset.comment || "";

  if (preset.price) {
    priceInput.value = preset.price;
  }

  renderAll();
}

function renderPresetButtons() {
  var presets = ROLE_MAP[getRole()].presets;
  var i;
  var button;

  clearChildren(presetRow);

  for (i = 0; i < presets.length; i += 1) {
    button = createElement("button", "preset-chip", presets[i].title);
    button.type = "button";
    button.setAttribute("data-preset-index", String(i));
    presetRow.appendChild(button);
  }
}

function getOrientation() {
  var i;

  for (i = 0; i < orientationButtons.length; i += 1) {
    if (orientationButtons[i].className.indexOf("is-active") !== -1) {
      return orientationButtons[i].getAttribute("data-orientation");
    }
  }

  return DEFAULT_FORM.orientation;
}

function setOrientation(value) {
  var i;
  var isLandscape = value === "landscape";

  for (i = 0; i < orientationButtons.length; i += 1) {
    if (orientationButtons[i].getAttribute("data-orientation") === value) {
      orientationButtons[i].className = "toggle-button is-active";
      orientationButtons[i].setAttribute("aria-pressed", "true");
    } else {
      orientationButtons[i].className = "toggle-button";
      orientationButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  deviceShell.className = "device-shell " + (isLandscape ? "is-landscape" : "is-portrait");
  fullDisplayWrap.className = "full-display-wrap " + (isLandscape ? "is-landscape" : "is-portrait");
  deviceStage.setAttribute("data-orientation", value);
}

function flipOrientation() {
  if (getOrientation() === "landscape") {
    setOrientation("portrait");
  } else {
    setOrientation("landscape");
  }
}

function setPreviewMode(value) {
  var i;

  PREVIEW_MODE = value;

  for (i = 0; i < previewButtons.length; i += 1) {
    if (previewButtons[i].getAttribute("data-preview") === value) {
      previewButtons[i].className = "switch-button is-active";
      previewButtons[i].setAttribute("aria-pressed", "true");
    } else {
      previewButtons[i].className = "switch-button";
      previewButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  if (value === "print") {
    displayPreviewPanel.className = "preview-view is-hidden";
    printPreviewPanel.className = "preview-view";
  } else {
    displayPreviewPanel.className = "preview-view";
    printPreviewPanel.className = "preview-view is-hidden";
  }
}

function getFormData() {
  var roleName = getRole();
  var role = ROLE_MAP[roleName];

  return {
    title: titleInput.value,
    comment: commentInput.value,
    price: priceInput.value,
    role: roleName,
    template: role.template,
    roleLabel: role.label,
    roleKicker: role.kicker,
    color: colorSelect.value,
    copies: copiesSelect.value,
    orientation: getOrientation()
  };
}

function pickSizeClass(length, compactAt, tightAt, compactClass, tightClass) {
  if (length >= tightAt) {
    return tightClass;
  }

  if (length >= compactAt) {
    return compactClass;
  }

  return "";
}

function appendIfExists(parent, child) {
  if (child) {
    parent.appendChild(child);
  }
}

function createTextBlock(tagName, baseClass, text, sizeClass) {
  if (!text) {
    return null;
  }

  return createElement(tagName, baseClass + (sizeClass ? " " + sizeClass : ""), text);
}

function buildPopSurface(data, variant, isEmptySlot) {
  var outer = createElement("article", "pop-surface");
  var inner = createElement("div", "pop-surface__inner");
  var glowOne = createElement("div", "pop-glow pop-glow-one");
  var glowTwo = createElement("div", "pop-glow pop-glow-two");
  var top = createElement("div", "pop-top");
  var copy = createElement("div", "pop-copy");
  var foot = createElement("div", "pop-foot");
  var chip = createElement("p", "pop-chip");
  var kicker = createElement("p", "pop-kicker");
  var title = trimText(data.title);
  var comment = trimText(data.comment);
  var price = trimText(data.price);
  var hasAnyText = !!(title || comment || price);
  var ribbon;

  outer.className = "pop-surface surface-" + variant + " " + data.template + " theme-" + data.color;

  if (isEmptySlot) {
    outer.className += " is-empty-slot";
    chip.textContent = "空き";
    copy.appendChild(createElement("p", "pop-empty screen-only", "この面は使わないよ"));
  } else {
    chip.textContent = data.roleLabel;
    kicker.textContent = data.roleKicker;

    if (data.template === "template-c") {
      ribbon = createElement("p", "pop-ribbon", "SALE");
      top.appendChild(ribbon);
    }

    appendIfExists(copy, createTextBlock(
      "h3",
      "pop-title",
      title,
      pickSizeClass(title.length, 10, 15, "size-title-compact", "size-title-tight")
    ));

    appendIfExists(copy, createTextBlock(
      "p",
      "pop-comment",
      comment,
      pickSizeClass(comment.length, 18, 28, "size-comment-compact", "size-comment-tight")
    ));

    appendIfExists(foot, createTextBlock(
      "p",
      "pop-price",
      price,
      pickSizeClass(price.length, 10, 14, "size-price-compact", "size-price-tight")
    ));

    if (!hasAnyText) {
      copy.appendChild(createElement("p", "pop-empty screen-only", "文字を入れるとここに出るよ"));
    }
  }

  top.appendChild(chip);
  top.appendChild(kicker);
  inner.appendChild(glowOne);
  inner.appendChild(glowTwo);
  inner.appendChild(top);
  inner.appendChild(copy);
  inner.appendChild(foot);
  outer.appendChild(inner);

  return outer;
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function sizeBox(element, maxWidth, maxHeight, orientation) {
  var ratio = orientation === "landscape" ? (4 / 3) : (3 / 4);
  var width = maxWidth;
  var height;

  if (maxWidth < 1 || maxHeight < 1) {
    return;
  }

  if (orientation === "landscape") {
    height = width / ratio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }
  } else {
    height = maxHeight;
    width = height * ratio;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / ratio;
    }
  }

  element.style.width = Math.floor(width) + "px";
  element.style.height = Math.floor(height) + "px";
}

function updateDisplayLayout() {
  var orientation = getOrientation();
  var previewWidth = deviceStage.clientWidth - 36;
  var previewHeight = deviceStage.clientHeight - 36;
  var fullWidth = displayStage.clientWidth - 32;
  var fullHeight = displayStage.clientHeight - 32;

  if (orientation === "landscape") {
    if (previewHeight > 450) {
      previewHeight = 450;
    }
  } else if (previewHeight > 520) {
    previewHeight = 520;
  }

  sizeBox(deviceShell, previewWidth, previewHeight, orientation);
  sizeBox(fullDisplayWrap, fullWidth, fullHeight, orientation);
}

function renderDevicePreview(data) {
  clearChildren(devicePreview);
  devicePreview.appendChild(buildPopSurface(data, "device", false));
}

function renderFullDisplay(data) {
  clearChildren(fullDisplayWrap);
  fullDisplayWrap.appendChild(buildPopSurface(data, "full", false));
}

function renderPrintSheet(data) {
  var copies = parseInt(data.copies, 10);
  var i;
  var wrap;

  if (!copies || copies < 1) {
    copies = 1;
  }

  if (copies > 4) {
    copies = 4;
  }

  clearChildren(printSheet);

  for (i = 0; i < 4; i += 1) {
    wrap = createElement("div", "surface-print-wrap");
    wrap.appendChild(buildPopSurface(data, "print", i >= copies));
    printSheet.appendChild(wrap);
  }
}

function renderAll() {
  var data = getFormData();

  setOrientation(data.orientation);
  renderDevicePreview(data);
  renderFullDisplay(data);
  renderPrintSheet(data);
  updateDisplayLayout();
}

function resetForm() {
  if (form && typeof form.reset === "function") {
    form.reset();
  }

  setDefaults();
  renderAll();
}

function openDisplayMode() {
  renderAll();
  if (document.body.className.indexOf("is-display-mode") === -1) {
    document.body.className = trimText(document.body.className + " is-display-mode");
  }
  displayMode.className = "display-mode";
  updateDisplayLayout();
}

function closeDisplayMode() {
  document.body.className = trimText(document.body.className.replace(/\bis-display-mode\b/g, " "));
  displayMode.className = "display-mode is-hidden";
}

updateButton.addEventListener("click", renderAll);

openDisplayButton.addEventListener("click", openDisplayMode);

printButton.addEventListener("click", function () {
  setPreviewMode("print");
  renderAll();
  window.print();
});

resetButton.addEventListener("click", resetForm);

closeDisplayButton.addEventListener("click", closeDisplayMode);

displayFlipButton.addEventListener("click", function () {
  flipOrientation();
  renderAll();
});

displayPrintButton.addEventListener("click", function () {
  setPreviewMode("print");
  renderAll();
  window.print();
});

document.addEventListener("keydown", function (event) {
  if (event && event.key === "Escape") {
    closeDisplayMode();
  }
});

function bindOrientationButtons() {
  var i;

  for (i = 0; i < orientationButtons.length; i += 1) {
    orientationButtons[i].addEventListener("click", function () {
      setOrientation(this.getAttribute("data-orientation"));
      renderAll();
    });
  }
}

function bindRoleButtons() {
  var i;

  for (i = 0; i < roleButtons.length; i += 1) {
    roleButtons[i].addEventListener("click", function () {
      setRole(this.getAttribute("data-role"));
      renderAll();
    });
  }
}

function bindColorButtons() {
  var i;

  for (i = 0; i < colorButtons.length; i += 1) {
    colorButtons[i].addEventListener("click", function () {
      setColor(this.getAttribute("data-color"));
      renderAll();
    });
  }
}

function bindPreviewButtons() {
  var i;

  for (i = 0; i < previewButtons.length; i += 1) {
    previewButtons[i].addEventListener("click", function () {
      setPreviewMode(this.getAttribute("data-preview"));
    });
  }
}

function bindPresetButtons() {
  presetRow.addEventListener("click", function (event) {
    var target = event.target || event.srcElement;
    var index;

    if (!target || target.className.indexOf("preset-chip") === -1) {
      return;
    }

    index = parseInt(target.getAttribute("data-preset-index"), 10);
    applyPreset(index);
  });
}

colorSelect.addEventListener("change", function () {
  setColor(colorSelect.value);
  renderAll();
});

titleInput.addEventListener("input", renderAll);
commentInput.addEventListener("input", renderAll);
priceInput.addEventListener("input", renderAll);
copiesSelect.addEventListener("change", renderAll);

bindRoleButtons();
bindColorButtons();
bindOrientationButtons();
bindPreviewButtons();
bindPresetButtons();
window.addEventListener("resize", updateDisplayLayout);
setDefaults();
renderAll();
