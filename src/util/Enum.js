const Categories = {  
  1: 'General Knowledge',
  2: 'Entertainment',
  3: 'Nature',
  4: 'Science',
  5: 'Mythology',
  6: 'Sports',
  7: 'Geography',
  8: 'History',
  9: 'Politics',
  10: 'Art',
  11: 'Celebrities',
  12: 'Animals',
  13: 'Vehicles',
}

const Difficulties = {
  1: "easy",
  2: "medium",
  3: "hard"
}


const toSelectList = (obj) => {
  let arr = [];
  Object.keys(obj).map(e => {
    arr.push({id: obj[e], name: obj[e]})
  })
  return arr;
}


module.exports = {
  Categories, Difficulties, toSelectList
}