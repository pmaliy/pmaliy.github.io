// valid
console.log(brackets.test('()'));
console.log(brackets.test('[()]'));
console.log(brackets.test('[({})]'));
console.log(brackets.test('[({}()()[[[{}{}{}]]])({})][(){}]'));
// invalid
console.log(!brackets.test('[({}()([[[{}{}{}]]])({})][(){}]'));
console.log(!brackets.test('[({}()()[[[{}{}{}]]])({})][(){}'));
console.log(!brackets.test('[({}()()[[[{}{}{}]]])({})](){}]'));
console.log(!brackets.test('[({}()()[[[{}{}{}]])({})][(){}]'));
console.log(!brackets.test('[({}()()[[[{}{}{}]]]({})][(){}]'));
console.log(!brackets.test('[({}()()[[[{}{}{}]]]){})][(){}]'));