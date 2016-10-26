const chats = {
  crush: [
    'Hello there, sexy',
    'wanna hang out?',
  ],
  bob: [
    'kek',
    'do you even lift?',
    'teach me C pls',
  ],
  doge: [
    'wow',
    'so chat',
    'much oneway',
    'very irl',
  ],
};

export function fetchMessages(name) {  // eslint-disable-line import/prefer-default-export
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chats[name]) {
        resolve(chats[name]);
      } else {
        reject('Oops, chat not found.');
      }
    }, 1000);
  });
}

export function addMessage(name, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ?
          resolve(chats[name].push(message) && chats[name]) :
          reject('add error happened');
    }, 500)
  })
}