class Matrix {
  constructor(matrix) {
    if (matrix) {
      this.setValue(matrix.getValue());
    }
    else {
      this._matrix = [
        0, // Trans X
        0, // Trans Y
        1, // Scale X
        1, // Scale Y
      ];
    }
  }

  setValue(value) {
    this._matrix = [
      value[0],
      value[1],
      value[2],
      value[3],
    ];
  }

  getValue() {
    return this._matrix;
  }

  translate(dx, dy) {
    this._matrix[0] += dx;
    this._matrix[1] += dy;
    return this;
  }

  setTranslate(tx, ty) {
    this._matrix[0] = tx;
    this._matrix[1] = ty;
    return this;
  }

  scale(scale, sx, sy) {
    const ratio = scale - 1;
    const nextScale = this._matrix[2] + ratio;
    this.translate(
      (this._matrix[0] - sx) * ratio / this._matrix[2],
      (this._matrix[1] - sy) * ratio / this._matrix[3],
    );
    this._matrix[2] = nextScale;
    this._matrix[3] = nextScale;
    return this;
  }

  setScale(nextScale, sx, sy) {
    const scale = nextScale - this._matrix[2] + 1;
    const ratio = scale - 1;
    this.translate(
      (this._matrix[0] - sx) * ratio / this._matrix[2],
      (this._matrix[1] - sy) * ratio / this._matrix[3],
    );
    this._matrix[2] = nextScale;
    this._matrix[3] = nextScale;
    return this;
  }

  mapPoint(x, y) {
    x = (x * this._matrix[2]) + this._matrix[0];
    y = (y * this._matrix[3]) + this._matrix[1];
    return { x, y };
  }

  reversePoint(x, y) {
    x = (x - this._matrix[0]) / this._matrix[2];
    y = (y - this._matrix[1]) / this._matrix[3];
    return { x, y };
  }

  apply(ctx) {
    // if (ctx.setTransform != undefined){
    // 	ctx.setTransform(this._matrix[2], 0, 0, this._matrix[3], this._matrix[0], this._matrix[1])
    // } else {
    ctx.translate(this._matrix[0], this._matrix[1]);
    ctx.scale(this._matrix[2], this._matrix[3]);
    // }
  }

  reset(ctx) {
    if (ctx.setTransform != undefined) {
      ctx.setTransform(1 / this._matrix[2], 0, 0, 1 / this._matrix[3], -this._matrix[0], -this._matrix[1]);
    }
    else {
      ctx.translate(-this._matrix[0], -this._matrix[1]);
      ctx.scale(1 / this._matrix[2], 1 / this._matrix[3]);
    }
  }
}

module.exports = {
  Matrix,
};
