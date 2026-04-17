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
  price: "1500円",
  role: "beside",
  color: "orange",
  copies: "4",
  templateMode: "fixed",
  orientation: "portrait"
};

var FIXED_ART_RATIO = 576 / 1024;
var FIXED_TEMPLATE_OPTIONS = {
  popular: { label: "人気商品", image: "assets/templates/基本/人気商品と手作りアクセサリー.png", role: "attention", baseWidth: 1024, baseHeight: 1536 },
  fresh: { label: "新商品", image: "assets/templates/基本/新しいアクセサリーコレクションの紹介.png", role: "beside", baseWidth: 1024, baseHeight: 1536 },
  bargain: { label: "お買い得", image: "assets/templates/基本/お得なアクセサリーキャンペーン.png", role: "sale", baseWidth: 1024, baseHeight: 1536 },
  figmaAttention: { label: "テンプレA 遠く用", image: "assets/templates/文字テンプレート/テンプレA_遠くで止める.png", role: "attention", baseWidth: 720, baseHeight: 960 },
  figmaBeside: { label: "テンプレB 商品横", image: "assets/templates/文字テンプレート/テンプレB_商品の横で伝える.png", role: "beside", baseWidth: 720, baseHeight: 960 },
  figmaSale: { label: "テンプレC セール", image: "assets/templates/文字テンプレート/テンプレC_セールで押す.png", role: "sale", baseWidth: 720, baseHeight: 960 },
  spring: { label: "春限定", image: "assets/templates/春夏秋冬/春限定のアクセサリープロモーション.png", role: "attention", baseWidth: 1024, baseHeight: 1536 },
  summer: { label: "夏限定", image: "assets/templates/春夏秋冬/夏限定ジュエリーデザイン.png", role: "attention", baseWidth: 1024, baseHeight: 1536 },
  autumn: { label: "秋限定", image: "assets/templates/春夏秋冬/秋限定アクセサリーの魅力.png", role: "attention", baseWidth: 1024, baseHeight: 1536 },
  winter: { label: "冬限定", image: "assets/templates/春夏秋冬/冬限定アクセサリーコレクション.png", role: "attention", baseWidth: 1024, baseHeight: 1536 },
  pencilLimited: { label: "数量限定", image: "assets/templates/その他テンプレート/数量限定アクセサリーPOP.png", role: "attention", baseWidth: 1152, baseHeight: 1536 },
  pencilHandmade: { label: "手作りです", image: "assets/templates/その他テンプレート/手作りですアクセサリーPOP.png", role: "beside", baseWidth: 1152, baseHeight: 1536 },
  pencilBundle: { label: "まとめ買い", image: "assets/templates/その他テンプレート/まとめ買いアクセサリーPOP.png", role: "sale", baseWidth: 1152, baseHeight: 1536, pricePrefix: "2つで" }
};
var FIXED_TEMPLATE_GROUPS = [
  { title: "定番テンプレ", items: ["popular", "fresh", "bargain"] },
  { title: "文字テンプレ", items: ["figmaAttention", "figmaBeside", "figmaSale"] },
  { title: "季節テンプレ", items: ["spring", "summer", "autumn", "winter"] },
  { title: "その他テンプレ", items: ["pencilLimited", "pencilHandmade", "pencilBundle"] }
];
var ROLE_DEFAULT_FIXED_TEMPLATE = {
  attention: "popular",
  beside: "fresh",
  sale: "bargain"
};

var PREVIEW_MODE = "display";
var CURRENT_ROLE = DEFAULT_FORM.role;
var CURRENT_TEMPLATE_MODE = DEFAULT_FORM.templateMode;
var CURRENT_FIXED_TEMPLATE = ROLE_DEFAULT_FIXED_TEMPLATE[DEFAULT_FORM.role] || "fresh";
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
var displaySlideButton = null;
var slideshowTimer = null;
var slideshowTemplateIds = [];
var slideshowIndex = 0;
var currentSlideshowTemplateId = null;
var templateModeButtons = [];
var templateModeNote = null;
var fixedPriceWrap = null;
var fixedPriceInput = null;
var fixedTemplateWrap = null;
var fixedTemplateButtons = [];
var fixedTemplateToggleButtons = [];
var slideshowWrap = null;
var slideshowToggle = null;
var slideshowCard = null;
var freeFieldBlocks = [];

