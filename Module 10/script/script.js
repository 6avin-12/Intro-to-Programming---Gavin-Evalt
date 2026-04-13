document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const fields = [
    {id: 'firstName', label: 'First Name'},
    {id: 'lastName', label: 'Last Name'},
    {id: 'city', label: 'City'},
    {id: 'state', label: 'State'},
    {id: 'zip', label: 'Zip Code'}
  ];
  const messageEl = document.getElementById('message');

  function setFieldError(el, isError) {
    if (isError) el.classList.add('error');
    else el.classList.remove('error');
  }

  function isValidZip(val) {
    return /^\d{5}$/.test(val);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    messageEl.textContent = '';
    messageEl.className = '';
    const missing = [];

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const val = (el.value || '').trim();
      if (!val) {
        setFieldError(el, true);
        missing.push(f.label);
      } else {
        if (f.id === 'zip' && !isValidZip(val)) {
          setFieldError(el, true);
          missing.push(f.label + ' (must be 5 digits)');
        } else {
          setFieldError(el, false);
        }
      }
    });

    if (missing.length) {
      messageEl.textContent = 'Error: The following fields are required - ' + missing.join(', ');
      messageEl.classList.add('error');
    } else {
      messageEl.textContent = 'Success: All fields are filled correctly.';
      messageEl.classList.add('success');
    }
  });

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const handler = () => {
      if (f.id === 'zip') {
        const cleaned = el.value.replace(/[^\d]/g, '');
        if (cleaned !== el.value) el.value = cleaned;
      }
      if (el.value.trim()) {
        setFieldError(el, false);
        if (f.id === 'zip' && isValidZip(el.value.trim())) {
          if (messageEl.classList.contains('error')) {
            messageEl.textContent = '';
            messageEl.className = '';
          }
        }
      }
    };

    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
});
