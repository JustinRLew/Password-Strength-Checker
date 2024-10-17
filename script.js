$(document).ready(function () {
    // Toggle password visibility
    $('#togglePassword').on('click', function () {
        const passwordInput = $('#password');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);

        // Toggle between visible and not visible icon
        if (type === 'password') {
            $('#eyeIcon').replaceWith(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" id="eyeIcon" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                </svg>
            `);
        } else {
            $('#eyeIcon').replaceWith(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" id="eyeIcon" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
            `);
        }
    });

    // Password strength checker based on NIST guidelines
    $('#password').on('keyup', function () {
        var password = $(this).val();
        var strength = calculatePasswordStrength(password);
        updateMeter(strength); // Update the strength meter
    });

    // Function to calculate password strength based on NIST guidelines
    function calculatePasswordStrength(password) {
        var score = 0;

        if (password.length >= 8) score += 1; // NIST recommends minimum of 8 characters
        if (password.length >= 12) score += 1; // Longer passwords are better (passphrases recommended)
        if (/[A-Z]/.test(password)) score += 1; // Mix of upper case
        if (/[a-z]/.test(password)) score += 1; // Mix of lower case
        if (/[0-9]/.test(password)) score += 1; // Numbers included
        if (/[\W_]/.test(password)) score += 1; // Special characters

        return score; // Score will be between 0-6
    }

    // Update the password strength meter colors
    function updateMeter(strength) {
        var meterBars = $('[data-kt-password-meter-control="highlight"] div');
        meterBars.removeClass('bg-active-success bg-danger bg-warning bg-success');

        // Apply color based on the strength level
        for (var i = 0; i < strength; i++) {
            if (strength <= 2) {
                $(meterBars[i]).addClass('bg-danger'); // Weak (Red)
            } else if (strength <= 4) {
                $(meterBars[i]).addClass('bg-warning'); // Medium (Yellow)
            } else {
                $(meterBars[i]).addClass('bg-success'); // Strong (Green)
            }
        }
    }

    // Show password strength and recommendations based on NIST guidelines
    $('#showPasswordStrength').on('click', function () {
        var password = $('#password').val();
        var strength = calculatePasswordStrength(password);

        // Map strength score to text
        let strengthLabel = 'Weak';
        if (strength <= 2) {
            strengthLabel = 'Weak';
        } else if (strength <= 4) {
            strengthLabel = 'Medium';
        } else {
            strengthLabel = 'Strong';
        }

        // Update the modal content with the strength label
        $('#passwordStrengthLabel').text('Password Strength: ' + strengthLabel);

        // Provide feedback based on NIST guidelines
        var feedback = getNISTFeedback(password);
        $('#nistFeedback').html(feedback);

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById('passwordStrengthModal'));
        modal.show();
    });

    // Close the modal when "Ok, got it!" button is clicked
    $('#closeModal').on('click', function () {
        var modalElement = document.getElementById('passwordStrengthModal');
        var modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Close the modal
    });

    // Provide NIST guideline feedback
    function getNISTFeedback(password) {
        let feedback = "";
        
        if (password.length < 8) {
            feedback += "<li>Your password is too short. NIST recommends at least 8 characters.</li>";
        } else if (password.length >= 8 && password.length < 12) {
            feedback += "<li>Good! Your password meets the minimum length requirement of 8 characters.</li>";
        } else if (password.length >= 12) {
            feedback += "<li>Great! Your password is long enough to resist brute-force attacks. Consider using a passphrase for even more security.</li>";
        }

        // Add more feedback based on the complexity
        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
            feedback += "<li>Excellent! Your password contains a good mix of characters.</li>";
        } else {
            feedback += "<li>Consider using a mix of upper-case, lower-case, numbers, and special characters to improve strength.</li>";
        }

        return `<ul>${feedback}</ul>`;
    }
});
