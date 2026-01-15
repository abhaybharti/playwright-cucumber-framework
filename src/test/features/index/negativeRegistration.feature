Feature: Negative Registration Scenarios

  Background:
    Given the user is on the registration page

  # --- Required Field Validations ---

  Scenario: Missing First Name
    When the user fills in the form with data:
      | Last Name               | Smith      |
      | Address                 | 12 Main St |
      | City                    | Cityville  |
      | State                   | CA         |
      | Zip Code                | 12345      |
      | Phone Number            | 1234567890 |
      | Social Security Number  | 111-22-3333|
      | Username                | jdoe123    |
      | Password                | Abc12345   |
      | Confirm Password        | Abc12345   |
    And the user submits the registration form
    Then the error message "First name is required." should be visible for "firstName"

  Scenario: Missing Last Name
    When the user fills in the form with data:
      | First Name              | John       |
      | Address                 | 12 Main St |
      | City                    | Cityville  |
      | State                   | CA         |
      | Zip Code                | 12345      |
      | Phone Number            | 1234567890 |
      | Social Security Number  | 111-22-3333|
      | Username                | jdoe123    |
      | Password                | Abc12345   |
      | Confirm Password        | Abc12345   |
    And the user submits the registration form
    Then the error message "Last name is required." should be visible for "lastName"

  Scenario: Missing Username
    When the user fills in the form with data:
      | First Name             | John         |
      | Last Name              | Doe          |
      | Address                | 123 Main St  |
      | City                   | Anytown      |
      | State                  | CA           |
      | Zip Code               | 12345        |
      | Phone Number           | 123-456-7890 |
      | Social Security Number | 123-45-6789  |
      | Username               |              |
      | Password               | Password123  |
      | Confirm Password       | Password123  |
    And the user submits the registration form
    Then the error message "Username is required." should be visible for "username"

  Scenario: Missing Password
    When the user fills in the form with data:
      | First Name             | John         |
      | Last Name              | Doe          |
      | Address                | 123 Main St  |
      | City                   | Anytown      |
      | State                  | CA           |
      | Zip Code               | 12345        |
      | Phone Number           | 123-456-7890 |
      | Social Security Number | 123-45-6789  |
      | Username               | jdoe123      |
      | Confirm Password       | Password123  |
    And the user submits the registration form
    Then the error message "Password is required." should be visible for "password"

  Scenario: Missing Confirm Password
    When the user fills in the form with data:
      | First Name             | John         |
      | Last Name              | Doe          |
      | Address                | 123 Main St  |
      | City                   | Anytown      |
      | State                  | CA           |
      | Zip Code               | 12345        |
      | Phone Number           | 123-456-7890 |
      | Social Security Number | 123-45-6789  |
      | Username               | jdoe123      |
      | Password               | Password123  |
    And the user submits the registration form
    Then the error message "Password confirmation is required." should be visible for "confirm"

  Scenario: Mismatched Passwords
    When the user fills in the form with data:
      | First Name             | John         |
      | Last Name              | Doe          |
      | Address                | 123 Main St  |
      | City                   | Anytown      |
      | State                  | CA           |
      | Zip Code               | 12345        |
      | Phone Number           | 123-456-7890 |
      | Social Security Number | 123-45-6789  |
      | Username               | jdoe123      |
      | Password               | Password123  |
      | Confirm Password       | XTssword123  |
    And the user submits the registration form
    Then the error message "Passwords did not match." should be visible for "confirm"

  Scenario: Username already exists
    When the user fills in the form with data:
      | First Name             | John         |
      | Last Name              | Doe          |
      | Address                | 123 Main St  |
      | City                   | Anytown      |
      | State                  | CA           |
      | Zip Code               | 12345        |
      | Phone Number           | 123-456-7890 |
      | Social Security Number | 123-45-6789  |
      | Username               | jdoe123      |
      | Password               | Password123  |
      | Confirm Password       | Password123  |
    And the user submits the registration form
    Then the error message "This username already exists." should be visible for "username"