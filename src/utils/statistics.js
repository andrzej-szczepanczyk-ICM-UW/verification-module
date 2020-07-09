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
  let false_yes = dane.filter((i) => i.status === "FAŁSZYWE TAK").length;
  let false_no = dane.filter((i) => i.status === "FAŁSZYWE NIE").length;

  let effectiveness = [
    { status: "TAK", num: yes },
    { status: "NIE", num: no },
    { status: "FAŁSZYWE TAK", num: false_yes },
    { status: "FAŁSZYWE NIE", num: false_no },
  ];

  console.log(effectiveness);

  return effectiveness;
}
