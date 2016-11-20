(function() {
  [].slice.call(
    document.querySelectorAll(
      'input.input__field'
    )).forEach(function(inputEl) {
      if( inputEl.value.trim() !== '' ) {
			  classie.add(
          inputEl.parentNode,
          'input--filled'
        );
      }

			inputEl.addEventListener(
        'focus',
        onInputFocus
      );
			inputEl.addEventListener(
        'blur',
        onInputBlur
      );
    }
  );

	function onInputFocus(ev) {
    classie.add(
      ev.target.parentNode,
      'input--filled'
    );
  }

	function onInputBlur(ev) {
    if(ev.target.value.trim() === '') {
      classie.remove(
        ev.target.parentNode,
        'input--filled'
      );
    }
  }
})();