document.addEventListener('DOMContentLoaded', function () {           //This event listener is for the sidebar to become visible
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
  
    toggleButton.addEventListener('click', function () {  //we set event listener for sidebar button to extend or fold up
      sidebar.classList.toggle('collapsed');                   // when the button is clicked, css class of sidebar called collapsed is added or removed
    });                                                          //so sidebar becomes visible and invisible
  });
  