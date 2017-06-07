(function() {
  if (!autocmplt) return;
  
  const httpRequest = new XMLHttpRequest();
  httpRequest.onload = () => {
    console.log(httpRequest.responseText, JSON.parse(httpRequest.responseText));
    autocmplt('.autocmplt', JSON.parse(httpRequest.responseText));
  };
  httpRequest.open('get', '/data/countries.json');
  httpRequest.send();
})();
