(function() {
  if (!autocmplt) return;
  
  const countriesRequest = new XMLHttpRequest();
  countriesRequest.onload = () => {
    autocmplt('.country-autocomplete', JSON.parse(countriesRequest.responseText));
  };
  countriesRequest.open('get', 'data/countries.json');
  countriesRequest.send();
})();
