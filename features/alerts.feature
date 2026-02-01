Feature: Alerts Handling

  Scenario: Handle JavaScript Alert
    Given user is on alerts page
    When user clicks button to trigger alert
    Then alert message should say "This is a JavaScript Alert"
    When user accepts alert
    Then result message should say "You successfully clicked an alert"

  Scenario: Handle JavaScript Confirm - Accept
    Given user is on alerts page
    When user clicks button to trigger confirm
    When user accepts confirm
    Then result message should say "You clicked: Ok"

  Scenario: Handle JavaScript Confirm - Dismiss
    Given user is on alerts page
    When user clicks button to trigger confirm
    When user dismisses confirm
    Then result message should say "You clicked: Cancel"

  Scenario: Handle JavaScript Prompt with input
    Given user is on alerts page
    When user clicks button to trigger prompt
    When user enters "Hello World" in prompt
    When user accepts prompt
    Then result message should say "You entered: Hello World"
