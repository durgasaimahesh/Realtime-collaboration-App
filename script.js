console.log("Signup JS loaded ✅");
// DOM Elements
const signInBtn = document.getElementById('signInBtn');
const createAccountBtn = document.getElementById('createAccountBtn');
const signInModal = document.getElementById('signInModal');
const createAccountModal = document.getElementById('createAccountModal');
const closeSignIn = document.getElementById('closeSignIn');
const closeCreateAccount = document.getElementById('closeCreateAccount');
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');
const contactForm = document.getElementById('contactForm');
const signInForm = document.getElementById('signInForm');
const createAccountForm = document.getElementById('createAccountForm');

// Modal Functions
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    closeModal(signInModal);
    closeModal(createAccountModal);
}

// Event Listeners for Modal Controls
if (signInBtn) {
    signInBtn.addEventListener('click', () => {
        closeAllModals();
        openModal(signInModal);
    });
}

if (createAccountBtn) {
    createAccountBtn.addEventListener('click', () => {
        closeAllModals();
        openModal(createAccountModal);
    });
}

if (closeSignIn) {
    closeSignIn.addEventListener('click', () => {
        closeModal(signInModal);
    });
}

if (closeCreateAccount) {
    closeCreateAccount.addEventListener('click', () => {
        closeModal(createAccountModal);
    });
}

if (switchToSignUp) {
    switchToSignUp.addEventListener('click', () => {
        closeModal(signInModal);
        openModal(createAccountModal);
    });
}

if (switchToSignIn) {
    switchToSignIn.addEventListener('click', () => {
        closeModal(createAccountModal);
        openModal(signInModal);
    });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        closeModal(signInModal);
    }
    if (e.target === createAccountModal) {
        closeModal(createAccountModal);
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Form Submissions
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Contact form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}


document.getElementById("signInForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  const res = await fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login successful!");
    // Store session in localStorage and redirect
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});




document.getElementById("createAccountForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("signUpFirstName").value;
  const lastName = document.getElementById("signUpLastName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  const data = await res.json();
  alert(data.message);
});




// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-item, .audience-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effects to cards
document.querySelectorAll('.feature-item, .audience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Project-K website loaded successfully!');
    
    // You can uncomment the line below to add a typing effect to the hero title
    // typeWriter(document.querySelector('.hero-title'), 'Collaborate in Real-Time Like Never Before', 50);
});

// Mobile menu toggle (if you want to add a mobile menu later)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Add click handlers for CTA buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    if (!button.id) { // Don't interfere with modal buttons
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Start') || this.textContent.includes('Trial')) {
                e.preventDefault();
                openModal(createAccountModal);
            } else if (this.textContent.includes('Demo')) {
                e.preventDefault();
                alert('Demo functionality would be implemented here!');
            }
        });
    }
});

// Add click handlers for outline buttons
document.querySelectorAll('.btn-outline').forEach(button => {
    if (!button.id) { // Don't interfere with modal buttons
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Demo')) {
                e.preventDefault();
                alert('Demo scheduling functionality would be implemented here!');
            }
        });
    }
});

// Add some interactive feedback for form inputs
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value) {
            this.parentElement.classList.add('filled');
        } else {
            this.parentElement.classList.remove('filled');
        }
    });
});

