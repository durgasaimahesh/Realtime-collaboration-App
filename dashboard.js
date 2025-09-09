// Check if the user is logged in
        // This script runs before the rest of the body loads,
        // ensuring immediate redirection if not authenticated.
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html'; // Redirect to login page
        }



// const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       window.location.href = "index.html"; // redirect if not logged in
//     } else {
//       document.getElementById("user-info").innerHTML = `
//         <p> Wecome! ${user.firstName}</p>
//       `;
//     }


// Global variables
let sidebarOpen = true;
let userDropdownOpen = false;

// DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project-K Dashboard loaded successfully!');
    initializeEventListeners();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-dropdown')) {
            closeUserDropdown();
        }
        
        if (!event.target.closest('.modal') && event.target.classList.contains('modal-overlay')) {
            closeJoinModal();
        }
    });
    
    // Add click handlers to all buttons
    addButtonHandlers();
}

// Add click handlers to buttons
function addButtonHandlers() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            console.log(`Navigating to: ${buttonText}`);
            showNotification(`Opening ${buttonText}`);
        });
    });
    
    // Action card buttons
    // const actionCards = document.querySelectorAll('.action-card');
    // actionCards.forEach(card => {
    //     card.addEventListener('click', function() {
    //         const title = this.querySelector('h3').textContent;
    //         console.log(`Action clicked: ${title}`);
    //         showNotification(`${title} functionality coming soon!`);
    //     });
    // });
    

    // Sidebar creation buttons
    const documentBtn = document.querySelector('.document-btn');
    const whiteboardBtn = document.querySelector('.whiteboard-btn');
    
    if (documentBtn) {
        documentBtn.addEventListener('click', function() {
            console.log('Creating new document...');
            showNotification('Creating new document...');
        });
    }
    
    if (whiteboardBtn) {
        whiteboardBtn.addEventListener('click', function() {
            console.log('Creating new whiteboard...');
            showNotification('Creating new whiteboard...');
        });
    }
    
    // Work card clicks
    const workCards = document.querySelectorAll('.work-card:not(.create-new)');
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            console.log(`Opening: ${title}`);
            showNotification(`Opening "${title}"`);
        });
    });
    
    // Create new card
    const createNewCard = document.querySelector('.create-new');
    if (createNewCard) {
        createNewCard.addEventListener('click', function() {
            console.log('Create new clicked');
            showNotification('Choose document or whiteboard from sidebar');
        });
    }
    
    // Dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            console.log(`Dropdown action: ${text}`);
            
            if (text === 'Logout') {
                handleLogout();
            } else {
                showNotification(`${text} functionality coming soon!`);
            }
            
            closeUserDropdown();
        });
    });
}

// Toggle user dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    userDropdownOpen = !userDropdownOpen;
    
    if (userDropdownOpen) {
        dropdown.classList.add('show');
    } else {
        dropdown.classList.remove('show');
    }
}

// Close user dropdown
function closeUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.remove('show');
    userDropdownOpen = false;
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = !sidebarOpen;
    
    if (window.innerWidth <= 1024) {
        if (sidebarOpen) {
            sidebar.classList.add('show');
        } else {
            sidebar.classList.remove('show');
        }
    } else {
        if (sidebarOpen) {
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.add('collapsed');
        }
    }
    
    console.log(`Sidebar ${sidebarOpen ? 'opened' : 'closed'}`);
}

// Show join modal
function showJoinModal() {
    const modal = document.getElementById('joinModal');
    modal.classList.add('show');
    
    // Focus on input
    const input = document.getElementById('joinCodeInput');
    setTimeout(() => input.focus(), 100);
    
    console.log('Join modal opened');
}

// Close join modal
function closeJoinModal() {
    const modal = document.getElementById('joinModal');
    const input = document.getElementById('joinCodeInput');
    
    modal.classList.remove('show');
    input.value = '';
    
    console.log('Join modal closed');
}

