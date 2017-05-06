(function() {
  var libraryStorage = {};

  function librarySystem(libraryName, dependenciesArray, callback) {
    // Case 1. - Store a library
    if (arguments.length > 1) {

      libraryStorage[libraryName] = {
        callback: callback,
        dependencies: dependenciesArray,
      }

      // Case 2. - Load a library
    } else {

      function loadLibrary(libraryName) {
        var library = libraryStorage[libraryName];

        // Check to see if library has been loaded before.
        if ('cash' in library) {
          return library.cash;
        }

        // Store in an array all the return values of the dependencies.
        var dependenciesValues = library.dependencies.map(function(dependency) {
          return libraryStorage[dependency].callback();
        });

        library.cash = library.callback.apply(null, dependenciesValues);
      	
        return library.cash;
      }

      return loadLibrary(libraryName);
    }
  }
  window.librarySystem = librarySystem;
})();