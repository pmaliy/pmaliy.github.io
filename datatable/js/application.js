(function() {
  if (!dataTable) return;
  
  const req = new XMLHttpRequest();
  req.onload = () => {
    dataTable('.container', JSON.parse(req.responseText).results);
  };
  req.open('get', 'https://swapi.co/api/people/?format=json');
  req.send();
})();
