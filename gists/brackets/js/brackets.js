const brackets = {
  opening: ['(', '[', '{'],
  closing: [')', ']', '}'],
  store: [],
  test: function(str) {
    this.store = [];
    
    const arr = str.split('');
    let type;
    
    for (let i = 0, char = arr[i]; i < arr.length; char = arr[++i]) {
      if ((type = this.opening.indexOf(char)) >= 0) {
        this.store.push(type);
      }
      if ((type = this.closing.indexOf(char)) >= 0) {
        if (this.store.pop() !== type) {
          return false;
        }
      }
    }
    
    return this.store.length ? false : true;
  }
}