const unflatten = (arr) => {
  let map = {};
  return arr.reduce((r, el) => {
    map[el.id] = map[el.id] || [];
    map[el.parentId] = map[el.parentId] || [];
    
    el.children = map[el.id];

    if (el.parentId) {
      map[el.parentId].push(el);
    } else {
      r.push(el);
    }

    return r;
  }, []);
}