// Handle join code submission
function handleJoinCode() {
    const input = document.getElementById('joinCodeInput');
    const code = input.value.trim();
    
    if (code) {
        console.log(`Joining with code: ${code}`);
        showNotification(`Attempting to join with code: ${code}`);
        closeJoinModal();
        
        // Simulate joining process
        setTimeout(() => {
            showNotification('Join functionality coming soon!');
        }, 1000);
    } else {
        showNotification('Please enter an access code');
        input.focus();
    }
}

function handleLogout() {
    console.log('Logging out...');
    showNotification('Logging out...');

    // Clear session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    // Redirect to login
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show notification (simple alert for now)
function showNotification(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('show');
        sidebarOpen = true;
    } else {
        sidebar.classList.remove('collapsed');
        if (!sidebarOpen) {
            sidebar.classList.remove('show');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key to close modals
    if (event.key === 'Escape') {
        closeJoinModal();
        closeUserDropdown();
    }
    
    // Enter key in join modal
    if (event.key === 'Enter' && document.getElementById('joinModal').classList.contains('show')) {
        handleJoinCode();
    }
    
    // Ctrl/Cmd + K for search (future enhancement)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Search functionality
document.querySelector('.search-input')?.addEventListener('input', function(event) {
    const query = event.target.value;
    console.log(`Searching for: ${query}`);
    
    // Here you would implement actual search functionality
    if (query.length > 2) {
        // Simulate search results
        console.log('Search results would appear here');
    }
});

// Initialize responsive behavior
function initializeResponsive() {
    if (window.innerWidth <= 1024) {
        sidebarOpen = false;
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('show');
    }
}

// Call responsive initialization
initializeResponsive();

console.log('Project-K Dashboard script loaded successfully!');







//-----------------------------------------------------------------//

 function openModal() {
            const modal = document.getElementById('modal-overlay');
            const titleInput = document.getElementById('document-title');
            const errorMessage = document.getElementById('error-message');
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                titleInput.focus();
            }, 10);
            
            // Clear previous error messages
            errorMessage.textContent = '';
            titleInput.classList.remove('error');
        }
 function openModal1() {
            const modal = document.getElementById('modal-overlay1');
            const titleInput = document.getElementById('document-title');
            const errorMessage = document.getElementById('error-message');
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                titleInput.focus();
            }, 10);
            
            // Clear previous error messages
            errorMessage.textContent = '';
            titleInput.classList.remove('error');
        }

        function closeModal() {
            const modal = document.getElementById('modal-overlay');
            const form = document.getElementById('create-form');
            
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                form.reset();
            }, 300);
        }

        function closeModal1() {
            const modal = document.getElementById('modal-overlay1');
            const form = document.getElementById('create-form');
            
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                form.reset();
            }, 300);
        }

        function createDocument(event) {
            event.preventDefault();
            
            const titleInput = document.getElementById('docTitle');
            const errorMessage = document.getElementById('error-message');
            const title = titleInput.value.trim();
            const documentId = generateUUID();
            
            // Clear previous errors
            titleInput.classList.remove('error');
            errorMessage.textContent = '';
            
            // Validation
            if (!title) {
                showError('Document title is required');
                return;
            }
            
            if (title.length < 3) {
                showError('Document title must be at least 3 characters long');
                return;
            }
            
            if (title.length > 100) {
                showError('Document title must be less than 100 characters');
                return;
            }
            function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
            }
            // Store the title and navigate to editor
            localStorage.setItem('currentDocumentTitle', title);
            window.location.href = `editor.html?new=true&title=${encodeURIComponent(title)}&docId=${documentId}`;
        }


        function showError(message) {
            const titleInput = document.getElementById('document-title');
            const errorMessage = document.getElementById('error-message');
            
            titleInput.classList.add('error');
            errorMessage.textContent = message;
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Auto-focus on title input when modal opens
        document.getElementById('document-title').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                createDocument(event);
            }
        });



// Recent Documents View