function setupTemplateModeUI() {
  var modeField;
  var modeLabel;
  var modeRow;
  var fixedButton;
  var freeButton;
  var priceField;
  var priceLabel;
  var templateField;
  var templateLabel;
  var templateGroup;
  var templateGroupTitle;
  var templateRow;
  var templateCard;
  var templateButton;
  var templateThumb;
  var templateName;
  var templateMeta;
  var templateToggleButton;
  var slideField;
  var slideLabel;
  var slideInner;
  var slideText;
  var priceFieldWrapper;
  var colorField;
  var presetField;
  var titleField;
  var descriptionField;
  var commentRow;
  var groupIndex;
  var itemIndex;
  var groupConfig;
  var templateId;

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

  templateField = createElement("div", "field");
  templateLabel = createElement("span", "field-label", "テンプレを選ぶ");
  templateField.appendChild(templateLabel);

  for (groupIndex = 0; groupIndex < FIXED_TEMPLATE_GROUPS.length; groupIndex += 1) {
    groupConfig = FIXED_TEMPLATE_GROUPS[groupIndex];
    templateGroup = createElement("div", "fixed-template-group");
    templateGroupTitle = createElement("p", "fixed-template-group-title", groupConfig.title);
    templateRow = createElement("div", "fixed-template-grid");
    templateGroup.appendChild(templateGroupTitle);
    templateGroup.appendChild(templateRow);

    for (itemIndex = 0; itemIndex < groupConfig.items.length; itemIndex += 1) {
      templateId = groupConfig.items[itemIndex];
      templateCard = createElement("div", "fixed-template-card");
      templateButton = createElement("button", "fixed-template-button");
      templateButton.type = "button";
      templateButton.setAttribute("data-fixed-template", templateId);
      templateButton.setAttribute("aria-pressed", "false");
      templateThumb = document.createElement("img");
      templateThumb.className = "fixed-template-thumb";
      templateThumb.src = FIXED_TEMPLATE_OPTIONS[templateId].image;
      templateThumb.alt = FIXED_TEMPLATE_OPTIONS[templateId].label;
      templateName = createElement("span", "fixed-template-button-label", FIXED_TEMPLATE_OPTIONS[templateId].label);
      templateMeta = createElement("span", "fixed-template-button-meta", ROLE_MAP[FIXED_TEMPLATE_OPTIONS[templateId].role].tipLabel);
      templateButton.appendChild(templateThumb);
      templateButton.appendChild(templateName);
      templateButton.appendChild(templateMeta);
      templateCard.appendChild(templateButton);
      fixedTemplateButtons.push(templateButton);

      templateToggleButton = createElement("button", "fixed-template-toggle", "紙芝居に入れる");
      templateToggleButton.type = "button";
      templateToggleButton.setAttribute("data-slideshow-template", templateId);
      templateToggleButton.setAttribute("aria-pressed", "false");
      templateCard.appendChild(templateToggleButton);
      fixedTemplateToggleButtons.push(templateToggleButton);

      templateRow.appendChild(templateCard);
    }

    templateField.appendChild(templateGroup);
  }

  form.insertBefore(templateField, priceField.nextSibling);
  fixedTemplateWrap = templateField;

  slideField = createElement("div", "field");
  slideField.id = "slideshowWrap";
  slideLabel = createElement("span", "field-label", "表示のしかた");
  slideInner = createElement("div", "slideshow-card");
  slideshowToggle = document.createElement("input");
  slideshowToggle.type = "checkbox";
  slideshowToggle.id = "slideshowToggle";
  slideText = createElement("span", "slideshow-card-text", "紙芝居で順番に見せる");
  slideInner.appendChild(slideshowToggle);
  slideInner.appendChild(slideText);
  slideField.appendChild(slideLabel);
  slideField.appendChild(slideInner);
  slideField.appendChild(createElement("span", "field-note", "大きく表示で約4秒ごとにテンプレが切り替わるよ。"));
  form.insertBefore(slideField, templateField.nextSibling);
  slideshowWrap = slideField;
  slideshowCard = slideInner;

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

function setupDisplayToolbarUI() {
  if (!displayToolbar || !displayPrintButton || displaySlideButton) {
    return;
  }

  displaySlideButton = createElement("button", "display-tool-button", "紙芝居で見る");
  displaySlideButton.type = "button";
  displayPrintButton.parentNode.insertBefore(displaySlideButton, displayPrintButton);
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
  var i;

  titleInput.value = DEFAULT_FORM.title;
  commentInput.value = DEFAULT_FORM.comment;
  descriptionInput.value = DEFAULT_FORM.description;
  priceInput.value = DEFAULT_FORM.price;
  if (fixedPriceInput) {
    fixedPriceInput.value = DEFAULT_FORM.price;
  }
  if (slideshowToggle) {
    slideshowToggle.checked = false;
  }
  for (i = 0; i < fixedTemplateToggleButtons.length; i += 1) {
    fixedTemplateToggleButtons[i].className = "fixed-template-toggle";
    fixedTemplateToggleButtons[i].textContent = "紙芝居に入れる";
    fixedTemplateToggleButtons[i].setAttribute("aria-pressed", "false");
  }
  setColor(DEFAULT_FORM.color);
  copiesSelect.value = DEFAULT_FORM.copies;
  setRole(DEFAULT_FORM.role);
  setFixedTemplate(ROLE_DEFAULT_FIXED_TEMPLATE[DEFAULT_FORM.role] || "fresh", true);
  setSlideshowTemplateIncluded(ROLE_DEFAULT_FIXED_TEMPLATE[DEFAULT_FORM.role] || "fresh", true);
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

function findFixedTemplateForRole(roleName) {
  var i;
  var templateId;

  for (i = 0; i < FIXED_TEMPLATE_GROUPS.length; i += 1) {
    if (FIXED_TEMPLATE_GROUPS[i]) {
      for (templateId = 0; templateId < FIXED_TEMPLATE_GROUPS[i].items.length; templateId += 1) {
        if (FIXED_TEMPLATE_OPTIONS[FIXED_TEMPLATE_GROUPS[i].items[templateId]].role === roleName) {
          return FIXED_TEMPLATE_GROUPS[i].items[templateId];
        }
      }
    }
  }

  return ROLE_DEFAULT_FIXED_TEMPLATE[roleName] || "fresh";
}

function getTemplateMode() {
  return CURRENT_TEMPLATE_MODE || DEFAULT_FORM.templateMode;
}

function getFixedTemplateId() {
  return CURRENT_FIXED_TEMPLATE;
}

function getSelectedSlideshowTemplateIds() {
  var ids = [];
  var i;
  var templateId;

  for (i = 0; i < fixedTemplateToggleButtons.length; i += 1) {
    if (hasClass(fixedTemplateToggleButtons[i], "is-active")) {
      templateId = fixedTemplateToggleButtons[i].getAttribute("data-slideshow-template");
      if (templateId) {
        ids.push(templateId);
      }
    }
  }

  return ids;
}

function setSlideshowTemplateIncluded(templateId, included) {
  var i;

  for (i = 0; i < fixedTemplateToggleButtons.length; i += 1) {
    if (fixedTemplateToggleButtons[i].getAttribute("data-slideshow-template") === templateId) {
      if (included) {
        fixedTemplateToggleButtons[i].className = "fixed-template-toggle is-active";
        fixedTemplateToggleButtons[i].textContent = "紙芝居から外す";
        fixedTemplateToggleButtons[i].setAttribute("aria-pressed", "true");
      } else {
        fixedTemplateToggleButtons[i].className = "fixed-template-toggle";
        fixedTemplateToggleButtons[i].textContent = "紙芝居に入れる";
        fixedTemplateToggleButtons[i].setAttribute("aria-pressed", "false");
      }
    }
  }
}

function setFixedTemplate(templateId, syncRole) {
  var i;
  var config = FIXED_TEMPLATE_OPTIONS[templateId];

  if (!config) {
    return;
  }

  CURRENT_FIXED_TEMPLATE = templateId;

  for (i = 0; i < fixedTemplateButtons.length; i += 1) {
    if (fixedTemplateButtons[i].getAttribute("data-fixed-template") === templateId) {
      fixedTemplateButtons[i].className = "fixed-template-button is-active";
      fixedTemplateButtons[i].setAttribute("aria-pressed", "true");
    } else {
      fixedTemplateButtons[i].className = "fixed-template-button";
      fixedTemplateButtons[i].setAttribute("aria-pressed", "false");
    }
  }

  if (syncRole !== false) {
    setRole(config.role);
  }
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

  if (fixedTemplateWrap) {
    if (isFixed) {
      removeClass(fixedTemplateWrap, "is-hidden");
    } else {
      addClass(fixedTemplateWrap, "is-hidden");
    }
  }

  if (slideshowWrap) {
    if (isFixed) {
      removeClass(slideshowWrap, "is-hidden");
    } else {
      addClass(slideshowWrap, "is-hidden");
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

  if (isFixed) {
    setFixedTemplate(getFixedTemplateId(), true);
  } else {
    stopSlideshow();
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
    fixedTemplate: getFixedTemplateId(),
    slideshow: !!(slideshowToggle && slideshowToggle.checked),
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

function getFixedTemplatePriceText(templateConfig, roleName, priceText) {
  var value = trimText(priceText);

  if (!value) {
    return "300円";
  }

  if (templateConfig && templateConfig.pricePrefix) {
    return templateConfig.pricePrefix + "\n" + value;
  }

  return value || "300円";
}

function buildFixedTemplateSurface(data, variant, isEmptySlot) {
  var outer = createElement("article", "pop-surface pop-fixed-surface");
  var stage;
  var artboard;
  var backdrop;
  var image;
  var overlay;
  var price;
  var priceText;
  var templateConfig = FIXED_TEMPLATE_OPTIONS[data.fixedTemplate] || FIXED_TEMPLATE_OPTIONS.fresh;

  outer.className += " surface-" + variant + " fixed-role-" + templateConfig.role + " fixed-template-" + data.fixedTemplate;

  if (isEmptySlot) {
    outer.className += " is-empty-slot";
    outer.appendChild(createElement("p", "pop-empty screen-only", "ここは空きだよ"));
    return outer;
  }

  stage = createElement("div", "fixed-stage");
  artboard = createElement("div", "fixed-artboard");
  backdrop = document.createElement("img");
  backdrop.className = "fixed-template-backdrop";
  backdrop.src = templateConfig.image;
  backdrop.alt = "";
  stage.appendChild(backdrop);

  image = document.createElement("img");
  image.className = "fixed-template-image";
  image.src = templateConfig.image;
  image.alt = "";
  artboard.appendChild(image);

  overlay = createElement("div", "fixed-overlay");
  priceText = getFixedTemplatePriceText(templateConfig, data.role, data.price);
  price = createElement("p", "fixed-price fixed-price-" + data.role, priceText);
  overlay.appendChild(price);
  artboard.appendChild(overlay);
  stage.appendChild(artboard);
  outer.setAttribute("data-fixed-template", data.fixedTemplate || "");
  outer.appendChild(stage);

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
  var fixedTemplateId;
  var fixedConfig;
  var artRatio;
  var fixedStage;
  var fixedArtboard;
  var availableWidth;
  var availableHeight;
  var stageWidth;
  var stageHeight;
  var artboardWidth;
  var artboardHeight;
  var fixedPrice;
  var isPencilTemplate;
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
    fixedTemplateId = surface.getAttribute("data-fixed-template") || "";
    fixedConfig = FIXED_TEMPLATE_OPTIONS[fixedTemplateId] || null;
    isPencilTemplate = fixedTemplateId.indexOf("pencil") === 0;
    artRatio = fixedConfig ? (fixedConfig.baseWidth / fixedConfig.baseHeight) : FIXED_ART_RATIO;
    fixedStage = surface.getElementsByClassName("fixed-stage")[0];
    fixedArtboard = surface.getElementsByClassName("fixed-artboard")[0];
    fixedPrice = surface.getElementsByClassName("fixed-price")[0];

    if (fixedStage) {
      stageWidth = surface.clientWidth * (isPencilTemplate ? 0.982 : 0.965);
      stageHeight = surface.clientHeight * (isPencilTemplate ? 0.992 : 0.985);
      fixedStage.style.width = Math.round(stageWidth) + "px";
      fixedStage.style.height = Math.round(stageHeight) + "px";
      fixedStage.style.left = Math.round((surface.clientWidth - stageWidth) / 2) + "px";
      fixedStage.style.top = Math.round((surface.clientHeight - stageHeight) / 2) + "px";
    }

    if (fixedArtboard) {
      availableWidth = stageWidth * (isPencilTemplate ? 0.97 : 0.93);
      availableHeight = stageHeight * (isPencilTemplate ? 0.99 : 0.975);
      artboardHeight = availableHeight;
      artboardWidth = artboardHeight * artRatio;

      if (artboardWidth > availableWidth) {
        artboardWidth = availableWidth;
        artboardHeight = artboardWidth / artRatio;
      }

      fixedArtboard.style.width = Math.round(artboardWidth) + "px";
      fixedArtboard.style.height = Math.round(artboardHeight) + "px";
      fixedArtboard.style.left = Math.round((stageWidth - artboardWidth) / 2) + "px";
      fixedArtboard.style.top = Math.round((stageHeight - artboardHeight) / 2) + "px";

      widthScale = artboardWidth / (fixedConfig ? fixedConfig.baseWidth : 576);
      heightScale = artboardHeight / (fixedConfig ? fixedConfig.baseHeight : 1024);
      scale = Math.min(widthScale, heightScale);
    }

    if (fixedPrice) {
      if (hasClass(surface, "fixed-template-figmaSale")) {
        fixedPrice.style.fontSize = Math.max(32, Math.round(76 * scale)) + "px";
      } else if (hasClass(surface, "fixed-template-figmaAttention")) {
        fixedPrice.style.fontSize = Math.max(26, Math.round(58 * scale)) + "px";
      } else if (hasClass(surface, "fixed-template-figmaBeside")) {
        fixedPrice.style.fontSize = Math.max(28, Math.round(62 * scale)) + "px";
      } else if (hasClass(surface, "fixed-template-pencilBundle")) {
        fixedPrice.style.fontSize = Math.max(28, Math.round(98 * scale)) + "px";
      } else if (hasClass(surface, "fixed-template-pencilLimited") || hasClass(surface, "fixed-template-pencilHandmade")) {
        fixedPrice.style.fontSize = Math.max(28, Math.round(94 * scale)) + "px";
      } else if (hasClass(surface, "fixed-role-sale")) {
        fixedPrice.style.fontSize = Math.max(40, Math.round(112 * scale)) + "px";
      } else if (hasClass(surface, "fixed-role-beside")) {
        fixedPrice.style.fontSize = Math.max(34, Math.round(88 * scale)) + "px";
      } else {
        fixedPrice.style.fontSize = Math.max(34, Math.round(90 * scale)) + "px";
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
  var previewHeight = window.innerWidth <= 720
    ? (orientation === "landscape" ? 250 : 336)
    : (orientation === "landscape" ? 450 : 520);
  var fullWidth = displayStage.clientWidth - 32;
  var fullHeight = displayStage.clientHeight - 32;

  sizeBox(deviceShell, previewWidth, previewHeight, orientation);
  sizeBox(fullDisplayWrap, fullWidth, fullHeight, orientation);
  syncScreenSurfaceSizing();
}

function renderDevicePreview(data) {
  clearChildren(devicePreview);
  devicePreview.appendChild(buildPopSurface(data, "device", false));
}

function cloneDataWithFixedTemplate(data, templateId) {
  var clone = {};
  var key;
  var config = FIXED_TEMPLATE_OPTIONS[templateId] || FIXED_TEMPLATE_OPTIONS.fresh;

  for (key in data) {
    if (data.hasOwnProperty(key)) {
      clone[key] = data[key];
    }
  }

  clone.fixedTemplate = templateId;
  clone.role = config.role;
  clone.template = ROLE_MAP[config.role].template;

  return clone;
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
  if (!isSlideshowActive()) {
    renderFullDisplay(data);
  }
  if (PREVIEW_MODE === "print") {
    renderPrintSheet(data);
  }
  updateDisplayLayout();
  syncSlideshowState();
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
  syncSlideshowState();
  scheduleDisplayToolbarHide();
}

function closeDisplayMode() {
  stopSlideshow();
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

function isSlideshowActive() {
  return !!(slideshowToggle && slideshowToggle.checked && getTemplateMode() === "fixed" && !hasClass(displayMode, "is-hidden") && getSelectedSlideshowTemplateIds().length);
}

function clearSlideshowTimer() {
  if (slideshowTimer) {
    clearTimeout(slideshowTimer);
    slideshowTimer = null;
  }
}

function getSlideshowTemplateIds() {
  return getSelectedSlideshowTemplateIds();
}

function updateDisplaySlideButton() {
  if (!displaySlideButton) {
    return;
  }

  displaySlideButton.textContent = isSlideshowActive() ? "紙芝居を止める" : "紙芝居で見る";
}

function stopSlideshow() {
  var data;

  clearSlideshowTimer();
  slideshowTemplateIds = [];
  slideshowIndex = 0;
  if (!hasClass(displayMode, "is-hidden")) {
    data = getFormData();
    if (currentSlideshowTemplateId && FIXED_TEMPLATE_OPTIONS[currentSlideshowTemplateId]) {
      setFixedTemplate(currentSlideshowTemplateId, true);
      data = cloneDataWithFixedTemplate(data, currentSlideshowTemplateId);
    }
    renderFullDisplay(data);
    updateDisplayLayout();
  }
  updateDisplaySlideButton();
}

function renderSlideshowFrame(data) {
  var templateId;

  if (!slideshowTemplateIds.length) {
    return;
  }

  templateId = slideshowTemplateIds[slideshowIndex] || getFixedTemplateId();
  currentSlideshowTemplateId = templateId;
  renderFullDisplay(cloneDataWithFixedTemplate(data, templateId));
  updateDisplayLayout();
}

function scheduleSlideshowFrame(data) {
  clearSlideshowTimer();
  if (!isSlideshowActive()) {
    return;
  }

  slideshowTimer = setTimeout(function () {
    slideshowIndex = (slideshowIndex + 1) % slideshowTemplateIds.length;
    renderSlideshowFrame(data);
    scheduleSlideshowFrame(data);
  }, 4000);
}

function syncSlideshowState() {
  var data = getFormData();
  var selectedId;

  updateDisplaySlideButton();

  if (!isSlideshowActive()) {
    stopSlideshow();
    return;
  }

  slideshowTemplateIds = getSlideshowTemplateIds();
  selectedId = getFixedTemplateId();
  slideshowIndex = 0;

  while (slideshowIndex < slideshowTemplateIds.length && slideshowTemplateIds[slideshowIndex] !== selectedId) {
    slideshowIndex += 1;
  }

  if (slideshowIndex >= slideshowTemplateIds.length) {
    slideshowIndex = 0;
  }

  renderSlideshowFrame(data);
  scheduleSlideshowFrame(data);
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
      if (getTemplateMode() === "fixed") {
        setFixedTemplate(findFixedTemplateForRole(this.getAttribute("data-role")), true);
      } else {
        setRole(this.getAttribute("data-role"));
      }
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
      renderAll();
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

function bindFixedTemplateButtons() {
  var i;

  for (i = 0; i < fixedTemplateButtons.length; i += 1) {
    fixedTemplateButtons[i].addEventListener("click", function () {
      setFixedTemplate(this.getAttribute("data-fixed-template"), true);
      renderAll();
    });
  }
}

function bindFixedTemplateToggleButtons() {
  var i;

  for (i = 0; i < fixedTemplateToggleButtons.length; i += 1) {
    fixedTemplateToggleButtons[i].addEventListener("click", function () {
      if (hasClass(this, "is-active")) {
        setSlideshowTemplateIncluded(this.getAttribute("data-slideshow-template"), false);
      } else {
        setSlideshowTemplateIncluded(this.getAttribute("data-slideshow-template"), true);
      }
      syncSlideshowState();
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
setupDisplayToolbarUI();

titleInput.addEventListener("input", renderAll);
commentInput.addEventListener("input", renderAll);
descriptionInput.addEventListener("input", renderAll);
priceInput.addEventListener("input", renderAll);
if (fixedPriceInput) {
  fixedPriceInput.addEventListener("input", renderAll);
}
if (slideshowToggle) {
  slideshowToggle.addEventListener("change", function () {
    syncSlideshowState();
  });
}
if (slideshowCard) {
  slideshowCard.addEventListener("click", function (event) {
    var target = event.target || event.srcElement;

    if (!slideshowToggle || target === slideshowToggle) {
      return;
    }

    slideshowToggle.checked = !slideshowToggle.checked;
    syncSlideshowState();
  });
}
copiesSelect.addEventListener("change", renderAll);

bindRoleButtons();
bindColorButtons();
bindOrientationButtons();
bindPreviewButtons();
bindPresetButtons();
bindTemplateModeButtons();
bindFixedTemplateButtons();
bindFixedTemplateToggleButtons();
displayStage.addEventListener("click", function () {
  toggleDisplayToolbar();
});
displayToolbar.addEventListener("click", function (event) {
  if (event && typeof event.stopPropagation === "function") {
    event.stopPropagation();
  }

  showDisplayToolbar();
});
if (displaySlideButton) {
  displaySlideButton.addEventListener("click", function () {
    if (!slideshowToggle) {
      return;
    }

    slideshowToggle.checked = !slideshowToggle.checked;
    syncSlideshowState();
    showDisplayToolbar();
  });
}
window.addEventListener("resize", updateDisplayLayout);
setDefaults();
renderAll();
