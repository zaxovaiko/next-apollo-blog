module.exports.findRandom = async function (model) {
  const count = await model.count();
  return count === 0
    ? null
    : await model.findOne().skip(Math.floor(Math.random() * count));
};
