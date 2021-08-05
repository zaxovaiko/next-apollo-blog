module.exports.findRandom = async function (model) {
  // const doc = await model.aggregate([{ $sample: { size: 1 } }]);
  // return doc.length === 1 ? doc[0] : null;
  const count = await model.count();
  if (count === 0) {
    return null;
  }
  return await model.findOne().skip(Math.floor(Math.random() * count));
};
