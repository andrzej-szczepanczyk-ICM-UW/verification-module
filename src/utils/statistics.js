import { useSelector } from "react-redux";
//const { slope, intercept } = useSelector((state) => state.table);

export class StatVerif {
  static descriptions() {
    let states = {};
    states.TT = "PRAWDA, jest przymrozek";
    states.FF = "PRAWDA, nie ma przymrozka";
    states.FT = "FAŁSZ, jest przymrozek";
    states.TF = "FAŁSZ, nie ma przymrozka";
    return states;
  }

  static states(modelPredict, realityPredict) {
    let desc = this.descriptions();
  }

  verification(p, observ) {
    //default is "TAK, owszem, przymrozka nie ma"
    let probabilityIndex = 0;
    let verifIndex = 0;
    if (p > 0.2) {
      probabilityIndex = 1;
    }
    if (observ < 0) {
      verifIndex = 1;
    }
    return [verifIndex, probabilityIndex];
  }

  constructor(model, observation) {
    this.theshold = 0.2;
    let p = computeMockSigmoid(model, 0.3, 1.1);
  }
}

export function computeMockSigmoid(x, slope = 0.3, intercept = 1.1) {
  return 1 / (1 + Math.exp(slope * (x + intercept)));
}
