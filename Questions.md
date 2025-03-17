# Face-to-Face Evaluation Questions & Answers

## 1. Do these results match what you found in your previous peer review? Why or why not?

The results from the Bandit scan partially match what I found during my manual review. The scanner detected key vulnerabilities, including:

- **Command injection risk** (`os.system` in `send_email` function).
- **Insecure URL access** (`urlopen` used with an HTTP URL).
- **SQL Injection risk** (string-based SQL query construction).

However, there were also some vulnerabilities I identified and fixed that Bandit did not flag, such as:

- **Hardcoded credentials** (I replaced them with environment variables).
- **Lack of input validation** (I added regex-based validation to prevent script injections and invalid inputs).
- **Unverified SSL/TLS connections** (I explicitly enforced SSL verification).

This shows that while Bandit is effective for detecting common security risks, it does not catch everything. Manual review is necessary to address logic-based vulnerabilities that automated tools might overlook.

## 2. Do you think they caught all the vulnerabilities present in the code? Why or why not?

No, Bandit did not catch all vulnerabilities. While it identified major issues related to command injection, insecure API requests, and SQL injection, it missed other security best practices, including:

- **Input validation**: Without proper validation, user input could still introduce XSS or other injection attacks.  
- **Error handling**: The code did not initially include proper exception handling for database connections or API calls, which could expose sensitive information through error messages.  
- **Hardcoded email sender details**: Bandit did not flag the hardcoded sender email, which could be a security risk in a real-world application.  

Since Bandit primarily focuses on static code analysis, it does not check for runtime security issues or business logic vulnerabilities. This is why a combination of automated tools and manual security reviews is essential.

## 3. Why is using multiple code scanners better than using one?

Using multiple security scanners is beneficial because different tools specialize in detecting different types of vulnerabilities. For example:

- **Bandit** focuses on static code analysis for Python, detecting common security flaws like SQL injection, command injection, and hardcoded credentials.
- **SonarQube** can provide deeper code analysis, including code smells, maintainability issues, and more complex security patterns.
- **Snyk or Dependabot** scans for vulnerabilities in dependencies, which Bandit does not check.
- **Dynamic analysis tools (e.g., ZAP, Burp Suite)** can catch runtime vulnerabilities like insecure authentication, session management issues, and API misconfigurations.

By using multiple tools, you increase coverage and reduce the likelihood of missing critical security flaws. Each tool has strengths and weaknesses, so combining them leads to a more comprehensive security assessment.

### Conclusion

While Bandit is a valuable tool for identifying common security vulnerabilities, it should not be the sole method for securing an application. Combining static analysis with manual reviews and other security tools provides the best protection against potential threats.
