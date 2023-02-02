import _ from "lodash";

export const removeNulls: any = (obj:any) => {
    if (_.isArray(obj)) {
      return _.compact(_.map(obj, removeNulls));
    } else if (_.isObject(obj)) {
      return _.omitBy(
        _.mapValues(obj, removeNulls),
        (value) => _.isNil(value) || _.isEqual(value, {})
      );
    }
    return obj;
  };