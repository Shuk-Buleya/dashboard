const menus = document.querySelectorAll('.action');
function closeMenus() {
  menus.forEach(menu => {
    menu.style.display = 'none';
  });
}

function showAction(eventId) {
  closeMenus(); // Close any open menus
  const actionMenu = document.getElementById('action_' + eventId);
  actionMenu.style.display = 'flex';
}

// Add event listener to close menus when clicking outside of the menus
document.body.addEventListener('click', function(event) {
  const isMenuClick = Array.from(event.target.classList).includes('fa-ellipsis-v');
  if (!isMenuClick) {
    closeMenus();
  }
});


const showaddform = document.getElementById("addFormContainer");
const showemailform = document.getElementById("emailFormContainer");
const showupdate = document.getElementById('updateFormContainer');
const showdelete = document.getElementById('deleteFormContainer');
const overlay = document.getElementById('overlay');

function showAddForm(){
    overlay.style.display = "block";
    showaddform.style.display = "block";
}

function showEmailForm(){
  overlay.style.display = "block";
  showemailform.style.display = "block";
}

function showUpdateForm(eventId, eventName, eventDate, venue, totalVolunteers) {
    // Populate the update form fields with event details
    const updateForm = document.getElementById('updateFormContainer');
    updateForm.querySelector('[name="event_id"]').value = eventId;
    updateForm.querySelector('[name="event_name"]').value = eventName;
    updateForm.querySelector('[name="event_date"]').value = eventDate;
    updateForm.querySelector('[name="venue"]').value = venue;
    updateForm.querySelector('[name="total_volunteers"]').value = totalVolunteers;

    // Show the update form
    overlay.style.display = "block";
    showupdate.style.display = "block";
}

function showDeleteForm(eventId, eventName) {
    // Populate the delete form fields with event details
    const deleteForm = document.getElementById('deleteFormContainer');
    const deleteFormEventIdInput = deleteForm.querySelector('[name="event_id"]');
    deleteFormEventIdInput.value = eventId;

    // Show the delete form
    overlay.style.display = 'block';
    showdelete.style.display = 'block';
}

function closeAddForm(){
    overlay.style.display = "none";
    showaddform.style.display = "none";
    
}

function closeEmailForm(){
  overlay.style.display = "none";
  showemailform.style.display = "none";
  
}

function closeUpdateForm(){
    overlay.style.display = "none";
    showupdate.style.display = "none";
}

function closeDeleteForm(){
    overlay.style.display = "none";
    showdelete.style.display = "none";
}




/* volunteer js*/

function showVolunteerUpdateForm(volunteerId, firstName, lastName, email, phone) {
    // Populate the update form fields with volunteer details
    
    const updateForm = document.getElementById('updateVolunteerFormContainer');
    updateForm.querySelector('[name="volunteer_id"]').value = volunteerId;
    updateForm.querySelector('[name="fname"]').value = firstName;
    updateForm.querySelector('[name="sname"]').value = lastName;
    updateForm.querySelector('[name="email"]').value = email;
    updateForm.querySelector('[name="phone"]').value = phone;

    // Show the update form
    overlay.style.display = "block";
    updateForm.style.display = "block";
}

function showVolunteerDeleteForm(volunteerId) {
    // Populate the delete form fields with volunteer details
    const deleteForm = document.getElementById('deleteVolunteerFormContainer');
    const deleteFormVolunteerIdInput = deleteForm.querySelector('[name="volunteer_id"]');
    deleteFormVolunteerIdInput.value = volunteerId;

    // Show the delete form
    overlay.style.display = 'block';
    deleteForm.style.display = 'block';
}

function closeVolunteerForms() {
    // Close/hide the overlay and volunteer forms
    overlay.style.display = "none";
    const updateForm = document.getElementById('updateVolunteerFormContainer');
    updateForm.style.display = "none";
    const deleteForm = document.getElementById('deleteVolunteerFormContainer');
    deleteForm.style.display = "none";
}



