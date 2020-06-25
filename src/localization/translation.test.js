const en = require('./en/translations.json');
const vi = require('./vi/translations.json');

const enKey = Object.keys(en).sort();
const viKey = Object.keys(vi).sort();

it('test translation file', () => {
  for (let i = 0; i < enKey.length; i += 1) {
    expect(enKey[i]).toEqual(viKey[i]);
  }
});
