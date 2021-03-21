import isEmpty from "lodash/isEmpty";
import xorWith from "lodash/xorWith";
import isEqual from  "lodash/isEqual";

export const isArrayEqual = (x, y) => isEmpty(xorWith(x, y, isEqual));