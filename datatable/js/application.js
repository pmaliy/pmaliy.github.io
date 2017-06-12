(function() {
  if (!outputData) return;
  
  const req = new XMLHttpRequest();
  req.onload = () => {
    outputData('.container', JSON.parse(req.responseText).results);
  };
  req.open('get', 'https://swapi.co/api/people/?format=json');
  req.send();
})();