// Add CSS for focus states
const style = document.createElement('style');
style.textContent = `
    .form-group.focused .form-label {
        color: var(--primary-600);
    }
    
    .form-group.filled .form-label {
        color: var(--gray-700);
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .feature-item, .audience-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);







  






// Clean JavaScript with single event listeners and proper debugging
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, setting up event listeners");

  // Function to show loading state
  function setLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.textContent = "Loading...";
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || (button.id.includes("signIn") ? "Sign In" : "Create Account");
    }
  }

  // Store original button text
  const buttons = document.querySelectorAll('button[type="submit"]');
  buttons.forEach(btn => {
    btn.dataset.originalText = btn.textContent;
  });

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to make API calls
  async function makeAPICall(url, data) {
    console.log(`Making API call to: ${url}`);
    console.log("Data being sent:", data);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      return {
        success: response.ok,
        status: response.status,
        data: result
      };
    } catch (error) {
      console.error("API call failed:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // SINGLE SIGNUP EVENT LISTENER
  const signupForm = document.getElementById("createAccountForm");
  if (signupForm) {
    console.log("Signup form found, attaching event listener");
    
    // Remove any existing event listeners
    const newSignupForm = signupForm.cloneNode(true);
    signupForm.parentNode.replaceChild(newSignupForm, signupForm);
    
    newSignupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("=== SIGNUP FORM SUBMITTED ===");

      const submitButton = newSignupForm.querySelector('button[type="submit"]');
      setLoading(submitButton, true);

      try {
        // Method 1: Direct element access from the form
        const formElements = {
          firstName: newSignupForm.querySelector('#signUpFirstName'),
          lastName: newSignupForm.querySelector('#signUpLastName'),
          email: newSignupForm.querySelector('#signUpEmail'),
          password: newSignupForm.querySelector('#signUpPassword'),
          confirmPassword: newSignupForm.querySelector('#confirmPassword')
        };

        console.log("Form elements found:", {
          firstName: !!formElements.firstName,
          lastName: !!formElements.lastName,
          email: !!formElements.email,
          password: !!formElements.password,
          confirmPassword: !!formElements.confirmPassword
        });

        // Check if all elements exist
        const missingElements = Object.keys(formElements).filter(key => !formElements[key]);
        if (missingElements.length > 0) {
          console.error("Missing form elements:", missingElements);
          alert("Form elements missing: " + missingElements.join(", "));
          setLoading(submitButton, false);
          return;
        }

        // Get values
        const formData = {
          firstName: formElements.firstName.value.trim(),
          lastName: formElements.lastName.value.trim(),
          email: formElements.email.value.trim(),
          password: formElements.password.value,
          confirmPassword: formElements.confirmPassword.value
        };

        console.log("Raw form values:", formData);

        // Method 2: Alternative using FormData (backup)
        const formDataAPI = new FormData(newSignupForm);
        console.log("FormData entries:");
        for (let [key, value] of formDataAPI.entries()) {
          console.log(`${key}: ${value}`);
        }

        // Method 3: Direct value access (backup)
        const directValues = {
          firstName: document.getElementById("signUpFirstName")?.value || "NOT_FOUND",
          lastName: document.getElementById("signUpLastName")?.value || "NOT_FOUND", 
          email: document.getElementById("signUpEmail")?.value || "NOT_FOUND",
          password: document.getElementById("signUpPassword")?.value || "NOT_FOUND",
          confirmPassword: document.getElementById("confirmPassword")?.value || "NOT_FOUND"
        };
        console.log("Direct access values:", directValues);

        // Use the method that works
        const finalData = {
          firstName: formData.firstName || directValues.firstName,
          lastName: formData.lastName || directValues.lastName,
          email: formData.email || directValues.email,
          password: formData.password || directValues.password,
          confirmPassword: formData.confirmPassword || directValues.confirmPassword
        };

        console.log("Final form data to validate:", finalData);

        // Validation
        if (!finalData.firstName || !finalData.lastName || !finalData.email || !finalData.password || !finalData.confirmPassword) {
          console.error("Validation failed - empty fields detected");
          alert("All fields are required");
          setLoading(submitButton, false);
          return;
        }

        if (!isValidEmail(finalData.email)) {
          alert("Please enter a valid email address");
          setLoading(submitButton, false);
          return;
        }

        if (finalData.password.length < 6) {
          alert("Password must be at least 6 characters long");
          setLoading(submitButton, false);
          return;
        }

        if (finalData.password !== finalData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(submitButton, false);
          return;
        }

        // Make API call
        const result = await makeAPICall("http://localhost:3000/api/signup", {
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          email: finalData.email,
          password: finalData.password
        });

        setLoading(submitButton, false);

        if (result.success) {
          alert(result.data.message || "Account created successfully!");
          newSignupForm.reset();
        } else {
          const errorMessage = result.data?.message || result.error || "Signup failed";
          alert(errorMessage);
        }

      } catch (error) {
        console.error("Signup process error:", error);
        alert("An error occurred during signup");
        setLoading(submitButton, false);
      }
    });
  } else {
    console.error("Signup form not found!");
  }

  // SINGLE LOGIN EVENT LISTENER
  const loginForm = document.getElementById("signInForm");
  if (loginForm) {
    console.log("Login form found, attaching event listener");
    
    // Remove any existing event listeners
    const newLoginForm = loginForm.cloneNode(true);
    loginForm.parentNode.replaceChild(newLoginForm, loginForm);
    
    newLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("=== LOGIN FORM SUBMITTED ===");

      const submitButton = newLoginForm.querySelector('button[type="submit"]');
      setLoading(submitButton, true);

      try {
        // Get form elements
        const emailEl = newLoginForm.querySelector('#signInEmail');
        const passwordEl = newLoginForm.querySelector('#signInPassword');

        if (!emailEl || !passwordEl) {
          console.error("Login form elements not found");
          alert("Login form elements not found");
          setLoading(submitButton, false);
          return;
        }

        const email = emailEl.value.trim();
        const password = passwordEl.value;

        console.log("Login form values:", {
          email: email || "EMPTY",
          password: password ? "PROVIDED" : "EMPTY"
        });

        // Validation
        if (!email || !password) {
          alert("Email and password are required");
          setLoading(submitButton, false);
          return;
        }

        if (!isValidEmail(email)) {
          alert("Please enter a valid email address");
          setLoading(submitButton, false);
          return;
        }

        // Make API call
        const result = await makeAPICall("http://localhost:3000/api/login", {
          email,
          password
        });

        setLoading(submitButton, false);

        // if (result.success) {
        //   alert(result.data.message || "Login successful!");
        //   newLoginForm.reset();
        // } else {
        //   const errorMessage = result.data?.message || result.error || "Login failed";
        //   alert(errorMessage);
        // }

        if (result.success) {
            // Set the login flag in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail',email);
            // Redirect to the dashboard page
            window.location.href = 'dashboard.html';
        } else {
            const errorMessage = result.data?.message || result.error || "Login failed";
            // Using a custom modal/message box instead of alert()
            alert(errorMessage);
        }

      } catch (error) {
        console.error("Login process error:", error);
        alert("An error occurred during login");
        setLoading(submitButton, false);
      }
    });
  } else {
    console.error("Login form not found!");
  }

  // Test server connection
  console.log("Testing server connection...");
  fetch("http://localhost:3000/api/test")
    .then(response => response.json())
    .then(data => {
      console.log("Server test successful:", data);
    })
    .catch(error => {
      console.error("Server test failed:", error);
      alert("Cannot connect to server. Please make sure the server is running on port 3000.");
    });
});