/* 
   Home Interior & Architectural Photography Template
   ThemeForest Premium Commercial Quality
   Shoot Enquiry Form, Calendar datepicker, and Validation (enquiry.js)
*/

document.addEventListener('DOMContentLoaded', function () {
  const enquiryForm = document.getElementById('shootEnquiryForm');
  const successStateCard = document.getElementById('enquirySuccessCard');
  const errorStateCard = document.getElementById('enquiryErrorCard');
  
  // Custom Date Picker UI handlers
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    // Optional: Pre-fill calendar minimum as today to prevent booking in past
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
  });
  
  if (enquiryForm) {
    // Form Inputs to Validate
    const requiredInputs = enquiryForm.querySelectorAll('[required]');
    
    // Clear validation error class on input
    requiredInputs.forEach(input => {
      input.addEventListener('input', function () {
        const group = this.closest('.form-group-editorial');
        if (group) {
          group.classList.remove('has-error');
        }
      });
      
      input.addEventListener('change', function () {
        const group = this.closest('.form-group-editorial');
        if (group) {
          group.classList.remove('has-error');
        }
      });
    });

    // Form Submit Handler
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      let isValid = true;
      let firstErrorElement = null;
      
      // Reset error states
      if (errorStateCard) errorStateCard.style.display = 'none';
      
      requiredInputs.forEach(input => {
        const group = this.closest('.form-group-editorial') || input.parentElement;
        
        // Custom check validations
        let fieldValid = true;
        
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          fieldValid = emailRegex.test(input.value.trim());
        } else if (input.type === 'checkbox') {
          // Checkboxes validation (e.g. at least one check is required if it's in a checkbox list)
          const checkboxContainer = input.closest('.custom-checkbox-container');
          if (checkboxContainer) {
            const checkedCount = checkboxContainer.querySelectorAll('input:checked').length;
            fieldValid = checkedCount > 0;
          }
        } else {
          fieldValid = input.value.trim() !== '';
        }
        
        if (!fieldValid) {
          isValid = false;
          const targetGroup = input.closest('.form-group-editorial');
          if (targetGroup) {
            targetGroup.classList.add('has-error');
            if (!firstErrorElement) {
              firstErrorElement = input;
            }
          }
        }
      });
      
      if (isValid) {
        // Hide Form
        enquiryForm.style.display = 'none';
        
        // Show Success card
        if (successStateCard) {
          successStateCard.style.display = 'block';
          successStateCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Show Form warning block
        if (errorStateCard) {
          errorStateCard.style.display = 'block';
        }
        
        // Focus first error element
        if (firstErrorElement) {
          firstErrorElement.focus();
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Simulated back/reset button from Success Card to re-show form
    const resetBtns = document.querySelectorAll('.btn-enquiry-reset');
    resetBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Reset form
        enquiryForm.reset();
        
        // Remove error states from form groups
        const errorGroups = enquiryForm.querySelectorAll('.form-group-editorial');
        errorGroups.forEach(g => g.classList.remove('has-error'));
        
        // Show form & hide states
        enquiryForm.style.display = 'block';
        if (successStateCard) successStateCard.style.display = 'none';
        if (errorStateCard) errorStateCard.style.display = 'none';
        
        enquiryForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
});
