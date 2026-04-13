// 置き場所と役割を先に決めると、迷いにくく売り場でも使いやすいよ。
var ROLE_MAP = {
  attention: {
    template: "template-a",
    guideTitle: "遠くで足を止めるPOP",
    guidePlacement: "入口やコーナー先頭に置くと見つけやすいよ。",
    guideCopyRule: "見出しは1つだけ、大きく見せると止まりやすいよ。",
    tipLabel: "遠く用",
    tipText: "見出しを主役にして、価格は小さめにすると強いよ。",
    titleLabel: "目立たせる言葉",
    commentLabel: "商品名",
    descriptionLabel: "ひとこと説明",
    priceLabel: "価格",
    titlePlaceholder: "例：春のおすすめ",
    commentPlaceholder: "例：手作りクッキー",
    descriptionPlaceholder: "例：サクサクこうばしい人気味",
    pricePlaceholder: "例：300円",
    presets: [
      { title: "おすすめ🌷", comment: "手作りクッキー🍪", description: "サクサクこうばしい人気味☀️", price: "300円" },
      { title: "新作🌸", comment: "春のマドレーヌ🧁", description: "ふわっとやさしい春の香り", price: "280円" },
      { title: "春限定🌸", comment: "さくらパウンド🍰", description: "今だけのやわらかい味わい", price: "350円" }
    ]
  },
  beside: {
    template: "template-b",
    guideTitle: "商品横で選ばせるPOP",
    guidePlacement: "商品のすぐ横や棚前に置くと効きやすいよ。",
    guideCopyRule: "選ぶ理由はひとことにしぼると伝わりやすいよ。",
    tipLabel: "商品横",
    tipText: "商品名と価格を近くに置くと選びやすいよ。",
    titleLabel: "選ぶ理由",
    commentLabel: "商品名",
    descriptionLabel: "ひとこと説明",
    priceLabel: "価格",
    titlePlaceholder: "例：やさしい甘さ",
    commentPlaceholder: "例：手作りクッキー",
    descriptionPlaceholder: "例：サクサク、やさしい甘さ",
    pricePlaceholder: "例：300円",
    presets: [
      { title: "人気商品🐱", comment: "手作りクッキー🍪", description: "サクサク、やさしい甘さ☀️", price: "300円" },
      { title: "手作りです🧺", comment: "バタークッキー🧈", description: "バターの香りがふわっと広がるよ", price: "320円" },
      { title: "売れています⭐", comment: "しっとりマフィン🧁", description: "ふんわり食べやすい人気味だよ", price: "280円" }
    ]
  },
  sale: {
    template: "template-c",
    guideTitle: "セールで押すPOP",
    guidePlacement: "値札の近くや山積み前に置くと向いているよ。",
    guideCopyRule: "数字を一番大きくするとお得感が伝わりやすいよ。",
    tipLabel: "セール",
    tipText: "価格か限定感を主役にすると目に入りやすいよ。",
    titleLabel: "見せたい言葉",
    commentLabel: "商品名",
    descriptionLabel: "ひとこと説明",
    priceLabel: "価格",
    titlePlaceholder: "例：数量限定",
    commentPlaceholder: "例：手作りクッキー",
    descriptionPlaceholder: "例：今だけのサクサク人気味",
    pricePlaceholder: "例：2つで500円",
    presets: [
      { title: "SALE🔥", comment: "手作りクッキー🍪", description: "今だけのサクサク人気味", price: "2つで500円" },
      { title: "数量限定🎀", comment: "さくらパウンド🌸", description: "春だけのふんわり味わい", price: "350円" },
      { title: "お買い得💛", comment: "しっとりマフィン🧁", description: "今日いちばんのお買い得だよ", price: "280円" }
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
  title: "人気商品🐱",
  comment: "手作りクッキー🍪",
  description: "サクサクこうばしい人気味☀️",
  price: "300円",
  role: "beside",
  color: "orange",
  copies: "4",
  templateMode: "fixed",
  orientation: "portrait"
};

var TEMPLATE_IMAGE_MAP = {
  attention: "assets/templates/人気商品と手作りアクセサリー.png",
  beside: "assets/templates/新しいアクセサリーコレクションの紹介.png",
  sale: "assets/templates/お得なアクセサリーキャンペーン.png"
};

var PREVIEW_MODE = "display";
var CURRENT_ROLE = DEFAULT_FORM.role;
var CURRENT_TEMPLATE_MODE = DEFAULT_FORM.templateMode;
var EMOJI_PATTERN = /([\u2600-\u27BF]|(?:[\uD83C-\uDBFF][\uDC00-\uDFFF]))/g;
var TRAILING_EMOJI_PATTERN = /((?:\s*(?:[\u2600-\u27BF]|(?:[\uD83C-\uDBFF][\uDC00-\uDFFF])))+)$/;

var form = document.getElementById("popForm");
var titleInput = document.getElementById("titleInput");
var commentInput = document.getElementById("commentInput");
var descriptionInput = document.getElementById("descriptionInput");
var priceInput = document.getElementById("priceInput");
var colorSelect = document.getElementById("colorSelect");
var colorGrid = document.getElementById("colorGrid");
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
var descriptionLabel = document.getElementById("descriptionLabel");
var priceLabel = document.getElementById("priceLabel");
var presetRow = document.getElementById("presetRow");
var guideTitle = document.getElementById("guideTitle");
var guidePlacement = document.getElementById("guidePlacement");
var guideCopyRule = document.getElementById("guideCopyRule");
var tipChip = document.getElementById("tipChip");
var tipText = document.getElementById("tipText");
var toneHint = document.getElementById("toneHint");
var displayPreviewPanel = document.getElementById("displayPreviewPanel");
var printPreviewPanel = document.getElementById("printPreviewPanel");
var deviceStage = document.getElementById("deviceStage");
var deviceShell = document.getElementById("deviceShell");
var devicePreview = document.getElementById("devicePreview");
var printSheet = document.getElementById("printSheet");
var displayMode = document.getElementById("displayMode");
var displayToolbar = document.getElementsByClassName("display-toolbar")[0];
var displayStage = document.getElementsByClassName("display-stage")[0];
var closeDisplayButton = document.getElementById("closeDisplayButton");
var displayFlipButton = document.getElementById("displayFlipButton");
var displayPrintButton = document.getElementById("displayPrintButton");
var fullDisplayWrap = document.getElementById("fullDisplayWrap");
var displayHideTimer = null;
var templateModeButtons = [];
var templateModeNote = null;
var fixedPriceWrap = null;
var fixedPriceInput = null;
var freeFieldBlocks = [];

function setupTemplateModeUI() {
  var modeField;
  var modeLabel;
  var modeRow;
  var fixedButton;
  var freeButton;
  var priceField;
  var priceLabel;
  var priceFieldWrapper;
  var colorField;
  var presetField;
  var titleField;
  var descriptionField;
  var commentRow;

  if (!form || !toneHint || !presetRow || !titleInput || !descriptionInput || !priceInput) {
    return;
  }

  colorField = toneHint.parentNode;
  presetField = presetRow.parentNode;
  titleField = titleInput.parentNode;
  descriptionField = descriptionInput.parentNode;
  priceFieldWrapper = priceInput.parentNode;
  commentRow = priceFieldWrapper && priceFieldWrapper.parentNode;

  modeField = createElement("div", "field");
  modeLabel = createElement("span", "field-label", "作り方");
  modeRow = createElement("div", "template-mode-row");
  modeRow.setAttribute("role", "group");
  modeRow.setAttribute("aria-label", "作り方をえらぶ");

  fixedButton = createElement("button", "mode-button is-active", "固定テンプレ");
  fixedButton.type = "button";
  fixedButton.setAttribute("data-template-mode", "fixed");
  fixedButton.setAttribute("aria-pressed", "true");

  freeButton = createElement("button", "mode-button", "自由に作る");
  freeButton.type = "button";
  freeButton.setAttribute("data-template-mode", "free");
  freeButton.setAttribute("aria-pressed", "false");

  templateModeNote = createElement("span", "field-note", "固定テンプレでは、今は価格だけ入れるテストだよ。");
  templateModeNote.id = "templateModeNote";

  modeRow.appendChild(fixedButton);
  modeRow.appendChild(freeButton);
  modeField.appendChild(modeLabel);
  modeField.appendChild(modeRow);
  modeField.appendChild(templateModeNote);
  form.insertBefore(modeField, colorField.nextSibling);

  priceField = createElement("label", "field");
  priceField.id = "fixedPriceWrap";
  priceLabel = createElement("span", "field-label", "価格");
  fixedPriceInput = document.createElement("input");
  fixedPriceInput.id = "fixedPriceInput";
  fixedPriceInput.name = "fixedPrice";
  fixedPriceInput.type = "text";
  fixedPriceInput.setAttribute("inputmode", "decimal");
  fixedPriceInput.setAttribute("maxlength", "16");
  fixedPriceInput.setAttribute("autocomplete", "off");
  fixedPriceInput.setAttribute("placeholder", "例：300円");
  priceField.appendChild(priceLabel);
  priceField.appendChild(fixedPriceInput);
  form.insertBefore(priceField, commentRow.nextSibling);

  templateModeButtons = [fixedButton, freeButton];
  fixedPriceWrap = priceField;
  freeFieldBlocks = [colorField, presetField, titleField, commentRow, descriptionField];
}

function setupPortraitOnlyUI() {
  var orientationField;
  var copiesField;

  if (!orientationButtons.length) {
    return;
  }

  orientationField = orientationButtons[0].parentNode && orientationButtons[0].parentNode.parentNode;
  copiesField = orientationField && orientationField.parentNode ? orientationField.parentNode.lastElementChild : null;

  if (orientationField) {
    addClass(orientationField, "is-hidden");
  }

  if (copiesField) {
    removeClass(copiesField, "field-half");
    addClass(copiesField, "field-full");
  }

  if (displayFlipButton) {
    displayFlipButton.style.display = "none";
  }
}

function trimText(value) {
  return String(value || "").replace(/^\s+|\s+$/g, "");
}

function hasClass(element, className) {
  return !!element && (" " + (element.className || "") + " ").indexOf(" " + className + " ") !== -1;
}

function addClass(element, className) {
  if (element && !hasClass(element, className)) {
    element.className = trimText((element.className || "") + " " + className);
  }
}

function removeClass(element, className) {
  if (!element) {
    return;
  }

  element.className = trimText((element.className || "").replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "g"), " "));
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

function findTargetWithAttribute(startNode, attributeName, stopNode) {
  var node = startNode;

  while (node) {
    if (node.nodeType === 1 && node.getAttribute && node.getAttribute(attributeName) !== null) {
      return node;
    }

    if (node === stopNode) {
      break;
    }

    node = node.parentNode;
  }

  return null;
}

function setDefaults() {
  titleInput.value = DEFAULT_FORM.title;
  commentInput.value = DEFAULT_FORM.comment;
  descriptionInput.value = DEFAULT_FORM.description;
  priceInput.value = DEFAULT_FORM.price;
  if (fixedPriceInput) {
    fixedPriceInput.value = DEFAULT_FORM.price;
  }
  setColor(DEFAULT_FORM.color);
  copiesSelect.value = DEFAULT_FORM.copies;
  setRole(DEFAULT_FORM.role);
  setTemplateMode(DEFAULT_FORM.templateMode);
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

function getTemplateMode() {
  return CURRENT_TEMPLATE_MODE || DEFAULT_FORM.templateMode;
}

function setTemplateMode(modeName) {
  var i;
  var isFixed = modeName === "fixed";

  CURRENT_TEMPLATE_MODE = isFixed ? "fixed" : "free";

  for (i = 0; i < templateModeButtons.length; i += 1) {
    if (templateModeButtons[i].getAttribute("data-template-mode") === CURRENT_TEMPLATE_MODE) {
      templateModeButtons[i].className = "mode-button is-active";
      templateModeButtons[i].setAttribute("aria-pressed", "true");
    } else {
      templateModeButtons[i].className = "mode-button";
      templateModeButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  for (i = 0; i < freeFieldBlocks.length; i += 1) {
    if (isFixed) {
      addClass(freeFieldBlocks[i], "is-hidden");
    } else {
      removeClass(freeFieldBlocks[i], "is-hidden");
    }
  }

  if (fixedPriceWrap) {
    if (isFixed) {
      removeClass(fixedPriceWrap, "is-hidden");
    } else {
      addClass(fixedPriceWrap, "is-hidden");
    }
  }

  if (templateModeNote) {
    templateModeNote.textContent = isFixed
      ? "固定テンプレでは、今は価格だけ入れるテストだよ。"
      : "自由に作るでは、今までどおり文字を入れて作れるよ。";
  }

  if (fixedPriceInput && priceInput) {
    if (isFixed) {
      fixedPriceInput.value = priceInput.value;
    } else {
      priceInput.value = fixedPriceInput.value || priceInput.value;
    }
  }
}

function syncRoleGuide() {
  var role = ROLE_MAP[getRole()];

  titleLabel.textContent = role.titleLabel;
  commentLabel.textContent = role.commentLabel;
  descriptionLabel.textContent = role.descriptionLabel;
  priceLabel.textContent = role.priceLabel;
  titleInput.setAttribute("placeholder", role.titlePlaceholder);
  commentInput.setAttribute("placeholder", role.commentPlaceholder);
  descriptionInput.setAttribute("placeholder", role.descriptionPlaceholder);
  priceInput.setAttribute("placeholder", role.pricePlaceholder);
  guideTitle.textContent = role.guideTitle;
  guidePlacement.textContent = role.guidePlacement;
  guideCopyRule.textContent = role.guideCopyRule;
  tipChip.textContent = role.tipLabel;
  tipText.textContent = role.tipText;
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
  descriptionInput.value = preset.description || "";

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
  return "portrait";
}

function setOrientation(value) {
  var i;
  var isLandscape = false;
  value = "portrait";

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
  setOrientation("portrait");
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

  syncScreenSurfaceSizing();
}

function getFormData() {
  var roleName = getRole();
  var role = ROLE_MAP[roleName];
  var templateMode = getTemplateMode();
  var activePrice = templateMode === "fixed" && fixedPriceInput ? fixedPriceInput.value : priceInput.value;

  return {
    title: titleInput.value,
    comment: commentInput.value,
    description: descriptionInput.value,
    price: activePrice,
    role: roleName,
    template: role.template,
    templateMode: templateMode,
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

function appendTextWithEmoji(element, text) {
  var lastIndex = 0;
  var match;
  var fragment;
  var emoji;

  if (!text) {
    return;
  }

  fragment = document.createDocumentFragment();
  EMOJI_PATTERN.lastIndex = 0;

  match = EMOJI_PATTERN.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    emoji = createElement("span", "emoji-inline", match[0]);
    fragment.appendChild(emoji);
    lastIndex = EMOJI_PATTERN.lastIndex;
    match = EMOJI_PATTERN.exec(text);
  }

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  element.appendChild(fragment);
}

function splitTrailingEmoji(text) {
  var value = String(text || "");
  var match = value.match(TRAILING_EMOJI_PATTERN);
  var emojiText;
  var bodyText;

  if (!match) {
    return {
      body: value,
      emoji: ""
    };
  }

  emojiText = trimText(match[1]);
  bodyText = value.slice(0, value.length - match[1].length).replace(/\s+$/g, "");

  return {
    body: bodyText,
    emoji: emojiText
  };
}

function allowEmojiStamp(baseClass) {
  return baseClass === "pop-title" || baseClass === "pop-comment" || baseClass === "pop-description";
}

function createEmojiStamp(emojiText) {
  var stamp = createElement("span", "emoji-stamp");
  stamp.textContent = emojiText;

  return stamp;
}

function createTextBlock(tagName, baseClass, text, sizeClass) {
  var element;
  var parts;
  var stamp;

  if (!text) {
    return null;
  }

  element = createElement(tagName, baseClass + (sizeClass ? " " + sizeClass : ""));
  parts = allowEmojiStamp(baseClass) ? splitTrailingEmoji(text) : { body: text, emoji: "" };

  if (parts.body) {
    appendTextWithEmoji(element, parts.body);
  }

  if (parts.emoji) {
    stamp = createEmojiStamp(parts.emoji);
    element.appendChild(stamp);
  }

  if (!parts.body && !parts.emoji) {
    appendTextWithEmoji(element, text);
  }

  return element;
}

function detectTemplateName(surface) {
  var className = surface && surface.className ? surface.className : "";

  if (className.indexOf("template-c") !== -1) {
    return "template-c";
  }

  if (className.indexOf("template-b") !== -1) {
    return "template-b";
  }

  return "template-a";
}

function getTemplateScalePreset(templateName) {
  if (templateName === "template-c") {
    return {
      title: 54,
      comment: 56,
      description: 30,
      price: 108,
      top: 98,
      priceWidth: 270,
      priceMinWidth: 150,
      priceVerticalPad: 18,
      priceHorizontalPad: 30,
      commentMargin: 18,
      descriptionMargin: 14,
      ribbonFont: 52,
      ribbonVerticalPad: 12,
      ribbonHorizontalPad: 28
    };
  }

  if (templateName === "template-b") {
    return {
      title: 30,
      comment: 64,
      description: 28,
      price: 54,
      top: 44,
      priceWidth: 156,
      priceMinWidth: 0,
      priceVerticalPad: 14,
      priceHorizontalPad: 28,
      commentMargin: 20,
      descriptionMargin: 14,
      ribbonFont: 24,
      ribbonVerticalPad: 8,
      ribbonHorizontalPad: 16
    };
  }

  return {
    title: 100,
    comment: 48,
    description: 24,
    price: 46,
    top: 28,
    priceWidth: 148,
    priceMinWidth: 0,
    priceVerticalPad: 12,
    priceHorizontalPad: 26,
    commentMargin: 24,
    descriptionMargin: 16,
    ribbonFont: 24,
    ribbonVerticalPad: 8,
    ribbonHorizontalPad: 16
  };
}

function getFixedTemplatePriceText(roleName, priceText) {
  var value = trimText(priceText);

  if (!value) {
    return "300円";
  }

  return value || "300円";
}

function buildFixedTemplateSurface(data, variant, isEmptySlot) {
  var outer = createElement("article", "pop-surface pop-fixed-surface");
  var image;
  var overlay;
  var price;
  var priceText;

  outer.className += " surface-" + variant + " fixed-role-" + data.role;

  if (isEmptySlot) {
    outer.className += " is-empty-slot";
    outer.appendChild(createElement("p", "pop-empty screen-only", "ここは空きだよ"));
    return outer;
  }

  image = document.createElement("img");
  image.className = "fixed-template-image";
  image.src = TEMPLATE_IMAGE_MAP[data.role];
  image.alt = "";
  outer.appendChild(image);

  overlay = createElement("div", "fixed-overlay");
  priceText = getFixedTemplatePriceText(data.role, data.price);
  price = createElement("p", "fixed-price fixed-price-" + data.role, priceText);
  overlay.appendChild(price);
  outer.appendChild(overlay);

  return outer;
}

function buildPopSurface(data, variant, isEmptySlot) {
  if (data.templateMode === "fixed") {
    return buildFixedTemplateSurface(data, variant, isEmptySlot);
  }

  var outer = createElement("article", "pop-surface");
  var inner = createElement("div", "pop-surface__inner");
  var glowOne = createElement("div", "pop-glow pop-glow-one");
  var glowTwo = createElement("div", "pop-glow pop-glow-two");
  var top = createElement("div", "pop-top");
  var copy = createElement("div", "pop-copy");
  var foot = createElement("div", "pop-foot");
  var title = trimText(data.title);
  var comment = trimText(data.comment);
  var description = trimText(data.description);
  var price = trimText(data.price);
  var hasAnyText = !!(title || comment || description || price);
  var ribbon;

  outer.className = "pop-surface surface-" + variant + " " + data.template + " theme-" + data.color;

  if (isEmptySlot) {
    outer.className += " is-empty-slot";
    top.appendChild(createElement("p", "pop-chip", "空き"));
    copy.appendChild(createElement("p", "pop-empty screen-only", "この面は使わないよ"));
  } else {
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

    appendIfExists(copy, createTextBlock(
      "p",
      "pop-description",
      description,
      pickSizeClass(description.length, 24, 40, "size-description-compact", "size-description-tight")
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

function getScaleMultiplier(element, compactClass, tightClass) {
  var className;

  if (!element) {
    return 1;
  }

  className = element.className || "";

  if (className.indexOf(tightClass) !== -1) {
    return 0.68;
  }

  if (className.indexOf(compactClass) !== -1) {
    return 0.84;
  }

  return 1;
}

function setScaledFontSize(element, baseSize, scale, compactClass, tightClass, minSize) {
  var size;

  if (!element) {
    return;
  }

  size = baseSize * scale * getScaleMultiplier(element, compactClass, tightClass);
  element.style.fontSize = Math.max(minSize, Math.round(size)) + "px";
}

// プレビューと本番表示で同じ比率になるよう、画面サイズから文字を合わせるよ。
function applyScreenSurfaceSizing(surface, orientation) {
  var baseWidth = orientation === "landscape" ? 1024 : 768;
  var baseHeight = orientation === "landscape" ? 768 : 1024;
  var widthScale;
  var heightScale;
  var scale;
  var fixedPrice;
  var preset;
  var inner;
  var top;
  var ribbon;
  var title;
  var comment;
  var description;
  var price;
  var empty;

  if (!surface || surface.clientWidth < 1 || surface.clientHeight < 1) {
    return;
  }

  widthScale = surface.clientWidth / baseWidth;
  heightScale = surface.clientHeight / baseHeight;
  scale = Math.min(widthScale, heightScale);

  if (hasClass(surface, "pop-fixed-surface")) {
    fixedPrice = surface.getElementsByClassName("fixed-price")[0];

    if (fixedPrice) {
      if (hasClass(surface, "fixed-role-sale")) {
        fixedPrice.style.fontSize = Math.max(34, Math.round(98 * scale)) + "px";
      } else if (hasClass(surface, "fixed-role-beside")) {
        fixedPrice.style.fontSize = Math.max(28, Math.round(74 * scale)) + "px";
      } else {
        fixedPrice.style.fontSize = Math.max(28, Math.round(76 * scale)) + "px";
      }
    }

    return;
  }

  preset = getTemplateScalePreset(detectTemplateName(surface));

  inner = surface.getElementsByClassName("pop-surface__inner")[0];
  top = surface.getElementsByClassName("pop-top")[0];
  ribbon = surface.getElementsByClassName("pop-ribbon")[0];
  title = surface.getElementsByClassName("pop-title")[0];
  comment = surface.getElementsByClassName("pop-comment")[0];
  description = surface.getElementsByClassName("pop-description")[0];
  price = surface.getElementsByClassName("pop-price")[0];
  empty = surface.getElementsByClassName("pop-empty")[0];

  if (inner) {
    inner.style.paddingTop = Math.max(12, Math.round(20 * scale)) + "px";
    inner.style.paddingRight = Math.max(12, Math.round(20 * scale)) + "px";
    inner.style.paddingBottom = Math.max(12, Math.round(18 * scale)) + "px";
    inner.style.paddingLeft = Math.max(12, Math.round(20 * scale)) + "px";
    inner.style.borderWidth = Math.max(2, Math.round(3 * scale)) + "px";
    inner.style.borderRadius = Math.max(18, Math.round(28 * scale)) + "px";
  }

  if (top) {
    top.style.minHeight = Math.max(18, Math.round(preset.top * scale)) + "px";
  }

  if (ribbon) {
    ribbon.style.padding = Math.max(6, Math.round((preset.ribbonVerticalPad || 8) * scale)) + "px " + Math.max(10, Math.round((preset.ribbonHorizontalPad || 16) * scale)) + "px";
    ribbon.style.fontSize = Math.max(14, Math.round((preset.ribbonFont || 24) * scale)) + "px";
    ribbon.style.borderRadius = Math.max(12, Math.round(16 * scale)) + "px";
    ribbon.style.right = Math.round(-10 * scale) + "px";
  }

  setScaledFontSize(title, preset.title, scale, "size-title-compact", "size-title-tight", 20);
  setScaledFontSize(comment, preset.comment, scale, "size-comment-compact", "size-comment-tight", 18);
  setScaledFontSize(description, preset.description || 24, scale, "size-description-compact", "size-description-tight", 16);
  setScaledFontSize(price, preset.price, scale, "size-price-compact", "size-price-tight", 20);
  setScaledFontSize(empty, 28, scale, "", "", 18);

  if (comment) {
    comment.style.marginTop = Math.max(8, Math.round(preset.commentMargin * scale)) + "px";
  }

  if (description) {
    description.style.marginTop = Math.max(8, Math.round((preset.descriptionMargin || 12) * scale)) + "px";
  }

  if (price) {
    price.style.padding = Math.max(10, Math.round(preset.priceVerticalPad * scale)) + "px " + Math.max(16, Math.round(preset.priceHorizontalPad * scale)) + "px";
    price.style.minWidth = Math.max(preset.priceMinWidth || 0, Math.round(preset.priceWidth * scale)) + "px";
    price.style.borderRadius = Math.max(16, Math.round(20 * scale)) + "px";
  }
}

function syncScreenSurfaceSizing() {
  var orientation = getOrientation();
  var surfaces;
  var i;

  applyScreenSurfaceSizing(devicePreview.firstChild, orientation);
  applyScreenSurfaceSizing(fullDisplayWrap.firstChild, orientation);

  surfaces = printSheet ? printSheet.getElementsByClassName("pop-surface") : [];

  for (i = 0; i < surfaces.length; i += 1) {
    applyScreenSurfaceSizing(surfaces[i], orientation);
  }
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
  syncScreenSurfaceSizing();
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

  syncScreenSurfaceSizing();
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
  addClass(document.body, "is-display-mode");
  removeClass(displayMode, "is-hidden");
  removeClass(displayMode, "is-toolbar-hidden");
  updateDisplayLayout();
  scheduleDisplayToolbarHide();
}

function closeDisplayMode() {
  clearDisplayToolbarTimer();
  removeClass(document.body, "is-display-mode");
  removeClass(displayMode, "is-toolbar-hidden");
  addClass(displayMode, "is-hidden");
}

function clearDisplayToolbarTimer() {
  if (displayHideTimer) {
    clearTimeout(displayHideTimer);
    displayHideTimer = null;
  }
}

function scheduleDisplayToolbarHide() {
  clearDisplayToolbarTimer();

  if (hasClass(displayMode, "is-hidden")) {
    return;
  }

  displayHideTimer = setTimeout(function () {
    addClass(displayMode, "is-toolbar-hidden");
  }, 1800);
}

function showDisplayToolbar() {
  removeClass(displayMode, "is-toolbar-hidden");
  scheduleDisplayToolbarHide();
}

function toggleDisplayToolbar() {
  if (hasClass(displayMode, "is-toolbar-hidden")) {
    showDisplayToolbar();
  } else {
    clearDisplayToolbarTimer();
    addClass(displayMode, "is-toolbar-hidden");
  }
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
  showDisplayToolbar();
});

displayPrintButton.addEventListener("click", function () {
  setPreviewMode("print");
  renderAll();
  showDisplayToolbar();
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
  colorGrid.addEventListener("click", function (event) {
    var target = findTargetWithAttribute(event.target || event.srcElement, "data-color", colorGrid);

    if (!target) {
      return;
    }

    setColor(target.getAttribute("data-color"));
    renderAll();
  });
}

function bindPreviewButtons() {
  var i;

  for (i = 0; i < previewButtons.length; i += 1) {
    previewButtons[i].addEventListener("click", function () {
      setPreviewMode(this.getAttribute("data-preview"));
    });
  }
}

function bindTemplateModeButtons() {
  var i;

  for (i = 0; i < templateModeButtons.length; i += 1) {
    templateModeButtons[i].addEventListener("click", function () {
      setTemplateMode(this.getAttribute("data-template-mode"));
      renderAll();
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

setupTemplateModeUI();
setupPortraitOnlyUI();

titleInput.addEventListener("input", renderAll);
commentInput.addEventListener("input", renderAll);
descriptionInput.addEventListener("input", renderAll);
priceInput.addEventListener("input", renderAll);
if (fixedPriceInput) {
  fixedPriceInput.addEventListener("input", renderAll);
}
copiesSelect.addEventListener("change", renderAll);

bindRoleButtons();
bindColorButtons();
bindOrientationButtons();
bindPreviewButtons();
bindPresetButtons();
bindTemplateModeButtons();
displayStage.addEventListener("click", function () {
  toggleDisplayToolbar();
});
displayToolbar.addEventListener("click", function (event) {
  if (event && typeof event.stopPropagation === "function") {
    event.stopPropagation();
  }

  showDisplayToolbar();
});
window.addEventListener("resize", updateDisplayLayout);
setDefaults();
renderAll();
