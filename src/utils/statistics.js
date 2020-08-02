const descriptions = [
  ["NIE", "FAŁSZYWE TAK"],
  ["FAŁSZYWE NIE", "TAK"],
];

function verification(p, observ) {
  //default is "TAK, owszem, przymrozka nie ma"
  let probabilityIndex = 0;
  let verifIndex = 0;

  if (p > 0.1) {
    probabilityIndex = 1;
  }
  if (observ < 0) {
    verifIndex = 1;
  }
  return { verifIndex: verifIndex, probabilityIndex: probabilityIndex };
}

export function computeP(x, slope = 0.97, intercept = 0.084) {
  return 1 / (1 + Math.exp(slope * (x + intercept)));
}

export function computeDescription(um, imgw) {
  const p = computeP(um);
  const { verifIndex, probabilityIndex } = verification(p, imgw);
  console.log("verifindex is", verifIndex, "probIndex is", probabilityIndex);
  return descriptions[verifIndex][probabilityIndex];
}

export function computeEffectiveness(umimgw) {
  let dane = umimgw.map((r) => ({
    um: r.value_um,
    imgw: r.value_imgw,
    p: computeP(Number(r.value_um)),
    status: computeDescription(r.value_um, r.value_imgw),
  }));

  console.log("Dane są następujące", dane);

  let yes = dane.filter((i) => i.status === "TAK").length;
  let no = dane.filter((i) => i.status === "NIE").length;
  let falseYes = dane.filter((i) => i.status === "FAŁSZYWE TAK").length;
  let falseNo = dane.filter((i) => i.status === "FAŁSZYWE NIE").length;

  let effectiveness = [
    { status: "TAK", num: yes / dane.length },
    { status: "NIE", num: no / dane.length },
    { status: "FAŁSZYWE TAK", num: falseYes / dane.length },
    { status: "FAŁSZYWE NIE", num: falseNo / dane.length },
  ];

  var effectiveness2 = [yes, no, falseYes, falseNo]
    .map((i) => i / dane.length)
    .map((i) => Math.round(i * 1e4) / 1e4)
    .reduce((curr, i) => String(`${curr};${i}`));

  return effectiveness2 + String("\n");
}
