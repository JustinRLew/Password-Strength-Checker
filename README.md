# Password Strength Checker

A web-based password strength checker that evaluates passwords in real-time based on NIST guidelines. It provides visual feedback, displays password strength, and offers recommendations for improving password security.

## Features

- **Real-Time Feedback**: As the user types a password, the password strength is evaluated in real-time and displayed with a color-coded meter (red, yellow, green).
- **NIST Password Guidelines**: Offers suggestions based on NIST's 2024 recommendations for password management and security.
- **Password Visibility Toggle**: Allows users to show or hide their passwords as they type.
- **Modal Pop-Up**: After evaluating the password, the modal provides a strength rating and key NIST recommendations.

## Technologies Used

- **HTML5**: Structure of the web page.
- **CSS3**: For styling and layout of the password meter.
- **JavaScript (jQuery)**: Handles real-time password evaluation and toggles password visibility.
- **Bootstrap**: Used for layout and modal functionality.

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in any modern web browser.
3. Type a password in the input field. The password strength meter will update in real-time.
4. Click the "Show Password Strength" button to view detailed feedback in the modal.

## Password Strength Criteria

The password strength is calculated based on:
- Password length.
- The presence of uppercase letters, lowercase letters, numbers, and special characters.
  
Strength Levels:
- **Weak**: The password doesn't meet the minimum criteria.
- **Medium**: The password is moderately strong but can be improved.
- **Strong**: The password meets or exceeds recommended security standards.

## NIST Guidelines (As of 2024)

The project follows these key recommendations from NIST:
1. **Length over complexity**: Passwords should be at least 8 characters long. Longer passwords or passphrases are recommended.
2. **No arbitrary complexity rules**: Complexity rules (uppercase, lowercase, numbers, special characters) are not required, but longer, memorable passphrases are encouraged.
3. **Multi-factor authentication**: MFA is recommended to strengthen security further.

## Installation

1. Download or clone the repository.
2. Open the project folder and run the `index.html` file in a browser.
3. The JavaScript is included in the `script.js` file and linked in `index.html`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
