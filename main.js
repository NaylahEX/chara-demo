/* レイヤーデータ */
const LAYER_DATA = {
  hair: [
    { id: "hair_1", label: "髪型 1", file: "assets/hair/hair_1.png" },
    { id: "hair_2", label: "髪型 2", file: "assets/hair/hair_2.png" },
  ],

  eyes: [
    { id: "eyes_1", label: "瞳 1", file: "assets/eyes/eyes_1.png" },
  ],

  clothes: [
    { id: "clothes_1", label: "服 1", file: "assets/clothes/clothes_1.png" },
    { id: "clothes_2", label: "服 2", file: "assets/clothes/clothes_2.png" },
  ],

  hat: [
    { id: "hat_1", label: "帽子 1", file: "assets/hat/hat_1.png" },
    { id: "hat_2", label: "帽子 2", file: "assets/hat/hat_2.png" },
  ],

  ear: [
    { id: "ear_1", label: "耳 1", file: "assets/ear/ear_1.png" },
    { id: "ear_2", label: "耳 2", file: "assets/ear/ear_2.png" },
  ]
};


/* セレクトへ項目追加 */
function populateSelect(select, items) {
  select.innerHTML = "";
  items.forEach((opt, i) => {
    const o = document.createElement("option");
    o.value = opt.id;
    o.textContent = opt.label;
    if (i === 0) o.selected = true;
    select.appendChild(o);
  });
}


/* レイヤー画像切り替え */
function updateLayer(type, id) {
  const idMap = {
    hair: "layer-hair",
    eyes: "layer-eyes",
    clothes: "layer-clothes",
    hat: "layer-hat",
    ear: "layer-ear",
  };

  const el = document.getElementById(idMap[type]);
  const info = LAYER_DATA[type].find(i => i.id === id);

  if (el && info) el.src = info.file;

  if (type === "hair") updateMask("layer-hair-color", info.file);
  if (type === "eyes") updateMask("layer-eyes-color", info.file);
}


/* マスク更新（髪色・瞳色） */
function updateMask(maskId, filePath) {
  const layer = document.getElementById(maskId);
  if (!layer) return;

  layer.style.maskImage = `url("${filePath}")`;
  layer.style.webkitMaskImage = `url("${filePath}")`;
  layer.style.maskSize = "contain";
  layer.style.maskRepeat = "no-repeat";
  layer.style.maskPosition = "center";
  layer.style.webkitMaskSize = "contain";
  layer.style.webkitMaskRepeat = "no-repeat";
  layer.style.webkitMaskPosition = "center";
}


/* 色の適用 */
function setColor(layerId, hex) {
  const layer = document.getElementById(layerId);
  if (layer) layer.style.backgroundColor = hex;
}


/* ランダム取得 */
function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}


/* 初期化 */
document.addEventListener("DOMContentLoaded", () => {

  /* UI取得 */
  const sHair = document.getElementById("select-hair");
  const sEyes = document.getElementById("select-eyes");
  const sClothes = document.getElementById("select-clothes");
  const sHat = document.getElementById("select-hat");
  const sEar = document.getElementById("select-ear");

  const hairColorInput = document.getElementById("hair-color");
  const eyesColorInput = document.getElementById("eyes-color");

  const btnRandom = document.getElementById("btn-random");

  /* セレクト項目設定 */
  populateSelect(sHair, LAYER_DATA.hair);
  populateSelect(sEyes, LAYER_DATA.eyes);
  populateSelect(sClothes, LAYER_DATA.clothes);
  populateSelect(sHat, LAYER_DATA.hat);
  populateSelect(sEar, LAYER_DATA.ear);

  /* 初期レイヤー表示 */
  updateLayer("hair", LAYER_DATA.hair[0].id);
  updateLayer("eyes", LAYER_DATA.eyes[0].id);
  updateLayer("clothes", LAYER_DATA.clothes[0].id);
  updateLayer("hat", LAYER_DATA.hat[0].id);
  updateLayer("ear", LAYER_DATA.ear[0].id);

  /* 初期色 */
  setColor("layer-hair-color", hairColorInput.value);
  setColor("layer-eyes-color", eyesColorInput.value);


  /* 髪型変更 */
  sHair.addEventListener("change", () => {
    updateLayer("hair", sHair.value);
    setColor("layer-hair-color", hairColorInput.value);
  });

  /* 瞳変更 */
  sEyes.addEventListener("change", () => {
    updateLayer("eyes", sEyes.value);
    setColor("layer-eyes-color", eyesColorInput.value);
  });

  /* その他 */
  sClothes.addEventListener("change", () => updateLayer("clothes", sClothes.value));
  sHat.addEventListener("change", () => updateLayer("hat", sHat.value));
  sEar.addEventListener("change", () => updateLayer("ear", sEar.value));

  /* 色変更（髪） */
  hairColorInput.addEventListener("input", () => {
    setColor("layer-hair-color", hairColorInput.value);
  });

  /* 色変更（瞳） */
  eyesColorInput.addEventListener("input", () => {
    setColor("layer-eyes-color", eyesColorInput.value);
  });


  /* ランダムコーデ */
  btnRandom.addEventListener("click", () => {
    const hair = randomItem(LAYER_DATA.hair);
    const eyes = randomItem(LAYER_DATA.eyes);
    const clothes = randomItem(LAYER_DATA.clothes);
    const hat = randomItem(LAYER_DATA.hat);
    const ear = randomItem(LAYER_DATA.ear);

    sHair.value = hair.id;
    sEyes.value = eyes.id;
    sClothes.value = clothes.id;
    sHat.value = hat.id;
    sEar.value = ear.id;

    updateLayer("hair", hair.id);
    updateLayer("eyes", eyes.id);
    updateLayer("clothes", clothes.id);
    updateLayer("hat", hat.id);
    updateLayer("ear", ear.id);

    setColor("layer-hair-color", hairColorInput.value);
    setColor("layer-eyes-color", eyesColorInput.value);
  });
});
