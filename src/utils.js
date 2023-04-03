/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// a = player list
// 키를 180이상, 175이상, 170이상, 170이하으로 나눈다
export const height = (a) => {
  var tmp_group = [];
  var group1 = []; // 키 >= 180
  var group2 = []; // 175 <= 키 < 180
  var group3 = []; // 170 <= 키 < 175
  var group4 = []; // 키 < 170

  for (let i = 0 ; i < a.length; i++) {
    tmp_group.push(a[i].split('_'));
    if (tmp_group[i][2] >= 180){
      group1.push(a[i]);
    }
    else if (tmp_group[i][2] < 180 && tmp_group[i][2] >= 175){
      group2.push(a[i]);
    }
    else if (tmp_group[i][2] < 175 && tmp_group[i][2] >= 170){
      group3.push(a[i]);
    }
    else{
      group4.push(a[i]);
    }
  }

  group1 = shuffle(group1);
  group2 = shuffle(group2);
  group3 = shuffle(group3);
  group4 = shuffle(group4);

  const team = group1.concat(group2, group3, group4);

  console.log(team);
  return team;
};



export const position = (a) => {
  var tmp_group = [];
  var group1 = []; // C
  var group2 = []; // F
  var group3 = []; // G

  for (let i = 0 ; i < a.length; i++) {
    tmp_group.push(a[i].split('_'));
    if (tmp_group[i][1] == "C"){
      group1.push(a[i]);
    }
    else if (tmp_group[i][1] == "F"){
      group2.push(a[i]);
    }
    else{
      group3.push(a[i]);
    }
  }
  group1 = shuffle(group1);
  group2 = shuffle(group2);
  group3 = shuffle(group3);

  const team = group1.concat(group2, group3);

  console.log(team);
  return team;
};

const compareFunction = (a, b) => {
  if (a[2] === b[2]) {
      return 0;
  } else {
      return a[2] < b[2] ? -1 : 1;
  }
};
