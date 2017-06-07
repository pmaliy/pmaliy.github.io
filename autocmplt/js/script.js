(function() {
  if (!autocmplt) return;
  
  const httpRequest = new XMLHttpRequest();
  httpRequest.onload = () => {
    autocmplt('.autocmplt', JSON.parse(httpRequest.responseText));
  };
  httpRequest.open('get', 'data/countries.json');
  httpRequest.send();
})();
