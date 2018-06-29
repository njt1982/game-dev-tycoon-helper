/* eslint-disable */

// This section gets the Topic Genres and Audiences
var data = {
  topics: [],
  platforms: [],
  dev_focus: [],
};

var audienceTranslate = {
  'Alt History' : 'Alternate History',
  'Game Dev.' : 'Game Dev',
  'Post-Apocalyptic' : 'Post Apocalyptic',
};


var table = jQuery('.article-table')[6];
jQuery('tr', table).each((index, row) => {
  if (index === 0) return;
  var key = jQuery('th', row)[0].innerText;

  const modifiable_topic = key.indexOf('*') !== -1;
  if (modifiable_topic) {
    key = key.replace('*', '');
  }

  var cells = jQuery('td', row);
  data.topics.push({
    topic: key,
    modifiable_topic: modifiable_topic,
    genres: {
      Action: parseFloat(cells[0].innerText),
      Adventure: parseFloat(cells[1].innerText),
      RPG: parseFloat(cells[2].innerText),
      Simulation: parseFloat(cells[3].innerText),
      Strategy: parseFloat(cells[4].innerText),
      Casual: parseFloat(cells[5].innerText),
    },
    audiences: {}
  });
});


var table = jQuery('.article-table')[8];
jQuery('tr', table).each((index, row) => {
  if (index === 0) return;
  var key = jQuery('th', row)[0].innerText;

  if (key in audienceTranslate) {
    key = audienceTranslate[key];
  }

  const topic = data.topics.find(x => x.topic === key);
  if (topic === undefined) {
    console.log('Cannot find key', key);
  }
  else {
    var cells = jQuery('td', row);
    topic.audiences = {
      Young: parseFloat(cells[0].innerText),
      Everyone: parseFloat(cells[1].innerText),
      Mature: parseFloat(cells[2].innerText),
    };
  }
});





// This gets the platform genres
var table = jQuery('.article-table')[7];
jQuery('tr', table).each((index, row) => {
  if (index === 0) return;
  var key = jQuery('th', row)[0].innerText;

  // Bail for rows with empty keys
  if (key.length === 0) return;

  var cells = jQuery('td', row);
  data.platforms.push({
    platform: key,
    genres: {
      Action: parseFloat(cells[0].innerText),
      Adventure: parseFloat(cells[1].innerText),
      RPG: parseFloat(cells[2].innerText),
      Simulation: parseFloat(cells[3].innerText),
      Strategy: parseFloat(cells[4].innerText),
      Casual: parseFloat(cells[5].innerText),
    },
    audiences: {}
  });
});


var table = jQuery('.article-table')[9];
jQuery('tr', table).each((index, row) => {
  if (index === 0) return;
  var key = jQuery('th', row)[0].innerText;

  if (key in audienceTranslate) {
    key = audienceTranslate[key];
  }

  const platform = data.platforms.find(x => x.platform === key);
  if (platform === undefined) {
    console.log('Cannot find key', key);
  }
  else {
    var cells = jQuery('td', row);
    platform.audiences = {
      Young: parseFloat(cells[0].innerText),
      Everyone: parseFloat(cells[1].innerText),
      Mature: parseFloat(cells[2].innerText),
    };
  }
});




// Dev Focus
var table = jQuery('.article-table')[2];
jQuery('tr', table).each((rowIndex, row) => {
  var focus = jQuery('th[scope=row]', row)[0].innerText;

  jQuery(rowIndex ? 'td' : 'th[scope=col]', row).each((cellIndex, cell) => {
    if (rowIndex === 0) {
      data.dev_focus[cellIndex] = {
        focus: cell.innerText,
        stage1: {       'Engine': 0,      'Gameplay': 0,  'Story/Quests': 0, },
        stage2: {    'Dialogues': 0,  'Level Design': 0,            'AI': 0, },
        stage3: { 'World Design': 0,       'Graphic': 0,         'Sound': 0, }
      };
    }
    else {
      var k;
      if (focus in data.dev_focus[cellIndex].stage1) {
        k = 'stage1';
      }
      else if (focus in data.dev_focus[cellIndex].stage2) {
        k = 'stage2';
      }
      else if (focus in data.dev_focus[cellIndex].stage3) {
        k = 'stage3';
      }
      else {
        console.error('BAD FOCUS', focus, cell, data);
      }
      data.dev_focus[cellIndex][k][focus] = parseFloat(cell.innerText)
    }
  })
});

console.log(JSON.stringify(data, null, '  '));

