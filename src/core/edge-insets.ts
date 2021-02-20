// An alias for the different types that
// can be set as a padding value.
export type EdgeInsetsValue = string | number;

export interface OnlyEdgeInsets {
  readonly top: EdgeInsetsValue;
  readonly right: EdgeInsetsValue;
  readonly bottom: EdgeInsetsValue;
  readonly left: EdgeInsetsValue;
}

export interface SymmetricEdgeInsets {
  readonly vertical: EdgeInsetsValue;
  readonly horizontal: EdgeInsetsValue;
}

export type EdgeInsets = SymmetricEdgeInsets | OnlyEdgeInsets | EdgeInsetsValue;
