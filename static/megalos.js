function initializeGrid() {
  for (let rows = 1; rows < 5; rows++) {
    for (let cols = 1; cols < 5; cols++) {
      id = `#aoe-4x4-r${rows}c${cols}`;
      $(id).html("&#x25A2;");
    }
  }
}

function pointsForDie(dieValue, quadrant) {
  let q;
  switch (dieValue) {
    case "1":
      return [[0, 0]];
    case "2":
      q = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ][quadrant];
      return [[0, 0], q];
    case "3":
      return quadrant == 1 || quadrant == 2
        ? [
            [0, 0],
            [-1, -1],
            [1, 1],
          ]
        : [
            [0, 0],
            [-1, 1],
            [1, -1],
          ];
    case "4":
      return [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
    case "5":
      return [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
    case "6H":
      return [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
    case "6V":
      return [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
    default:
      return [];
  }
}

function setupGrid() {
  for (let i = 0; i < 4; i++) {
    let dieValue = $(`#aoe-4x4-d${i + 1}`).val();
    let points = pointsForDie(dieValue, i);
    for (let point of points) {
      let row = 2 + point[0] + (i < 2 ? 0 : 1);
      let col = 2 + point[1] + (i % 2 ? 1 : 0);
      let id = `#aoe-4x4-r${row}c${col}`;
      $(id).html("&#x25A3;");
    }
  }
}

function randomValue() {
  const value = Math.floor(Math.random() * 6) + 1;
  if (value == 6) {
    const hv = Math.floor(Math.random() * 2);
    return `6${hv ? "V" : "H"}`;
  } else {
    return `${value}`;
  }
}

$(function () {
  initializeGrid();

  $(".aoe-4x4-die").on("change", function () {
    initializeGrid();
    setupGrid();
  });

  $("#aoe-4x4-roll").on("click", function () {
    initializeGrid();
    if ($("#aoe-4x4-d1").val() == "R") {
      $("#aoe-4x4-d1").val(randomValue());
    }
    if ($("#aoe-4x4-d2").val() == "R") {
      $("#aoe-4x4-d2").val(randomValue());
    }
    if ($("#aoe-4x4-d3").val() == "R") {
      $("#aoe-4x4-d3").val(randomValue());
    }
    if ($("#aoe-4x4-d4").val() == "R") {
      $("#aoe-4x4-d4").val(randomValue());
    }
    setupGrid();
  });

  $("#aoe-4x4-reset").on("click", function () {
    initializeGrid();
    $(".aoe-4x4-die").val("R");
  });
});
