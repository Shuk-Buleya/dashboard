// JavaScript to add/remove the "active" class when clicking a link
document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll(".side-bar .links a");
  
    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the link from navigating
        toggleActiveLink(this);
      });
    });
  
    function toggleActiveLink(clickedLink) {
      links.forEach(function(link) {
        link.classList.remove("active");
      });
  
      clickedLink.classList.add("active");
    }
  });
  
  
  
  
  // Function to show/hide content sections
    function showContent(contentId) {
      // Get all content sections
      var contentSections = document.querySelectorAll('.content');
      
      // Loop through all content sections and hide them
      contentSections.forEach(function(section) {
        section.style.display = 'none';
      });
  
      // Show the selected content section
      var selectedContent = document.getElementById(contentId);
      if (selectedContent) {
        selectedContent.style.display = 'block';
      }
    }
  
    // Initially show the default content (e.g., Dashboard)
    showContent('dashboard');
  
  
    const documentLinks = document.querySelectorAll('.document-link');
  
    // click event listener to each document link
    documentLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); 
            
            // Get the href attribute of the clicked link
            const href = link.getAttribute('href');
  
            // Check if the href is "#" or a path
            if (href === '#') {
                alert('Document not available');
            } else {
                // Extract the document name from the path
                const documentName = href.split('/').pop();
                alert('Document Name: ' + documentName);
            }
        });
    });
  
  
    const shownav = document.getElementById('side-bar');
    const closebutton = document.getElementById('close-button');
    const hidenav = document.getElementById('side-bar');
  
    function ShowNav(){
      shownav.style.display = "flex";
      closebutton.style.display = "block";
    }
  
    function HideNav(){
      hidenav.style.display = "none";
    }